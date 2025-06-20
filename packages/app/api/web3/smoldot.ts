import { startFromWorker } from "polkadot-api/smoldot/from-worker";

// Starting smoldot on a Worker (strongly recommended)
export const smoldot = startFromWorker(new Worker(new URL("polkadot-api/smoldot/worker", import.meta.url)));
