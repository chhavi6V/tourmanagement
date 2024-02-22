import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));
mongoose.Promise = global.Promise;

const tourSchema = new Schema(
  {
    title: String,
    startDate: Date,
    endDate: Date,
    recurrence: String,
    daysOfWeek: [String],
  },
  {
    timestamps: true,
  }
);

const Tour = mongoose.models.Tour || mongoose.model("Tour", tourSchema);

export default Tour;
