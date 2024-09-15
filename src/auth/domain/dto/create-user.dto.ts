import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly image: string;

  @IsString()
  readonly emailVerifiedAt: Date;
}
