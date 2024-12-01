import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { faUser, faPlusCircle, faComment, faHeart } from '@fortawesome/free-solid-svg-icons';



const CategoryDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [category, setCategory] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [newPost, setNewPost] = useState({ title: '', content: '' });
    const [showMyPosts] = useState(false);
    

    const currentUserId = 1;

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/forum/api/categories/${id}/`)
            .then(response => {
                setCategory(response.data);
                return axios.get(`http://127.0.0.1:8000/forum/api/sujets/?category=${id}`);
            })
            .then(response => {
                setPosts(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Erreur lors de la récupération des données');
                setLoading(false);
            });
    }, [id]);

    const handleCreatePost = () => {
        axios.post('http://127.0.0.1:8000/forum/api/sujets/', {
            title: newPost.title,
            content: newPost.content,
            categorie: id,
            utilisateur: currentUserId,
        })
            .then(response => {
                setPosts([response.data, ...posts]);
                setShowModal(false);
                setNewPost({ title: '', content: '' });
            })
            .catch(error => {
                console.error('Erreur lors de la création du sujet:', error);
            });
    };

    const handleAddComment = (postId) => {
        const content = prompt("Entrez votre commentaire :");
        if (content) {
            axios.post('http://127.0.0.1:8000/forum/api/comments/', { sujet: postId, content })
                .then(() => {
                    alert('Commentaire ajouté avec succès');
                })
                .catch(error => {
                    console.error('Erreur lors de l\'ajout du commentaire', error);
                });
        }
    };

    const toggleFavorite = (postId) => {
        axios.post('http://127.0.0.1:8000/forum/api/favorites/', { sujet: postId })
            .then(() => {
                setPosts(posts.map(post =>
                    post.id === postId ? { ...post, isFavorited: !post.isFavorited } : post
                ));
            })
            .catch(error => {
                console.error('Erreur lors de la mise à jour du favori', error);
            });
    };

    const filteredPosts = showMyPosts
        ? posts.filter(post => post.utilisateur === currentUserId)
        : posts;

    if (loading) {
        return <div className="text-center mt-4">Chargement...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="w-full mt-8">
            <div className="card shadow-sm">
                <div
                    className="card-header d-flex justify-content-between align-items-center"
                    style={{ backgroundColor: "#E8A0BF", color: "white" }}
                >
                    <h2>{category.name}</h2>
                    
                    <div className="d-flex align-items-center justify-content-end">
                        <button
                            className="btn btn-sm text-white"
                            onClick={() => navigate(`/my-posts/${currentUserId}`)} 
                        >
                            <FontAwesomeIcon icon={faUser} /> Mes Posts
                        </button>
                    <FontAwesomeIcon
                        icon={faPlusCircle}
                        className="text-white fs-4 ms-3"
                        role="button"
                        onClick={() => setShowModal(true)}
                    />
                </div>

                </div>
                <div className="card-body">
                    {filteredPosts.length === 0 ? (
                        <p className="text-center text-muted">
                            Aucun sujet {showMyPosts ? "créé par vous" : "disponible"} dans cette catégorie.
                        </p>
                    ) : (
                        <div
                            className="posts-container"
                            style={{
                                maxHeight: "600px",
                                overflowY: "auto",
                                display: "flex",
                                flexDirection: "column",
                                gap: "15px",
                                padding: "10px",
                            }}
                        >
                            {filteredPosts.map(post => (
                                <div
                                    key={post.id}
                                    className="card shadow-sm"
                                    style={{
                                        border: "1px solid #E8A0BF",
                                        width: "100%",
                                        maxWidth: "400px",
                                        margin: "0 auto",
                                    }}
                                >
                                    <div className="card-body d-flex flex-column justify-content-between">
                                        <h5 className="card-title text-primary">{post.title}</h5>
                                        <p className="card-text text-muted">
                                            {post.content.length > 100
                                                ? `${post.content.substring(0, 100)}...`
                                                : post.content}
                                        </p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <button
                                                className="btn btn-sm"
                                                onClick={() => handleAddComment(post.id)}
                                            >
                                                <FontAwesomeIcon icon={faComment} /> Commenter
                                            </button>
                                            <button
                                                className={`btn btn-sm ${post.isFavorited ? 'text-danger' : 'text-muted'}`}
                                                onClick={() => toggleFavorite(post.id)}
                                            >
                                                <FontAwesomeIcon icon={faHeart} /> Favoris
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal for Creating a New Post */}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Créer un sujet</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    aria-label="Close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <input
                                    type="text"
                                    placeholder="Titre du sujet"
                                    className="form-control mb-2"
                                    value={newPost.title}
                                    onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                                />
                                <textarea
                                    placeholder="Contenu du sujet"
                                    className="form-control"
                                    rows="5"
                                    value={newPost.content}
                                    onChange={e => setNewPost({ ...newPost, content: e.target.value })}
                                />
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Annuler
                                </button>
                                <button
                                    type="button"
                                    className="btn"
                                    style={{ backgroundColor: "#E8A0BF", color: "white" }}
                                    onClick={handleCreatePost}
                                >
                                    Publier
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryDetails;
