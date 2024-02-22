import mongoose, { Schema } from "mongoose";

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Use native promises
mongoose.Promise = global.Promise;

// Define the Booking schema
const bookingSchema = new Schema({
  username: { 
    type: String,
    required: true,
  },
  selectedDate: {
    type: Date,
    required: true,
  },
});

// Compile the Booking model if it's not already compiled
const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

// Export the Booking model
module.exports = Booking;
