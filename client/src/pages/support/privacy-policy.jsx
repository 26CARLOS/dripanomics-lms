import { Helmet } from "react-helmet-async";

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Privacy Policy | Dripanomics Tutorials</title>
        <meta name="description" content="Privacy Policy for Dripanomics Tutorials - Our commitment to protecting your privacy" />
      </Helmet>

      <div className="max-w-3xl mx-auto prose prose-slate">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
          <p>We collect information that you provide directly to us, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Name and email address when you create an account</li>
            <li>Payment information when purchasing courses</li>
            <li>Course progress and completion data</li>
            <li>Communications with our support team</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide and maintain our services</li>
            <li>Process your payments and protect against fraud</li>
            <li>Send you important updates about your courses</li>
            <li>Improve our platform and user experience</li>
            <li>Respond to your support requests</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">3. Information Sharing</h2>
          <p>We do not sell or rent your personal information. We may share your information with:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Payment processors (PayFast) to process transactions</li>
            <li>Service providers who assist in platform operations</li>
            <li>Law enforcement when required by law</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">4. Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Encryption of sensitive data</li>
            <li>Regular security assessments</li>
            <li>Secure data storage practices</li>
            <li>Limited staff access to personal information</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">6. Cookies</h2>
          <p>We use cookies to improve your experience on our platform. You can control cookie settings through your browser preferences.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">7. Changes to Privacy Policy</h2>
          <p>We may update this privacy policy periodically. We will notify you of any material changes via email or platform notifications.</p>
        </section>

        <footer className="mt-12 text-sm text-gray-600">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p>Contact us at: dripanomicstutorials@gmail.com</p>
        </footer>
      </div>
    </div>
  );
}

export default PrivacyPolicy;