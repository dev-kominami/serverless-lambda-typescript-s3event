import 'source-map-support/register';

import { middyfy } from '@libs/lambda';
import { Callback, Context, S3BatchEvent, S3BatchResult, S3CreateEvent, S3EventRecord, S3Handler } from "aws-lambda";

const hello: S3Handler = async (event: S3CreateEvent, context: Context, callback: Callback<void> ) => {
  console.log(event);
  console.log(context);
  callback(null, console.log('OK'));
}

export const main = middyfy(hello);
