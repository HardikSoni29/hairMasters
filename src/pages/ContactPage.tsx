import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Car } from 'lucide-react';
import { Button } from '../components/common/Button';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-20 bg-caviar min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] tracking-widest-2xl uppercase text-gold-muted font-medium block mb-3">
            The Indore Sanctuary
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-white tracking-tight">
            Visit Hair Masters <span className="italic font-normal gold-text-champagne">Vijay Nagar</span>
          </h1>
          <p className="text-xs text-gray-400 font-light mt-3 leading-relaxed">
            Conveniently positioned in PU-4 Scheme 54, behind C21 & Malhar Mega Mall. Private valet concierge and VIP suites await your arrival.
          </p>
          <div className="w-12 h-[1px] bg-gold-400/60 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Contact Info */}
          <div className="space-y-8">
            <div className="bg-noir-800 border border-noir-border p-8 sm:p-10 space-y-7">
              <h3 className="font-serif text-2xl font-normal text-white flex items-center">
                <MapPin className="w-5 h-5 text-gold-400 mr-2.5" />
                Sanctuary Address
              </h3>

              <div className="space-y-3.5 text-xs text-gray-300 font-light leading-relaxed">
                <p className="text-base font-serif text-gold-champagne font-normal">
                  Hair Masters Luxury Salon & Coiffure
                </p>
                <p>
                  Plot No. 12, PU-4 Commercial Complex, Scheme No. 54,
                  <br />
                  Behind C21 & Malhar Mega Mall,
                  <br />
                  Vijay Nagar, Indore, Madhya Pradesh 452010
                </p>

                <div className="pt-2 flex items-center space-x-2 text-gold-300">
                  <Car className="w-4 h-4 text-gold-400 shrink-0" />
                  <span className="tracking-wider text-[11px]">Complimentary Chauffeur & Valet Concierge at Porte-Cochère</span>
                </div>
              </div>

              <div className="pt-6 border-t border-noir-border grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-gray-500 block mb-1">
                    Concierge Hotlines
                  </span>
                  <a href="tel:+917314058888" className="text-white hover:text-gold-300 font-serif text-sm block">
                    +91 731 405 8888
                  </a>
                  <a href="tel:+919826099999" className="text-gray-400 hover:text-gold-300 text-xs block">
                    +91 98260 99999
                  </a>
                </div>

                <div>
                  <span className="text-[9px] uppercase tracking-widest text-gray-500 block mb-1">
                    Direct Correspondence
                  </span>
                  <a href="mailto:indore@hairmasters.in" className="text-white hover:text-gold-300 text-xs">
                    indore@hairmasters.in
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-noir-border text-xs">
                <span className="text-[9px] uppercase tracking-widest text-gray-500 block mb-1">
                  Atelier Hours
                </span>
                <p className="text-white">
                  Monday – Sunday: <span className="text-gold-champagne font-medium">10:00 AM – 09:30 PM</span>
                </p>
                <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest">Open all days & destination wedding dates</p>
              </div>
            </div>

            {/* Embedded Map */}
            <div className="relative h-64 w-full bg-noir-800 border border-noir-border overflow-hidden group">
              <iframe
                title="Hair Masters Vijay Nagar Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14717.382457814407!2d75.8829961!3d22.7523908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396302a64c4805e3%3A0xe54d6e9f29eeea63!2sVijay%20Nagar%2C%20Indore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 filter invert-[90%] hue-rotate-180 contrast-[1.2] opacity-80 group-hover:opacity-100 transition-opacity"
                loading="lazy"
              />
              <div className="absolute bottom-3 left-3 bg-noir-900/90 px-3.5 py-1.5 border border-gold-500/30 text-[9px] uppercase tracking-widest text-gold-300 backdrop-blur-md">
                Vijay Nagar • Indore Prime Sector
              </div>
            </div>
          </div>

          {/* Right: Bespoke Inquiry Form */}
          <div className="bg-noir-800 border border-noir-border p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <span className="text-[9px] uppercase tracking-widest-xl text-gold-muted font-medium block mb-2">
                Haute Consultation
              </span>
              <h3 className="font-serif text-3xl font-light text-white mb-2">
                Converse with Our Salon Director
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-light mb-8">
                Inquire about private salon buyouts for destination weddings, VIP bridal chamber reservations, or bespoke executive packages.
              </p>

              {submitted ? (
                <div className="p-8 bg-emerald-950/60 border border-emerald-500/40 text-center space-y-3">
                  <ShieldCheck className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="font-serif text-xl font-normal text-white">Inquiry Dispatched</h4>
                  <p className="text-xs text-gray-300 font-light">
                    Thank you, {name}. Our Indore ritual concierge will reach out to you via direct telephone or WhatsApp shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block uppercase tracking-widest text-gray-400 mb-1.5 font-medium text-[10px]">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Maharani Gayatri Devi"
                      className="w-full bg-noir-900 border border-noir-border px-4 py-3 text-white focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block uppercase tracking-widest text-gray-400 mb-1.5 font-medium text-[10px]">
                        Contact Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98260 00000"
                        className="w-full bg-noir-900 border border-noir-border px-4 py-3 text-white focus:outline-none focus:border-gold-500"
                      />
                    </div>

                    <div>
                      <label className="block uppercase tracking-widest text-gray-400 mb-1.5 font-medium text-[10px]">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="client@domain.com"
                        className="w-full bg-noir-900 border border-noir-border px-4 py-3 text-white focus:outline-none focus:border-gold-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block uppercase tracking-widest text-gray-400 mb-1.5 font-medium text-[10px]">
                      Inquiry Particulars & Desired Services *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Occasion dates, guest count, or bespoke hair and skin requirements..."
                      className="w-full bg-noir-900 border border-noir-border p-3.5 text-white focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div className="pt-3">
                    <Button type="submit" variant="gold" size="lg" className="w-full justify-center">
                      Transmit VIP Inquiry
                    </Button>
                  </div>
                </form>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-noir-border text-[10px] uppercase tracking-widest text-gray-500 text-center font-light">
              Absolute Discretion Assured • Hair Masters Luxury Salon Indore
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
