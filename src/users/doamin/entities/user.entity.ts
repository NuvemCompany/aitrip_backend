import {
  User,
  UserRole,
  OAuthAccount,
  UserAddress,
  UserPreferences,
} from '@prisma/client';

export class UserEntity implements User {
  id: string;
  email: string;
  name: string | null;
  lastName: string | null;
  image: string | null;
  role: UserRole;
  emailVerifiedAt: Date | null;
  password: string | null;
  createdAt: Date;
  updatedAt: Date;

  // Relações
  accounts?: OAuthAccount[];
  addresses?: UserAddress[];
  preferences?: UserPreferences | null;
}
