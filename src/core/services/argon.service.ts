import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';

@Injectable()
export class ArgonService {
  async hash(plainText: string): Promise<string> {
    const hash = argon.hash(plainText);
    return hash;
  }

  async verify(hashText: string, plainText: string): Promise<boolean> {
    return await argon.verify(hashText, plainText);
  }
}
