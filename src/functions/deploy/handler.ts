import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { S3 } from 'aws-sdk';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import {formatJSONResponse} from "@libs/api-gateway";
import {createReverseIndex} from "@libs/createReversIndex";

const s3 = new S3();
const BUCKET_NAME = 'testbucketzizo';
const FILE_NAME = 'vocabulary.json';

const deploy: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {

    const reverseIndex = createReverseIndex(event.body);

    await s3.putObject({
      Bucket: BUCKET_NAME,
      Key: FILE_NAME,
      Body: JSON.stringify(reverseIndex),
      ContentType: 'application/json'
    }).promise();

    return formatJSONResponse(200,  'Vocabulary index saved successfully.');

  } catch (error) {
    return formatJSONResponse(500,`Error: ${error.message}`);
  }
};

export const main = middyfy(deploy);
