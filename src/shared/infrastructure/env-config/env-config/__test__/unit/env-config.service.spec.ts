import { Test, TestingModule } from '@nestjs/testing';
import { EnvConfigService } from '../../env-config.service';
import { EnvConfigModule } from '../../env-config.module';

describe('EnvConfigService unit tests', () => {
  let sut: EnvConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EnvConfigModule.forRoot()],
      providers: [EnvConfigService],
    }).compile();

    sut = module.get<EnvConfigService>(EnvConfigService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should return the app port', () => {
    expect(sut.getAppPort()).toBe(3000);
  });

  it('should return the database host', () => {
    expect(sut.getDatabaseHost()).toBe('localhost');
  });

  it('should return the database port', () => {
    expect(sut.getDatabasePort()).toBe(3306);
  });

  it('should return the database user', () => {
    expect(sut.getDatabaseUser()).toBe('user');
  });

  it('should return the database password', () => {
    expect(sut.getDatabasePassword()).toBe('password');
  });

  it('should return the database name', () => {
    expect(sut.getDatabaseName()).toBe('database');
  });

  it('should return the node env', () => {
    expect(sut.getNodeEnv()).toBe('test');
  });

  it('should return the jwt secret', () => {
    expect(sut.getJwtSecret()).toBe('secret');
  });

  it('should return the database url', () => {
    expect(sut.getDatabaseUrl()).toBe(
      'mysql://mysql:password@localhost:3306/database',
    );
  });
});
