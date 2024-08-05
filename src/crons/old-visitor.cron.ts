import { CronJob } from "cron";

import { Configs } from "../configs/configs";
import { EmailEnum } from "../enums/email.enum";
import { timeHelper } from "../helpers/time-helper";
import { userRepository } from "../repositories/user.repository";
import { mailService } from "../services/mail.service";

const oldVisitorSendMail = async () => {
  try {
    const date = timeHelper.subtractByParams(7, "days");
    const users = await userRepository.findOldVisitors(date);
    await Promise.all(
      users.map(async (user) => {
        await mailService.sendEmail(EmailEnum.OLD_VISITOR, user.email, {
          name: user.name,
          frontUrl: Configs.FRONT_UTL,
        });
      }),
    );
  } catch (e) {
    console.log("Old-visitor cron:", e);
  }
};
export const sendToOldVisitors = new CronJob(
  "*/10 * * * * *",
  oldVisitorSendMail,
);
