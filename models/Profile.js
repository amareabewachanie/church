const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    handle: {
        type: String,
        required: true,
        max: 40,
    },
    phone: {
        type: String,
        required: true,
    },
    company: {
        type: String,
    },
    website: {
        type: String,
    },
    location: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    skills: {
        type: [String],
        required: true,
    },
    bio: String,
    social: {
        githubusername: {
            type: String,
        },
        youtube: {
            type: String,
        },
        twitter: {
            type: String,
        },
        facebook: {
            type: String,
        },
        instagram: {
            type: String,
        },
        linkedin: {
            type: String,
        },
    },
    experience: [
        {
            title: {
                type: String,
                required: true,
            },
            company: {
                type: String,
                required: true,
            },
            location: { type: String },
            from: {
                type: Date,
                required: true,
            },
            to: Date,
            current: {
                type: Boolean,
                default: false,
            },
            description: { type: String },
        },
    ],
    education: [
        {
            school: {
                type: String,
                required: true,
            },
            degree: {
                type: String,
                required: true,
            },
            fieldofstudy: { type: String, required: true },
            from: {
                type: Date,
                required: true,
            },
            to: { type: Date },
            current: {
                type: Boolean,
                default: false,
            },
            description: { type: String },
        },
    ],
    date: {
        type: Date,
        default: Date.now(),
    },
});
module.exports = Profile = mongoose.model('profile', profileSchema);
