import mongoose, { Schema, Document } from 'mongoose'

export interface IContact extends Document {
  name: string
  email: string
  phone: string
  message: string
  createdAt: Date
  updatedAt: Date
}

const ContactSchema: Schema<IContact> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      minlength: 9,
      maxlength: 15,
    },

    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
)

const Contact =
  mongoose.models.Contact ||
  mongoose.model<IContact>('Contact', ContactSchema)

export default Contact
