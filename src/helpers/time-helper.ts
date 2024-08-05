import dayjs, { ManipulateType } from "dayjs";

class TimeHelper {
  public subtractByParams(value: number, unit: ManipulateType): Date {
    return dayjs().utc().subtract(value, unit).toDate();
  }
}
export const timeHelper = new TimeHelper();
