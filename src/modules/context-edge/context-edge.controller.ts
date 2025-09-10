import {
  Response,
  Request,
} from "express";
import { IngestBodyDTO } from "./types";
import { SingletonManager } from "../../util/singleton-manager.util";
import { ContextService } from "../context/context.service";

const contextService = SingletonManager.getInstance(ContextService);

export const ingest = async (
  req: Request,
  res: Response,
) => {

  const requestBodyR = IngestBodyDTO.safeParse(req.body);
  if(!requestBodyR.success) { res.status(400).json("Invalid request body"); return; }
  const requestBody = requestBodyR.data;

  const chunks = await contextService.ingestData(requestBody);

  res.status(200).json(chunks);

};
