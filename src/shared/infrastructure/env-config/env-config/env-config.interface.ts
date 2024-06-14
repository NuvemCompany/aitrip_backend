export interface EnvConfig {
  getAppPort(): number;
  getDatabaseHost(): string;
  getDatabasePort(): number;
  getDatabaseUser(): string;
  getDatabasePassword(): string;
  getDatabaseName(): string;
  getNodeEnv(): string;
  getNodeEnv(): string;
  getJwtSecret(): string;
  getDatabaseUrl(): string;
}
