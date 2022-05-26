function saveUser(user) {
    const value = JSON.stringify(user);
    localStorage.setItem('user', value);
}

function getUser() {
    return JSON.parse(localStorage.getItem('user'));
}

function removeUser() {
    localStorage.removeItem('user');
}

const ls = {
    saveUser,
    getUser,
    removeUser
}

function useLocalStorage() {
    return ls;
}

export { useLocalStorage }