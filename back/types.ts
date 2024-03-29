import { Request as ExpressRequest } from 'express';
import { IncomingHttpHeaders } from 'http';
import {
  SharedGetMessagesQuery,
  SharedGetPostsQuery,
  UserBase,
  SharedNewPostBody,
  SharedNewUserBody,
  Message
} from '@shared/types.js';

declare global {
  namespace Express {
    export interface Request {
      userId?: string;
    }
  }
}

export interface NewPostBody extends SharedNewPostBody {
  categories: string;
}

export interface UpdatePostBody extends Partial<NewPostBody> {}

export interface UpdateUserBody extends Omit<Partial<SharedNewUserBody>, 'email' | 'password'> {}

export interface DecodedToken {
  username: string;
  id: number;
}

export type PaginationQuery = {
  limit: string;
  offset: string;
};

export interface FirebaseLoginRes {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}

export interface FirebaseTokenRes {
  expires_in: string;
  token_type: 'Bearer';
  refresh_token: string;
  id_token: string;
  user_id: string;
  project_id: string;
}

export interface FirebasePasswordResetRes {
  email: string;
  requestType: string;
}

export type GetMessagesQuery = PaginationQuery & SharedGetMessagesQuery;

export type GetPostsQuery = PaginationQuery & SharedGetPostsQuery;

export type GetFollowsQuery = PaginationQuery;

export interface UserBaseKeys extends Array<keyof UserBase> {}

export interface RequestWithHeader<P, ResBody, ReqBody, ReqQuery, ReqHeaders>
  extends ExpressRequest<P, ResBody, ReqBody, ReqQuery> {
  headers: IncomingHttpHeaders & ReqHeaders;
}

export interface ServerToClientEvents {
  message: (message: Message) => void;
}

export interface ClientToServerEvents {
  message: (message: Message) => void;
}

export interface InterServerEvents {}

export interface SocketData {
  userId: string;
}
