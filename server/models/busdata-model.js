const { Schema, model } = require("mongoose");

const busdataSchema = new Schema({
    id: { type: String, default: 0 },
    name: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    route: { type: String },
});
const Busdata = new model("Busdata", busdataSchema);

module.exports = Busdata;