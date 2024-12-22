import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const EditPosts = () => {
    const { postId } = useParams(); 
    const [post, setPost] = useState({ title: '', content: '', utilisateur: 1, categorie: 2 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/forum/api/sujets/detail/${postId}/`)
            .then((response) => {
                const data = response.data;
                setPost({
                    title: data.title,
                    content: data.content,
                    utilisateur: data.utilisateur,
                    categorie: data.categorie
                });
                setLoading(false);
            })
            .catch(() => {
                setError('Erreur lors de la récupération du sujet');
                setLoading(false);
            });
    }, [postId]);
    

    const handleSubmit = (e) => {
        e.preventDefault();

       
        const updatedPost = {
            title: post.title,
            content: post.content,
            categorie: post.categorie,
            utilisateur: post.utilisateur 
        };
        

        console.log("Données envoyées:", updatedPost); 

        axios.put(`http://127.0.0.1:8000/forum/api/sujets/detail/${postId}/`, updatedPost)
            .then(() => {
                
                toast.success('Post modifié avec succès!');
                
                setTimeout(() => {
                    navigate(`/my-posts/${postId}`);
                }, 2000); 
            })
            .catch((error) => {
                console.error("Erreur lors de la mise à jour du sujet:", error.response ? error.response.data : error);
                setError('Erreur lors de la mise à jour du sujet');
            });
    };

    if (loading) {
        return <div className="text-center mt-4">Chargement...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="w-100 mt-8">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8">
                    <div className="card-header d-flex justify-content-between align-items-center" style={{ backgroundColor: "#E8A0BF", color: "white" }}>
                        <h1>Modifier le Post</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Titre</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={post.title}
                                onChange={(e) => setPost({ ...post, title: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="content" className="form-label">Contenu</label>
                            <textarea
                                className="form-control"
                                id="content"
                                name="content"
                                rows="4"
                                value={post.content}
                                onChange={(e) => setPost({ ...post, content: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Enregistrer</button>
                    </form>
                </div>
            </div>
            <ToastContainer /> 
        </div>
    );
};

export default EditPosts;
