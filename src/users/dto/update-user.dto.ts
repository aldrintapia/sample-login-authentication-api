import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'admin', required: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  username: string;

  @ApiProperty({ example: 'a@example.com', required: true })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @Exclude()
  password: string;
}
