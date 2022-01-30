let storage = window.localStorage;

const authentication = {
    _id: null,
    isAuthenticated: () => {
        return storage.getItem('id') !== null
    },
    set userId(value) {
        this._id = value;
        storage.setItem('id', value);
    },
    get userId() {
        return this._id;
    },
    logout: () => {
        storage.removeItem('id');
        this._id = null;
    }
}   

export default authentication;