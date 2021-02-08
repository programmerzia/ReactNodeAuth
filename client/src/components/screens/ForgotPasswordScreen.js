import React, {useState} from 'react'
import axios from 'axios';
const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(undefined);
    const [error, setError] = useState(undefined);
    const forgotPasswordHandler = async (e)=>{
        e.preventDefault();
        const config = {
            header:{"Content-Type":"applcation/json"}
        };
        setLoading(true);
        try {
            const { data } = await axios.post('/api/auth/forgotpassword', { email }, config);
            setSuccess(data.success);
            setLoading(data.data);
            setTimeout(()=>setLoading(undefined), 5000);
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(()=>setError(undefined), 5000);
        }
    }
    return (
        <div className="row">
            <div className="col-md-12">
                <form onSubmit={forgotPasswordHandler}>
                    <div className="row">
                        <div className="col-md-4"></div>
                        <div className="col-md-4">
                            {loading && 'Sending email...'}
                            <div className="row">
                                <div className="col-md-12">
                                    <p>Please enter your email bellow which is used to create your account in order to get password reset link</p>
                                    <div className="form-group">
                                        <input type="email" className="form-control" required placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            {error}
                            {success && <p>E-mail has been sent to {email} with the password reset link. Please check your spam folder if you cant find it in your inbox</p>}
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <input type="submit" value="Send Email" className="btn btn-success" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4"></div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgotPasswordScreen
