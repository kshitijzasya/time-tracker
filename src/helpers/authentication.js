let storage = window.localStorage;
// let storage = window.sessionStorage;

const authentication = {
    _id: null,
    isAuthenticated: () => {
        return JSON.parse(storage.getItem('id')) !== null
    },
    set userId(value) {
        this._id = value;
        storage.setItem('id', JSON.stringify(value))
    },
    get userId() {
        return JSON.parse(storage.getItem('user'))?.id;
    },
    set user(value) { 
        if (typeof value === 'object') {
            storage.setItem('user', JSON.stringify(value))
        }
    },
    get user() {
        return JSON.parse(storage.getItem('user'))
    },
    get userName() { 
        return JSON.parse(storage.getItem('user'))?.name
    },
    logout: function() { 
        storage.removeItem('id');
        storage.removeItem('user');
        this._id = null;
    }
}   

export default authentication;