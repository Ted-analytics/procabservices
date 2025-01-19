'use client'
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, MessageSquare, Clock, MapPin, Navigation, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const CabServiceWebsite = () => {
  const [booking, setBooking] = useState({
    name: "",
    phone: "",
    pickup: "",
    destination: "",
    date: "",
    time: "",
    passengers: "",
    service: "City Ride (Kigali)", // Default service type
    pickupMethod: "text",
    destinationMethod: "text"
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

  const handleLocationMethodChange = (value, type) => {
    setBooking(prev => ({
      ...prev,
      [`${type}Method`]: value,
      [type]: "" // Reset the location value when switching methods
    }));
  };

  const handleMapSelection = (type) => {
    // In a real implementation, you would get the coordinates from the map click
    const locationLabel = `Selected location from map (${type})`;
    setBooking(prev => ({
      ...prev,
      [type]: locationLabel
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

  const LocationInput = ({ type, value, onChange, error }) => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>{type} Location</Label>
        <RadioGroup
          defaultValue="text"
          value={booking[`${type.toLowerCase()}Method`]}
          onValueChange={(value) => handleLocationMethodChange(value, type.toLowerCase())}
          className="flex space-x-4 mb-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="text" id={`${type}-text`} />
            <Label htmlFor={`${type}-text`} className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Text Input
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="map" id={`${type}-map`} />
            <Label htmlFor={`${type}-map`} className="flex items-center gap-2">
              <Navigation className="h-4 w-4" />
              Map Selection
            </Label>
          </div>
        </RadioGroup>
      </div>

      {booking[`${type.toLowerCase()}Method`] === "text" ? (
        <div>
          <Input
            placeholder={`Enter ${type.toLowerCase()} location`}
            name={type.toLowerCase()}
            value={value}
            onChange={onChange}
            className={`mb-2 ${error ? 'border-red-500' : ''}`}
          />
          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative w-full h-96 bg-gray-100 rounded-lg">
            <iframe
              className="w-full h-full rounded-lg"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=29.7500,-2.6167,30.1344,-1.9428&layer=mapnik&marker=${
                type === "Pickup" ? "-1.9567,30.0964" : ""
              }`}
              style={{ border: "1px solid #ddd" }}
            />
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleMapSelection(type.toLowerCase())}
          >
            Confirm Location
          </Button>
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
        </div>
      )}
    </div>
  );

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
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-6 w-6" />
              Our Services & Rates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(rates).map(([service, details]) => (
                <div
                  key={service}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                    booking.service === service ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-200'
                  }`}
                  onClick={() => handleBookingChange({ target: { name: 'service', value: service } })}
                >
                  <h3 className="font-semibold">{service}</h3>
                  <p className="text-lg text-blue-600">{details.price}</p>
                  <p className="text-sm text-gray-600 mt-2">{details.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Booking Form */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-6 w-6" />
              Book a Ride
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Input
                    placeholder="Your Name"
                    name="name"
                    value={booking.name}
                    onChange={handleBookingChange}
                    className={validation.errors.name ? 'border-red-500' : ''}
                  />
                  {validation.errors.name && (
                    <p className="text-red-500 text-sm mt-1">{validation.errors.name}</p>
                  )}
                </div>
                <div>
                  <Input
                    placeholder="Phone Number"
                    name="phone"
                    value={booking.phone}
                    onChange={handleBookingChange}
                    className={validation.errors.phone ? 'border-red-500' : ''}
                  />
                  {validation.errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{validation.errors.phone}</p>
                  )}
                </div>
              </div>

              <LocationInput
                type="Pickup"
                value={booking.pickup}
                onChange={handleBookingChange}
                error={validation.errors.pickup}
              />

              <LocationInput
                type="Destination"
                value={booking.destination}
                onChange={handleBookingChange}
                error={validation.errors.destination}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Input
                    type="date"
                    name="date"
                    value={booking.date}
                    onChange={handleBookingChange}
                    className={validation.errors.date ? 'border-red-500' : ''}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {validation.errors.date && (
                    <p className="text-red-500 text-sm mt-1">{validation.errors.date}</p>
                  )}
                </div>
                <div>
                  <Input
                    type="time"
                    name="time"
                    value={booking.time}
                    onChange={handleBookingChange}
                    className={validation.errors.time ? 'border-red-500' : ''}
                  />
                  {validation.errors.time && (
                    <p className="text-red-500 text-sm mt-1">{validation.errors.time}</p>
                  )}
                </div>
                <div>
                  <Input
                    placeholder="Number of Passengers"
                    name="passengers"
                    type="number"
                    min="1"
                    value={booking.passengers}
                    onChange={handleBookingChange}
                    className={validation.errors.passengers ? 'border-red-500' : ''}
                  />
                  {validation.errors.passengers && (
                    <p className="text-red-500 text-sm mt-1">{validation.errors.passengers}</p>
                  )}
                </div>
              </div>

              {!validation.isValid && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Please fill in all required fields correctly before proceeding.
                  </AlertDescription>
                </Alert>
              )}

              <Button
                className={`w-full ${validation.isValid ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400'}`}
                onClick={handleWhatsAppRedirect}
                disabled={!validation.isValid}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Book via WhatsApp
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-6 w-6" />
              Contact Us
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-xl mb-4">Available 24/7 for your convenience</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="bg-green-500 hover:bg-green-600"
                  onClick={() => window.open('https://wa.me/250787721374')}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chat on WhatsApp
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.location.href = 'tel:+250787721374'}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call +250 787 721 374
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CabServiceWebsite;