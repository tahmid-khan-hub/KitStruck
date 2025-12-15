"use client";

export default function PrivacyPolicyPage() {
  const lastUpdated = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric", });

  return (
    <div className="max-w-[1100px] mx-auto px-4 md:px-3 py-12 min-h-screen">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-gray-600 leading-relaxed">
          This Privacy Policy explains how Kitstruck collects, uses, and protects
          your personal information when you use our website and services.
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-2">
            1. Information We Collect
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We collect personal information such as your name, email address,
            contact details, and order-related information when you create an
            account, place an order, or submit a review on Kitstruck.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Your information is used to process orders, manage user accounts,
            provide customer support, and improve our services and platform
            experience.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            3. Authentication & Security
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Kitstruck uses JSON Web Tokens (JWT) to securely authenticate users.
            Tokens are used to verify user identity and protect access to
            restricted areas such as dashboards and order history.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            4. Payment Information
          </h2>
          <p className="text-gray-600 leading-relaxed">
            All payments are processed securely through Stripe. Kitstruck does
            not store or have access to your payment or card details. Stripe
            handles all payment data according to its security standards.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            5. User Accounts & Dashboard
          </h2>
          <p className="text-gray-600 leading-relaxed">
            When you create an account, your information is securely managed to
            provide access to your dashboard, where you can view orders, order
            status, and submit reviews.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            6. Reviews & User Content
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Reviews and feedback submitted by users may be visible publicly.
            Please avoid sharing sensitive personal information in reviews.
            Kitstruck reserves the right to remove content that violates platform
            rules.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            7. Data Protection
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We apply reasonable security measures to protect personal data from
            unauthorized access or misuse. However, no system can guarantee
            complete security.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            8. Third-Party Services
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Kitstruck may use third-party services such as payment gateways.
            These services operate under their own privacy policies, and
            Kitstruck is not responsible for their practices.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            9. Your Rights
          </h2>
          <p className="text-gray-600 leading-relaxed">
            You have the right to access, update, or request deletion of your
            personal information. For privacy-related concerns, please contact
            support.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            10. Changes to This Policy
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Kitstruck reserves the right to update this Privacy Policy at any
            time. Continued use of the website indicates acceptance of the
            updated policy.
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
