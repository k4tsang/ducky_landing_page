// Function to show the confirmation step
function showConfirmationStep(email, occupation) {
  // Hide the form
  document.getElementById('signup-form').style.display = 'none';

  // Show the confirmation message
  let confirmationMessage = document.createElement('p');
  confirmationMessage.textContent = `Thank you for joining the waitlist!
  You'll be in our beta shortly.`;
  document.querySelector('.form-wrapper').appendChild(confirmationMessage);
}

function addUserToDatabase(email, occupation) {
  // Replace 'YOUR_FIREBASE_CLOUD_FUNCTION_URL' with the URL of your deployed Firebase Cloud Function
  const cloudFunctionURL = 'https://us-central1-ducky-498d0.cloudfunctions.net/api';

  // Make a POST request to the Firebase Cloud Function
  fetch(cloudFunctionURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, occupation })
  })
    .then((response) => {
      if (response.ok) {
        console.log('User added to the database successfully.');
        // Handle success if needed
      } else {
        console.error('Failed to add user to the database.');
        // Handle error if needed
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle error if needed
    });
}

// Typing animation in header

var words = ["balance.", "growth.", "success.", "goals.", "leadership.", "burnout.",]; // list of words
var wordIndex = 0;
var charIndex = 0;
var typingElement = document.getElementById("typing");
var typingText = words[wordIndex];

// type a word
function type() {
  if(charIndex < typingText.length) {
    typingElement.textContent += typingText.charAt(charIndex);
    charIndex++;
    setTimeout(type, 200); // speed of typing
  } else {
    // switch to deleting after a word is completely typed
    setTimeout(deleteWord, 2000); // wait for a while before deleting
  }
}

// delete a word
function deleteWord() {
  if(charIndex > 0) {
    typingElement.textContent = typingText.slice(0, charIndex-1);
    charIndex--;
    setTimeout(deleteWord, 100); // speed of deleting
  } else {
    // switch to next word
    wordIndex = (wordIndex + 1) % words.length;
    typingText = words[wordIndex];
    
    // switch to typing after a word is completely deleted
    setTimeout(type, 200);
  }
}

// start typing
type();
