import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Button from '@mui/material/Button';
import { db } from '../config/fire';


import {collection, query, where, doc, setDoc, Timestamp, getDocs } from "firebase/firestore";


export default function Home({ LogOut }) {
    const navigate = useNavigate();
    let authToken = sessionStorage.getItem('Auth Token')
    const [example, setExample] = useState({ id: "", name: "", company: "", empid: "", email: "", tech: "", salary: "" });
    let data=[];
    let tab;
    const getdata= async () => {
        const querySnapshot = await getDocs(collection(db, "Employee"));
        querySnapshot.forEach((doc) => {
            console.log("inside retriving");
            // doc.data() is never undefined for query doc snapshots
            
            console.log(doc.id, " => ", doc.data());
            data=[
                ...data,doc.data()
            ];
            console.log(data);
            
           
          })
          
        }


    useEffect(() => {
        console.log("onload" + authToken);


        if (authToken) {
            navigate('/home')
          getdata();
          tab=data.forEach(p=>{
            <div>
                <table>
                        <tr>
                            <th>id</th>
                            <th>Name</th>
                            <th>Company</th>
                            <th>Empid</th>
                            <th>Email</th>
                            <th>Technology</th>
                            <th>Salary</th>
                        </tr>
                        <tr> 
                          <th>p.id</th>
                          <th>p.name</th>
                          <th>p.company</th>
                          <th>p.empid</th>
                          <th>p.email</th>
                          <th>p.tech</th>
                          <th>p.salary</th>
                        </tr>
    
                      
                 </table>
    
            </div>
    
    
        })

        }
        if (authToken === "signed-out" || (!authToken)) {
            navigate('/login')
        }
    }, [])
    const submit = async () => {

        await setDoc(doc(db, "Employee",example.id), example).then(response => {
            console.log("done");
            setExample({ id: "", name: "", company: "", empid: "", email: "", tech: "", salary: "" })
        }

        )



    }
     

    return (
        
        <>
        {tab}

      
            
     
            <div>
                <table>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Company</th>
                        <th>Empid</th>
                        <th>Email</th>
                        <th>Technology</th>
                        <th>Salary</th>
                    </tr>
                    <tr>
                        <td>
                            <input type="number" id="lname" name="lname" value={example.id} onChange={(e) => { setExample({ ...example, id: e.target.value }) }} />
                        </td>
                        <td>
                            <input type="text" placeholder="Name" id="lname" name="lname" value={example.name} onChange={(e) => { setExample({ ...example, name: e.target.value }) }} />
                        </td>
                        <td>
                            <input type="text" id="lname" placeholder="Company Name" name="lname" value={example.company} onChange={(e) => { setExample({ ...example, company: e.target.value }) }} />

                        </td>

                        <td>
                            <input type="text" id="lname" name="lname" placeholder="Company EmpId" value={example.empid} onChange={(e) => { setExample({ ...example, empid: e.target.value }) }} />

                        </td>
                        <td>
                            <input type="text" id="lname" name="lname" placeholder="Company Email" value={example.email} onChange={(e) => { setExample({ ...example, email: e.target.value }) }} />
                        </td>
                        <td>
                            <input type="text" id="lname" name="lname" placeholder="Technology" value={example.tech} onChange={(e) => { setExample({ ...example, tech: e.target.value }) }} />
                        </td>
                        <td>
                            <input type="text" id="lname" name="lname" placeholder="Salary" value={example.salary} onChange={(e) => { setExample({ ...example, salary: e.target.value }) }} />
                        </td>


                    </tr>
                    <tr>

                    </tr>
                </table>
            </div>
            <div className="center1">
                <Button style={{ margin: '5px' }} variant="contained" onClick={submit}>Submit</Button>
                <Button style={{ margin: '5px' }} variant="contained" onClick={LogOut}>Logout</Button>
            </div>
        </>
    )
}
