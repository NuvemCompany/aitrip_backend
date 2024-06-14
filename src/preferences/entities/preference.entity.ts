import { Preference as PrismaPreference } from '@prisma/client';

export class PreferenceEntity implements PrismaPreference {
  id: string;
  userId: string;
  type: string;
  value: string;
}
