import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { oldPassRepository } from "../repositories/old-password.repository";

dayjs.extend(utc);
const oldPassRemove = async () => {
  const prevMouth = dayjs().utc().subtract(1, "month");
  await oldPassRepository.deleteByParams({
    createdAt: { $lte: { prevMouth } },
  });
};

export const oldPassRemover = new CronJob("* * * * *", oldPassRemove);
