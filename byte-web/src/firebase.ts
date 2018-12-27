import firebase from 'firebase'

 var config = {
  apiKey: "AIzaSyCFWYW_xzSB_b8Vj_FCvyquoFzMANqxmgU",
  authDomain: "byte-f4942.firebaseapp.com",
  databaseURL: "https://byte-f4942.firebaseio.com",
  projectId: "byte-f4942",
  storageBucket: "byte-f4942.appspot.com",
  messagingSenderId: "71673961954"
}

firebase.initializeApp(config)
firebase.firestore().settings({ timestampsInSnapshots: true })

export default firebase