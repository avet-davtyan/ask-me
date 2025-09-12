import { Router } from "express";
import { health } from "./modules/health-check-edge/health-check-edge.controller";
import { ask, ingest } from "./modules/context-edge/context-edge.controller";

const router = Router();

router.get("/health", health);
router.post("/ingest", ingest);
router.post("/ask", ask);

export default router;
