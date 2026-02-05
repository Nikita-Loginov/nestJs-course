import {
  registerDecorator,
  type ValidationOptions,
  type ValidationArguments,
} from "class-validator";

export const StartsWith = (preffix: string, validationOptions?: ValidationOptions) => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: "startsWith",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === "string" && value.startsWith(preffix);
        },
        defaultMessage(args: ValidationArguments) {
          return `Название должно начинаться с ${preffix}`;
        },
      },
    });
  };
};
