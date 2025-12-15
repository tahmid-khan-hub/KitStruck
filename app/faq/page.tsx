"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FaqPage() {
  const faqs = [
    {
      question: "Is the Stripe payment system secure?",
      answer:
        "Yes, Stripe is a highly secure and trusted payment gateway used worldwide. It uses advanced encryption and follows industry-standard security protocols to protect your payment information.",
    },
    {
      question: "How many days does delivery usually take?",
      answer:
        "Delivery usually takes between 3 to 7 working days, depending on your location. You will be notified once your order is shipped.",
    },
    {
      question: "Do all jerseys have offers or only certain ones?",
      answer:
        "Not all jerseys have offers. Discounts are available only on selected jerseys and those offers are clearly mentioned on the product cards and details pages.",
    },
    {
      question: "What if the jersey I want is not available?",
      answer:
        "If a jersey is currently unavailable, it means it is out of stock. In that case, you can check back later, as we regularly restock popular items. You can also explore similar jerseys or new arrivals that may match your preference.",
    },
    {
      question: "How can I find new arrival jerseys?",
      answer:
        "You can find the latest jerseys on the home page, where the newest 3 arrivals are shown in the New Arrivals section. You can also visit the Jerseys page and search by your favorite team.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-[1350px] mx-auto px-4 md:px-3 py-12 min-h-screen">
      {/* Heading */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-3">FaQ</h1>
        <p className="text-gray-600">
          Here are the most frequently asked questions by our customers.
        </p>
      </div>

      {/* Accordion */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-xl overflow-hidden bg-white shadow-md"
          >
            <button
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
              className="w-full flex justify-between items-center px-6 py-4 text-left font-semibold bg-gray-50 hover:bg-blue-100 transition"
            >
              <span>{faq.question}</span>

              <motion.span
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-xl"
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-4 text-gray-600">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
