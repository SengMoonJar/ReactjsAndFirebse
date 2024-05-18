import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup} from "firebase/auth"
import { auth } from "../../config/fbconfig";
import { GoogleAuthProvider } from "firebase/auth/cordova";

export const doCreateUserWithEmailPassword =async (email,password)=>{
 return createUserWithEmailAndPassword(auth,email,password);
}
export const doSignInWithEmailPassword =(email,password)=>{
    return signInWithEmailAndPassword(auth,email,password);
}
export const doSignInWithGoogle =async () =>{
    const provider =new GoogleAuthProvider();
   const result = await signInWithPopup(auth,provider);
   return result;
}
export const doSignOut = ()=>{
    return auth.signOut();
}
// export const doResetEmail = (email)=>{
//     return sendPasswordResetEmail(email);
// }
// export const doPasswordChange =(password)=>{
//     return updatePassword(auth.currentUser,password);
// }
// export const doSendEmailVerificationMail =()=>{
//     return sendEmailVerification(auth.currentUser,{
//         url:`${window.location.origin}/home`
//     })
// }