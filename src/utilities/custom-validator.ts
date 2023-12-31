import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator'

@ValidatorConstraint({ name: 'CustomMatchPasswords', async: false })
export class CustomMatchPasswords implements ValidatorConstraintInterface {
   validate(password: string, args: ValidationArguments) {

      if (password !== (args.object as any)[args.constraints[0]]) {
         return false
      }
      return true
   }

   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   defaultMessage(_args: ValidationArguments) {
      return 'Passwords do not match!'
   }
}