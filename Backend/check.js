// 1. Require the AWS SDK
const AWS = require('aws-sdk');
require('dotenv').config();

// 2. Configure AWS Credentials (Important!)
// You should configure your AWS credentials using one of the following methods:
//    - Environment variables (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION)
//    - AWS credentials file (~/.aws/credentials)
//    - IAM roles (if running on EC2 or Lambda)
//
// For local development, using environment variables or the credentials file is common.
// Ensure you have set your AWS Region as well.
AWS.config.update({
  region: process.env.AWS_REGION, // Replace with your AWS Region (e.g., 'us-east-1')
  // If you are not using environment variables or the credentials file,
  // you can explicitly set your access key and secret here (NOT RECOMMENDED for production):
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// 3. Create an instance of the Rekognition service client
const rekognition = new AWS.Rekognition();

// 4. Define your Collection ID
const COLLECTION_ID = 'employees'; // Replace with your actual collection ID

// 5. Call the listFaces method
rekognition.listFaces({ CollectionId: COLLECTION_ID }, function (err, data) {
  if (err) {
    console.log("Error listing faces:", err);
  } else {
    console.log("Faces in collection:");
    console.log(JSON.stringify(data, null, 2));
  }
});