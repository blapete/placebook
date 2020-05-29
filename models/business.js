const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const businessSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    address: String,
    phone: { type: String, required: true},
    reservations: { type: Array },
    times: {
        open: {type: Number},
        close: {type: Number},
        timeslot_length: {type: Number},
        capacity: {type: Number}
    },
    ownerId: { type: Schema.Types.ObjectId, ref: "User" }
  });
  
  const Business = mongoose.model("Business", businessSchema);
  
  module.exports = Business;