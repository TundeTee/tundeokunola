import { useState } from "react";
import ComplaintChat from "../common/ComplaintChat";
import { postComplaint } from "../api.js";

function ContactPage() {
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [complaint, setComplaint] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isComplaintOpen, setIsComplaintOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!complaint.trim()) {
      setError("Please enter your complaint.");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      setIsComplaintOpen(true);
      return;
    }
    try {
      setIsSubmitting(true);
      const res = await postComplaint({ token, message: complaint });
      setSuccess("Your complaint has been sent.");
      setComplaint("");
      setLastname("");
      setFirstname("");
      setEmail("");
    } catch (err) {
      setError(err.message || "Failed to send complaint");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
<section className="relative">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 text-center mt-6 mb-14">
        <div className="flex flex-col items-center text-center space-y-4">
          <p>
            TRUST YOUR LAW CASE TO OUR EXPERIENCED TEAM.
            CONTACT US FOR A FREE CASE EVALUATION.
          </p>
          <p>
            Address
            <br />
            <span>
              No. 17, Obiesan Office Complex, Beside B.K Petroleum, Orita-Aperin,
              Omowunmi/Olorunsogo Road, Ibadan, Oyo State of Nigeria
            </span>
          </p>
          <p>
            Email <br /> <span>Otundetaiwo@yahoo.com</span>
          </p>
          <p>
            Tel <br /> <span>08065353147</span>
          </p>
        </div>
  
        <div className="space-y-6">
          <div className="w-full h-64 md:h-96 rounded-md overflow-hidden shadow">
            <iframe
              title="Embedded Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126606.23896276393!2d3.80833124538026!3d7.415905397238265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10399265f5fc325d%3A0x1d6827a717767d1a!2sB.K.%20Petroleum%20Nigeria%20Limited!5e0!3m2!1sen!2sng!4v1759951138449!5m2!1sen!2sng"
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
  
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white border border-gray-200 rounded-lg p-6 shadow ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
                  Lastname
                </label>
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Okunola"
                />
              </div>
  
              <div>
                <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
                  Firstname
                </label>
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Tunde"
                />
              </div>
  
              <div className="md:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="you@example.com"
                />
              </div>
  
              <div className="md:col-span-2">
                <label htmlFor="complaint" className="block text-sm font-medium text-gray-700">Complaint *</label>
                <textarea
                  id="complaint"
                  rows={5}
                  value={complaint}
                  onChange={(e) => setComplaint(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border px-3 py-2 resize-y"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting || !complaint.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 px-6 rounded-md"
              >
                {isSubmitting ? "Sending..." : "Submit Complaint"}
              </button>
  
              {success && (
                <div className="rounded bg-green-50 border border-green-200 p-2 text-green-800">
                  {success}
                </div>
              )}
              {error && (
                <div className="rounded bg-red-50 border border-red-200 p-2 text-red-800">
                  {error}
                </div>
              )}
          </div>
   </form>
          {isComplaintOpen && (
            <ComplaintChat
              initialMessage={complaint}
              onClose={() => setIsComplaintOpen(false)}
              onSubmitted={() => {
                setIsComplaintOpen(false);
                setSuccess("Your complaint has been sent.");
                setComplaint("");
                setLastname("");
                setFirstname("");
                setEmail("");
              }}
            />
          )}
          </div>
        </div>
      
</section>
  );
}

export default ContactPage;


