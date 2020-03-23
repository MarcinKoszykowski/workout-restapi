import mongoose, { Schema } from 'mongoose';

const detailsSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: false,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('details', detailsSchema);
