import { 
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    signOut,
    onAuthStateChanged
 } from "firebase/auth";

import { useState, useContext, createContext, useEffect } from "react";
import { auth } from "../firebaseConfig";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log("User:", currentUser);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const logOut = () => {
        signOut(auth); 
    }

    return (
        <AuthContext.Provider value={{ googleSignIn, logOut, user}}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
}