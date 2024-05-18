import { useState } from 'react';
import './authStyle.css';
// import db from '../../config/fbconfig';
// import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from '../Context/AuthContext';
import { Navigate } from 'react-router';
import { doCreateUserWithEmailPassword } from '../firebase/auth';
const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const dbref = collection(db, "Auth");
    const [error,setError] = useState('');
    const [register,setRegister] = useState(false);
   const {userLogin} = useAuth();
    const signUpHandler = async (e) => {
        e.preventDefault(); // Prevent default form submission
        if(!register){
            console.log('user', email,password);
            setRegister(true);
            await doCreateUserWithEmailPassword(email,password);
            setError('Successfully signed up');
        }
        else{
            setError( 'already exist');
        }
        // try {
        //     const matchEmail = query(dbref, where('Email', '==', email));
        //     const snapshot = await getDocs(matchEmail);

        //     if (!snapshot.empty) {
        //         alert('Email already exists.');
        //     } else {
        //         await addDoc(dbref, { Email: email, Password: password });
        //         alert('Successfully signed up.');
        //     }
        // } catch (error) {
        //     alert('Error signing up: ' + error.message);
        // }
        setEmail('');
        setPassword('');
    }

    return (
        <div className="container">
            {userLogin && (<Navigate to={'/'} replace={true}/>)}
            
            <form onSubmit={signUpHandler}>
                <h4>Welcome to Expense!</h4>
                <div className="form_controls">
                    <input type="email" value={email} placeholder="Email Address"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form_controls">
                    <input type="password" value={password} placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <p>Already have an account? <a className="link_text" href="/">LogIn</a></p>
                <button type='submit' className='form_btn'>Sign Up</button>
            </form>
        </div>
    )
}

export default Signup;
