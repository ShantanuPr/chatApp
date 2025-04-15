const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true}); // No space inside the curly braces

admin.initializeApp();

exports.storeUserData = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    const userData = req.body;

    if (!userData || !userData.uid || !userData.email || !userData.name) {
      return res.status(400).send("Invalid user data");
    }

    try {
      await admin.firestore()
          .collection("users")
          .doc(userData.uid)
          .set({
            name: userData.name,
            email: userData.email,
            uid: userData.uid,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
          }, {merge: true});

      return res.status(200).send("User data stored successfully");
    } catch (error) {
      console.error("Error storing user data:", error);
      return res.status(500).send("Internal Server Error");
    }
  });
});
