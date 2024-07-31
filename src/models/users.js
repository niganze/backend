import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId},
    Names: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    picture:{type:String,
    required:false},
    password: {
        type: String,
        required: true
    },
    Username:{type:String},
    role: {
        type: String,
        default:"user",
       required:false
    },
    otpExpiresAt: {
        type: String,
        required: false
    },
    otp: {
        type: String,
        required: false
    },
    token:{type:String,
    },
    verified:{type:Boolean,
    default:false   },
    active: { type: Boolean, default: true }
    
}, {
    timestamps: { currentTime: () => new Date() }, 
  }

).set('strictPopulate', false);
usersSchema.pre('save', function (next) {
    this.userId=this._id;
    const now = new Date();
    next();
  });
 export  const User = mongoose.model('User', usersSchema);

 
