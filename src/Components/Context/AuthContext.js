import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../config/fbconfig";
import { onAuthStateChanged } from "firebase/auth";
import React from "react";
export const AuthContext= React.createContext();
export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}) {

    const [currentUser,setCurrentUser] = useState(null);
    const [userLogin,setUserLogin] = useState(false);
    const [loading,setLoading] = useState(false);
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,initializeApp);
        return unsubscribe;
    },[]);

    const initializeApp  = (user)=>{
        if (user){
            setCurrentUser({...user});
            setUserLogin(true);
        }
        else{
            setUserLogin(false);
        }
        setLoading(false);
    }
    const value={
        userLogin,
        currentUser,
        loading
    }
    console.log('value',value)
    return (
        < AuthContext.Provider  value={value}>
            {!loading && children}
        </ AuthContext.Provider>
    )
}