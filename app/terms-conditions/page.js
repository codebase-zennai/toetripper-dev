'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WebflowClientOnly from '../components/WebflowClientOnly';
import './terms-conditions.css';

export default function TermsConditions() {
  return (
    <WebflowClientOnly>
      <>
        <Navbar />
        <section className="section background-primary">
          <div className="padding-9rem">
            <div className="legal-hero">
              <h1 className="text-site-white legal-title">Terms &amp; Conditions</h1>
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
                <h2>1. Acceptance of Terms</h2>
                <p>
                  By accessing and using the Toe Tripper website and services, you agree to be bound by these
                  Terms and Conditions. If you do not agree with any part of these terms, you must not use our
                  website or services.
                </p>
              </div>

              <div className="legal-section">
                <h2>2. Services</h2>
                <p>
                  Toe Tripper provides travel planning, booking, and related services including but not limited to:
                </p>
                <ul>
                  <li>Experiential holiday packages</li>
                  <li>Corporate travel solutions</li>
                  <li>MICE &amp; Incentive travel</li>
                  <li>Customized travel itineraries</li>
                  <li>Hotel, flight, and transport bookings</li>
                </ul>
              </div>

              <div className="legal-section">
                <h2>3. Booking and Reservations</h2>
                <h3>3.1 Booking Confirmation</h3>
                <p>
                  A booking is confirmed only upon receipt of full payment or the agreed deposit amount and issuance
                  of a written confirmation from Toe Tripper. Verbal or email inquiries do not constitute confirmed
                  bookings.
                </p>

                <h3>3.2 Pricing</h3>
                <p>
                  All prices are subject to availability and may change without prior notice until a booking is
                  confirmed. Prices are quoted in the currency specified at the time of booking and are inclusive
                  of applicable taxes unless otherwise stated.
                </p>

                <h3>3.3 Payment</h3>
                <p>
                  Payment must be made according to the terms specified at the time of booking. We accept payments
                  through the methods listed on our website. Failure to make timely payments may result in
                  cancellation of your booking.
                </p>
              </div>

              <div className="legal-section">
                <h2>4. Cancellation and Refund Policy</h2>
                <h3>4.1 Cancellation by You</h3>
                <p>
                  Cancellations must be communicated in writing. Cancellation charges will apply based on the
                  following schedule:
                </p>
                <ul>
                  <li>More than 30 days before departure: 10% of the total cost</li>
                  <li>15–30 days before departure: 25% of the total cost</li>
                  <li>7–14 days before departure: 50% of the total cost</li>
                  <li>Less than 7 days before departure: 100% of the total cost (no refund)</li>
                </ul>

                <h3>4.2 Cancellation by Toe Tripper</h3>
                <p>
                  We reserve the right to cancel a booking due to unforeseen circumstances, insufficient
                  participation, or force majeure events. In such cases, we will offer a full refund or an
                  alternative arrangement.
                </p>
              </div>

              <div className="legal-section">
                <h2>5. Travel Documents</h2>
                <p>
                  It is the responsibility of the traveler to ensure they have valid passports, visas, and any
                  other required travel documents. Toe Tripper is not liable for any issues arising from
                  incomplete or invalid travel documentation.
                </p>
              </div>

              <div className="legal-section">
                <h2>6. Travel Insurance</h2>
                <p>
                  We strongly recommend that all travelers obtain comprehensive travel insurance covering trip
                  cancellation, medical emergencies, baggage loss, and other unforeseen events. Toe Tripper is
                  not responsible for any losses not covered by insurance.
                </p>
              </div>

              <div className="legal-section">
                <h2>7. Liability</h2>
                <h3>7.1 Limitation of Liability</h3>
                <p>
                  Toe Tripper acts as an intermediary between travelers and service providers (hotels, airlines,
                  transport companies, etc.). We are not liable for any injury, loss, damage, accident, delay, or
                  irregularity caused by the acts or omissions of third-party service providers.
                </p>

                <h3>7.2 Force Majeure</h3>
                <p>
                  We shall not be liable for any failure or delay in performance due to causes beyond our reasonable
                  control, including but not limited to natural disasters, war, terrorism, pandemics, government
                  actions, or strikes.
                </p>
              </div>

              <div className="legal-section">
                <h2>8. Intellectual Property</h2>
                <p>
                  All content on this website, including text, images, logos, graphics, and software, is the
                  property of Toe Tripper and is protected by applicable intellectual property laws. You may not
                  reproduce, distribute, or use any content without our prior written consent.
                </p>
              </div>

              <div className="legal-section">
                <h2>9. User Conduct</h2>
                <p>When using our website and services, you agree not to:</p>
                <ul>
                  <li>Provide false or misleading information</li>
                  <li>Use the website for any unlawful purpose</li>
                  <li>Interfere with the proper functioning of the website</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Infringe upon the rights of others</li>
                </ul>
              </div>

              <div className="legal-section">
                <h2>10. Changes to Itinerary</h2>
                <p>
                  While we make every effort to ensure that travel itineraries are followed as planned, changes
                  may occur due to weather conditions, local regulations, or other circumstances beyond our
                  control. We reserve the right to modify itineraries when necessary, and will inform you of
                  any significant changes as soon as possible.
                </p>
              </div>

              <div className="legal-section">
                <h2>11. Governing Law</h2>
                <p>
                  These Terms and Conditions shall be governed by and construed in accordance with the laws of
                  India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction
                  of the courts in the relevant jurisdiction.
                </p>
              </div>

              <div className="legal-section">
                <h2>12. Changes to Terms</h2>
                <p>
                  We reserve the right to modify these Terms and Conditions at any time. Changes will be effective
                  immediately upon posting to our website. Your continued use of our services constitutes
                  acceptance of the updated terms.
                </p>
              </div>

              <div className="legal-section">
                <h2>13. Contact Us</h2>
                <p>
                  If you have any questions about these Terms and Conditions, please contact us at:
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
