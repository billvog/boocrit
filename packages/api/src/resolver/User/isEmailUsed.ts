import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { User } from "../../entity/User";

@ValidatorConstraint({ async: true })
export class IsEmailAlreadyUsedConstraint
  implements ValidatorConstraintInterface
{
  validate(email: string) {
    return User.findOne({ where: { email } }).then((user) => {
      return !user;
    });
  }
}

export function IsEmailAlreadyUsed(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailAlreadyUsedConstraint,
    });
  };
}
