import { NextFunction, Request, Response } from 'express'
import { User } from '../../../src/data/entity/User'
import { ICreateUserUseCase } from '../../../src/domain/interfaces/use-cases/user/icreate-user'
import { UserController } from '../../../src/presentation/controller/UserController'
import app from '../../index'
import * as request from 'supertest'
import { ILogginUseCase } from '../../../src/domain/interfaces/use-cases/user/iloggin-user'
import { IProfileUserUseCase } from '../../../src/domain/interfaces/use-cases/user/iprofile-user'

class MockCreateUserUseCase implements ICreateUserUseCase {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, 
    execute(_user: User): Promise<User> {
        throw new Error('Method not implemented.')
    }
} 

class MockLogginUserUseCase implements ILogginUseCase {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  execute(_user: User): Promise<User> {
      throw new Error('Method not implemented.')
  }
}

class MockProfileUserUseCase implements IProfileUserUseCase {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  execute(_id: number): Promise<User> {
      throw new Error('Method not implemented.')
  }
}


describe('UserController', () => {
  let mockCreateUserUseCase: ICreateUserUseCase  
  let mockLogginUserCase: ILogginUseCase
  let mockProfileUserCase: IProfileUserUseCase
  let userController: UserController
  
  beforeAll(() => {
    mockCreateUserUseCase = new MockCreateUserUseCase()
    mockLogginUserCase = new MockLogginUserUseCase()
    mockProfileUserCase = new MockProfileUserUseCase()
    userController = new UserController (mockCreateUserUseCase, mockLogginUserCase, mockProfileUserCase)
  })
  beforeEach(() => {
    jest.clearAllMocks()
  })
  describe('Post /users', () => {
    test('should return status 200 with data', async () => {
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
        jest.spyOn(mockCreateUserUseCase, 'execute').mockImplementation(() => Promise.resolve(expectedData as any))
        const response = await request(app).post('/sign-up').send(expectedData)
        expect(response.status).toBe(200)
        expect(mockCreateUserUseCase.execute).toBeCalledTimes(1)
        expect(response.body).toStrictEqual(expectedData)
    })  
  })
})