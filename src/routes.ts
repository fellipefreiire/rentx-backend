import { Request, Response } from "express";
import CreateCourseService from "./CreateCourseService";

export function createCourse(req: Request, res: Response) {
  CreateCourseService.execute({
    name: "NodeJS",
    duration: 10,
    educator: "Dani",
  });

  CreateCourseService.execute({
    name: "NodeJS",
    educator: "Diego",
  });

  return res.send();
}
