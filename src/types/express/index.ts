export {}

declare global {
  namespace Express {
    export interface Request {
        user: {
            id: number, 
            firstName: string, 
            lastName: string, 
            role: number
        }
    }
  }
}