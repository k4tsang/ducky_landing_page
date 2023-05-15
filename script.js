// Allow users to sign up with email and occupation

document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let email = document.getElementById('email').value;
    let occupation = document.getElementById('occupation').value;

    let data = {
        email: email,
        occupation: occupation
    };

    fetch('https://your-url.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => {
        console.error('Error:', error);
    });
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
