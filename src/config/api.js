const API = {
    host: process.env.REACT_APP_API_URL,
    prefix: process.env.REACT_APP_API_PREFIX ||'tracker',
    get url() { 
        return `${this.host}${this.prefix}/`;       
    }
}

export {
    API
}