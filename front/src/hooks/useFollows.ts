import { useRef, useState, useEffect } from 'react';
import { FollowPage } from '@shared/types';
import { getFollowers, getFollowing } from 'services/follows';
import { concatPages } from '../util/helpers';
import { emptyPage } from '../util/constants';

interface UseFollowsQuery {
  userId: string;
  role: 'follower' | 'following';
}

const useFollows = ({
  userId,
  role
}: UseFollowsQuery): [FollowPage | null, typeof setFollows, typeof fetchFollows] => {
  const [follows, setFollows] = useState<FollowPage | null>(null);
  const offset = useRef(0);

  const fetchFollows = async (): Promise<FollowPage> => {
    const res =
      role === 'following'
        ? await getFollowing(userId, { limit: 6, offset: offset.current })
        : await getFollowers(userId, { limit: 6, offset: offset.current });

    if (res.data) {
      offset.current += 6;
      setFollows(concatPages(follows || { ...emptyPage }, res.data));
    }
    return res.data;
  };

  useEffect((): void => {
    const initialize = async (): Promise<void> => {
      await fetchFollows();
    };
    initialize();
  }, []);

  return [follows, setFollows, fetchFollows];
};

export default useFollows;
