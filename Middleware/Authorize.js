const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        try{
            const {role} = req.user
            console.log(req.user)
            console.log(role)
        if (!allowedRoles.includes(role)) {
            return res.status(403).send({ message: "Access denied. You do not have permission." });
        }
        next();
        }
        catch(error){
            console.error('Authorization error:', error);
      return res.status(500).json({ message: 'Authorization failed' });
        }
    };
};

module.exports = authorizeRoles;