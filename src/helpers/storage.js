var storage = window.localStorage;

const Storage = {
    set tracker(value) { 
        storage.setItem('tracker', value);
    },
    get tracker() {
        return storage.getItem('tracker') ? eval(storage.getItem('tracker')) : false;
    },
    set project(value) {
        storage.setItem('project', JSON.stringify(value));
    },
    get project() {
        return JSON.parse(storage.getItem('project'));
    }
}

export default Storage;