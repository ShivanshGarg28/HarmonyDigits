import { useState } from "react";

const OfflineBooking = () => {
  const [selectedService, setSelectedService] = useState("");
  const [price, setPrice] = useState("");

  const services = [
    {
      id: "offline",
      name: "Offline Consultation",
      price: 5100,
      details: [
        "In-office face-to-face session",
        "Includes ancient Ramal Vidya",
        "Deep spiritual insights & guidance",
      ],
    },
    {
      id: "premium",
      name: "Premium 5-Star Meet",
      price: 11000,
      details: [
        "Personal session in a luxury setting",
        "200-page report + handwritten Kundali",
        "A powerful, in-depth life session",
      ],
    },
  ];

  const handleServiceChange = (e) => {
    const selectedId = e.target.value;
    setSelectedService(selectedId);

    const chosen = services.find((s) => s.id === selectedId);
    setPrice(chosen ? chosen.price : "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedService) {
      alert("Please select a service before booking.");
      return;
    }
    // You can integrate Razorpay or backend API call here
    console.log("Booking Details:", { service: selectedService, price });
    alert(`Booking confirmed for ${selectedService} at ₹${price}`);
  };

  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg border border-green-100">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
          Offline Booking
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Selection */}
          <div>
            <label className="block text-lg font-medium text-gray-800 mb-2">
              Select Service
            </label>
            <select
              value={selectedService}
              onChange={handleServiceChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-700"
              required
            >
              <option value="">-- Select a Service --</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>

          {/* Auto Price Display */}
          {price && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-lg font-semibold text-green-700">
                Price: ₹{price.toLocaleString()}
              </p>
              {/* Show details of selected service */}
              <ul className="mt-2 text-gray-700 list-disc list-inside">
                {services
                  .find((s) => s.id === selectedService)
                  ?.details.map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
              </ul>
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-lg font-medium text-gray-800 mb-2">
              Your Name
            </label>
            <input
              type="text"
              required
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-lg font-medium text-gray-800 mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-lg font-medium text-gray-800 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              required
              placeholder="Enter your phone"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default OfflineBooking;
