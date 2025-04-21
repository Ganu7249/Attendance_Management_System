const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const s3 = new AWS.S3({ region: process.env.AWS_REGION });

module.exports = async function uploadToS3(base64Image) {
  const base64Data = Buffer.from(base64Image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  const key = `uploads/${uuidv4()}.jpg`;

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    Body: base64Data,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg',
  };

  await s3.putObject(params).promise();
  return key;
}
