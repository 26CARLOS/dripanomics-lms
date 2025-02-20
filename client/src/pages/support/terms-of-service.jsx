import { Helmet } from "react-helmet-async";

function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Terms of Service | Dripanomics Tutorials</title>
        <meta name="description" content="Terms of Service for Dripanomics Tutorials - Online Learning Platform" />
      </Helmet>

      <div className="max-w-3xl mx-auto prose prose-slate">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">1. Agreement to Terms</h2>
          <p>By accessing and using Dripanomics Tutorials ("we," "our," or "us"), you agree to these Terms of Service. If you do not agree with these terms, please do not use our services.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">2. Course Access and Payment</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Course access is granted upon successful payment</li>
            <li>All payments are processed securely through PayFast</li>
            <li>Prices are listed in South African Rand (ZAR)</li>
            <li>Access to course content is non-transferable</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">3. User Responsibilities</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>You must provide accurate registration information</li>
            <li>You are responsible for maintaining your account security</li>
            <li>Course content may not be shared or redistributed</li>
            <li>Harassment or abuse of other users is prohibited</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">4. Intellectual Property</h2>
          <p>All course content, including videos, documents, and materials, is protected by copyright and other intellectual property laws. You may not download, share, or redistribute content without explicit permission.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">5. Refund Policy</h2>
          <p>Refund requests must be submitted within 3 days of purchase via email. Refunds are evaluated on a case-by-case basis and may be granted for technical issues or course unavailability.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">6. Privacy</h2>
          <p>Your privacy is important to us. Please review our Privacy Policy to understand how we collect and use your information.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">7. Limitation of Liability</h2>
          <p>Dripanomics Tutorials is not liable for any indirect, incidental, or consequential damages arising from your use of our platform or course materials.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">8. Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. Users will be notified of significant changes via email or platform notifications.</p>
        </section>

        <footer className="mt-12 text-sm text-gray-600">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p>Contact us at: dripanomicstutorials@gmail.com</p>
        </footer>
      </div>
    </div>
  );
}

export default TermsOfService;