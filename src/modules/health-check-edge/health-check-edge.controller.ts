import {
  Response,
  Request,
} from "express";

export const getHealthCheck = async (
  _req: Request,
  res: Response,
) => {

  res.status(200).json({});

};
