import {
  Err,
  Ok,
  err,
  ok,
} from "neverthrow";

enum ErrorType {
  ACCESS_DENIED = "ACCESS_DENIED",
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
