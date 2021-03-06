import { Document, Schema, model, Mongoose } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

export interface userInterface extends Document {
	name: string,
	email: {
		email: string,
		createdAt?: Date,
		updatedAt?: Date
	},
	password?: {
		password: string,
		createdAt?: Date,
		updatedAt?: Date

	},
	createdAt?: Date,
	updatedAt?: Date

	getReturnJson(): any
}

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: new Schema({
		email: {
			type: String,
			lowercase: true,
			required: true,
			unique: true
		},
	},
		{
			_id: false,
			timestamps: true,
		}),
	password: new Schema({
		password: {
			type: String,
			required: false
		},
	},
		{
			_id: false,
			timestamps: true,
		}),
})

UserSchema.plugin(mongoosePaginate)

UserSchema.methods.getReturnJson = function () {
	const returnJson = this.toJSON()
	delete returnJson.password.password;


	return returnJson
}


export const User = model<userInterface>('user', UserSchema);
