import React from 'react';
import NavBar from './NavbarComponent';
import Footer from './FooterComponent';

const Section = ({ title, children }) => (
  <section className="mb-16">
    <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-orange-500 pb-2">{title}</h2>
    <div className="text-gray-700 leading-relaxed text-lg">{children}</div>
  </section>
);

const TermsAndConditions = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="w-full fixed z-50 bg-white shadow-md">
        <NavBar />
      </div>

      <div className="container mx-auto px-6 max-w-5xl bg-gray-50 p-10 mt-28 rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          Terms and Conditions 
        </h1>

        <Section>
          <p>
            Welcome to <span className="font-semibold text-orange-500">PopcornSpot</span>! These Terms and Conditions ("Terms") govern your use of the PopcornSpot website, mobile application, and associated services (collectively, the "Service"). By accessing or using PopcornSpot, you agree to comply with and be bound by these Terms. If you do not agree with these Terms, you should not use the Service.
          </p>
          <p>
            By using the Service, you accept and agree to be bound by these Terms. You may not access or use the Service if you do not agree to these Terms.
          </p>
        </Section>

        <Section title="1. Definitions">
          <ul className="list-disc list-inside">
            <li><strong>User/Customer:</strong> Any individual who accesses, uses, or interacts with PopcornSpot.</li>
            <li><strong>Service:</strong> The movie ticket booking platform provided by PopcornSpot.</li>
            <li><strong>Movie Providers:</strong> Movie theaters, content creators, and third parties offering movie-related content through PopcornSpot.</li>
          </ul>
        </Section>

        <Section title="2. Account Creation and User Responsibilities">
          <p>
            <strong>Account Registration:</strong> To access certain features of the Service, such as booking movie tickets, you must create an account. You agree to provide accurate, current, and complete information during the registration process.
          </p>
          <p>
            <strong>Age Requirement:</strong> You must be at least 18 years old to use the Service. If you are under 18, you may use the Service only with the consent of a parent or guardian.
          </p>
          <p>
            <strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials (username and password). You agree to notify PopcornSpot immediately if you believe your account has been compromised.
          </p>
        </Section>

        <Section title="3. Booking Process and Payment">
          <p>
            <strong>Ticket Booking:</strong> Browse movies, check showtimes, and purchase tickets with ease. Choose your preferred movie, theater, date, and time, and proceed to checkout to complete your booking.
          </p>
          <p>
            <strong>Pricing:</strong> Ticket prices, including any service fees, are clearly displayed before you complete the booking process. Prices are subject to change as needed.
          </p>
          <p>
            <strong>Payment:</strong> Payments are processed securely through third-party payment gateways. You authorize PopcornSpot to charge your payment method for the total ticket amount.
          </p>
          <p>
            <strong>Booking Confirmation:</strong> After payment, you'll receive a booking confirmation via email. Please keep this confirmation for theater entry.
          </p>
        </Section>

        <Section title="4. Privacy and Data Collection">
          <p>
            <strong>Privacy Policy:</strong> PopcornSpot collects and processes your personal data as outlined in our 
            <a href="#" className="text-blue-500 underline">Privacy Policy</a>. By using our Service, you consent to the collection, storage, and processing of your data.
          </p>
          <p>
            <strong>Data Security:</strong> We use reasonable security measures to protect your personal data but cannot guarantee complete security, especially during internet transmission.
          </p>
        </Section>

        <Section title="5. Intellectual Property">
          <p>
            <strong>Ownership of Content:</strong> Content on the Service, including logos, images, software, and text, is owned by PopcornSpot or licensed to us. Unauthorized use or distribution of this content is prohibited.
          </p>
          <p>
            <strong>User-Generated Content:</strong> When you post reviews, ratings, or content on PopcornSpot, you grant us a license to use, display, and modify it for promotional purposes.
          </p>
        </Section>

        <Section title="6. Ticket Cancellations and Refunds">
          <p>
            Refunds and cancellations are subject to the movie provider’s policies. Review the specific cancellation policy when booking.
          </p>
        </Section>

        <Section title="7. User Conduct">
          <ul className="list-disc list-inside">
            <li>Do not hack, reverse-engineer, or disrupt the Service.</li>
            <li>Do not post false or misleading information.</li>
            <li>Do not engage in fraud or unauthorized transactions.</li>
          </ul>
        </Section>

        <Section title="8. Limitation of Liability">
          <p>
            PopcornSpot does not guarantee uninterrupted or error-free access to the Service. We are not liable for any disruptions, delays, or technical issues with the platform.
          </p>
        </Section>

        <Section title="9. Contact Information">
          <p className='flex gap-3'>
            If you have any questions, contact us at 
            <a href="mailto:popcornspotofficial@gmail.com" className="text-orange-500 underline">popcornspotofficial@gmail.com</a>.
          </p>
        </Section>
      </div>
    <div className='mt-10'>
    <Footer />
    </div>
      
    </div>
  );
};

export default TermsAndConditions;
