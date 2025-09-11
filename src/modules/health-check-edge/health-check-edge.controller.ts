import {
  Response,
} from "express";
import { SingletonManager } from "../../util/singleton-manager.util";
import { HealthCheckService } from "../health-check/health-check.service";
import { IsFailed, UnWrap } from "../../util/result.util";
import { IExtendedNextFunction, IExtendedRequest } from "../../util/request.util";
import { catchErrorAndSendToHandler } from "../../util/error-handler.util";

const healthCheckService = SingletonManager.getInstance(HealthCheckService);

export const getHealthCheck = async (
  req: IExtendedRequest,
  res: Response,
  next: IExtendedNextFunction,
) => {

  try {

    const recordsR = await healthCheckService.checkHealth();
    if(IsFailed(recordsR)) { next({request: req, error: recordsR}); return; }
    const records = UnWrap(recordsR);

    res.status(200).json(records);

  } catch (error){
    catchErrorAndSendToHandler(error, req, next);
  }

};
