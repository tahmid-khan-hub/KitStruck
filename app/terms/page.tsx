"use client";

export default function TermsAndConditionsPage() {
  const lastUpdated = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric", });
  return (
    <div className="max-w-[1100px] mx-auto px-4 md:px-3 py-12 min-h-screen">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
        <p className="text-gray-600 leading-relaxed">
          These terms and conditions outline the rules and regulations for using
          Kitstruck. By accessing or using this website, you agree to comply with
          these terms.
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. About Kitstruck</h2>
          <p className="text-gray-600 leading-relaxed">
            Kitstruck is an e-commerce based platform where users can explore,
            search and purchase football jerseys, including retro collections.
            The platform allows users to browse products, add items to their
            cart and complete purchases securely.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. User Accounts</h2>
          <p className="text-gray-600 leading-relaxed">
            Users may create an account to access additional features such as
            order tracking, reviews and dashboard services. Users are
            responsible for maintaining the confidentiality of their account
            credentials.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. Guest Users</h2>
          <p className="text-gray-600 leading-relaxed">
            Users can add jerseys to the cart without logging in. However, to
            place an order, complete payment or track order status, users may
            be required to authenticate their account.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. Orders & Payments</h2>
          <p className="text-gray-600 leading-relaxed">
            All payments on Kitstruck are processed securely through the Stripe
            payment system. Kitstruck does not store any payment or card details.
            Once an order is placed, users will receive confirmation and can
            track their order from the dashboard.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">5. Pricing & Offers</h2>
          <p className="text-gray-600 leading-relaxed">
            Jersey prices and offers may change at any time. Discounts and
            special offers apply only to selected jerseys and are clearly
            displayed on the product pages. Admin reserves the right to update
            prices and offers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            6. Order Processing & Delivery
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Orders are processed by the admin after confirmation. Delivery time
            is an estimate and may vary depending on location and availability.
            Delays caused by external factors are not the responsibility of
            Kitstruck.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            7. Reviews & User Content
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Users can submit reviews after purchasing jerseys. Reviews must be
            respectful and relevant. Kitstruck reserves the right to remove or
            moderate any content that violates platform guidelines.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">8. Admin Rights</h2>
          <p className="text-gray-600 leading-relaxed">
            Administrators have the authority to manage jerseys, process orders,
            update product information, apply offers, and view platform
            statistics such as total users, orders, reviews, and revenue.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            9. Cancellations & Refunds
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Cancellation and refund policies may vary depending on order status.
            Users are encouraged to contact support for assistance regarding
            cancellations or refund-related concerns.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            10. Limitation of Liability
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Kitstruck is not liable for any indirect or incidental damages arising
            from the use of this platform, including delays, technical issues,
            or third-party service failures.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            11. Changes to Terms
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Kitstruck reserves the right to update or modify these terms at any
            time. Continued use of the website after changes indicates
            acceptance of the updated terms.
          </p>
        </section>
      </div>

      {/* Footer */}
      <div className="mt-12 border-t border-t-gray-400 pt-4">
        <p className="text-sm text-gray-500">
          Last updated on <span className="font-medium">{lastUpdated}</span>
        </p>
      </div>
    </div>
  );
}
