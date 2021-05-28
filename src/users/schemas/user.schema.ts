import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  // this is for hide _v key form collection
  // it create two timestamp field createAt and updateAt
  { timestamps: true, versionKey: false },
);
