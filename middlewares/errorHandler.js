`use stict`
module.exports = (err, req, res, next) => {
    if (err.status && err.message ) {
        return res.status(err.status).json({
            message : err.message
        })
    }
    switch (err.name) {
        case 'ValidationError':
            let messages = []
            if (err.errors) {
                for (let index in err.errors) {
                    messages.push(err.errors[index].message)
                }
            } else {
                messages = err.message
            }
            return res.status(400).send({
                message: messages
            })   
        case 'CastError':
            let message =err.message.split('"')[err.message.split('"').length - 2] + 'Id invalid'
            return res.status(400).send({
                message,
            })  
        case 'JsonWebTokenError' : {
            return res.status(400).send({
                message : "invalid token, please don't change the token in your local storage"
            })
        }                 
        default:            
            return res.status(500).send({
                message: 'Internal Server Error'
            })
    }

}


