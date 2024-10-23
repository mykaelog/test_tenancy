import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  ValidationError,
  ValidationPipe as NestValidationPipe,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ValidationOptions, ValidatorOptions } from 'class-validator';

import { VALIDATION_PIPE_OPTIONS } from './validation-pipe.constants';

@Injectable()
export class ValidationPipe
  extends NestValidationPipe
  implements PipeTransform
{
  private readonly validationOptions: ValidatorOptions =
    VALIDATION_PIPE_OPTIONS;

  async transform(value: unknown, metadata: ArgumentMetadata) {
    if (!metadata || !this.toValidate(metadata)) {
      return value;
    }

    const entity = plainToClass(metadata.metatype, value);
    const errors = await this.validateEntity(entity);

    if (errors.length > 0) {
      this.throwException(errors);
    }

    return entity;
  }

  protected async validateEntity(
    entity: object,
    validationOptions?: ValidationOptions,
  ): Promise<ValidationError[]> {
    const options = validationOptions || this.validationOptions;
    return await this.validate(entity, options);
  }

  protected throwException(errors: ValidationError[]) {
    throw new BadRequestException(this.flattenValidationErrors(errors));
  }
}
