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
  DB: {
    URL: process.env.DB_URL!,
  },
};
