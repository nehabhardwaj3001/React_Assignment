import React, { useState } from 'react'
import "./Login.css"
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [details, setdetails] = useState({name: "", email: "", password: ""});
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(details);
        navigate('/Home');
    }



  return (
    <div className='form-container'>
    <form onSubmit={submitHandler}>
            <h2>Login</h2>
            <div className='form-group'>
                <label htmlFor='name'>Name :</label>
                <input type="text"  name="name" id="name" onChange={e => setdetails({...details, name: e.target.value})} value={details.name} />
            </div>
            <div className='form-group'>
                <label htmlFor='email'>Email :</label>
                <input type="email" name="email" id="email" onChange={e => setdetails({...details, email: e.target.value})} value={details.email} />
            </div>
            <div className='form-group'>
                <label htmlFor='password'>Password :</label>
                <input type="password" name="password" id="password" onChange={e => setdetails({...details, password: e.target.value})} value={details.password}/>
            </div>
            <button type='submit'>Login</button>
    </form>
    </div>
  )
}

export default Login;
