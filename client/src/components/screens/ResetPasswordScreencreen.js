import React, {useState} from 'react'
import axios from 'axios';
const ResetPasswordScreencreen = ({history, match}) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(undefined);
    const [success, setSuccess] = useState(undefined);
    const resetPasswoedHandler = async (e) =>{
        e.preventDefault();
        if(password !== confirmPassword){
            setTimeout(()=>setError(undefined), 5000);
            setConfirmPassword("");
            setPassword("");
            return setError('Password does not match!');
        }
        const config = {
            headers:{"Content-Type":"application/json"}
        };
        try {
            const { data } = await axios.put(`/api/auth/resetpassword/${match.params.resetToken}`, {password}, config);
            if(data.success){
                setSuccess(data.data);
                setTimeout(()=>history.push("/"), 5000);
            }
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(()=>setError(undefined), 5000);
        }
    };
    return (
        <div>
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <h2>User Login</h2>
                    {error && <span className="error">{error}</span>}
                    {success && <span className="success-message">{success}</span>}
                    <form onSubmit={resetPasswoedHandler} autoComplete="off">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="email">Password</label>
                                    <input type="password" 
                                    className="form-control" 
                                    required 
                                    name="password" 
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input type="password" 
                                    className="form-control" 
                                    required 
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e)=> setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <input type="submit" className="btn btn-success float-right" required name="resetPassword" value="Reset Password" />
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

export default ResetPasswordScreencreen
