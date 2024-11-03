import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const fetchCategories = () => {
    return axios.get(`${API_URL}/categories/`);
};

export const fetchProducts = () => {
    return axios.get(`${API_URL}/produits/`);
};
