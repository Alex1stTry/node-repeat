import fs from "node:fs/promises";
import path from "node:path";

import { IUser } from "./interfaces/user.interface";

const pathToFile = path.join(process.cwd(), "users.json");

class UsersHelper {
  public async reader(): Promise<IUser[]> {
    const data = await fs.readFile(pathToFile, "utf-8");
    return data ? JSON.parse(data) : [];
  }

  public async writer(users: IUser[]): Promise<void> {
    await fs.writeFile(pathToFile, JSON.stringify(users));
  }
}

export const userHelper = new UsersHelper();
