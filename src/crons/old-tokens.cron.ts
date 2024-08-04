import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { tokenRepository } from "../repositories/token.repository";

dayjs.extend(utc);

const removeOldTokens = async (): Promise<void> => {
  console.log("token remover start");
  const tenDays = dayjs().utc().subtract(10, "days");

  await tokenRepository.deleteByParams({ createdAt: { $lte: tenDays } });
};

export const tokenRemover = new CronJob("*/2 * * * *", removeOldTokens);
