import { create, driver } from 'dua';
import { fetchUser } from '../services/user';

const mixedDrive = driver.clone('flat', {
  mixed: true,
  reduce: (state, s) => {
    return {
      ...state,
      profile: s.profile.allIds[0],
    };
  },
});

const model = create(
  'user2',
  {
    fetch: fetchUser,
  },
  {
    drive: mixedDrive,
  },
);

export default {
  namespace: 'user2',
  ...model,
};
