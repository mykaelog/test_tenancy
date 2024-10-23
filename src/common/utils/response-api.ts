import {
  ClassConstructor,
  instanceToPlain,
  plainToInstance,
} from 'class-transformer';

export const responseApi = <T>(dto: ClassConstructor<T>, entity: object): T => {
  return plainToInstance(dto, instanceToPlain(entity), {
    excludeExtraneousValues: true,
  });
};
