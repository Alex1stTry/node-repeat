import { oldPassRemover } from "./old-pass.cron";
import { tokenRemover } from "./old-tokens.cron";

export const cronRunner = () => {
  tokenRemover.start();
  oldPassRemover.start();
};
