import mongoose, { Schema, Document } from "mongoose";

export interface IRegistration extends Document {
  firstName: string;
  lastName?: string;
  email: string;
  phoneNumber: string;
  city: string;
  linkedInUrl?: string;
  portfolioUrl?: string;
  
  highestEducation: string;
  currentCompany?: string;
  currentRole: string;
  yearsOfExperience: string;
  primarySkill: string;
  
  currentCTC?: string;
  expectedCTC: string;
  noticePeriod: string;
  workSetup: string;
  willingToRelocate: boolean;
  
  createdAt: Date;
  updatedAt: Date;
}

const RegistrationSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    phoneNumber: { type: String, required: true },
    city: { type: String, required: true, trim: true },
    linkedInUrl: { type: String, trim: true },
    portfolioUrl: { type: String, trim: true },
    
    highestEducation: { type: String, required: true },
    currentCompany: { type: String, trim: true },
    currentRole: { type: String, required: true, trim: true },
    yearsOfExperience: { type: String, required: true },
    primarySkill: { type: String, required: true },
    
    currentCTC: { type: String, trim: true },
    expectedCTC: { type: String, required: true, trim: true },
    noticePeriod: { type: String, required: true },
    workSetup: { type: String, required: true },
    willingToRelocate: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Registration =
  mongoose.models.Registration ||
  mongoose.model<IRegistration>("Registration", RegistrationSchema);