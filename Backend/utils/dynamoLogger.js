const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient({ region: process.env.AWS_REGION });

module.exports = async function logAttendance(userId) {
  try {
    if (!process.env.DYNAMO_TABLE) {
      throw new Error('DYNAMO_TABLE is not defined in environment variables');
    }

    const params = {
      TableName: process.env.DYNAMO_TABLE,
      Item: {
        user_id: userId,
        timestamp: new Date().toISOString(),
      },
    };

    await dynamodb.put(params).promise();
    console.log("Attendance logged successfully");
  } catch (err) {
    console.error("Error logging attendance:", err);
    throw err;  // Rethrow so it can be handled in the main route
  }
};
      