import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { User } from "../../entity/User";

@ValidatorConstraint({ async: true })
export class IsUidAlreadyUsedConstraint
  implements ValidatorConstraintInterface
{
  validate(uid: string) {
    return User.findOne({ where: { uid } }).then((user) => {
      return !user;
    });
  }
}

export function IsUidAlreadyUsed(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUidAlreadyUsedConstraint,
    });
  };
}
