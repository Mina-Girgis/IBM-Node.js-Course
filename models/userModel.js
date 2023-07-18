const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: [true, 'name is required'],
		},
		email: {
			type: String,
			trim: true,
			unique: true,
			required: [true, 'email is required'],
		},
		password: {
			type: String,
			select: false,
			required: [true, 'password is required'],
		},
		role: {
			type: String,
			enum: ['admin', 'user'],
			default: 'user',
		},
	},
	{ timestamps: true }
);
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();

	this.password = await bcrypt.hash(this.password, 12); // hash the password
	this.passwordConfirm = undefined; // dont save it in database
	next();
});
userSchema.methods.matchPassword = async function (inputPassword, userPassword) {
	return await bcrypt.compare(inputPassword, userPassword);
};
const User = mongoose.model('User', userSchema);
module.exports = User;
