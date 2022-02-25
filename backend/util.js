import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); //Bearer xxxxxx
    jwt.verify(
      token,
      process.env.JWT_SECRET || "somethingsecret",
      (error, decode) => {
        //un data'ee ke hamrahe token mifresti to bakhshe dorost kardane token (jwt.sign), jwt.verigy return mikone oon data ro tooye decode.
        if (error) {
          res.status(401).send({ message: "invalid token" });
        } else {
          req.user = decode; // authrorization done! oon dataha'ee ke hamrahe token dadim ro inja vasl mikonim be req.
          next();
        }
      }
    );
  } else {
    console.log("isAuth made this error");
    res
      .status(401)
      .json({
        message: "there is no token and therefore you are not authorized!",
      });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin Token" });
  }
};
