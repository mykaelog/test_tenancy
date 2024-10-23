import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

import { ValidationPipe } from './validation.pipe';

export class ValidateSingleFieldUpdatePipe
  extends ValidationPipe
  implements PipeTransform
{
  transform(value: any, metadata: ArgumentMetadata) {
    const fields = Object.keys(value);
    if (fields.length !== 1) {
      throw new BadRequestException('ONLY_CAN_UPDATE_ONE_FIELD');
    }

    return super.transform(value, metadata);
  }
}
