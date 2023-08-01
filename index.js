const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

// Initialize Firebase Admin SDK
admin.initializeApp();

const app = express();
app.use(cors({origin: true}));

// Endpoint to add a user to the database
app.post("/addUser", (req, res) => {
  const {email, occupation} = req.body;

  // Reference to the "users" collection in Firestore
  const usersCollection = admin.firestore().collection("users");

  const data = {
    email: email,
    occupation: occupation,
  };

  // Add the data to the "users" collection in Firestore
  usersCollection
      .add(data)
      .then((docRef) => {
        console.log("Document written with ID:", docRef.id);
        res.status(200).send("User added to the database successfully.");
      })
      .catch((error) => {
        console.error("Error adding document:", error);
        res.status(500).send("Failed to add user to the database.");
      });
});

// Export the API as a Firebase Cloud Function
exports.api = functions.https.onRequest(app);
