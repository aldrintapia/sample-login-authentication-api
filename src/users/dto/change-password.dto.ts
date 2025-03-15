import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { CompareField } from 'src/shared/decorators/compareField';

export class ChangePasswordDto {
  @ApiProperty({ example: '123456', required: true })
  @IsNotEmpty()
  @IsString()
  @CompareField('confirmPassword', {
    message: 'Password and Confirm Password should be equal',
  })
  @MinLength(6)
  password: string;

  @ApiProperty({ example: '123456', required: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @Exclude({ toPlainOnly: true })
  confirmPassword: string;
}
