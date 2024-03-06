const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            minlength: [2, "First Name must be at least 2 characters"],
            required: [true, "First name is required"]
        },
        lastName: {
            type: String,
            minlength: [2, "Last Name must be at least 2 characters"],
            required: [true, "Last name is required"]
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            validate: [
                {
                    validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
                    message: "Please enter a valid email"
                },
                {
                    validator: async val => {
                        let foundUser = await mongoose.models.User.findOne({ email: val });
                        return !foundUser
                    },
                    message: "This email already exists, try another one!"
                }
            ]},
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be 8 characters or longer"]
        }
    }, { timestamps: true });

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);

UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

module.exports = mongoose.model('User', UserSchema);