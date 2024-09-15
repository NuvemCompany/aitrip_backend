import { PartialType } from '@nestjs/mapped-types';
import { CreateOAuthAccountDto } from './create-oauth-account.dto';

export class UpdateOAuthAccountDto extends PartialType(CreateOAuthAccountDto) {}
