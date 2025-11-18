const ContactPage =() => {

  return (
<section className="relative ">
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
  
          
          </div>
        </div>
      
</section>
  );
}

export default ContactPage;


