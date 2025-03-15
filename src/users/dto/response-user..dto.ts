import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class ResponseUserDto {
  @ApiProperty({ example: 'fa142cbf-cd9a-4f16-ad32-b2b48d10fa8a' })
  @Expose()
  id: string;

  @ApiProperty({ example: 'admin' })
  @Expose()
  username: string;

  @ApiProperty({ example: 'a@example.com' })
  @Expose()
  email: string;

  @Exclude()
  password: string;
}
