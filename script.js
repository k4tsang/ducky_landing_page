// Function to show the confirmation step
function showConfirmationStep(email, occupation) {
  // Hide the form
  document.getElementById('signup-form').style.display = 'none';

  // Show the confirmation message
  let confirmationMessage = document.createElement('p');
  confirmationMessage.textContent = `Thank you for joining the waitlist!
  We will reach out with our beta shortly.`;
  document.querySelector('.form-wrapper').appendChild(confirmationMessage);
}

// Function to add the user to the database (you should implement this function for your specific database)
function addUserToDatabase(email, occupation) {
  const firebaseConfig = {
    apiKey: "AIzaSyDO2AC2OGSERkZ33iWQVJzzPyK6M6GVp5k",
    authDomain: "ducky-498d0.firebaseapp.com",
    projectId: "ducky-498d0",
    storageBucket: "ducky-498d0.appspot.com",
    messagingSenderId: "617947101958",
    appId: "1:617947101958:web:47edf9b3b047b15d853c87",
    measurementId: "G-ZQCQZTLY3C",
  };

  firebase.initializeApp(firebaseConfig);

  // Reference to the "users" collection in Firestore
  const usersCollection = firebase.firestore().collection('users');

  let data = {
    email: email,
    occupation: occupation
  };

  // Add the data to the "users" collection in Firestore
  usersCollection.add(data)
    .then((docRef) => {
      console.log('Document written with ID:', docRef.id);
      // Add any success handling here if needed
    })
    .catch((error) => {
      console.error('Error adding document:', error);
      // Add error handling here if needed
    });
}

// Add the event listener outside the function
document.getElementById('signup-form').addEventListener('submit', function (event) {
  event.preventDefault();

  let email = document.getElementById('email').value;
  let occupation = document.getElementById('occupation').value;

  // Show the confirmation step after the form submission
  showConfirmationStep(email, occupation);

  // Add the user to the database
  addUserToDatabase(email, occupation);
});

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
