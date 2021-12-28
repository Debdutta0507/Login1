import React from 'react'
import { useState } from 'react';
import Button from '@mui/material/Button';
import { ToastContainer} from 'react-toastify';
import { Link } from 'react-router-dom';





export default function Pass({ forgotPassword }) {
    const [state, setstate] = useState("")


    return (
        <div className="UserInformation">
            <h1> User Information </h1>
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


            <div className="InfoBox">
                <h3> Email Address</h3>

                <input type="text" onChange={e => {
                    setstate(e.target.value)
                    console.log(typeof (state))
                }} />
                <Button variant="contained" onClick={() => {
                    forgotPassword(state.toString())
                    console.log("calling" + state)
                }}>Submit</Button>
            </div>
            <div>
                Want to Login ? <Link to="/login">Login</Link>
            </div>

        </div>
    )
}
