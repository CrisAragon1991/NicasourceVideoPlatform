export {}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
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