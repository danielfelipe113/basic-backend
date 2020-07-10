

const crypto = require('crypto');


function validatePassword(password, hashedPassword, salt) {
    return hashedPassword === encryptPassword(password, salt);    
}

function encryptPassword(password, salt, callback) {
    if(!password || !salt) {
        return callback ? callback(null) : null;
    }

    const defaultIterations = 10000;
    const defaultKeyLength = 64;
    salt = Buffer.from(salt, 'base64');

    if(!callback) {
        return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength, 'sha256')
            .toString('base64');
    }

    return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength, 'sha256',
        function(err, key) {
            if(err) {
                callback(err);
            }
            return callback(null, key.toString('base64'));
        });
}

function makeSalt(...args) {
    let byteSize;
    let callback;
    let defaultByteSize = 16;

    if(typeof args[0] === 'function') {
        callback = args[0];
        byteSize = defaultByteSize;
    } else if(typeof args[1] === 'function') {
        callback = args[1];
    } else {
        throw new Error('Missing Callback');
    }

    if(!byteSize) {
        byteSize = defaultByteSize;
    }

    return crypto.randomBytes(byteSize, function(err, salt) {
        if(err) {
            callback(err);
        }
        return callback(null, salt.toString('base64'));
    });
};




function updatePassword(user) {
    return new Promise((resolve, reject) => {         
        return makeSalt((saltErr, salt) => {
            if(saltErr) {
                return reject(saltErr);
            }
            return encryptPassword(user.password, salt, (encryptErr, hashedPassword) => {
                if(encryptErr) {
                    return reject(encryptErr);
                }
                user.salt = salt;
                user.password = hashedPassword;
                return resolve(user);
            });
        });
    });
};


module.exports = {
    validatePassword,
    updatePassword,

};
