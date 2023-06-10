const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv").config();

const app = express()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 8080


// mongodb conection
// console.log(process.env.MONGODB_URL);
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL).then(() => console.log("Connected to db")).catch((err) => console.log(err));

//create schema

const schemaData = mongoose.Schema({
    name: String,
    email: String,
    mobile: String

}, {
    timestamps: true
})


const userModel = mongoose.model("user", schemaData);

//read
app.get("/", async (req, res) => {
    const data = await userModel.find({})  //this get all data from database
    // console.log(data);
    res.send({ success: true, data: data })
});

//create data ||save data in mongoDB

app.post("/create", async (req, res) => {
    const data = new userModel(req.body)
    await data.save();

    res.send({ success: true, message: "User Create successfully!!", data: data })

});
//update data

app.put("/update", async (req, res) => {
    //    console.log(req.body)
    //    console.log(...rest)
    const { _id, ...rest } = req.body;
    //    console.log(rest)
    const data = await userModel.updateOne({ _id: _id }, rest)

    res.send({ success: true, message: "User Update successfully!!", data: data })

});
//delete data     

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    const data = await userModel.deleteOne({ _id: id })

    res.send({ success: true, message: "User Delete successfully!!", data: data })

});
app.listen(PORT, () => console.log("server is running at port :" + PORT));
