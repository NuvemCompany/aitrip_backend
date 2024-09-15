export type jwtPayload = {
  email: string;
  sub: string;
  name: string;
  image: string;
  tokenType: string;
  emailVerifiedAt: Date;
};
