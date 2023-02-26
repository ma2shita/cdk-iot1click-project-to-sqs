import os
import json
import boto3

SQS_QUEUE_NAME = os.environ['SQS_QUEUE_NAME']

def lambda_handler(event, context):
    print(f'{event=}')
    queue = boto3.resource('sqs').get_queue_by_name(QueueName=SQS_QUEUE_NAME)
    return queue.send_message(MessageBody=json.dumps(event))

"""
// TestEvent: iot1click
{
  "deviceInfo": {
    "deviceId": "7MF6XXXXXXYY9999",
    "type": "button",
    "remainingLife": 99.933334,
    "attributes": {
      "projectRegion": "us-west-2",
      "projectName": "event_and_context_dump",
      "placementName": "placement1",
      "deviceTemplateName": "invoke_lambda"
    }
  },
  "deviceEvent": {
    "buttonClicked": {
      "clickType": "DOUBLE",
      "reportedTime": "2022-12-27T07:32:48.709Z"
    }
  },
  "placementInfo": {
    "projectName": "event_and_context_dump",
    "placementName": "placement1",
    "attributes": {
      "attr2": "value2",
      "attr_add1": "value_add1",
      "attr1": "value1"
    },
    "devices": {
      "invoke_lambda": "7MF6XXXXXXYY9999"
    }
  }
}
"""
