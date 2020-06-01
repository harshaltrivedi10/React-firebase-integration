const functions = require('firebase-functions');
const admin = require('firebase-admin');

// populates with all the necessary credentials when hosted on gcloud
admin.initializeApp(functions.config().firebase);

const firestore = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!');
});

exports.getAllPosts = functions.https.onRequest(async (request, response) => {
  const snapshot = await firestore.collection('posts').get();
  const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  response.json({ posts });
});

exports.sanitizeContent = functions.firestore
  .document('posts/{postId}')
  .onWrite(async (change) => {
    if (!change.after.exists) return;

    const { content, sanitized } = change.after.data();
    if (content && !sanitized) {
      return change.after.ref.update({
        content: content.replace(/CoffeeScript/g, '**********'),
        sanitized: true
      });
    }
    return null;
  });
