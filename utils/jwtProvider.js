import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  const token = jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRY,
    }
  );
  return token;
};

const getUserIdFromToken = (token)=>{
    const decodeToken = jwt.verify(token,process.env.JWT_SECRET_KEY);
    return decodeToken;
}


