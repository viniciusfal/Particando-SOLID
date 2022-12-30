import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      const { user_id } = request.headers;

      const allUsers = this.listAllUsersUseCase.execute({
        user_id: String(user_id),
      });

      return response.json(
        allUsers.map((res) => ({
          ...res,
          created_at: new Date(res.created_at),
          updated_at: new Date(res.updated_at),
        }))
      );
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export { ListAllUsersController };
