const mogoose = require('nongoose');

const BootcampSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    slug: String,
    description: {
        type: String,
        require: [true, 'Please add a description'],
        maxlength: [500, 'Description cannot be more than 500 characters']
    },
    website: {
        type: String,
        match: [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Please use a valid URL with HTTP or HTTPS'
        ]
    },
    phone: {
        type: String,
        match: [10, 'Phone number cannot be more than 10 characters']
    },
    email: {
        type: String,
        match: [
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            'Please enter a valid email'
        ]
    },
    address: {
        type: String,
        require: [true, 'Please add an address']
    },
    location: {
        //GeoJSON Point
        type: {
            type: String,
            enum: ['Point'],
            require: true
        },
        coordinates: {
            type: [Number],
            require: true,
            index: '2dsphere'
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String
    },
    careers: {
        type: [String],
        require: true,
        enum: ["Web Development", "UI/UX", "Mobile Development", "UI/UX", "Business", "Other"]
    },
    averageRating: {
        type: Number,
        min: [1, 'Rating must be atleast 1'],
        max: [10, 'Rating can not be more than 10']
    },
    averageCost: Number,
    photo: {
        type: String,
        default: 'no-photo.jpg'
    },
    housing: {
        type: String,
        default: false,
    },
    jobAssistance: {
        type: Boolean,
        default: false,
    },
    jobGurantee: {
        type: Boolean,
        default: false,
    },
    acceptGi: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Bootcamp', BootcampSchema);