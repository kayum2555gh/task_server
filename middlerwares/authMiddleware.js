const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(" ")[1];
        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(400).send({
                    success: false,
                    message: 'Un-authorize user'
                })
            } else {
                req.user = { id:decode.id }
                next();
            }
        })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Please provide Auth token',
            error
        })
    }
}