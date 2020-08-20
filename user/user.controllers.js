import bcrypt from 'bcrypt';
import jwt from 'jwt-simple';
import User from './user.model';

/**
 * Retrieves the entire user collection
 */
const listUsers = async (_, res) => {
  const users = await User.find();
  res.send({ users });
};

/**
 * creates a user record
 *
 * *note* The required password property will be encrypted before the row gets persisted
 */
const createUser = async (req, res) => {
  const { password } = req.body;

  const encrypedPassword = await bcrypt.hash(password, 6);

  const newUser = new User({
    ...req.body,
    password: encrypedPassword,
  });

  await newUser.save();

  res.send({ user: newUser });
};

/**
 * Finds a user by the specified id
 *
 * @param {String} id The id of the user to retrieve
 */
const findUserById = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  res.send({ user });
};

/**
 * Patches a user record with only the specified properties
 *
 * @param {String} id the id of the user to update
 *
 * *note* If a password property is sent it, it will be encrypted before persisting the record
 */
const updateUser = async (req, res) => {
  const { password } = req.body;
  const { id } = req.params;

  let updatedProperties = req.body;

  // re-assign updatedProperties to original value
  // with a encrypted password if one gets sent in
  if (password) {
    const encryptedPassword = await bcrypt.hash(password, 6);

    updatedProperties = {
      ...req.body,
      password: encryptedPassword,
    };
  }

  findOneAndUpdate(CONDITION, PROPERTIES_TO_UPDATE, OPTIONS);
  const updatedUser = await User.findOneAndUpdate({ _id: id }, updatedProperties, { new: true });

  res.send({ user: updatedUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.send({ error: 'User does not exist' });
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);

  isCorrectPassword
    ? res.send({ token: jwt.encode(user._id, 'abc123') })
    : res.send({ error: 'Incorrect password' });
};

export default { listUsers, createUser, findUserById, updateUser, login };
