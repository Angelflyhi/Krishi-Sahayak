const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { register, login } = require('../backend/controllers/userController');
const User = require('../backend/models/User');

jest.mock('../backend/models/User');

describe('userController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('registers a new user', async () => {
    const req = { body: { username: 'farmer1', password: 'secret', language: 'hi' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue({ _id: '1', username: 'farmer1', language: 'hi', is_expert: false });

    await register(req, res, next);

    expect(bcrypt.hash).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it('logs in an existing user', async () => {
    const req = { body: { username: 'farmer1', password: 'secret' } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    const next = jest.fn();

    const hash = await bcrypt.hash('secret', 10);
    User.findOne.mockResolvedValue({ _id: '1', username: 'farmer1', password: hash, is_expert: true });

    await login(req, res, next);

    expect(res.json).toHaveBeenCalled();
    const token = res.json.mock.calls[0][0].token;
    expect(jwt.decode(token).username).toBe('farmer1');
  });
});
