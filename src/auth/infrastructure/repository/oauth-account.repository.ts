import { Injectable } from '@nestjs/common';
import { OAuthAccount, User } from '@prisma/client';
import { CreateOAuthAccountDto } from 'src/auth/domain/dto/create-oauth-account.dto';
import { UpdateOAuthAccountDto } from 'src/auth/domain/dto/update-oauth-account.dto';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OAuthAccountRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByProviderAndProviderUserId(
    provider: string,
    providerUserId: string,
  ): Promise<(OAuthAccount & { user: User }) | null> {
    return this.prisma.oAuthAccount.findUnique({
      where: {
        provider_providerUserId: {
          provider,
          providerUserId,
        },
      },
      include: { user: true },
    });
  }

  async create(data: CreateOAuthAccountDto): Promise<OAuthAccount> {
    return this.prisma.oAuthAccount.create({
      data,
    });
  }

  async update(id: string, data: UpdateOAuthAccountDto): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
}
