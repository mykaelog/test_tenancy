import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomBytes } from 'crypto';
import * as Bcrypt from 'bcryptjs';

@Injectable()
export class HashService {
  constructor(private readonly configService: ConfigService) {}

  async generate(password: string) {
    const salt = await Bcrypt.genSalt(10);

    return Bcrypt.hash(password, salt);
  }

  async compare(password: string, hash: string) {
    return Bcrypt.compare(password, hash);
  }

  async random() {
    return this.generate(randomBytes(12).toString('hex'));
  }
}
