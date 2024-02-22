import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

mongoose.Promise = global.Promise;

const bookingSchema = new mongoose.Schema({
    tourId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    userId: {
      type: String, // Assuming a simple string for user ID, adjust as per your authentication logic
      required: true,
    },
    selectedDate: {
      type: Date,
      required: true,
    },
    // Add other relevant fields for the booking data
});
  

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
