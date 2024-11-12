import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import ForgotPassword from './components/auth/ForgotPassword'; 
import routes from './config/routes';
import { ToastContainer } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';  
import 'bootstrap/dist/css/bootstrap.min.css'; 


function App() {
    return (
        <Router>
            <Routes>
                <Route path={routes.home} element={<Home />} />
                <Route path={routes.inscription} element={<SignUp />} />
                <Route path={routes.connexion} element={<SignIn />} />
                <Route path={routes.forgetpassword} element={<ForgotPassword />} />
            </Routes>

            <ToastContainer />  
        </Router>
    );
}

export default App;
