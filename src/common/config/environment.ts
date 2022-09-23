import * as dotenv from 'dotenv';
dotenv.config();

interface IEnvironment {
  APP: {
    NAME: string;
    PORT: number | string;
    ENV: string;
  };
  JWT: {
    SECRET: string;
  };
  EMAIL: {
    SERVICE: string;
    USERNAME: string;
    PASSWORD: string;
  };
  DB: {
    URL: string;
  };
}

export const environment: IEnvironment = {
  APP: {
    NAME: process.env.APP_NAME!,
    PORT: process.env.APP_PORT!,
    ENV: process.env.APP_ENV!,
  },
  JWT: {
    SECRET: process.env.JWT_SECRET!,
  },
  EMAIL: {
    SERVICE: process.env.EMAIL_SERVICE,
    USERNAME: process.env.EMAIL_USERNAME,
    PASSWORD: process.env.EMAIL_PASSWORD,
  },
  DB: {
    URL: process.env.DB_URL!,
  },
};
