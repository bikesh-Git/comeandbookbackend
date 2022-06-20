import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "You are not authenticated"));

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid"));
    req.hello = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res , next, () => {
    if (req.hello.id === req.params.id || req.hello.isAdmin) {
      next();
    } else {
      return next(createError(401, "You are not authenticated"));
    }
  });
};
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res,next, () => {
    if (req.hello.isAdmin) {
      next();
    } else {
      return next(createError(401, "You are not authenticated"));
    }
  });
};
