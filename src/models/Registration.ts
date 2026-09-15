import mongoose, { Schema, Document } from "mongoose";

export interface IRegistration extends Document {
  firstName: string;
  lastName?: string;
  gender: string;
  dateOfBirth: string;
  parentFirstName: string;
  parentLastName?: string;
  email: string;
  pinCode: string;
  country: string;
  timeZone: string;
  phoneNumber: string;
  seriesName: string;
  festival: string;
  eventDate: string;
  eventTime: string;
  showOtherWorkshops: boolean;
  showOtherSeries: boolean;
  subscribePosts: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RegistrationSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, trim: true },
    gender: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    parentFirstName: { type: String, required: true, trim: true },
    parentLastName: { type: String, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    pinCode: { type: String, required: true },
    country: { type: String, required: true },
    timeZone: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    seriesName: { type: String, required: true },
    festival: { type: String, required: true },
    eventDate: { type: String, required: true },
    eventTime: { type: String, required: true },
    showOtherWorkshops: { type: Boolean, default: false },
    showOtherSeries: { type: Boolean, default: false },
    subscribePosts: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  },
);

export const Registration =
  mongoose.models.Registration ||
  mongoose.model<IRegistration>("Registration", RegistrationSchema);
