import { oldPassRemover } from "./old-pass.cron";
import { tokenRemover } from "./old-tokens.cron";
import { sendToOldVisitors } from "./old-visitor.cron";

export const cronRunner = () => {
  tokenRemover.start();
  oldPassRemover.start();
  sendToOldVisitors.start();
};
