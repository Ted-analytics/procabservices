'use client'
import React, { useState, useEffect } from "react";
import { Phone, MessageSquare, Clock, MapPin, AlertCircle } from "lucide-react";

// Styling utility function
const cn = (...classes) => classes.filter(Boolean).join(' ');

const CabServiceWebsite = () => {
  const [booking, setBooking] = useState({
    name: "",
    phone: "",
    pickup: "",
    destination: "",
    date: "",
    time: "",
    passengers: "",
    service: "City Ride (Kigali)"
  });

  const [validation, setValidation] = useState({
    isValid: false,
    errors: {}
  });

  const rates = {
    "City Ride (Kigali)": {
      price: "RWF 80,000/Day",
      description: "Perfect for getting around Kigali city with unlimited stops"
    },
    "Airport Transfer": {
      price: "RWF 30,000",
      description: "Direct transfer to/from Kigali International Airport"
    },
    "Hourly Rental": {
      price: "RWF 20,000/hour",
      description: "Flexible hourly booking for your convenience"
    },
    "Outstation": {
      price: "RWF 150,000/Day",
      description: "Long-distance travel outside Kigali city limits"
    }
  };

  useEffect(() => {
    validateForm();
  }, [booking]);

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!booking.name.trim()) errors.name = "Name is required";
    if (!booking.phone.trim()) errors.phone = "Phone number is required";
    if (!booking.pickup.trim()) errors.pickup = "Pickup location is required";
    if (!booking.destination.trim()) errors.destination = "Destination is required";
    if (!booking.date) errors.date = "Date is required";
    if (!booking.time) errors.time = "Time is required";
    if (!booking.passengers || booking.passengers < 1) errors.passengers = "Valid number of passengers required";

    if (Object.keys(errors).length > 0) isValid = false;

    setValidation({ isValid, errors });
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBooking(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleWhatsAppRedirect = () => {
    if (!validation.isValid) {
      return;
    }

    const message = `Hello! I'd like to book a cab:
Service: ${booking.service}
Name: ${booking.name}
Phone: ${booking.phone}
Pickup: ${booking.pickup}
Destination: ${booking.destination}
Date: ${booking.date}
Time: ${booking.time}
Passengers: ${booking.passengers}`;

    window.open(`https://wa.me/250787721374?text=${encodeURIComponent(message)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Pro Cab Services</h1>
          <p className="text-xl">Safe, Reliable, and Comfortable Transportation in Rwanda</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-12 px-4">
        {/* Rates Section */}
        <div className="bg-white rounded-lg shadow-md mb-12 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="h-6 w-6" />
            <h2 className="text-2xl font-bold">Our Services & Rates</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(rates).map(([service, details]) => (
              <div
                key={service}
                className={cn(
                  'p-4 border rounded-lg cursor-pointer transition-all duration-200',
                  booking.service === service ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-200'
                )}
                onClick={() => handleBookingChange({ target: { name: 'service', value: service } })}
              >
                <h3 className="font-semibold">{service}</h3>
                <p className="text-lg text-blue-600">{details.price}</p>
                <p className="text-sm text-gray-600 mt-2">{details.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white rounded-lg shadow-md mb-12 p-6">
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="h-6 w-6" />
            <h2 className="text-2xl font-bold">Book a Ride</h2>
          </div>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  name="name"
                  value={booking.name}
                  onChange={handleBookingChange}
                  className={cn(
                    'w-full px-4 py-2 border rounded-md',
                    validation.errors.name ? 'border-red-500' : 'border-gray-300'
                  )}
                />
                {validation.errors.name && (
                  <p className="text-red-500 text-sm mt-1">{validation.errors.name}</p>
                )}
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  name="phone"
                  value={booking.phone}
                  onChange={handleBookingChange}
                  className={cn(
                    'w-full px-4 py-2 border rounded-md',
                    validation.errors.phone ? 'border-red-500' : 'border-gray-300'
                  )}
                />
                {validation.errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{validation.errors.phone}</p>
                )}
              </div>
            </div>

            <div>
              <input
                type="text"
                placeholder="Pickup Location"
                name="pickup"
                value={booking.pickup}
                onChange={handleBookingChange}
                className={cn(
                  'w-full px-4 py-2 border rounded-md',
                  validation.errors.pickup ? 'border-red-500' : 'border-gray-300'
                )}
              />
              {validation.errors.pickup && (
                <p className="text-red-500 text-sm mt-1">{validation.errors.pickup}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Destination"
                name="destination"
                value={booking.destination}
                onChange={handleBookingChange}
                className={cn(
                  'w-full px-4 py-2 border rounded-md',
                  validation.errors.destination ? 'border-red-500' : 'border-gray-300'
                )}
              />
              {validation.errors.destination && (
                <p className="text-red-500 text-sm mt-1">{validation.errors.destination}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <input
                  type="date"
                  name="date"
                  value={booking.date}
                  onChange={handleBookingChange}
                  className={cn(
                    'w-full px-4 py-2 border rounded-md',
                    validation.errors.date ? 'border-red-500' : 'border-gray-300'
                  )}
                  min={new Date().toISOString().split('T')[0]}
                />
                {validation.errors.date && (
                  <p className="text-red-500 text-sm mt-1">{validation.errors.date}</p>
                )}
              </div>
              <div>
                <input
                  type="time"
                  name="time"
                  value={booking.time}
                  onChange={handleBookingChange}
                  className={cn(
                    'w-full px-4 py-2 border rounded-md',
                    validation.errors.time ? 'border-red-500' : 'border-gray-300'
                  )}
                />
                {validation.errors.time && (
                  <p className="text-red-500 text-sm mt-1">{validation.errors.time}</p>
                )}
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Number of Passengers"
                  name="passengers"
                  min="1"
                  value={booking.passengers}
                  onChange={handleBookingChange}
                  className={cn(
                    'w-full px-4 py-2 border rounded-md',
                    validation.errors.passengers ? 'border-red-500' : 'border-gray-300'
                  )}
                />
                {validation.errors.passengers && (
                  <p className="text-red-500 text-sm mt-1">{validation.errors.passengers}</p>
                )}
              </div>
            </div>

            {!validation.isValid && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <p>Please fill in all required fields correctly before proceeding.</p>
                </div>
              </div>
            )}

            <button
              className={cn(
                'w-full px-4 py-2 rounded-md text-white flex items-center justify-center',
                validation.isValid ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400'
              )}
              onClick={handleWhatsAppRedirect}
              disabled={!validation.isValid}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Book via WhatsApp
            </button>
          </form>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-6">
            <Phone className="h-6 w-6" />
            <h2 className="text-2xl font-bold">Contact Us</h2>
          </div>
          <div className="text-center">
            <p className="text-xl mb-4">Available 24/7 for your convenience</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center justify-center"
                onClick={() => window.open('https://wa.me/250787721374')}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat on WhatsApp
              </button>
              <button
                className="border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-md flex items-center justify-center"
                onClick={() => window.location.href = 'tel:+250787721374'}
              >
                <Phone className="h-4 w-4 mr-2" />
                Call +250 787 721 374
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CabServiceWebsite;