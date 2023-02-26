import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { aws_lambda as _lambda } from 'aws-cdk-lib';

export class Iot1ClickProjectStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Get exists Queue
    const _destSqsQueueArn = this.node.tryGetContext("destSqsQueueArn"); // from cdk.json or `cdk --context`
    const queue = sqs.Queue.fromQueueArn(this, "Dest", _destSqsQueueArn);
    
    // Create AWS Lambda
    const _queueName = queue.queueName;
    const fn = new _lambda.Function(this, 'ToSqs', {
      code: _lambda.Code.fromAsset('lambda/'),
      handler: 'lambda_function.lambda_handler',
      runtime: _lambda.Runtime.PYTHON_3_9,
      architecture: _lambda.Architecture.ARM_64,
      timeout: cdk.Duration.seconds(5),
      environment: {
        'SQS_QUEUE_NAME': _queueName
      }
    });
    queue.grantSendMessages(fn);

    // Attach permission for Invoked from IoT 1-Click
    const _serviceName = 'iot1click';
    new _lambda.CfnPermission(this, 'perm1', {
      functionName: fn.functionName,
      action: 'lambda:InvokeFunction',
      principal: `${_serviceName}.amazonaws.com`,
      sourceAccount: this.account,
      sourceArn: this.formatArn({ service: _serviceName, region: this.region, account: this.account, resource: 'projects', resourceName: "*" })
    });

    // Create Project in AWS IoT 1-Click
    const _functionArn = fn.functionArn;
    new cdk.aws_iot1click.CfnProject(this, 'IotButton', {
      placementTemplate: {
        defaultAttributes: {},
        deviceTemplates: {
          "InvokeLambdaFunc": {
            callbackOverrides: { onClickCallback: _functionArn },
            deviceType: 'button'
          }
        }
      },
      description: `created by CDK at "${(new Date()).toString()}"`
    });

  }
}
