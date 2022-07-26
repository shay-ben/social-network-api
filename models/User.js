const { Schema, model } = require("mongoose");

// Schema to create User model
const userSchema = new Schema(
    {
     username: {
     type: String,
     unique: true,
     require: true,
     trim: true,
    },

    email: {
    type: String,
    require: true,
    unique: true,
    match: [
    //use last HW as reference 
    /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/,
    "Must provide a valid email address!",
    ],
  },
    
      thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: "thought",
        },
      ],

      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: "user",
        },
      ],
    },

      // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    {
      toJSON: {
        virtuals: true,

      },
      id: false,
    }
  );


  // Create a virtual property `friendCount` that gets the amount of friends per user
  userSchema.virtual("friendCount")
  
  // getter 
  .get(function () {
    return this.friends.length;
  });
  
  // Initialize our User model
  const User = model("user", userSchema);

  module.exports = User;