import boto3  
# create an S3 client to interact with AWS S3
client = boto3.client('s3')

def main(event , context):
    response = client.list_buckets()
    list =[]
    for bucket in response['Buckets']:
        list.append(bucket['Name'])
        print(f'{bucket["Name"]}')

    return list 