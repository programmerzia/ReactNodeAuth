import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import validator from 'validator';
import './LoginScreen.css';

const LoginScreen =  ({history}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(undefined);
    useEffect(()=>{
        if(localStorage.getItem('authToken')){
            history.push("/");
        }
    },[history]);

    const doLogin = async (e) =>{
        e.preventDefault();
        if(!validator.isEmail(email)){
            setTimeout(()=>setError(undefined), 5000);
            setEmail("");
            setPassword("");
            return setError('Invalid E-mail Provided!');
        }
        const config = {
            headers:{"Content-Type":"application/json"}
        };
        try {
            const {data} = await axios.post('/api/auth/login', {email, password}, config);
            localStorage.setItem('authToken', data.token);
            history.push("/");
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(()=>setError(undefined), 5000);
        }
    };
    return (
        <div className="login-container">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <h2>User Login</h2>
                    {error && <span className="error">{error}</span>}
                    <form onSubmit={doLogin} autoComplete="off">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label for="email">E-mail</label>
                                    <input type="text" 
                                    className="form-control" 
                                    required 
                                    name="email" 
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label for="password">Password</label>
                                    <input type="password" 
                                    className="form-control" 
                                    required 
                                    name="password"
                                    value={password}
                                    onChange={(e)=> setPassword(e.target.value)}
                                    />
                                    <a href="/forgotpassword">Forgot password?</a>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <p className="float-left">New user? <Link to="/register">Register Now</Link></p>
                                    <input type="submit" className="btn btn-success float-right" required name="Login" value="Login" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-md-4"></div>
            </div>
        </div>
    )
}

export default LoginScreen
