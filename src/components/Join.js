import React, {useState, useEffect} from 'react'
import {db, auth, provider } from '../Firebase/Firebase'

const Join = () => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        if(!user){
            signInWithGoogle();
        }
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
    }, [user]);

    const signInWithGoogle = () => {
        auth
        .signInWithPopup(provider)
        .then((res) => {
        // console.log(res);
        })
        .catch((err) => {
        console.log(err);
        });
    };

    return (
        <div>
            {user? <div>you need to login</div> : <div>already logged in</div>}
        </div>
    )
}

export default Join
