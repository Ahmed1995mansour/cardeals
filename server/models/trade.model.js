import mongoose from 'mongoose';
const { Schema } = mongoose;
const tradeSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: 'pending',
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    gear: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
    bodyType: {
      type: String,
    },
    millage: {
      type: Number,
      required: true,
    },
    engineCapacity: {
      type: Number,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
    listing: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Listing',
    },
  },
  { timestamps: true }
);

const Trade = mongoose.model('Trade', tradeSchema);

export default Trade;
