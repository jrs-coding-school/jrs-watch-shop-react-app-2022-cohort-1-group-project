const axios = require('axios');
const URL = `http://localhost:8080/api`


// product specific service functions
function getAllWatches() {
    return axios.get(`${URL}/watches`);
}

function getWatchById(id) {
    return axios.get(`${URL}/watches/${id}`);
}

function getWatchesByColor(color) {
    return axios.get(`${URL}/watches/color/${color}`);
}

function getWatchesByStyle(style) {
    return axios.get(`${URL}/watches/style/${style}`);
}

function getWatchesByBrand(brand) {
    return axios.get(`${URL}/watches/brand/${brand}`);
}

function getWatchesByRating(rating) {
    return axios.get(`${URL}/watches/rating/${rating}`);
}

function login(user) {
    return axios.post(`${URL}/users/login`, user);
}

function createNewUser(user) {
    return axios.post(`${URL}/users`, user);
}

function getUserByEmail(email) {
    return this.login({ email, password: '' });
}

function getUserShoppingCartById (customerId) {
    return axios.get(`${URL}/carts/${customerId}`);
}

function getAllTransactionsByUserId(userId) {
    return axios.get(`${URL}/transactions/${userId}`);
}

function updateUser  (user) {
    return axios.put(`${URL}/users/${user.id}`, user);
}

function deleteUserById(id) {
    return axios.delete(`${URL}/users/${id}`);
}

// cart/transaction specific service functions
function addItemToCart(carts) {
    return axios.post(`${URL}/carts`, carts);
}

function createTransaction(userId, total, products, quantity) {
    return axios.post(`${URL}/transactions`, {userId, total, products, quantity});
}

function getWatchesByQuery(params) {

    const queryString = new URLSearchParams(params).toString();

    return axios.get(`${URL}/watches/search?` + queryString);
}

const api = {
    getAllWatches,
    getWatchById,
    getWatchesByColor,
    getWatchesByStyle,
    getWatchesByBrand,
    getWatchesByRating,
    login,
    createNewUser,
    getUserByEmail,
    updateUser,
    addItemToCart,
    getUserShoppingCartById,
    getAllTransactionsByUserId,
    createTransaction,
    deleteUserById,
    getWatchesByQuery
}

function useApi() {
    return api;
}

export { useApi }