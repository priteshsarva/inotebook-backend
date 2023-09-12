const jwt = require('jsonwebtoken');
const secreatdata = "p#ite$h$a#vatheG#eat"

const fetchuser = (req, res, next) => {
    const token = req.header("Auth-Token")

    if (!token) {
        res.status(401).send({ error: "Please Authenticate user invalid credential" })
    }
    try {
        const data = jwt.verify(token, secreatdata)
        req.user = data.user
        next()
    } catch (error) {
        console.log(error);
        res.status(400).send("internal Error Occured")
    }
 
}

module.exports = fetchuser