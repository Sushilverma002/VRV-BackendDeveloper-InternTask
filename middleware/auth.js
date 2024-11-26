import apiResponseHandler from "../utilites/apiResponseHandler.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const Auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")
      ? req.header("Authorization").replace("Bearer ", "")
      : req.body?.token;

    if (!token) {
      return apiResponseHandler.sendError(
        401,
        false,
        "Access denied, Token not provided.",
        (response) => {
          res.json(response);
        }
      );
    }
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
    } catch (error) {
      apiResponseHandler.sendResponse(
        401,
        false,
        "Invalid token. Please provide a valid token for authentication.",
        (response) => {
          res.json(response);
        }
      );
    }
    return next();
  } catch (error) {
    apiResponseHandler.sendError(
      401,
      false,
      "Invalid token. Please provide a valid token for authentication.",
      (response) => {
        res.json(response);
      }
    );
  }
};

const onlyUserAccess = (req, res, next) => {
  try {
    if (req.user.role !== "User") {
      return apiResponseHandler.sendResponseMsg(
        400,
        false,
        "Access Denied, this is Protected route for user  only.",
        function (response) {
          res.json(response);
        }
      );
    }
  } catch (error) {
    apiResponseHandler.sendError(
      401,
      false,
      "Admin role not matching",
      function (response) {
        return res.json(response);
      }
    );
    return next();
  }
};

const onlyAdminAccess = (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return apiResponseHandler.sendResponseMsg(
        400,
        false,
        "Access Denied, this is Protected route for Admin only.",
        function (response) {
          res.json(response);
        }
      );
    }
  } catch (error) {
    apiResponseHandler.sendError(
      401,
      false,
      "user role not matching",
      function (response) {
        return res.json(response);
      }
    );
  }
  return next();
};

const onlyModeratorAccess = (req, res, next) => {
  try {
    if (req.user.role !== "Moderator") {
      return apiResponseHandler.sendResponseMsg(
        400,
        false,
        "Access Denied, this is Protected route for Moderator only.",
        (response) => {
          res.json(response);
        }
      );
    }
    next();
  } catch (error) {
    apiResponseHandler.sendError(
      401,
      false,
      "Moderator role not matching",
      (response) => {
        res.json(response);
      }
    );
  }
};

export { onlyUserAccess, onlyAdminAccess, onlyModeratorAccess, Auth };
