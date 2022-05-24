const axios = require('axios');
const URL = `http://localhost:8080/api`

function getAllWatches() {
    return axios.get(`${URL}/watches`);
}

function getWatchesById(id) {
    return axios.get(`${URL}/watches/${id}`);
}

function getWatchesByColor(color) {
    return axios.get(`${URL}/watches/color/${color}`);
}

function getWatchesByStyle(style) {
    return axios.get(`${URL}/watches/style/${style}`);
}

function getWatchesByBrand (brand) {
    return axios.get(`${URL}/watches/brand/${brand}`);
}

function getWatchesByRating (rating) {
    return axios.get(`${URL}/watches//rating${rating}`);
}



function login (user) {
    return axios.post(`${URL}/users/login`, user);
}

function createNewUser (user) {
    return axios.post(`${URL}/users`, user);
}

function getUserByEmail (email) {
    return this.login({ email, password: '' });
}

function updateUser  (user) {
    return axios.put(`${URL}/users/${user.id}`, user);
}


const api = {
    getAllWatches,
    getWatchesById,
    getWatchesByColor,
    getWatchesByStyle,
    getWatchesByBrand,
    getWatchesByRating,
    login,
    createNewUser,
    getUserByEmail,
    updateUser

}

function useApi() {
    return api;
}

export { useApi }