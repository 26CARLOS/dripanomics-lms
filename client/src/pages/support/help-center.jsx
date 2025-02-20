import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

function HelpCenter() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Help Center | Dripanomics Tutorials</title>
        <meta name="description" content="Help Center for Dripanomics Tutorials - Find answers to your questions and get support." />
      </Helmet>

      <div className="max-w-3xl mx-auto prose prose-slate">
        <h1 className="text-3xl font-bold mb-8">Help Center</h1>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>How do I reset my password?</strong>
              <p>To reset your password, go to the <Link to="/forgot-password" className="text-blue-600 hover:underline">Forgot Password</Link> page and enter your email address. You will receive a link to reset your password.</p>
            </li>
            <li>
              <strong>How do I access my purchased courses?</strong>
              <p>You can access your purchased courses by going to the <Link to="/my-courses" className="text-blue-600 hover:underline">My Courses</Link> page after logging in.</p>
            </li>
            <li>
              <strong>How do I contact support?</strong>
              <p>If you need further assistance, you can contact our support team at <a href="mailto:dripanomicstutorials@gmail.com" className="text-blue-600 hover:underline">dripanomicstutorials@gmail.com</a>.</p>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Technical Support</h2>
          <p>If you are experiencing technical issues, please try the following steps:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Ensure you have a stable internet connection.</li>
            <li>Clear your browser cache and cookies.</li>
            <li>Try accessing the platform using a different browser or device.</li>
          </ul>
          <p>If the issue persists, please contact our technical support team at <a href="mailto:dripanomicstutorials@gmail.com" className="text-blue-600 hover:underline">dripanomicstutorials@gmail.com</a>.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Billing and Payments</h2>
          <p>For questions related to billing and payments, please refer to our <Link to="/terms-of-service" className="text-blue-600 hover:underline">Terms of Service</Link> or contact our billing department at <a href="mailto:dripanomicstutorials@gmail.com" className="text-blue-600 hover:underline">dripanomicstutorials@gmail.com</a>.</p>
        </section>

        <footer className="mt-12 text-sm text-gray-600">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p>Contact us at: dripanomicstutorials@gmail.com</p>
        </footer>
      </div>
    </div>
  );
}

export default HelpCenter;