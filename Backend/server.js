const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { handleAttendance } = require('E:\\1.Honours Cloud\\Attendance_Management_System\\Backend\\routes\\attendance');  // Correct import of the function

const app = express();

app.use(bodyParser.json());  // For parsing application/json
app.use(cors());  // Enable CORS for all origins (or configure specific origins)

// Set up the POST route for attendance
app.post('/mark-attendance', handleAttendance);

const port = 3000;
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
