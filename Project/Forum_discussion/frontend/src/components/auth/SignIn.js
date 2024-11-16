import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import { toast, ToastContainer } from 'react-toastify';  // Import react-toastify
import 'react-toastify/dist/ReactToastify.css';  // Import CSS for toasts
import '../../styles/Auth.css';

function SignIn() {
    const [formData, setFormData] = useState({
        username: '',  // Use username instead of email
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData); // Log formData to ensure it's correct
            const response = await axios.post('http://127.0.0.1:8000/forum/api/login/', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.status === 200) {
                const data = response.data;
                console.log(data); // Handle the JWT token here
    
                // Show success toast and navigate to the dashboard
                toast.success('Login successful!', {
                    onClose: () => {
                        navigate('/UserDashboard'); // Redirection vers le tableau de bord
                    }
                });
            } else {
                toast.error('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('An error occurred during sign-in:', error);
            toast.error('An error occurred. Please try again later.');
        }
    };
    

    return (
        <div className="auth-container">
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"  
                    placeholder="Nom d'utilisateur"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="auth-button">Se connecter</button>
            </form>
           
            <p>
                <Link to="/forgotpassword" className="forgot-password-link">Mot de passe oublié ?</Link>
            </p>

            <ToastContainer position="top-right" autoClose={5000} /> 
        </div>
    );
}

export default SignIn;
