import React from "react";
import NavBar from "./NavbarComponent";
import Footer from "./FooterComponent";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 min-h-screen py-10">
      <div className="w-full top-0 fixed z-50">
        <NavBar />
      </div>
      <div className="max-w-5xl mx-auto p-8 bg-white rounded-lg shadow-2xl mt-16 border border-gray-300">
        <h1 className="text-5xl font-extrabold text-center mb-10 text-gray-900">Privacy Policy</h1>

        <section className="mb-8">
          <p className="text-lg leading-relaxed text-gray-700">
            Welcome to <span className="text-orange-500 font-semibold">Popcorn Spot</span>! This Privacy Policy explains how we collect, use, and protect your personal information when you visit or use our movie booking website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Information We Collect</h2>
          <p className="text-gray-700 mb-4">We may collect the following types of information:</p>
          <ul className="list-disc ml-8 space-y-2 text-gray-700">
            <li><span className="font-medium">Personal Information:</span> Name, email address, and phone number.</li>
            <li><span className="font-medium">Payment Information:</span> Credit/debit card details for bookings.</li>
            <li><span className="font-medium">Usage Data:</span> Information about how you interact with our website, such as pages visited and time spent on the site.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">How We Use Your Information</h2>
          <ul className="list-disc ml-8 space-y-2 text-gray-700">
            <li>To process your movie bookings and payments securely.</li>
            <li>To provide customer support and respond to inquiries.</li>
            <li>To improve our website and user experience.</li>
            <li>To send promotional communications, if you opt-in.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Sharing of Information</h2>
          <p className="text-gray-700">
            We do not share your personal information with third parties, except as necessary to process your bookings (e.g., payment processors) or comply with legal obligations.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Data Security</h2>
          <p className="text-gray-700">
            We use industry-standard measures to protect your data. However, no online service can guarantee complete security, and we encourage you to take precautions when sharing personal information online.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Your Rights</h2>
          <p className="text-gray-700 mb-4">You have the right to:</p>
          <ul className="list-disc ml-8 space-y-2 text-gray-700">
            <li>Access the personal information we hold about you.</li>
            <li>Request corrections or updates to your information.</li>
            <li>Request deletion of your information, subject to legal obligations.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Changes to This Policy</h2>
          <p className="text-gray-700">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about this Privacy Policy, please contact us at <span className="font-semibold text-orange-500">popcornspotofficial@gmail.com</span>.
          </p>
        </section>

        <p className="text-center text-sm text-gray-500 mt-10">
          &copy; {new Date().getFullYear()} <span className="text-orange-500 font-semibold">Popcorn Spot</span>. All rights reserved.
        </p>
      </div>
      <div className="w-full mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default PrivacyPolicy;
