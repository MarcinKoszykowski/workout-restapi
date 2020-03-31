import mongoose, { Schema } from 'mongoose';

const trainingSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  sport: {
    type: String,
    required: true,
  },
  kcal: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: () => Date.now() + 7200000,
  },
});

export default mongoose.model('training', trainingSchema);
