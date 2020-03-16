import { create } from 'dua';
import { fetchProfile } from '../services/user';

const model = create('profile', {
  detail: fetchProfile,
});

export default {
  namespace: 'profile',
  ...model,
};
