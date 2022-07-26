const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const ReactionSchema = new Schema(
{
    reactionId: {
        type: Types.ObjectId,
        default: new Types.ObjectId(),
    },

    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },

    username: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: (time) => moment(time).format('MMM DD, YYYY [at] hh:mm a')
        },
},

    {
    toJSON: {
        getters: true,
      },
      id: false,
    }
);

const Reaction = model('Reaction', ReactionSchema);

module.exports = Reaction; 