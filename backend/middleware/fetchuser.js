const jwt = require("jsonwebtoken");

const JWT_Secure = process.env.JWT_SECRET;

const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .json({ error: "please authenticate with valid token" });
  }

  try {
    const data = jwt.verify(token, JWT_Secure);
    req.user = data.user;
    next();
  } catch (error) {
    return res.status(401).json({
      error: "Please authenticate using a valid token",
      details: error.message,
    });
  }
};

module.exports = fetchUser;
