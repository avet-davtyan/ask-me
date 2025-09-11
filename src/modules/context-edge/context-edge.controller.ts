import {
  Response,
} from "express";
import {
  IngestBodyDTO,
  IngestResponseDTO,
} from "./types";
import { SingletonManager } from "../../util/singleton-manager.util";
import { ContextService } from "../context/context.service";
import {
  ERR_INVALID_REQUEST_BODY,
  ERR_INVALID_RESPONSE,
  IsFailed,
  UnWrap,
} from "../../util/result.util";
import z from "zod";
import { IExtendedRequest, IExtendedNextFunction } from "../../util/request.util";
import { catchErrorAndSendToHandler } from "../../util/error-handler.util";

const contextService = SingletonManager.getInstance(ContextService);

export const ingest = async (
  req: IExtendedRequest,
  res: Response,
  next: IExtendedNextFunction,
) => {

  try {
    const requestBodyR = z.array(IngestBodyDTO).safeParse(req.body);
    if(!requestBodyR.success) { next({request: req, error: ERR_INVALID_REQUEST_BODY}); return; }
    const requestBody = requestBodyR.data;

    const responseR = await contextService.ingestData(requestBody);
    if(IsFailed(responseR)) { next({request: req, error: responseR}); return; }
    const response = UnWrap(responseR);

    const responseDTO = IngestResponseDTO.safeParse(response);
    if(!responseDTO.success) { next({request: req, error: ERR_INVALID_RESPONSE}); return; }

    res.status(200).json(responseDTO.data);

  } catch (error){
    catchErrorAndSendToHandler(error, req, next);
  }

};
