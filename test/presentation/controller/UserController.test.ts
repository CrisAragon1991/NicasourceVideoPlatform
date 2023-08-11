import { NextFunction, Request, Response } from "express";
import { User } from "../../../src/data/entity/User";
import { ICreateUserUseCase } from "../../../src/domain/interfaces/use-cases/user/icreate-user";
import { UserController } from "../../../src/presentation/controller/UserController";
import app from '../../index'
import * as request from "supertest";

class MockCreateUserUseCase implements ICreateUserUseCase {
    execute(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
} 

describe('UserController', () => {
  let mockCreateUserUseCase: ICreateUserUseCase  
  let userController: UserController
  
  beforeAll(() => {
    mockCreateUserUseCase = new MockCreateUserUseCase()
    userController = new UserController (mockCreateUserUseCase)
  })
  beforeEach(() => {
    jest.clearAllMocks();
  })
  describe('Post /users', () => {
    test(`should return status 200 with data`, async () => {
        const expectedData = [
            {
                firstName: 'Cristhian',
                lastName: 'Aragon',
                age: 32,
                email: 'cristianaragon32@gmail.com',   
                password: 'strongPassword#'
            }
        ]
        app.post('/sign-up', (req: Request, res: Response, next: NextFunction) => {
          return userController.save(req, res, next) 
        })
        jest.spyOn(mockCreateUserUseCase, "execute").mockImplementation(() => Promise.resolve(expectedData as any))
        const response = await request(app).post("/sign-up").send(expectedData)
        expect(response.status).toBe(200)
        expect(mockCreateUserUseCase.execute).toBeCalledTimes(1)
        expect(response.body).toStrictEqual(expectedData)
    })  
  })
})