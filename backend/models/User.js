import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  sex: { type: String },
  address: { type: String },
  birthdate: { type: Date },
  age: { type: Number },
});

// Middleware to calculate age based on birthdate before saving
userSchema.pre('save', function (next) {
  if (this.birthdate) {
    const birthDate = new Date(this.birthdate);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDifference = currentDate.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
      age--;
    }

    this.age = age; // Set the calculated age
  }
  next();
});

const User = mongoose.model('User', userSchema);
export default User;
