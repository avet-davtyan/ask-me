import {
  Response,
} from "express";
import { SingletonManager } from "../../util/singleton-manager.util";
import { HealthCheckService } from "../health-check/health-check.service";
import {
  ERR_INVALID_RESPONSE,
  IsFailed,
  UnWrap,
} from "../../util/result.util";
import {
  IExtendedNextFunction,
  IExtendedRequest,
} from "../../util/request.util";
import { catchErrorAndSendToHandler } from "../../util/error-handler.util";
import { HealthCheckResponseDTO } from "./types";

const healthCheckService = SingletonManager.getInstance(HealthCheckService);

export const health = async (
  req: IExtendedRequest,
  res: Response,
  next: IExtendedNextFunction,
) => {

  try {

    const healthCheckR = await healthCheckService.checkHealth();
    if(IsFailed(healthCheckR)) { next({request: req, error: healthCheckR}); return; }
    const healthCheck = UnWrap(healthCheckR);

    const healthCheckResponseDTO = HealthCheckResponseDTO.safeParse(healthCheck);
    if(!healthCheckResponseDTO.success) { next({request: req, error: ERR_INVALID_RESPONSE}); return; }
    const healthCheckResponse = healthCheckResponseDTO.data;

    res.status(200).json(healthCheckResponse);

  } catch (error){
    catchErrorAndSendToHandler(error, req, next);
  }

};
