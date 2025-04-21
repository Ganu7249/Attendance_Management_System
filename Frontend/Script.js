var video = document.getElementById('Video');
var canvas = document.getElementById('canvas');
var result = document.getElementById('result');
var captureBtn = document.getElementById('captureBtn');

// Start webcam stream
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    console.error("Camera access denied:", err);
    alert("Please allow camera access.");
  });

// Capture & Send image
captureBtn.addEventListener('click', () => {
  const context = canvas.getContext('2d');
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageData = canvas.toDataURL('image/jpeg');
  console.log("Captured image data:", imageData); // Log the image data


  fetch('http://localhost:3000/mark-attendance', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageBase64: imageData })
  })
  
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      result.textContent = data.message;
    } else {
      result.textContent = `❌ ${data.message || 'Face not recognized'}`;
    }
  })
  .catch(err => {
    console.error('Error:', err);
    result.textContent = '❌ Server error occurred';
  });
});
