import request from 'umi-request';

export const fetchUser = () => request.get('/users');

export const fetchProfile = () => request.get('/profile');