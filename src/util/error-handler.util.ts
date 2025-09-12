import {
  NextFunction,
  Request,
  Response,
} from "express";
import {
  IExtendedNextFunction,
  IExtendedRequest,
} from "./request.util";
import {
  ErrorType,
  IRequestWithError,
  ResErr,
  ResErrInternalServerError,
  UnWrapError,
} from "./result.util";
import {
  ERR_INTERNAL_SERVER_ERROR,
} from "./result.util";
import {
  logger,
} from "./logger.util";

export function catchErrorAndSendToHandler(
  error: unknown,
  req: IExtendedRequest,
  next: IExtendedNextFunction,
): void {
  let errorToReturn: string | ResErr = ERR_INTERNAL_SERVER_ERROR;
  if(error instanceof Error){ errorToReturn = ResErrInternalServerError(
    `${error.message} ${error.stack}`
  ); }
  next({request: req, error: errorToReturn});
}

export function errorHandler(
  err: IRequestWithError,
  _req: Request,
  res: Response,
  next: NextFunction
) {

  const error = UnWrapError(err.error);
  const requestId = err.request.id;

  if(requestId !== undefined) {
    logger.error(`[${requestId}] Error: ${error.message}`);
  }

  let errorMessage: null | string = null;

  if(error.type !== ErrorType.INTERNAL_SERVER_ERROR) {
    errorMessage = error.message;
  } else {
    errorMessage = "Internal server error";
  }

  res.status(500).json(errorMessage);
  next();

}
