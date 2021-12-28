import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "./Button"
import { Link } from 'react-router-dom';
import { Form } from "react-bootstrap";

export default function BasicTextFields({ title, handleAction, setPassword, setEmail, val }) {
    return (
        <div className="box">
            <h2 className="center">
               
                    {title} Form
            </h2>
                
            

           <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
            <TextField type="email"   margin="dense"  id="email" label="Enter the Email" variant="outlined"
            onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
            <TextField type="password"   margin="dense"  id="password" label="Enter the Password" variant="outlined"
            onChange={(e) => setPassword(e.target.value) }/>
            </div>
        </Box>

        <Button val={val} title={title} handleAction={handleAction} /> 
        </div>
    );
}