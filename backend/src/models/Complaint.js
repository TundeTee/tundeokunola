import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, lowercase: true, trim: true },
    message: { type: String, required: true, trim: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    status: { type: String, enum: ['submitted', 'reviewed', 'resolved'], default: 'submitted' },
    adminResponse: { type: String, default: null },
    respondedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export const Complaint = mongoose.model('Complaint', complaintSchema);