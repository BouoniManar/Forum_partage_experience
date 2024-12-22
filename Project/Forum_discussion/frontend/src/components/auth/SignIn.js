import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; 
import { toast, ToastContainer } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css'; 
import '../../styles/Auth.css';

function SignIn() {
    const [formData, setFormData] = useState({
        username: '',  
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
            console.log(formData); 
            const response = await axios.post('http://localhost:8000/forum/api/login/', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.status === 200) {
                const data = response.data;
                console.log(data); // Handle the JWT token here

                // Stocker le token dans le localStorage
                localStorage.setItem('userToken', data.token); // Assurez-vous que le backend retourne un token dans `data.token`
    
                // Afficher un toast de succès et rediriger vers le tableau de bord
                toast.success('Connexion réussie!', {
                    onClose: () => {
                        navigate('/UserDashboard'); // Rediriger vers le tableau de bord
                    },
                    style: {
                        whiteSpace: 'nowrap', // Prevent line breaks
                        textOverflow: 'ellipsis', // Add ellipsis if the message is too long
                        overflow: 'hidden',
                    }
                });
            } else {
                toast.error('Échec de la connexion. Vérifiez vos identifiants.', {
                    style: {
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                    }
                });
            }
        } catch (error) {
            console.error('Une erreur est survenue lors de la connexion :', error);
            toast.error('Une erreur est survenue. Essayez à nouveau plus tard.', {
                style: {
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                }
            });
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
