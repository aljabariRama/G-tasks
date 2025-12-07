import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Stack , StackProps } from 'aws-cdk-lib';
import { Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import {join} from 'path';
import { Code } from 'aws-cdk-lib/aws-lambda';
import { RestApi } from 'aws-cdk-lib/aws-apigateway';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Lambda } from 'aws-cdk-lib/aws-ses-actions';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';


export class CdkApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

   const table = new Table(this ,"quotes", {
    partitionKey:{name:'id' , type:AttributeType.STRING},
    billingMode:BillingMode.PAY_PER_REQUEST,
    removalPolicy:cdk.RemovalPolicy.DESTROY 
   } );



    const handlerFunction = new Function( this , 'Quoteshandler', 
      {
        runtime :Runtime.NODEJS_20_X,
        code:Code.fromAsset(join(__dirname, '../lambdas')), 
        handler:"app.handler",
        environment:{
         R_TABLE:table.tableName
        }
      }
    );


   table.grantReadWriteData(handlerFunction)


const api = new RestApi(this, 'quotes-api', {
    description: 'Quotes API',
    restApiName: 'Quotes Service',
    deployOptions: {
        stageName: 'v1'
    }
});

const quotesResource = api.root.addResource('quotes');
quotesResource.addMethod('GET', new LambdaIntegration(handlerFunction, {
    proxy: true
}))
  }}