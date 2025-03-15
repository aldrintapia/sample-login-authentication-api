import { Expose } from 'class-transformer';

export class ProfileDto {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  email: string;
}
