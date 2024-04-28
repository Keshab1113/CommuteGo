const Busdata = require("../models/busdata-model");

const busdataForm = async (req, res) => {
    try {
        const response = req.body;
        await Busdata.create(response);
        return res.status(200).json({ message: "Bus Added successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Bus data does not save successfully" });
    }
}
const busdatas = async (req, res) => {
    try {
        const response = await Busdata.find();
        if (!response || response.length === 0) {
            return res.status(404).json({ msg: "No BusData Found." });
        }
        res.status(200).json(response );
    } catch (error) {
        console.log(`busdata: ${error}`);
    }
}
const updateBusDataById = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedBusData = req.body;
        const updatedData = await Busdata.updateOne({ _id: id }, {
            $set: updatedBusData,
        });
        return res.status(200).json(updatedData);
    } catch (error) {
        next(error);
    }
}
const getBusDataById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Busdata.findOne({ _id: id });
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
    }
}
const deleteBusDataById = async (req, res) => {
    try {
        const id = req.params.id;
        await Busdata.deleteOne({ _id: id });
        return res.status(200).json({ message: "Bus Deleted Successfully." });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { busdatas, busdataForm, updateBusDataById, getBusDataById, deleteBusDataById } ;