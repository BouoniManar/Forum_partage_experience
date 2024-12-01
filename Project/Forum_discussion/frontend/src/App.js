import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import UserDashboard from './components/User/UserDashboard';

import ForgotPassword from './components/auth/ForgotPassword'; 
import routes from './config/routes';
import { ToastContainer } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';  
import 'bootstrap/dist/css/bootstrap.min.css'; 
import CategoryDetails from './components/CategoryDetails';
import MyPosts from './components/User/MyPosts';
import EditPosts from './components/User/EditPosts';


function App() {
    return (
        <Router>
            <Routes>
                <Route path={routes.home} element={<Home />} />
                <Route path={routes.inscription} element={<SignUp />} />
                <Route path={routes.connexion} element={<SignIn />} />
                <Route path={routes.forgetpassword} element={<ForgotPassword />} />
                <Route path={routes.UserDashboard} element={<UserDashboard/>} />
                <Route path={routes.CategoryDetails} element={<CategoryDetails/>} />
                <Route path={routes.MyPosts} element={<MyPosts/>} />
                <Route path={routes.EditPosts} element={<EditPosts/>} />



            </Routes>

            <ToastContainer />  
        </Router>
    );
}

export default App;
