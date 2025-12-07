import boto3
# create a Lambda client to interact with AWS Lambda service
client = boto3.client('lambda')

def main(event , context) :
    response = client.list_functions()
    return response 