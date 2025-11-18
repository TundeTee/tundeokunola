import { Complaint } from '../models/Complaint.js';


export const submitComplaint = async (req, res, next) => {
  try {
    const { message } = req.body;
    const submitterEmail = req.user?.email;
    const userId = req.user?.id || req.user?._id || null;
    if (!submitterEmail) return res.status(400).json({ error: 'Email is required' });
    if (!message || !message.trim()) return res.status(400).json({ error: 'Message is required' });
    const complaint = await Complaint.create({ email: submitterEmail, message, userId });
    res.status(201).json({ complaint });
  } catch (err) {
    next(err);
  }
};

export const myComplaints = async (req, res, next) => {
  try {
    const uid = req.user?.id || req.user?._id;
  const list = await Complaint.find({ userId: uid }).sort({ createdAt: -1 });
    res.json({ complaints: list });
  } catch (err) {
    next(err);
  }
};

export const listComplaints = async (req, res, next) => {
  try {
    const list = await Complaint.find({}).sort({ createdAt: -1 });
    res.json({ complaints: list });
  } catch (err) {
    next(err);
  }
};

export const respondComplaint = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { response, status } = req.body;
    const update = {
      adminResponse: response,
      respondedAt: new Date(),
    };
    if (status && ['submitted', 'reviewed', 'resolved'].includes(status)) {
      update.status = status;
    }
    const updated = await Complaint.findByIdAndUpdate(id, update, { new: true });
    if (!updated) return res.status(404).json({ error: 'Complaint not found' });
    res.json({ complaint: updated });
  } catch (err) {
    next(err);
  }
};

export const deleteComplaint = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Complaint.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Complaint not found' });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};