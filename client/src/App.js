import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './styles.css';
//Routes
import PrivateRoute from './components/routes/PrivateRoute';
//Screens
import PrivateScreen from './components/screens/PrivateScreen';
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';
import ForgotPasswordScreen from './components/screens/ForgotPasswordScreen';
import ResetPasswordScreencreen from './components/screens/ResetPasswordScreencreen';
import AddForm from './components/app/AddForm';
import EmployeeList from './components/app/EmployeeList';
const App = () => {
  return (
    <div className="container">
      <Router>
        <Switch>
          <div className="sidebar-container">
            <PrivateRoute exact path="/" component={PrivateScreen} />
                {/* authentication route */}
            <Route exact path="/login" component={LoginScreen} />
            <Route exact path="/register" component={RegisterScreen} />
            <Route exact path="/forgotpassword" component={ForgotPasswordScreen} />
            <Route exact path="/passwordreset/:resetToken" component={ResetPasswordScreencreen} />
            <Route exact path="/add-employee" component={AddForm} />     
            <Route exact path="/employee-list" component={EmployeeList} /> 
          </div>
          <div className="content-container">
            
            
          </div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
