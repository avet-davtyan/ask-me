import { Router } from "express";
import { getHealthCheck } from "./modules/health-check-edge/health-check-edge.controller";
import { ingest } from "./modules/context-edge/context-edge.controller";

const router = Router();

router.get("/health", getHealthCheck);
router.post("/ingest", ingest);

export default router;
