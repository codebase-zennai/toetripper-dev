'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WebflowClientOnly from '../components/WebflowClientOnly';
import './privacy-policy.css';

export default function PrivacyPolicy() {
  return (
    <WebflowClientOnly>
      <>
        <Navbar />
        <section className="section background-primary">
          <div className="padding-9rem">
            <div className="legal-hero">
              <h1 className="text-site-white legal-title">Privacy Policy</h1>
              <p className="text-site-white legal-subtitle">
                Last updated: March 8, 2026
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="padding-4-5rem">
            <div className="legal-content">
              <div className="legal-section">
                <h2>1. Introduction</h2>
                <p>
                  Welcome to Toe Tripper. We are committed to protecting your
                  personal information and your right to privacy. This Privacy
                  Policy explains how we collect, use, disclose, and safeguard
                  your information when you visit our website or use our
                  services.
                </p>
              </div>

              <div className="legal-section">
                <h2>2. Information We Collect</h2>
                <h3>Personal Information</h3>
                <p>We may collect personal information that you provide to us, including but not limited to:</p>
                <ul>
                  <li>Name and contact details (email address, phone number)</li>
                  <li>Billing and payment information</li>
                  <li>Travel preferences and requirements</li>
                  <li>Passport and identification details (when required for bookings)</li>
                  <li>Communication preferences</li>
                </ul>

                <h3>Automatically Collected Information</h3>
                <p>When you visit our website, we may automatically collect certain information, including:</p>
                <ul>
                  <li>IP address and browser type</li>
                  <li>Device information and operating system</li>
                  <li>Pages visited and time spent on our website</li>
                  <li>Referring website addresses</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>

              <div className="legal-section">
                <h2>3. How We Use Your Information</h2>
                <p>We use the information we collect for the following purposes:</p>
                <ul>
                  <li>To process and manage your travel bookings</li>
                  <li>To communicate with you about your reservations and inquiries</li>
                  <li>To send you promotional offers, newsletters, and updates (with your consent)</li>
                  <li>To improve our website and services</li>
                  <li>To comply with legal obligations</li>
                  <li>To prevent fraud and ensure the security of our platform</li>
                </ul>
              </div>

              <div className="legal-section">
                <h2>4. Sharing of Information</h2>
                <p>
                  We may share your personal information with third parties only in the following circumstances:
                </p>
                <ul>
                  <li><strong>Service Providers:</strong> Hotels, airlines, transport companies, and other travel service providers necessary to fulfill your bookings.</li>
                  <li><strong>Legal Requirements:</strong> When required by law, regulation, or legal process.</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
                  <li><strong>With Your Consent:</strong> When you have given us explicit permission to share your data.</li>
                </ul>
              </div>

              <div className="legal-section">
                <h2>5. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational security measures to protect your personal
                  information against unauthorized access, alteration, disclosure, or destruction. However, no
                  method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </div>

              <div className="legal-section">
                <h2>6. Cookies</h2>
                <p>
                  Our website uses cookies and similar technologies to enhance your browsing experience. You can
                  control cookie preferences through your browser settings. Disabling cookies may affect some
                  functionality of our website.
                </p>
              </div>

              <div className="legal-section">
                <h2>7. Your Rights</h2>
                <p>Depending on your location, you may have the following rights regarding your personal data:</p>
                <ul>
                  <li>The right to access your personal information</li>
                  <li>The right to correct inaccurate or incomplete data</li>
                  <li>The right to request deletion of your personal data</li>
                  <li>The right to restrict or object to processing</li>
                  <li>The right to data portability</li>
                  <li>The right to withdraw consent at any time</li>
                </ul>
              </div>

              <div className="legal-section">
                <h2>8. Third-Party Links</h2>
                <p>
                  Our website may contain links to third-party websites. We are not responsible for the privacy
                  practices or content of these external sites. We encourage you to review the privacy policies
                  of any third-party websites you visit.
                </p>
              </div>

              <div className="legal-section">
                <h2>9. Children&apos;s Privacy</h2>
                <p>
                  Our services are not directed to individuals under the age of 18. We do not knowingly collect
                  personal information from children. If you believe we have collected information from a minor,
                  please contact us immediately.
                </p>
              </div>

              <div className="legal-section">
                <h2>10. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. Any changes will be posted on this page
                  with an updated revision date. We encourage you to review this policy periodically.
                </p>
              </div>

              <div className="legal-section">
                <h2>11. Contact Us</h2>
                <p>
                  If you have any questions or concerns about this Privacy Policy, please contact us at:
                </p>
                <ul>
                  <li><strong>Email:</strong> info@toetripper.com</li>
                  <li><strong>Website:</strong> www.toetripper.com</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </>
    </WebflowClientOnly>
  );
}
