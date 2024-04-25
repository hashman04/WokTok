const mongoose = require("mongoose");
var schema = new mongoose.Schema(
  {
    active: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["collaborator"],
    default: "regular",
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
  },
  loginHistory: [
    {
      timestamp: {
        type: Date,
        default: Date.now,
      },
      action: String,
    },
  ],
  profilePhoto: {
    type: String,
  },
});

const videoSessionSchema = new mongoose.Schema({
  sessionID: {
    type: String,
    unique: true,
    required: true,
  },
  participants: [
    {
      userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      username: String,
    },
  ],

  startTime: {
    type: Date,
  },
  endTime: {
    type: Date,
  },
  duration: {
    type: Number,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const VideoSession = mongoose.model("VideoSession", videoSessionSchema);
const UserDB = mongoose.model("ome", schema);
const User = mongoose.model("User", userSchema);

module.exports = { UserDB, User, VideoSession };
