

const errorHandler = (err, req, res, next) => {
    console.error('System error Event: ', err);


    if(err.code === 11000) {    
        return res.status(400).json({
            success: false,
            message: 'Duplicate key error: A record with this value already exists.'
        });
    }           


    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });

};

module.exports = errorHandler;