import logo from './logo.svg';
import './App.css';
import Forms from "./componets/Forms";
import 'react-toastify/dist/ReactToastify.min.css';


import { useToast } from 'react-toastify';

import Pass from "./componets/Pass";
import { ToastContainer} from 'react-toastify';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { fire } from './config/fire';
import Home from "./componets/Home";
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import {
  BrowserRouter as Router,
  Routes,
  Route, useNavigate
} from "react-router-dom";
import { useState } from 'react';




function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const authentication = getAuth();
  const handleAction = (id) => {
    console.log(id);
    ;
    if (id === 1) {
      signInWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          console.log(response)

          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
          navigate('/home')
        })
        .catch((error) => {
          console.log(error.code)
          if (error.code === 'auth/wrong-password') {
            
            toast.error('Please check the Password', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
          }
          if (error.code === 'auth/user-not-found') {
            toast.error('Please check the Email', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
          }
        })
    }
    if (id === 2) {
      createUserWithEmailAndPassword(authentication, email, password)
        .then(response => {
          console.log(response);
          
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
          navigate('/home');
        })
        .catch((error) => {
          console.log(error);
          if (error.code === 'auth/email-already-in-use') {
          
            toast('Email Already in Use', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
          }


        }

        )
    }
  }
  const forgotPassword = (Email) => {
    sendPasswordResetEmail(authentication, Email,
      { url: 'http://localhost:3000/login', })
      .then(function () {
        
        toast('🦄 Please check your email...', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });

      }).catch(function (error) {
        console.log(error.message)
        toast.error(` ${error.code}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });


      })
  }
  const LogOut = () => {
    signOut(authentication).then((response) => {

      console.log("Inside log out");
      navigate('/login')
      sessionStorage.setItem("Auth Token", "signed-out");

    }

    )

  }

  return (

    <div className="App">
      <>
      <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        

        <Routes>
        <Route path='/' element={<Forms setEmail={setEmail}
            setPassword={setPassword}
            handleAction={() => handleAction(1)}
            title="Login"
            val="1" />} />
          <Route path='/login' element={<Forms setEmail={setEmail}
            setPassword={setPassword}
            handleAction={() => handleAction(1)}
            title="Login"
            val="1" />} />
          <Route path='/register' element={<Forms
            setEmail={setEmail}
            setPassword={setPassword}
            handleAction={() => handleAction(2)}
            title="Register"
            val="2" />} />
          <Route
            path='/home'
            element={
              <Home LogOut={LogOut} />}

          />
          <Route
            path='/fpass'
            element={
              <Pass forgotPassword={forgotPassword} />}

          />

        </Routes>

      </>


    </div>

  );
}


export default App;
