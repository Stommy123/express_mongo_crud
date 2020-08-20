import jwt from 'jwt-simple';
import User from '../user/user.model';

const withAuth = async (req, res, next) => {
  const token = (req.headers.authorization || '').split('Bearer ')[1];

  // if there is no token in the headers
  // we send back an error
  if (!token) {
    res.send({ error: 'UNAUTHENTICATED' });
  }

  // when you encode and decode, the key i.e `abc123` has to match
  // it acts as a encoding password
  let decodedToken;
  try {
    decodedToken = jwt.decode(token, 'abc123');
  } catch {
    res.send({ error: 'INVALID TOKEN' });
  }

  const currentUser = await User.findById(decodedToken);

  // if there is no user matching this id
  // we send back an error
  if (!currentUser) {
    res.send({ error: 'NO USER MATCHING THIS TOKEN' });
  }

  req.currentUser = currentUser;

  next();
};

export default { withAuth };
