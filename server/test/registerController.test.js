import registerUser  from '../Controllers/registerController'

test('rejects request with missing all required fields', async () => {
  const req = { body: {} };
  const res = { json: jest.fn() };

  await registerUser(req, res);

  expect(res.json).toHaveBeenCalledWith({errors:[{ error: 'Please provide all required fields' }]});
});


test('rejects request with numeric values in firstName field', async () => {
  const req = { body: { firstName: '123', lastName: 'Doe', email: 'valid@email.com', password: 'strongPassword$123', province: 'Ontario', city: 'Anytown', areaCode: 'N2E1A1'  } };
  const res = { json: jest.fn() };

  await registerUser(req, res);

  expect(res.json).toHaveBeenCalledWith({
    errors: [
      { error: 'Enter valid first name' }
    ],
  });
});

test('rejects request with numeric values in lastName field', async () => {
  const req = { body: { firstName: 'rock', lastName: '09', email: 'valid@email.com', password: 'strongPassword$123', province: 'Ontario', city: 'Anytown', areaCode: 'N2E1A1'  } };
  const res = { json: jest.fn() };

  await registerUser(req, res);

  expect(res.json).toHaveBeenCalledWith({
    errors: [
      { error: 'Enter valid last name' }
    ],
  });
});


test('rejects request with invalid province', async () => {
  const req = { body: { firstName: 'John', lastName: 'Doe', email: 'valid@email.com', password: 'strongPassword$123', province: 'provinceNotInArray', city: 'Anytown', areaCode: 'A1C1E3' } };
  const res = { json: jest.fn() };

  await registerUser(req, res);

  expect(res.json).toHaveBeenCalledWith({ errors: [{ error: 'Enter valid province' }] });
});

test('rejects request with numeric value in city field', async () => {
  const req = { body: { firstName: 'John', lastName: 'Doe', email: 'valid@email.com', password: 'strongPassword$123', province: 'Quebec', city: 1234, areaCode: 'A1C1E3' } };
  const res = { json: jest.fn() };

  await registerUser(req, res);

  expect(res.json).toHaveBeenCalledWith({ errors: [{ error: 'Enter valid city' }] });
});

test('rejects request with invalid email format', async () => {
  const req = { body: { firstName: 'John', lastName: 'Doe', email: 'inValidEmail', password: 'strongPassword$123', province: 'Manitoba', city: 'Anytown', areaCode: 'A1C1E3' } };
  const res = { json: jest.fn() };

  await registerUser(req, res);

  expect(res.json).toHaveBeenCalledWith({ errors: [{ error: 'Invalid email format' }] });
});

test('rejects request with invalid area code format', async () => {
  const req = { body: { firstName: 'John', lastName: 'Doe', email: 'valid@email.com', password: 'strongPassword$123', province: 'Ontario', city: 'Toronto', areaCode: 'invalidAeraCode' } };
  const res = { json: jest.fn() };

  await registerUser(req, res);

  expect(res.json).toHaveBeenCalledWith({ errors: [{ error: 'Invalid area code format' }] });
});

test('rejects request with password less than 8 characters', async () => {
  const req = { body: { firstName: 'John', lastName: 'Doe', email: 'valid@email.com', password: 'short', province: 'Ontario', city: 'Toronto', areaCode: 'A1C1B2' } };
  const res = { json: jest.fn() };

  await registerUser(req, res);

  expect(res.json).toHaveBeenCalledWith({errors:[{error:"Password should be at least 8 characters long and contain a combination of letters, numbers, and special characters"}]})
});

jest.mock('../db.js', () => ({
  connectToDb: jest.fn(() => ({
    collection: jest.fn(() => ({
      findOne: jest.fn(),
      insertOne: jest.fn(() => ({ insertedId: 'dummyId' })),
    })),
  })),
}));

test('registers a user successfully when all fields are provided correctly', async () => {
  const req = {
    body: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'jabcdoe@example.com',
      password: 'StrongPassword$123',
      province: 'Ontario',
      city: 'Toronto',
      areaCode: 'A1C1B2',
    },
  };
  const res = { json: jest.fn() };

  await registerUser(req, res);

  expect(res.json).toHaveBeenCalledWith({
    message: 'User registered successfully',
    user: { insertedId: 'dummyId' },
  });
});