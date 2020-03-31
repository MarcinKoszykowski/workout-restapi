import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    required: true,
    default: () => Date.now() + 7200000,
  },
});

export default mongoose.model('user', userSchema);
