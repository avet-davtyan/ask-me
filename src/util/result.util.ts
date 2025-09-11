import {
  Err,
  Ok,
  err,
  ok,
} from "neverthrow";
import { IExtendedRequest } from "./request.util";

export enum ErrorType {
  ACCESS_DENIED = "ACCESS_DENIED",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
}

interface BasicError {
  type?: ErrorType;
  message: string;
}

export function ResErr(
  error: string | Err<never, BasicError>,
): Err<never, BasicError> {

  if(error instanceof Err){
    return error;
  }

  return err({
    message: error,
  });

}

export function ResErrInternalServerError(
  error: string | Err<never, BasicError>,
): Err<never, BasicError> {

  if(error instanceof Err){
    return error;
  }

  return err({
    type: ErrorType.INTERNAL_SERVER_ERROR,
    message: error,
  });

}

export function ResErrAccessDenied(
  message: string,
): Err<never, BasicError> {

  return err({
    type: ErrorType.ACCESS_DENIED,
    message,
  });

}

export function ResOk<T>(
  value: T | Ok<T, never>,
): Ok<T, never> {

  if(value instanceof Ok){
    return value;
  }

  return ok(value);
}

export function IsAccessDenied(
  error: BasicError,
): boolean {

  if(error.type === ErrorType.ACCESS_DENIED) {
    return true;
  }

  return false;

}

export function IsFailed<T>(result: Res<T>): result is Err<never, BasicError> {
  return result.isErr();
}

export function UnWrap<T>(
  result: Ok<T, never>,
): T {

  return result.value;

}

export function UnWrapError(
  result: Err<never, BasicError>,
): BasicError {
  return result.error;
}

export type Res<T> = Ok<T, never> | Err<never, BasicError>;
export type ResErr = Err<never, BasicError>;

export interface IRequestWithError {
  request: IExtendedRequest;
  error: ResErr;
}

export const ERR_INVALID_RESPONSE = ResErr("Invalid response");
export const ERR_INVALID_REQUEST_BODY = ResErr("Invalid request body");
export const ERR_INTERNAL_SERVER_ERROR = ResErr("Internal server error");

