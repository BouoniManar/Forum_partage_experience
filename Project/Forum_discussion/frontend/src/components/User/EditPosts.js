import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Importer react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Importer les styles

const EditPosts = () => {
    const { postId } = useParams(); // Récupérer l'ID du post
    const [post, setPost] = useState({ title: '', content: '', utilisateur: 1, categorie: 2 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Pour la redirection après modification

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/forum/api/sujets/${postId}/`)
            .then(response => {
                setPost({
                    title: response.data.title,
                    content: response.data.content,
                    utilisateur: response.data.utilisateur,  // Ajouter utilisateur si nécessaire
                    categorie: response.data.categorie      // Ajouter catégorie si nécessaire
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

        // Envoyer les données avec utilisateur et categorie
        const updatedPost = {
            title: post.title,
            content: post.content,
            utilisateur: post.utilisateur,  // Assurez-vous que l'utilisateur est correctement passé
            categorie: post.categorie       // Assurez-vous que la catégorie est correctement passée
        };

        console.log("Données envoyées:", updatedPost);  // Vérifiez ce qui est envoyé

        axios.put(`http://127.0.0.1:8000/forum/api/sujets/${postId}/`, updatedPost)
            .then(() => {
                // Afficher un toast de succès
                toast.success('Post modifié avec succès!');
                // Rediriger vers la page MyPosts
                setTimeout(() => {
                    navigate(`/my-posts/${postId}`);
                }, 2000); // Attendre 2 secondes pour laisser le toast s'afficher
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
