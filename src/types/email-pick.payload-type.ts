import { EmailEnum } from "../enums/email.enum";
import { EmailPayloadType } from "./email-payload-type";
import { PickRequired } from "./pick-required";

export type EmailPickPayloadType = {
  [EmailEnum.WELCOME]: PickRequired<EmailPayloadType, "name">;
  [EmailEnum.FORGOT_PASS]: PickRequired<
    EmailPayloadType,
    "name" | "frontUrl" | "actionToken"
  >;
  [EmailEnum.LOG_OUT]: PickRequired<EmailPayloadType, "name" | "frontUrl">;
};
