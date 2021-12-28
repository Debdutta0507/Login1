import * as React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function BasicButtons({ title, handleAction, val }) {
    if (val === "1") {
        return (
            <><Button variant="contained" onClick={handleAction}>{title} </Button>
            <div>
                Do you have a account ? 
                <Link to="/register">Want to Signup</Link>
            </div>
            <div>
                Forgot Password? <Link to="/fpass">Click here</Link>
            </div>
            </>
        )
    }
    else {
        return (
            <>
                <Button variant="contained" onClick={handleAction}>{title} in</Button>
                
                <div>
                    Already Have a account ? <Link className='text-link' to='/login'>Want to Login</Link>
                </div>
            </>
        )

    }

}