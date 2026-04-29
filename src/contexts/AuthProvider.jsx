import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useEffect, useState, } from 'react';
import { auth } from '../firebase/firebase.init';
import { AuthContext } from './AuthContext'
import { signOut } from "firebase/auth";
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

     const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
     }

     const signUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
     }
     
      const signInWithGoogle = () => {
                 setLoading(true)
          return signInWithPopup(auth, googleProvider);
      }
      
      const signOutUser = () => {
        setLoading(true);
        return signOut(auth)

      }
     useEffect( () => {
       const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false)
       })
       
       return () => {
        unsubscribe();
       }
     }, [])

     const authInfo = {
       createUser,
       signUser,
       signInWithGoogle,
       signOutUser,
       user,
       loading
     }
    return (
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
    );
};

export default AuthProvider;