const AWS = require('aws-sdk');
require('dotenv').config();

const rekognition = new AWS.Rekognition({ region: process.env.AWS_REGION });
const COLLECTION_ID = process.env.REKOGNITION_COLLECTION;

// Array of Face IDs to delete
const faceIdsToDelete = ['71fe3402-ac49-4d5f-bf4f-261fa7714a85','5fbee767-5996-4f0c-9000-ceafd01b5d0a', '5a268310-6f1b-4c65-b8d5-c17904e48408','1deb1104-3088-418c-bf93-115ecb760d07', '4d5add95-8cbc-4361-95e7-66addbcb5fca']; // Replace with the actual Face IDs you want to remove

const params = {
  CollectionId: COLLECTION_ID,
  FaceIds: faceIdsToDelete,
};

rekognition.deleteFaces(params, function (err, data) {
  if (err) {
    console.error("Error deleting faces:", err);
  } else {
    console.log("Faces deleted successfully:");
    console.log(JSON.stringify(data, null, 2));
  }
});