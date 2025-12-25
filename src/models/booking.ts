import mongoose, {Schema, Document, Types} from "mongoose";

interface IBooking extends Document {
  serviceId: number
  userId: Types.ObjectId
  fullName: string
  email: string
  phone: string
  date: string
  time: string
  status: 'pending' | 'approved' | 'cancelled',
  createdAt: Date
}

const BookingSchema: Schema<IBooking> = new Schema({
    serviceId: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'approved', 'cancelled'],
      default: 'pending',
    },
}, {timestamps: true})

const Booking = mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema)

export default Booking