const API = {
    host: process.env.REACT_APP_API_URL,
    prefix: process.env.REACT_APP_API_PREFIX ||'tracker',
    get url() { 
        return `${this.host}${this.prefix}/`;       
    }
}

const Firebase = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIRABSE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
}
   
export {
    API,
    Firebase
}