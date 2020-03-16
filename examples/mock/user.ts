function fetchUsers(req, res) {
  res.send({
    code: 200,
    message: 'success',
    data: {
      list: [
        { id: '1', name: 'king' },
        { id: '2', name: 'tom' },
      ],
    },
  });
}

function fetchProfile(req, res) {
  res.send({
    code: 200,
    message: 'success',
    data: {
      id: '111',
      name: 'king',
      admin: true,
    },
  });
}

export default {
  'GET /users': fetchUsers,
  'GET /profile': fetchProfile,
};
