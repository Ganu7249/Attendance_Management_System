const AWS = require('aws-sdk'); 
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const s3 = new AWS.S3({ region: process.env.AWS_REGION });
const rekognition = new AWS.Rekognition({ region: process.env.AWS_REGION });
const BUCKET = process.env.S3_BUCKET_NAME;
const COLLECTION_ID = process.env.REKOGNITION_COLLECTION;

// Import logAttendance function from dynamologger.js
const logAttendance = require('E:\\1.Honours Cloud\\Attendance_Management_System\\Backend\\utils\\dynamoLogger');

// Upload image buffer to S3
async function uploadToS3(buffer, fileName) {
  const params = {
    Bucket: BUCKET,
    Key: `captured/${fileName}`,
    Body: buffer,
    ContentType: 'image/jpeg',
  };
  await s3.putObject(params).promise();
  return `captured/${fileName}`;
}

// Search for matching face
async function recognizeFace(s3Key) {
  const params = {
    CollectionId: COLLECTION_ID,
    Image: {
      S3Object: {
        Bucket: BUCKET,
        Name: s3Key
      }
    },
    MaxFaces: 1,
    FaceMatchThreshold: 90
  };

  const result = await rekognition.searchFacesByImage(params).promise();
  if (result.FaceMatches.length > 0) {
    const matchedUser = result.FaceMatches[0].Face.ExternalImageId;  // Ensure this returns the correct user ID
    return matchedUser;
  }
  return null;
}

// Handle attendance logic
async function handleAttendance(req, res) {
  try {
    const imageBuffer = Buffer.from(req.body.imageBase64.split(',')[1], 'base64');
    const fileName = `${Date.now()}.jpg`;

    // 1. Upload to S3
    const s3Key = await uploadToS3(imageBuffer, fileName);

    // 2. Recognize face
    const matchedUser = await recognizeFace(s3Key);

    if (matchedUser) {
      // 3. Log attendance
      await logAttendance(matchedUser);
      res.json({ success: true, message: `✅ Welcome, ${matchedUser}! Attendance logged.` });
    } else {
      res.json({ success: false, message: `❌ Face not recognized.` });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
}

// Export the handler for the route
module.exports = { handleAttendance };
