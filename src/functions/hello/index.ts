// import schema from './schema';
import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      s3: {
        bucket: 'dev-kominami-takashi-lambda-trigger-test3',
        path: 'hello',
        events: [
          's3:ObjectCreated'
        ],
        rules: [
          {
            prefix: 'upload'
          }
        ],
        existing: true
      }
    }
  ]
}
