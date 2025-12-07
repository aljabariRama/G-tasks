📦 G-tasks — AWS CDK Lambda Project

This project is an AWS CDK application that deploys:

A Python Lambda function that lists all S3 buckets.

A Node.js Lambda handler (example) that returns environment variables.

IAM policies allowing:

Full access to S3

Full access to Lambda

The project uses AWS CDK v2, TypeScript, and AWS Lambda (Python 3.10 & Node.js).

🚀 Project Structure
G-tasks/
│
├── bin/
├── lib/
│   └── testlabda-stack.ts        → CDK stack definition
│
├── lambda/                        → Lambda function source code
│   └── listlambda.py              → Python Lambda for listing S3 buckets
│
├── package.json
├── cdk.json
├── tsconfig.json
└── README.md

🏗️ What the CDK Stack Does
✔ Creates a Python Lambda Function

Configured with:

Runtime: Python 3.10

Memory: 512 MB

Handler: listlambda.main

Environment variables:

NAME="Rama"

AGE="22"

The Lambda code is loaded from the lambda/ directory.

✔ Adds IAM Policies to the Lambda Role

S3 Policy
Allows the Lambda to perform any S3 action on any bucket:

actions: ['s3:*'],
resources: ['*']


Lambda Policy
Allows the function to list and interact with AWS Lambda:

actions: ['lambda:*'],
resources: ['*']

🐍 Python Lambda Function (listlambda.py)

This Lambda lists all S3 buckets:

import boto3  

client = boto3.client('s3')

def main(event, context):
    response = client.list_buckets()
    bucket_names = []

    for bucket in response['Buckets']:
        bucket_names.append(bucket['Name'])
        print(bucket['Name'])

    return bucket_names

🟦 Node.js Lambda Example

This example Lambda returns environment variable values:

exports.handler = async (event, context) => {
    const name = process.env.NAME;
    const age = process.env.AGE;

    return `hi ${name}, your age is ${age}`;
};

📥 Install Dependencies
npm install

🧪 Synthesize CloudFormation Template

Generate the CloudFormation template:

cdk synth

🚢 Deploy to AWS
cdk deploy


AWS will ask to confirm permissions — type yes.

🧹 Clean Up Resources

Remove all deployed AWS resources:

cdk destroy

📝 Requirements

Node.js (v16+)

AWS CLI configured with credentials

AWS CDK v2 installed globally:

npm install -g aws-cdk

✨ Author

Rama Aljabari
