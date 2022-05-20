---
title: "Programmatic AWS Lambda warmers with EventBridge and boto3 in Python"
date: "March 5, 2021"
excerpt: "Introduction how to work around the cold start issue of Lambda using AWS EventBridge and how to automate this with boto3 in Python."
cover_image: "/images/blog/lambda_warmer/hero_lambda_warmer.png"
---

# Goal: Keep the Lambda warm

## Motivation: Lambda warmers remove the cold start problem and make Lambda responses faster

We start with a little experiment. We call a lambda function (here the multi-tenant-authorizer lambda from this blog) via Postman for the first time twice in a row (you can use the new feature [AWS Function URLs](https://docs.aws.amazon.com/lambda/latest/dg/lambda-urls.html) to call your Lambda easily via API).
The first call takes 2,860 milliseconds.

![First time](/public/images/blog/lambda_warmer/time_1.png)

Surprisingly, the second identical call is much faster and takes only 42 milliseconds.

![First time](/public/images/blog/lambda_warmer/time_2.png)

> The fact that the first call of a lambda function can take significantly longer than each subsequent call is called the cold start problem.

The reason for this is that there is some overhead when the lambda is invoked for the first time. Before the code is executed, the following steps have to be performed:

- Download & extract the code (from S3 or ECR for custom container images)
- Start the container
- Bootstrap runtime

Only then can the code really be executed. The difference is especially noticeable with larger Docker images, as our example shows.
AWS Lambda does not stop the existing container immediately after execution, but keeps the container for a while for further calls. This eliminates the overhead for a further function call, the code is executed directly and the execution is faster.

> In a warm start, a lambda function uses an existing container from a previous invocation and there is no cold start overhead.

The objective of this tutorial is to create a function that pings our lambda every five minutes to keep it warm. If the lambda is then called externally by someone, it will not cold start.

> A lambda warmer is a function that periodically invokes a lambda to keep it in a warm state.

## Lambda warmers are extremely cost-effective

The following calculation example shows the monthly costs. We have monthly 30 days \* 24 h/day \* 12 call/h = 8,640 calls if we call the Lambda every 5 minutes (12 times per hour). Using the [AWS cost calculator](https://s3.amazonaws.com/lambda-tools/pricing-calculator.html), for 2048 MB allocation memory and an execution time of 100 ms, the cost is just $0.03/months (+ EventBridge cost less than one cent).

> If you write a fast pink method (see following tutorial) the cost of a Lambda warmer is extremely low.

# Create a lambda warmer

The creation of the lambda warmer is done in two steps. First, we manually create a Lambda warmer in the AWS Management Console. Then we use boto3 to build the same programmatically in Python. This way we can create scalable lambda warmers for a large number of models.

## Manually creation of the warmer with Amazon EventBridge

The basic idea is that we create a rule in AWS EventBridge that calls our Lambda Function every five minutes. This way it stays warm and we avoid the cold start.
We start by selecting _Create rule_ under _Rules_ in Eventbridge.

We give the rule a name (warmer-multi-tenant-auth), a description (lambda warmer for multi-tenant-auth) and the default event bus (note: scheduling is only possible for the default bus).

![Add basic information for Lambda warmer](/public/images/blog/lambda_warmer/manual_warmer_first_screen.png)

Then we set the rule to be executed every 5 minutes.

![Set time interval for Lambda warmer](/public/images/blog/lambda_warmer/manual_warmer_second_screen.png)

Next we select our lambda as target. It is important to provide the following JSON as target input.

```json
{ "type": "warmer" }
```

![Select target for Lambda warmer](/public/images/blog/lambda_warmer/manual_warmer_third_screen.png)

Afterwards, optional tags can be assigned and the settings can be checked again. After we finish the process we find the rule under _Events>Rules_ in EventBridge.

### Check if it is working

To test if it was successful we have to wait a bit so that the warmer can make its calls every 5 minutes.
If we now switch to our Lambda we see under _Monitor>Metriccs_ that the Lambda function is indeed called regularly every 5 minutes.
![Select target for Lambda warmer](/public/images/blog/lambda_warmer/warmer_impact_lambda.png)
If we call the function now via Postman it is directly fast and we have no cold start problem. 🥳

## Programmatic creation of the Lambda warmer with boto3 in Python

For programmatic creation with boto3 we use a simple trick. We use boto3 to descripe the manually created rule first to be able to rebuild the structure easily. We start with the desciption of the rule:

```python
import boto3
eventclient = boto3.client('events') # AWS EventBridge client
print(eventclient.describe_rule(Name='warmer-multi-tenant-auth'))
# {'Name': 'warmer-multi-tenant-auth', 'Arn': 'arn:aws:events:eu-central-1:ACCOUNT_ID:rule/warmer-multi-tenant-auth',
#  'ScheduleExpression': 'rate(5 minutes)', 'State': 'ENABLED', 'Description': 'Lambda warmer for multi-tenant-auth',
#  'EventBusName': 'default',
#  'ResponseMetadata': {'RequestId': '8d2ed2e2-c584-4abe-8699-5f6f02fe3fe2', 'HTTPStatusCode': 200,
#                       'HTTPHeaders': {'x-amzn-requestid': '8d2ed2e2-c584-4abe-8699-5f6f02fe3fe2',
#                                       'content-type': 'application/x-amz-json-1.1', 'content-length': '275',
#                                       'date': 'Fri, 20 May 2022 19:49:20 GMT'}, 'RetryAttempts': 0}}
print(eventclient.list_targets_by_rule(Rule='warmer-multi-tenant-auth'))
# {'Targets': [{'Id': 'Idb8817654-899a-4b92-a602-915fe0671def',
#               'Arn': 'arn:aws:lambda:eu-central-1:ACCOUNT_ID:function:multi-tenant-authorizer',
#               'Input': '{ "type": "warmer" }'}],
#  'ResponseMetadata': {'RequestId': '355a12c4-8ed9-4eba-a4c5-1048df001560', 'HTTPStatusCode': 200,
#                       'HTTPHeaders': {'x-amzn-requestid': '355a12c4-8ed9-4eba-a4c5-1048df001560',
#                                       'content-type': 'application/x-amz-json-1.1', 'content-length': '178',
#                                       'date': 'Fri, 20 May 2022 19:50:11 GMT'}, 'RetryAttempts': 0}}
```

We can now easily build this using the dictionary template and the [boto3 documentation for EventBridge](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/events.html#EventBridge):

```python
import secrets
eventclient.put_rule(
    Name='warm-multi-tenant-auth-PROGRAMATIC',
    ScheduleExpression='rate(5 minutes)',
    State='ENABLED',
    Description='Created with boto3: Lambda warmer for multi-tenant-auth',
    EventBusName='default')
random_unique_id = secrets.token_hex(16)
eventclient.put_targets(
    Rule='warm-multi-tenant-auth-PROGRAMATIC',
    Targets=[
        {'Id': random_unique_id,
         'Arn': 'arn:aws:lambda:eu-central-1:ACCOUNT_ID:function:multi-tenant-authorizer',
         'Input': '{ "type": "warmer" }'}])
```

![Result of creation via code](/public/images/blog/lambda_warmer/programmatic_res.png)

# Adjust the lambda function

Usually we don't want our entire lambda function code to run time as it is time consuming or to have errors when the lambda warmer calls it to keep our error logs clean. For this reason, we slightly customize our lambda function handler so that it simply returns a 200 response directly when it is the call of the warmer. The following example shows how to easily implement this in Python:

```python
def lambda_handler(event, context):
    """
    your documentation
    """
    if event.get('type') == 'warmer':
        return {'statusCode': 200,
                'body': json.dumps('Nice to be warm!')}

    # Actual code of the lambda

```
