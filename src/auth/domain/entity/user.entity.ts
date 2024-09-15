export class User {
  constructor(
    private readonly id: string,
    private readonly email: string,
    private readonly name: string,
    private readonly image: string,
    private readonly emailVerifiedAt: Date,
    private readonly provider: string,
  ) {}

  getId(): string {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  getName(): string {
    return this.name;
  }

  getProvider(): string {
    return this.provider;
  }

  getImage(): string {
    return this.image;
  }

  getEmailVerifiedAt(): Date {
    return this.emailVerifiedAt;
  }
}
