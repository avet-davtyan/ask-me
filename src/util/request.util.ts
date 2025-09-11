import {
  NextFunction,
  Request,
  Response,
} from "express";
import { v4 as uuidv4 } from "uuid";
import { logger } from "./logger.util";
import { IRequestWithError } from "./result.util";

export interface IExtendedRequest extends Request {
  id?: string;
}

export function requestPrepare(
  req: IExtendedRequest,
  _res: Response,
  next: NextFunction
) {
  req.id = uuidv4();
  logger.info(`[${req.id}] Request received: ${req.method} ${req.originalUrl}`);
  next();
}

export type IExtendedNextFunction = (err: IRequestWithError) => void;
