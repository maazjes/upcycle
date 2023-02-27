import express from 'express';
import got from 'got';
import { FIREBASE_API_KEY } from '../util/config.js';
import firebase from '../util/firebase.js';

const router = express.Router();

interface FirebaseTokenRes {
  expires_in: string;
  token_type: 'Bearer';
  refresh_token: string;
  id_token: string;
  user_id: string;
  project_id: string;
}

router.post<{}, { idToken: string }, { refreshToken: string }>('/refreshidtoken', async (req, res): Promise<void> => {
  const { refreshToken } = req.body;
  const newToken = await got.post(
    `https://securetoken.googleapis.com/v1/token?key=${FIREBASE_API_KEY}`,
    {
      json: {
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      }
    }
  ).json<FirebaseTokenRes>();
  res.json({ idToken: newToken.id_token });
});

router.post<{}, {}, { idToken: string }>('/verifyidtoken', async (req, res): Promise<void> => {
  await firebase.auth().verifyIdToken(req.body.idToken);
  res.status(200).json({});
});

export default router;