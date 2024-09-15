import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOAuthAccountDto {
  @IsString()
  @IsNotEmpty()
  readonly provider: string;

  @IsString()
  @IsNotEmpty()
  readonly providerUserId: string;

  @IsString()
  readonly accessToken: string;

  @IsString()
  readonly refreshToken: string;

  @IsNotEmpty()
  user: { connect: { id: string } };
}
