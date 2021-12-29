import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Button from '@mui/material/Button';
import { db } from '../config/fire';


import { collection, query, where, doc, setDoc, Timestamp, getDocs,deleteDoc} from "firebase/firestore";


export default function Home({ LogOut }) {
    const navigate = useNavigate();
    let authToken = sessionStorage.getItem('Auth Token')
    const [data1, setData1] = useState([]);
    const [haveData, sethaveData] = useState(false);
    const [example, setExample] = useState({ id: "", name: "", company: "", empid: "", email: "", tech: "", salary: "" });

    let tab;
    let data = [];
    const edit = () => {

    } 
    const delet=async(id)=>{
        const user=doc(db,"Employee",id);
        await deleteDoc(user).then(response=>{
            sethaveData(false);
            setData1([]);
            getdata().then(() => {

            });
            sethaveData(true);

        });


    } 
    const getdata = async () => {
        const querySnapshot = await getDocs(collection(db, "Employee"));
        querySnapshot.forEach((doc) => {
            console.log("inside retriving");
            // doc.data() is never undefined for query doc snapshots

            console.log(doc.id, " => ", doc.data());
            data = [
                ...data, doc.data()
            ]

            setData1(oldArray => [...oldArray, doc.data()]);

        })

    }


    useEffect(() => {
        console.log("onload" + authToken);
         if (authToken === "signed-out" || (!authToken)) {
            navigate('/')
        }
        



       else if (authToken) {

            getdata().then(() => {
                console.log("inside data")
                console.log(data);

                sethaveData(true);




                navigate('/home')


            })

        }
       
    }, [])
    const submit = async () => {

        await setDoc(doc(db, "Employee", example.id), example).then(response => {
            console.log("done");
            setExample({ id: "", name: "", company: "", empid: "", email: "", tech: "", salary: "" })
            sethaveData(false);
            setData1([]);
            getdata().then(() => {

            });
            sethaveData(true);

        }

        )



    }
    if (haveData === false || data1 === []) {
        return ("Loading")
    }
    else if (haveData === true) {


        return (

            <>





                <div>
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
                                <th></th>
                            </tr>

                            {data1.map((p, key) => {
                                return (



                                    <tr key={p.id}>
                                        <td>
                                            <input type="number" id="lname" name="lname" value={p.id} ></input>
                                        </td>
                                        <td>
                                            <input type="text" placeholder="Name" id="lname" name="lname" value={p.name} onChange={(e) => { setExample({ ...example, name: e.target.value }) }} />
                                        </td>
                                        <td>
                                            <input type="text" id="lname" placeholder="Company Name" name="lname" value={p.company} onChange={(e) => { setExample({ ...example, company: e.target.value }) }} />

                                        </td>

                                        <td>
                                            <input type="text" id="lname" name="lname" placeholder="Company EmpId" value={p.empid} onChange={(e) => { setExample({ ...example, empid: e.target.value }) }} />

                                        </td>
                                        <td>
                                            <input type="text" id="lname" name="lname" placeholder="Company Email" value={p.email} onChange={(e) => { setExample({ ...example, email: e.target.value }) }} />
                                        </td>
                                        <td>
                                            <input type="text" id="lname" name="lname" placeholder="Technology" value={p.tech} onChange={(e) => { setExample({ ...example, tech: e.target.value }) }} />
                                        </td>
                                        <td>
                                            <input type="text" id="lname" name="lname" placeholder="Salary" value={p.salary} onChange={(e) => { setExample({ ...example, salary: e.target.value }) }} />
                                        </td>

                                        {/* <th>{p.name}</th>
                                        <th>{p.company}</th>
                                        <th>{p.empid}</th>
                                        <th>{p.email}</th>
                                        <th>{p.tech}</th>
                                        <th>{p.salary}</th> */}
                                        <th><Button style={{ margin: '5px' }} variant="contained" onClick={edit}>Edit</Button>
                                        <Button style={{ margin: '5px' }} variant="contained" onClick={()=>{delet(p.id)}}>Del</Button></th>
                                        
                                    </tr>
                                )







                            })}
                        </table>

                    </div>

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
}

