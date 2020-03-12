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

export default {
  'GET /users': fetchUsers,
};
