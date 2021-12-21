import jwt from "jsonwebtoken";

const secret = 'fmicourse';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (token) {      
      let decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
    } else {
      let decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }    

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
