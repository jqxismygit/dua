import { create } from 'dua';
import { fetchUser } from '../services/user';
const model = create('user', {
  fetch: fetchUser,
});

export default {
  namespace: 'user',
  ...model,
};
