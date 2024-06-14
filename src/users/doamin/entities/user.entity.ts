import {
  User,
  UserRole,
  Account,
  Session,
  Travel,
  Preference,
  Itinerary,
  Feedback,
  TwoFactorConfirmation,
} from '@prisma/client';

export class UserEntity implements User {
  id: string;
  name: string;
  email: string | null;
  emailVerified: Date | null;
  password: string;
  image: string | null;
  role: UserRole;
  isTwoFactorEnabled: boolean;
  twoFactorConfirmation?: TwoFactorConfirmation | null;
  accounts?: Account[];
  sessions?: Session[];
  travels?: Travel[];
  preferences?: Preference[];
  itineraries?: Itinerary[];
  feedbacks?: Feedback[];

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
