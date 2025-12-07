import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import { Function  , Runtime ,  Code } from 'aws-cdk-lib/aws-lambda';
import { join } from 'path';

import { PolicyStatement, Effect, Policy } from 'aws-cdk-lib/aws-iam';
import * as iam from "aws-cdk-lib/aws-iam";

export class TestlabdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    
    const handler = new Function(this , " hi " , 
      {
        runtime : Runtime.PYTHON_3_10,
        memorySize:512 , 
        handler: 'listlambda.main',
        code:Code.fromAsset(join(__dirname,'../lambda')),
        environment:{
          NAME : "Rama" ,
          AGE :"22"
        }
      }
    );

    
   const listBucketpolicy = new iam.PolicyStatement({
    effect:iam.Effect.ALLOW ,
    actions :['s3:*'],
    resources:['*']
   });


    const listLambdapolicy = new iam.PolicyStatement({
    effect:iam.Effect.ALLOW ,
    actions :['lambda:*'],
    resources:['*']


   });

   handler.role?.attachInlinePolicy(
    new iam.Policy(this , 'list open s3 bucket ' , 
      {statements:[listBucketpolicy]}
    )
   )


   handler.role?.attachInlinePolicy(
    new iam.Policy(this , 'list lambda function  ' , 
      {statements:[listLambdapolicy]}
    )
   )

  }
}
