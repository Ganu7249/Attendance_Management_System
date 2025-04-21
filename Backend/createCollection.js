const AWS = require('aws-sdk');
require('dotenv').config();

const rekognition = new AWS.Rekognition({ region: process.env.AWS_REGION });

const params = {
  CollectionId: process.env.REKOGNITION_COLLECTION, // e.g., 'employees'
};

rekognition.createCollection(params, function (err, data) {
  if (err) console.error("❌ Error:", err.stack);
  else console.log("✅ Collection Created:", data);
});
