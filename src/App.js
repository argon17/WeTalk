import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Application from './components/Application';
import { auth, db } from "./Firebase/Firebase";

function App() {
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              console.log("user already exists.");
            } else {
              const details = {
                name: user.displayName,
                displayName: user.displayName.split(" ")[0],
                imgURL: user.photoURL,
                email: user.email,
                uid: user.uid,
                channels: []
              };
              db.collection("users")
                .doc(user.uid)
                .set(details)
                .then((res) => {
                  console.log("new user created");
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          })
          .catch((err) => {
            console.log(err);
          });

        setUser(user.uid);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <div className="App" >
      {user ? <Application uid={user} /> : <Login />}
    </div>
  );
}

export default App;