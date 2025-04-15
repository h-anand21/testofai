// Elements
const questionInput = document.getElementById("question");
const askButton = document.getElementById("ask-btn");
const answerElement = document.getElementById("answer");
const startRecordingButton = document.getElementById("start-recording");
const stopRecordingButton = document.getElementById("stop-recording");
const recordingStatus = document.getElementById("recording-status");
const imageForm = document.getElementById("image-form");
const extractedText = document.getElementById("extracted-text");
const imageResults = document.getElementById("image-results");

// Variables for recording
// let mediaRecorder;
// let audioChunks = [];

// Ask question with text

askButton.addEventListener("click", async function () {
  const question = questionInput.value.trim();

  if (!question) {
    alert("Please enter a question");
    return;
  }

  // Show loading state
  answerElement.textContent = "Thinking...";
  imageResults.style.display = "none";

  try {
    const response = await fetch("http://localhost:8000/api/v1/chat/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    const data = await response.json();
    answerElement.textContent = data.response;
  } catch (error) {
    answerElement.textContent =
      "Error: Could not get an answer. Please try again.";
    console.error("Error:", error);
  }
});

// Voice recording functionality
// startRecordingButton.addEventListener('click', async function() {
//     try {
//         const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

//         mediaRecorder = new MediaRecorder(stream);
//         audioChunks = [];

//         mediaRecorder.addEventListener('dataavailable', event => {
//             audioChunks.push(event.data);
//         });

//         mediaRecorder.addEventListener('stop', async () => {
//             // Create blob from audio chunks
//             const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });

//             // Upload the audio for transcription
//             const formData = new FormData();
//             formData.append('audio', audioBlob);

//             // Show processing state
//             recordingStatus.textContent = 'Processing audio...';

//             try {
//                 const response = await fetch('/transcribe-audio', {
//                     method: 'POST',
//                     body: formData
//                 });

//                 const data = await response.json();

//                 if (data.transcription) {
//                     questionInput.value = data.transcription;
//                     recordingStatus.textContent = 'Transcribed: ' + data.transcription;

//                     // Automatically ask the question
//                     askButton.click();
//                 } else if (data.error) {
//                     recordingStatus.textContent = 'Error: ' + data.error;
//                 }
//             } catch (error) {
//                 recordingStatus.textContent = 'Error processing audio. Please try again.';
//                 console.error('Error:', error);
//             }

//             // Reset recording UI
//             startRecordingButton.disabled = false;
//             stopRecordingButton.disabled = true;
//         });

//         // Start recording
//         mediaRecorder.start();
//         startRecordingButton.disabled = true;
//         stopRecordingButton.disabled = false;
//         recordingStatus.textContent = 'Recording... Speak clearly.';

//     } catch (error) {
//         alert('Could not access microphone. Please make sure you have a microphone and have granted permission.');
//         console.error('Error:', error);
//     }
// });

// stopRecordingButton.addEventListener('click', function() {
//     if (mediaRecorder && mediaRecorder.state !== 'inactive') {
//         mediaRecorder.stop();
//         recordingStatus.textContent = 'Recording stopped. Processing...';
//     }
// });

// // Image upload and processing
// imageForm.addEventListener('submit', async function(e) {
//     e.preventDefault();

//     const imageFile = document.getElementById('image-upload').files[0];
//     const imageQuestion = document.getElementById('image-question').value || 'Help me understand this';

//     if (!imageFile) {
//         alert('Please select an image to upload');
//         return;
//     }

//     // Show loading state
//     answerElement.textContent = 'Processing image...';

//     const formData = new FormData();
//     formData.append('image', imageFile);
//     formData.append('question', imageQuestion);

//     try {
//         const response = await fetch('/process-image', {
//             method: 'POST',
//             body: formData
//         });

//         const data = await response.json();

//         if (data.error) {
//             answerElement.textContent = 'Error: ' + data.error;
//             imageResults.style.display = 'none';
//         } else {
//             // Display the results
//             answerElement.textContent = data.answer;
//             extractedText.textContent = data.extracted_text;
//             imageResults.style.display = 'block';
//         }
//     } catch (error) {
//         answerElement.textContent = 'Error processing image. Please try again.';
//         imageResults.style.display = 'none';
//         console.error('Error:', error);
//     }
// });
