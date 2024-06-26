import { Response, Request, NextFunction } from "express";

interface FieldsError extends Error {
  keyValue: String;
  statusCode: number;
  status: String;
  isOperational: boolean;
  code: number | string;
  detail: string;
}

const sendErrorProd = (err: FieldsError, req: Request, res: Response) => {
  // A) APIs
  if (req.url.startsWith("/api")) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    console.log("ERROR 💥", err);

    return res.status(500).json({
      status: "error",
      message: "Something went very wrong",
    });
  }
};

const sendErrorDev = (err: FieldsError, req: Request, res: Response) => {
  // A) API
  if (req.url.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
};

module.exports = (
  err: FieldsError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    console.log(err, "error");
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;
    error.name = err.name;

    sendErrorProd(error, req, res);
  }
};
