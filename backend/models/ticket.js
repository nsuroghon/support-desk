const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    product: {
        type: String,
        required: [true, "Please add a product"],
        enum: ['iPhone', 'Macbook Pro', 'iMac', 'iPad']
    },
    description: {
        type: String,
        required: [true, 'Please enter a description of the issue']
    },
    status: {
        type: String,
        required: true,
        enum: ['new', 'open', 'closed'],
        default: 'new',
    }
},

    {
        timestamps: true
    }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;