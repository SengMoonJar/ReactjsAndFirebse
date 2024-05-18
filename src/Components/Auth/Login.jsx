// import { collection, query, where, getDocs } from "firebase/firestore";
// import db from "../../config/fbconfig";
import {  useState } from "react";
import { Navigate} from "react-router";
import { AuthContext, useAuth } from "../Context/AuthContext";
import { doSignInWithEmailPassword, doSignInWithGoogle } from "../firebase/auth";

const Login = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userSignIn,setUserSignIn] = useState(false);
  const [error,setError] = useState('');
  const {userLogin} = useAuth();
  console.log("userLogin",userLogin)
//  const value = useContext(AuthContext);
//  console.log('value',value)
  const logInHandler = async (e) => {
    e.preventDefault(); // Prevent form submission
    if( userEmail && userPassword){
      try{
        if (!userSignIn){
          setUserSignIn(true);
          await doSignInWithEmailPassword(userEmail,userPassword);
         }
      }
      catch(e){
        setError(e);
      }
      
       
    }
    else{
      setError('Enter valid email and password');
    }
   

    // const usersRef = collection(db, "Auth");
    // const q = query(usersRef, where('Email', '==', userEmail));

    // try {
    //   const snapshot = await getDocs(q);
    //   if (!snapshot.empty) {
    //     snapshot.forEach((doc) => {
    //       const userData = doc.data();
    //       if (userData.Password === userPassword) {
    //         alert('Login successfully');
    //       } else {
    //         alert('Incorrect password');
    //       }
    //     });
    //   } else {
    //     alert('User not found');
    //   }
    // } catch (error) {
    //   alert('Error logging in: ' + error.message);
    // }

    setUserEmail('');
        setUserPassword('');
  }
  // const signInwithGoogle = (e)=>{
  //   e.preventDefault();
  //   if(!userSignIn){
  //     setUserSignIn(true);
  //     doSignInWithGoogle(userEmail,userPassword).catch(err=>{
  //       setUserSignIn(false);
  //     })
  //   }
  // }

  return (
    <div className="container">
      {
      userLogin &&( <Navigate  to={'/home'} replace={true}/>)
      }
      <form onSubmit={logInHandler}>
        <h4>Welcome to Expense!</h4>
        <div className="form_controls">
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />

        </div>
        <div className="form_controls">
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </div>
        {error && (<h6 style={{
          padding:'3',
          fontSize:'10',
          color:'darkred'
        }}>{error}</h6>)}
        <p>Don't have an account? <a className="link_text" href="/signup">Sign Up</a></p>
        <button type="submit" className='form_btn'>Log In</button>
      </form>
    </div>
  )
}

export default Login;
