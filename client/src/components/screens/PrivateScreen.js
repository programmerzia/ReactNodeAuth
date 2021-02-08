// import axios from 'axios';
import React, {useState, useEffect} from 'react'
import {NavLink} from 'react-router-dom';
const PrivateScreen = ({history}) => {
const [error, setError] = useState(undefined);
// const [privateData, setPrivateData] = useState("");

    useEffect(()=>{
        if(!localStorage.getItem('authToken')){
            history.push("/login");
        }
        // const fetchData = async ()=>{
        //     const config = {
        //         headers:{
        //             "Content-Type":"application/json",
        //             Authorization: `Bearer ${localStorage.getItem('authToken')}`
        //         }
        //     };
            
        //     try {
        //         const {data} = await axios.get("/api/auth/private", config);
        //         setPrivateData(data.message);
        //     } catch (error) {
        //         setError('Unauthorized access detected!');
        //         localStorage.removeItem('authToken');
        //         setTimeout(()=>setError(undefined), 5000);
        //     }
        // };
        // fetchData();
    },[history]);
    const logoutHandler = () => {
        localStorage.removeItem('authToken');
        setError("You are now logging out...!");
        setTimeout(()=>history.push("/login"), 5000);
    };
    return (
        <div className="DashboardContainer">
            {error && <p>{error}</p>}
            <div className="sidebar">
                <ul>
                    <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
                    <li><NavLink exact to="add-employee" activeClassName="active">Add Employee</NavLink></li>
                    <li><NavLink exact to="employee-list" activeClassName="active">Employee List</NavLink></li>
                    <li><a href="#" onClick={ logoutHandler }>Logout</a></li>
                </ul>
            </div>
            <div className="main-content">
                {/* <Router>
                    <Switch>
                        <Route exact to="add-employee" component={AddForm} />
                    </Switch>
                </Router> */}
            </div>
        </div>
    )
}

export default PrivateScreen
