import { Request, Response } from "express";
import { User } from "../entity/User";

export interface MyContext {
  req: Request & {
    session: {
      userId: string;
    };
  };
  res: Response;
  me: User | null;
}
