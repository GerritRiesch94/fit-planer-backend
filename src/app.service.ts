import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  searchForIdAndPaginate(id: string, skip: number, top: number): string[] {
    return id === '0' ? ['result 1', 'result 2'] : [];
  }
}
