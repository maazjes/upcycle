import { ServiceAccount } from 'firebase-admin';

const NODE_ENV = process.env.NODE_ENV || 'development';

if (NODE_ENV === 'development') {
  // eslint-disable-next-line import/no-extraneous-dependencies
  const dotenv = await import('dotenv');
  dotenv.config();
}

const PORT = process.env.PORT || 8080;
const SECRET = process.env.SECRET || 'susanna';
const DATABASE_URL = process.env.DATABASE_URL!;
const AWS_S3_ACCESS_KEY_ID = process.env.AWS_S3_ACCESS_KEY_ID!;
const AWS_S3_SECRET_ACCESS_KEY = process.env.AWS_S3_SECRET_ACCESS_KEY!;
const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY!;
const FIREBASE_BUCKET_URL = process.env.FIREBASE_BUCKET_URL!;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY!;
const VERIFIED_EMAIL = process.env.VERIFIED_SENDER!;
const SERVICE_ACCOUNT = JSON.parse(process.env.SERVICE_ACCOUNT!) as ServiceAccount;

export {
  NODE_ENV,
  DATABASE_URL,
  PORT,
  SECRET,
  AWS_S3_ACCESS_KEY_ID,
  AWS_S3_SECRET_ACCESS_KEY,
  FIREBASE_API_KEY,
  FIREBASE_BUCKET_URL,
  SENDGRID_API_KEY,
  VERIFIED_EMAIL,
  SERVICE_ACCOUNT
};
