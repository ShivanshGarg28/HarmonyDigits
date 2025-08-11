const mongoose = require("mongoose")
const validator = require("validator")

const astrologerSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        maxLength:50
    },
    lastName:{
        type:String,
        maxLength:50
    },
    age:{
        type:Number, 
        required:true,
        max:100
    },
    gender:{
        type:String,
        enum:{
            values:["Male","Female","Other"],
            message:`{VALUE} is not valid gender`
        },
        required:true
    },
    skills: {
        type: [String],
        enum:{
            values:[
                "Vedic Astrology",
                "Western Astrology",
                "KP Astrology",
                "Nadi Astrology",
                "Lal Kitab",
                "Tarot Reading",
                "Numerology",
                "Palmistry",
                "Horoscope Matching",
                "Birth Chart Analysis",
                "Muhurat Calculation",
                "Prashna Kundli",
                "Gemstone Consultation",
                "Face Reading",
                "Reiki Healing",
                "Chakra Balancing",
                "Meditation & Spiritual Guidance",
                "Vastu Shastra Consultation",
                "Angel Card Reading"
            ]
        },
        required: true
    },
    language:{
        type:[String],
        enum:{
            values:[
                "Hindi",
                "English",
                "Sanskrit",
                "Tamil",
                "Telugu",
                "Kannada",
                "Gujarati",
                "Marathi",
                "Punjabi",
                "Bengali",
                "Malayalam",
                "Urdu",
                "Odia",
                "Assamese"
            ],
        },
        required:true
    },
    experience:{
        type:Number,
        default:0,
        max:50
    },
    rating:{
        type:Number,
        default:0,
    },
    price:{
        type:Number,
        required:true
    },
    about:{
        type:String,
        required:true,
        maxLength:200  //these are characters not words
    },
    emailId:{
        type:String,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Enter Valid Email ID")
            }
        },
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a Strong Password" + value)
            }
        },
        required:true
    }
},
{
    timestamps:true
})


const Astrologer = new mongoose.model("Astrologer",astrologerSchema)

module.exports = Astrologer