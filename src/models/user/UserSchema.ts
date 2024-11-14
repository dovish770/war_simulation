import mongoose, { Schema } from 'mongoose';
import IUser from '../../types/user';
import IOrganization from '../../types/organization';


const ResourceSchema = new Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true, default: 0 }
});

const OrganizationSchema = new Schema<IOrganization>({
    name: { type: String, required: true },
    resources: { type: [ResourceSchema], required: true },
    budget: { type: Number, required: true }
});

const userSchema: Schema<IUser> = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    organization: {
        type: OrganizationSchema,
        required: true
    },
    isDefence: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
