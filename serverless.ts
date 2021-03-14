import type { AWS } from '@serverless/typescript';
// import { handlerPath } from '@libs/handlerResolver';

const hello =  {
  handler: `src/functions/hello/handler.main`,
  role: "s3EventRole",
  events: [
    {
      s3: {
        bucket: "${self:custom.s3Event.bucket}",
        event: 's3:ObjectCreated:*',
        rules: [
          {
            prefix: "${self:custom.s3Event.prefix}",
            suffix: ''
          }
        ],
        existing: true
      }
    }
  ]
}

const s3EventRole = {
  Type: 'AWS::IAM::Role',
  Properties: {
    Path: '/',
    RoleName: "${self:provider.stage}S3EventRole",
    AssumeRolePolicyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: {
            Service: [
              'lambda.amazonaws.com'
            ]
          },
          Action: 'sts:AssumeRole'
        }
      ]
    },
    Policies: [
      {
        PolicyName:  "${self:provider.stage}S3EventPolicy",
        PolicyDocument: {
          Version: '2012-10-17',
          Statement: [
            {
              Effect: 'Allow',
              Action: [
                'S3:*'
              ],
              Resource: "arn:aws:s3:::${self:custom.s3Event.bucket}/*"
            }
          ]
        }
      }
    ]
  }
}

const serverlessConfiguration: AWS = {
  service: 's3-event',
  frameworkVersion: '2',
  custom: {
    defaultStage: 'dev',
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
    s3Event: {
      bucket: "${file(./slscnf/${self:provider.stage}.yml):uploadBucket}",
      prefix: "${file(./slscnf/${self:provider.stage}.yml):uploadDir}"
    }
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'ap-northeast-1',
    stage: "${opt:stage, self:custom.defaultStage}",
    // environment: {
    //   AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    // },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { hello },
  resources: {
    Resources: { s3EventRole }
  }
};

module.exports = serverlessConfiguration;
