import React from "react";
import NavBar from "./NavbarComponent";
import Footer from "./FooterComponent";

const RefundPolicy = () => {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 min-h-screen py-10">
      <div className="w-full top-0 fixed z-50">
        <NavBar />
      </div>
      <div className="max-w-5xl mx-auto px-6 sm:px-8 bg-white rounded-lg shadow-2xl mt-20 border border-gray-300">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mt-8 mb-12 text-gray-900">Refund Policy</h1>

        <section className="mb-10">
          <p className="text-lg leading-relaxed text-gray-700">
            At <span className="text-orange-500 font-semibold">Popcorn Spot</span>, customer satisfaction is our top priority. Please read our refund policy carefully to understand the terms under which refunds may be issued for movie bookings.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800">Refund Eligibility</h2>
          <p className="text-gray-700 mb-4">Refunds are only available under the following conditions:</p>
          <ul className="list-disc ml-8 space-y-2 text-gray-700">
            <li>If a movie screening is canceled by the theater or organizer.</li>
            <li>If there is a technical issue preventing your booking from being processed, but payment was deducted.</li>
            <li>If you cancel your booking within the allowed cancellation window (see below).</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800">Cancellation Window</h2>
          <p className="text-gray-700">
            Cancellations are allowed up to <span className="font-semibold">24 hours</span> before the scheduled movie time. No refunds will be issued for cancellations made less than 24 hours before the movie time.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800">Non-Refundable Conditions</h2>
          <p className="text-gray-700 mb-4">Refunds will not be issued for:</p>
          <ul className="list-disc ml-8 space-y-2 text-gray-700">
            <li>Missed screenings due to personal reasons.</li>
            <li>Incorrect details provided during the booking process.</li>
            <li>Cancellation requests made after the cancellation window.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800">Refund Process</h2>
          <p className="text-gray-700 mb-4">To request a refund, please follow these steps:</p>
          <ol className="list-decimal ml-8 space-y-2 text-gray-700">
            <li>Contact us at <span className="font-semibold text-orange-500">popcornspotofficial@gmail.com</span> with your booking details.</li>
            <li>Provide a reason for your refund request.</li>
            <li>Our team will review your request and respond within <span className="font-semibold">5-7 business days</span>.</li>
          </ol>
          <p className="mt-6 text-gray-700">
            Once approved, refunds will be processed back to your original payment method within <span className="font-semibold">7-10 business days</span>.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800">Changes to This Policy</h2>
          <p className="text-gray-700">
            We reserve the right to update this refund policy at any time. Any changes will be communicated via updates to this page.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800">Contact Us</h2>
          <p className="text-gray-700">
            For questions or concerns regarding this refund policy, please contact us at <span className="font-semibold text-orange-500">popcornspot.support@gmail.com</span>.
          </p>
        </section>

        <p className="text-center text-sm text-gray-500 mt-10">
          &copy; {new Date().getFullYear()} <span className="text-orange-500 font-semibold">Popcorn Spot</span>. All rights reserved.
        </p>
      </div>
      <div className="w-full mt-16">
        <Footer />
      </div>
    </div>
  );
};

export default RefundPolicy;
