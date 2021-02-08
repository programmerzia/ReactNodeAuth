import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import './RegisterScreen.css';
const RegisterScreen = ({history}) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(undefined);
    useEffect(()=>{
        if(localStorage.getItem('authToken')){
            history.push("/");
        }
    },[history]);
    const registerHandler = async (e) => {
        e.preventDefault();
        if(password !== confirmpassword){
            setTimeout(()=>{setError(undefined)}, 5000);
            setPassword("");
            setConfirmPassword("");
            return setError("Password does not match!");
        }
        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        };
        try {
            const { data } = await axios.post('/api/auth/register', {username, email, password}, config);
            localStorage.setItem('authToken', data.token);
            history.push("/");
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(()=>{setError(undefined)}, 5000);
        }
        

    }
    return (
        <div className="register-screen">
            <div className="row">
                <div className="col-md-12">
                    <h2>New User Registration</h2>
                    { error && <span className="error-message">{error}</span>}
                </div>
            </div>
            <form className="register-screen__form" autoComplete="off" onSubmit={registerHandler}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label for="username">Username</label>
                            <input type="text" 
                            className="form-control" 
                            required name="username"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e)=>setUsername(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label for="email">E-mail</label>
                            <input type="text"
                            className="form-control" 
                            required 
                            name="email" 
                            placeholder="Enter email"
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
                            placeholder="Enter password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label for="confirmpassword">Confirm Password</label>
                            <input type="password" 
                            className="form-control" 
                            required 
                            name="confirmpassword" 
                            placeholder="Retype password"
                            value={confirmpassword}
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <p className="float-left">Already registerd? <Link to="/login">Login Now</Link></p>
                            <input type="submit" className="btn btn-success float-right" required name="Register" value="Register" />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default RegisterScreen
