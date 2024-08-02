import { EmailEnum } from "../enums/email.enum";

export const emailConstants = {
  [EmailEnum.WELCOME]: {
    subject: "Welcome",
    template: "welcome",
  },
  [EmailEnum.LOG_OUT]: {
    subject: "Log_out",
    template: "logout",
  },
  [EmailEnum.FORGOT_PASS]: {
    subject: "Forgot_password",
    template: "forgot-password",
  },
};
