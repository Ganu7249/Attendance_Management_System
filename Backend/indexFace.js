const AWS = require('aws-sdk');
require('dotenv').config();

const rekognition = new AWS.Rekognition({ region: process.env.AWS_REGION });

const BUCKET = process.env.S3_BUCKET_NAME;
const COLLECTION_ID = process.env.REKOGNITION_COLLECTION;

// Assume you have an array of objects like this:
const employeeDataList = [
    { s3Key: 'known/Akash.jpg', employeeId: 'Akash' },
    { s3Key: 'known/Anushka.jpg', employeeId: 'Anushka' },
    { s3Key: 'known/Ashutosh.jpg', employeeId: 'Ashutosh' },
    { s3Key: 'known/Atharv.jpg', employeeId: 'Atharv' },
    { s3Key: 'known/Avishkar.jpg', employeeId: 'Avishkar' },
    { s3Key: 'known/Ganesh.jpg', employeeId: 'Ganesh' },
    { s3Key: 'known/Jaid.jpg', employeeId: 'Jaid' },
    { s3Key: 'known/Kshitij.jpg', employeeId: 'Kshitij' },
    { s3Key: 'known/Satyajeet.jpg', employeeId: 'Satyajeet' },
    { s3Key: 'known/Shravani.jpg', employeeId: 'Shravani' },
    { s3Key: 'known/Shrikant.jpg', employeeId: 'Shrikant' },
    { s3Key: 'known/Shubham.jpg', employeeId: 'Shubham' },
    { s3Key: 'known/Vimal.jpg', employeeId: 'Vimal' },
    { s3Key: 'known/Yash.jpg', employeeId: 'Yash' },
    // ... more entries
];

async function indexFacesFromList() {
    try {
        for (const employeeData of employeeDataList) {
            const params = {
                CollectionId: COLLECTION_ID,
                Image: {
                    S3Object: {
                        Bucket: BUCKET,
                        Name: employeeData.s3Key
                    }
                },
                ExternalImageId: employeeData.employeeId,
                DetectionAttributes: ['ALL']
            };

            await rekognition.indexFaces(params).promise();
            console.log(`✅ Indexed face for: ${employeeData.employeeId} (S3 Key: ${employeeData.s3Key})`);
        }

        console.log("✅ Finished indexing faces from the list.");

    } catch (error) {
        console.error("❌ Error indexing faces:", error);
    }
}

indexFacesFromList();