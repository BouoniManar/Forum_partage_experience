import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/Auth.css';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'utilisateur',
        profile_picture: null,
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            profile_picture: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formDataToSend = new FormData();
        formDataToSend.append('username', formData.username);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('password', formData.password);
        formDataToSend.append('role', formData.role);
        if (formData.profile_picture) {
            formDataToSend.append('profile_picture', formData.profile_picture);
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/forum/api/register/', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.status === 201) {
                toast.success('Registration successful!');
                navigate('/login');
            } else {
                toast.error('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('There was an error!', error);
            toast.error('Registration failed. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input
                    type="text"
                    name="username"
                    placeholder="Nom d'utilisateur"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="form-control"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-control"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="form-control"
                />
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="form-control"
                >
                    <option value="utilisateur">Utilisateur</option>
                    <option value="admin">Admin</option>
                </select>
                <input
                    type="file"
                    name="profile_picture"
                    onChange={handleFileChange}
                    className="form-control"
                />
                <button type="submit" >S'inscrire</button>
            </form>

            <div className="header">
                <p>Already have an account? <Link to="/connexion">Sign in here</Link></p>
            </div>

            <ToastContainer />
        </div>
    );
}

export default SignUp;
