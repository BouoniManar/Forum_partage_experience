import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const MyPosts = () => {
    const { userId } = useParams(); // Retrieve the userId from the URL
    const [myPosts, setMyPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch posts based on the userId
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/forum/api/sujets/?utilisateur=${userId}`)
            .then(response => {
                setMyPosts(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Erreur lors de la récupération de vos sujets');
                setLoading(false);
            });
    }, [userId]);

    // Delete post handler with confirmation
    const handleDelete = (postId) => {
        const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce sujet ?"); // Confirmation prompt
        if (confirmDelete) {
            // Optimistically remove the post from the UI
            setMyPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    
            // Send the delete request
            axios.delete(`http://127.0.0.1:8000/forum/api/sujets/${postId}/`)
                .then(() => {
                    // If successful, no further action needed
                })
                .catch((error) => {
                    console.error("Error deleting post:", error);
                    setError('Erreur lors de la suppression du sujet');
                    
                    // If deletion failed, restore the post
                    setMyPosts(prevPosts => [...prevPosts, myPosts.find(post => post.id === postId)]);
                });
        }
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
                    <div
                        className="card-header d-flex justify-content-between align-items-center"
                        style={{ backgroundColor: "#E8A0BF", color: "white" }}
                    >
                        <h1>Mes Posts</h1>
                    </div>
                    {myPosts.length === 0 ? (
                        <p className="text-muted text-center">Vous n'avez partagé aucun sujet pour le moment.</p>
                    ) : (
                        <div className="list-group">
                            {myPosts.map(post => (
                                <div key={post.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5>{post.title}</h5>
                                        <p>{post.content}</p>
                                    </div>
                                    <div className="d-flex gap-2">
                                        <Link to={`/edit-posts/${post.id}`} className="btn btn-primary w-100">
                                            Modifier
                                        </Link>
                                        <button
                                            className="btn btn-danger w-100"
                                            onClick={() => handleDelete(post.id)}
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyPosts;
