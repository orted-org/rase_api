class EnvData {
  private envData: string;
  constructor(envData: string) {
    this.envData = envData;
  }
  getString(): string {
    return this.envData as string;
  }
  getNumber(): number {
    return Number(this.envData);
  }
  getBoolean(): boolean {
    return this.envData === "true";
  }
}
const ENV = {
  primaryInfo: {
    isDevMode: !((getEnv("NODE_ENV")?.getString() || "") === "production"),
    domain: getEnv("DOMAIN")?.getString() || "your-site.com",
    isWeb: getEnv("IS_WEB")?.getBoolean() || false,
    serverPort: getEnv("SERVER_PORT")?.getNumber() || 3000,
  },
  auth: {
    sessionSecret: getEnv("SESSION_SECRET")?.getString() || "sessionSecret",
    googleClientId : getEnv("GOOGLE_CLIENT_ID")?.getString()
  },
  connectivity: {
    redisPort: getEnv("REDIS_PORT")?.getNumber() || 6379,
    redisUri: getEnv("REDIS_URI")?.getString() || "redis",
    reactUri: getEnv("REACT_URI")?.getString() || "http://localhost:3000",
    postgresHost: getEnv("POSTGRES_HOST")?.getString() || "postgres",
    postgresPort: getEnv("POSTGRES_PORT")?.getNumber() || 5432,
    postgresUser: getEnv("POSTGRES_USER")?.getString() || "postgres",
    postgresDB: getEnv("POSTGRES_DB")?.getString() || "postgres",
    postgresPassword: getEnv("POSTGRES_PASSWORD")?.getString() || "postgres",
  },
};

function getEnv(key: string): EnvData | undefined {
  if (typeof process.env[key] === "undefined") {
    console.log(`Environment variable ${key} is not set.`);
    return undefined;
  }
  return new EnvData(process.env[key] as string);
}
export default ENV;
