"use client";
import { FaMedal, FaLock, FaShippingFast, FaTshirt } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaMedal size={38} className="text-indigo-600" />,
      title: "Premium Quality",
      desc: "Top-notch jerseys crafted with premium fabric and long-lasting print.",
    },
    {
      icon: <FaLock size={38} className="text-indigo-600" />,
      title: "Secure Stripe Payment",
      desc: "Safe and encrypted checkout powered by Stripe for a seamless experience.",
    },
    {
      icon: <FaShippingFast size={38} className="text-indigo-600" />,
      title: "Fast Delivery",
      desc: "We ensure quick and reliable delivery to your doorstep nationwide.",
    },
    {
      icon: <FaTshirt size={38} className="text-indigo-600" />,
      title: "Authentic Look & Feel",
      desc: "High-quality replicas designed to match the original jersey specifications.",
    },
  ];
  return (
    <div>
      <div className="my-24 max-w-[1350px] mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Why Choose Us?</h2>
        <p className="text-center text-gray-600 mb-10">
          We provide premium service and unmatched value to all our customers.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-200"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-center mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-center">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
