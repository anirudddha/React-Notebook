import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Signup(props) {
    const [credentials,setCredentials] = useState({name:"",email: "",password:"",cpassword:""})
    let history = useNavigate();

    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]: e.target.value});
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const {name,email,password,cpassword} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createUser", {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name,email,password}), // body data type must match "Content-Type" header

        });
        const json = await response.json();
        console.log(json);
        if(json.succes){
            // save the auth toke and redirect
            localStorage.setItem('token',json.authtoken);
            history("/");
            props.showAlert("Account Created Succesfully","succes")
        }
        else{
            props.showAlert("Invalid Credentials","danger")
        }
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} required minLength={5}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} required minLength={5} />
                </div>
                
                <button type="SignUp" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
