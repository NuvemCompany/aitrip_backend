import { Request } from 'express';
import { OAuthProvider } from '../types/oauth-provider.type';

export interface UserRequest extends Request {
  user: {
    id: string;
    email: string;
    name: string;
    provider: OAuthProvider;
  };
}
