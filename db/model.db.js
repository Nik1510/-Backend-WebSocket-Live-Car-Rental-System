import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        unique :[true,"email already exists"],
        required:true,
        trim:true,
    },
    password:{
        type:String,
        minlength:[6,"password min Length must be of 6"]
    },
    role:{
        type:String,
        enum:["admin","customer"],
        default:"customer"
    }
},
{timestamps:true})

export const User = mongoose.models.User || mongoose.model("User",UserSchema);

const carSchema = new mongoose.Schema({
    brand:{
        type:String,
        required:true,
        trim:true,
    },
    model:{
        type:String,
        trim:true,
        required:true,
    },
    category:{
        type:String,
        enum:["SUV", "Sedan", "Hatchback"],
        required:[true,"category is required"]
    },
    pricePerDay:{
        type:Number,
        required:true,
        min:0,
    },
     isAvailable: {
      type: Boolean,
      default: true,
    },

},
{
    timestamps:true,
})

export const Car = mongoose.models.Car || mongoose.model("Car",carSchema)

const bookingSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    carId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Car",
        required:true,
    },
    startDate: {
    type: Date,
    required: true
    },
    endDate: {
      type: Date,
      required: true,
    },
    status:{
        type:String,
        enum:["ACTIVE" , "COMPLETED" , "CANCELLED"],
        required:true,
        default: "ACTIVE",
    },

},{
    timestamps:true,
})

export const Booking = new mongoose.model.Booking || mongoose.models("Booking",bookingSchema);