import { Request, Response } from "express";
import { MyMailer } from "../utils/Mailer";
import { User } from "../entity/User";

export interface MyContext {
  req: Request & {
    session: {
      userId: string;
    };
  };
  res: Response;
  me: User;
  mailer: MyMailer;
}
