import type { S3EventRecord, S3Handler, APIGatewayProxyEvent } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";

export const formatJSONResponse = (response: Record<string, unknown>) => {
  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}

export const formatResult = () => {
  return {
    code: 1,
    result: 'success'
  }
}