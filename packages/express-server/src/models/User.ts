import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userName: 'string',
  firstName: 'string',
  lastName: 'string',
  password: 'string',
});

export const User = mongoose.model('user', userSchema);
