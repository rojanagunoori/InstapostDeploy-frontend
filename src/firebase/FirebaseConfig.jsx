
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {doc, getFirestore, setDoc} from "firebase/firestore"
import {getAuth, onAuthStateChanged} from "firebase/auth"
import {getStorage} from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNoPP_O_58Q7qO9uMXZRHq9bsuF00y7ZE",
  authDomain: "mypost-5b4a3.firebaseapp.com",
  projectId: "mypost-5b4a3",
  storageBucket: "mypost-5b4a3.appspot.com",
  messagingSenderId: "245911732428",
  appId: "1:245911732428:web:08023986f52f1a1b384269"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDb=getFirestore(app)
const auth=getAuth(app)
const storage=getStorage(app)

onAuthStateChanged(auth, async (user) => {
  console.log("first ",user)
  if (user) {
    console.log("users ",user)
    const userRef = doc(fireDb, 'users', user.uid);
    console.log("userRef",userRef)
    await setDoc(userRef, {
      uid: user.uid,
      name: user.displayName || "No name provided",
      email: user.email || "No email provided",
    }, { merge: true });
  }
});
const handleSignup = async (email, password, name) => {
  try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
     // await updateUserProfile(user, name, null); // Set name, photoURL can be added if needed
     await updateProfile(user, { displayName: name });
      await setDoc(doc(fireDb, "users", user.uid), {
        name: name,
        email: email,
        uid: user.uid // Storing user ID as well
      });
      console.log("User signed up and profile updated");
  } catch (error) {
      console.error("Error signing up", error);
  }
};

export {fireDb,auth,storage,handleSignup}
