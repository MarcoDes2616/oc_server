const {storage} = require('../utils/firebase');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

const firebaseFile = async(req, res, next) => {
   next();
}

module.exports = {firebaseFile, getFirebaseUrl}