let debug = require('debug')('smartfood-backend:commonService');

/*
 * Helpers.
 */

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        debug('Error Err: ', err);
        return res.status(statusCode).send(err);
    };
}

function validationError(res, statusCode) {
    statusCode = statusCode || 422;
    return function(err) {
        return res.status(statusCode).json(err);
    };
}

function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
        if(entity) {
            return res.status(statusCode).json(entity);
        }
        return null;
    };
}

function removeEntity(res, data) {
    return function(entity) {
        if(entity) {
            return entity.destroy()
                .then(() => res.status(204).end());
        }
    };
}

function handleEntityNotFound(res) {
    return function(entity) {
        if(!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

module.exports = {
    handleError,
    validationError,
    respondWithResult,
    removeEntity,
    handleEntityNotFound
};