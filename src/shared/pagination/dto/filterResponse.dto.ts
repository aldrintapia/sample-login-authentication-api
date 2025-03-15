import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class FilterResponseDto {
  @ApiProperty()
  @Expose()
  readonly page: number;

  @ApiProperty()
  @Expose()
  readonly take: number;

  @ApiProperty()
  @Expose()
  readonly itemCount: number;

  @ApiProperty()
  @Expose()
  readonly pageCount: number;

  @ApiProperty()
  @Expose()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  @Expose()
  readonly hasNextPage: boolean;
}
