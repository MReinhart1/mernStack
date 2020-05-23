function auth(req, res, next){
  const token = req.header('x-auth-token');

  if(!token) res.status(401).json({msg: "You are unauthorized to see this information"});
  try {
      const decoded = jwt.verify(token, "secretKey");
      req.user = decoded;
      next()

  }catch (e){
    if(!token) res.status(400).json({msg: "Token is not valid"});
    }

}


module.exports = auth;
