"use client";
import { FaMedal, FaLock, FaShippingFast, FaTshirt } from "react-icons/fa";
import { motion } from "framer-motion";
import AnimateOnView from "@/app/hooks/AnimateOnView";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaMedal size={38} className="text-blue-600 hover:text-blue-500" />,
      title: "Premium Quality Jerseys",
      desc: "Top-notch jerseys crafted with premium fabric and long-lasting print.",
    },
    {
      icon: <FaLock size={38} className="text-blue-600 hover:text-blue-500" />,
      title: "Secure Stripe Payment",
      desc: "Safe and encrypted checkout powered by Stripe for a seamless experience.",
    },
    {
      icon: <FaShippingFast size={38} className="text-blue-600 hover:text-blue-500" />,
      title: "Fast Delivery Service",
      desc: "We ensure quick and reliable delivery to your doorstep nationwide.",
    },
    {
      icon: <FaTshirt size={38} className="text-blue-600 hover:text-blue-500" />,
      title: "Authentic Look & Feel",
      desc: "High-quality replicas designed to match the original jersey specifications.",
    },
  ];
  return (
    <div>
      <div className="my-24 mb-40 max-w-[1350px] mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Why Choose Us?</h2>
        <p className="text-center text-gray-600 mb-10">
          We provide premium service and unmatched value to all our customers.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
          {features.map((item, i) => (
            <AnimateOnView key={i} direction="scale" delay={i * 0.08}><motion.div
              key={i}
              whileHover={{
              scale: 1.02, 
              boxShadow: "0px 0px 20px rgba(0, 123, 255, 0.7)",
              }}
              transition={{ duration: 0.1 }}
              className="bg-white p-6 rounded-2xl border border-gray-200 h-full flex flex-col"
            >
            <div className="mb-5 w-[63px] h-[63px] rounded-full bg-gray-50 border-2 border-gray-200 flex items-center justify-center">{item.icon}
            </div>
              <div className="flex items-start gap-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1 line-clamp-2 min-h-14">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            </motion.div></AnimateOnView>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
