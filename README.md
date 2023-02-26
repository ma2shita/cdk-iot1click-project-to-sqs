# AWS CDKv2 example: IoT 1-Click to exists SQS queue

Example of an AWS CDKv2 for building the AWS IoT 1-Click project with sending to exists SQS queue Lambda function.

(ja) 既存のSQSキューへメッセージ送信をするIoT 1-Clickプロジェクトと、Lambda 関数を構築するAWS CDKv2の例。

Created by:

* Lambda function (1)
* IoT 1-Click project (1)

## Requirements

* AWS CDKv2 env. (**AWS Cloud9 (It's very easy)**)
    * `cdk bootstrap` must be done 
* SQS queue
    * queue's ARN
* [AWS IoT 1-Click device](https://aws.amazon.com/jp/iot-1-click/devices/)

## Build & Deploy

Build:

```
git clone https://github.com/ma2shita/iot1click-project-to-sqs
cd iot1click-project-to-sqs/
npm install
cdk ls --context destSqsQueueArn=<SQS_QUEUE_ARN>
#=> Iot1ClickProjectStack
# e.g.) cdk ls --context destSqsQueueArn=arn:aws:sqs:REGION:ACCOUNT:sqs-queue-name
```

Deploy:

```
cdk deploy --context destSqsQueueArn=<SQS_QUEUE_ARN>
```

> **Note**
> The target region is set to us-west-2. This is specified in `bin/iot1click_project.ts`.

Destroy:

```
cdk destroy --context destSqsQueueArn=<SQS_QUEUE_ARN>
```

## How it works

Register devices in IoT 1-Click then add the device to the project (created with this CDK).  
Pressing the button sends the message to the SQS queue.

(ja) IoT 1-Clickでデバイスを登録し、本CDKで作成されたプロジェクトにデバイスを追加します。  
ボタンを押すとSQSキューにメッセージが送信されます。

## References and special thanks!!

* [他のスタックからインポートしたLambdaにはaddPermissionで権限が付けられない](https://nekoniki.com/20220214_cross-stack-lambda-permission)

## Related

* [AWS CDKv2 example: SQS to CloudWatch Logs on Amazon EventBridge Pipes](https://github.com/ma2shita/eventbridge-pipes-simplelogger)
    * When combined with this stack, button data can be handled by Amazon EventBridge Pipes. / このスタックと組み合わせると、ボタンのデータをAmazon EventBridge Pipesで扱えるようになります。

## License

Copyright (c) 2023 Kohei "Max" MATSUSHITA.

SPDX-License-Identifier: MIT

EoT
