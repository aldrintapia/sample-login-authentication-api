import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ResponseLoginDto {
  @ApiProperty()
  @Expose()
  access_token: string;
}
