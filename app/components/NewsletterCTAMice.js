import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  phone: Yup.string().required('Phone number is required'),
  destination: Yup.string().required('Destination is required'),
  travelTiming: Yup.date().required('Travel date is required').nullable(),
  travellers: Yup.number().required('Number of travellers is required').positive().integer(),
  budget: Yup.string(),
  message: Yup.string(),
  consent: Yup.boolean().oneOf([true], 'You must agree to be contacted'),
});

export default function NewsletterCTAMice() {
  const [status, setStatus] = useState('idle');
  const initialValues = {
    name: '',
    phone: '',
    destination: '',
    travelTiming: '',
    travellers: '',
    budget: '',
    message: '',
    consent: false,
  };
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setStatus('submitting');
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus('success');
      resetForm();
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="background-black" id="Contact">
      <div className="">
        <div className="space-7rem"></div>
        <div className="space-7rem"></div>
        <div className="space-7rem"></div>
        <div className="w-layout-blockcontainer cta-container w-container pt-20 ">
          <div className="cta-wrapper">
            <div className="cta-card slide-down-animation">
              <div className="cta-content-wrapper">
                <div className="cta-text-section">
                  <h2 className="text-white">
                    Let's Plan Your <span className="italics">MICE Event</span>
                  </h2>
                  <div className="space-1rem"></div>
                  <p className="text-white">
                    Share your MICE (Meetings, Incentives, Conferences, Exhibitions) requirements and our team will get in touch to curate a personalized solution for you.
                  </p>
                </div>
                <div className="cta-form-section">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ isSubmitting }) => (
                      <Form className="cta-form" noValidate>
                        <div className="form-grid">
                          <div className="form-field">
                            <label htmlFor="name">Your Name</label>
                            <Field
                              type="text"
                              id="name"
                              name="name"
                              placeholder="Enter your full name"
                              disabled={isSubmitting}
                            />
                            <ErrorMessage name="name" component="div" className="field-error" />
                          </div>
                          <div className="form-field">
                            <label htmlFor="phone">Phone / WhatsApp Number</label>
                            <Field
                              type="tel"
                              id="phone"
                              name="phone"
                              placeholder="Primary contact number"
                              disabled={isSubmitting}
                            />
                            <small className="helper-text">Primary contact – most important</small>
                            <ErrorMessage name="phone" component="div" className="field-error" />
                          </div>
                          <div className="form-field">
                            <label htmlFor="destination">Where is the event?</label>
                            <Field
                              type="text"
                              id="destination"
                              name="destination"
                              placeholder="Event destination"
                              disabled={isSubmitting}
                            />
                            <ErrorMessage name="destination" component="div" className="field-error" />
                          </div>
                          <div className="form-field">
                            <label htmlFor="travelTiming">Event Date</label>
                            <Field
                              type="date"
                              id="travelTiming"
                              name="travelTiming"
                              disabled={isSubmitting}
                            />
                            <small className="helper-text">Select your event date</small>
                            <ErrorMessage name="travelTiming" component="div" className="field-error" />
                          </div>
                          <div className="form-field">
                            <label htmlFor="travellers">Number of Attendees</label>
                            <Field
                              type="number"
                              id="travellers"
                              name="travellers"
                              min="1"
                              placeholder="Number of attendees"
                              disabled={isSubmitting}
                            />
                            <ErrorMessage name="travellers" component="div" className="field-error" />
                          </div>
                          <div className="form-field">
                            <label htmlFor="budget">Approximate Budget per Person</label>
                            <Field
                              type="text"
                              id="budget"
                              name="budget"
                              placeholder="Optional but helpful"
                              disabled={isSubmitting}
                            />
                            <small className="helper-text">Optional but helpful</small>
                          </div>
                          <div className="form-field form-field-wide">
                            <label htmlFor="message">Message (optional)</label>
                            <Field
                              as="textarea"
                              id="message"
                              name="message"
                              rows="4"
                              placeholder="Any special request?"
                              disabled={isSubmitting}
                            />
                            <small className="helper-text">Any special request?</small>
                          </div>
                        </div>
                        <div className="consent-field">
                          <label className="consent-checkbox">
                            <Field
                              type="checkbox"
                              name="consent"
                              disabled={isSubmitting}
                            />
                            <span>I agree to be contacted by ToeTripper via call or WhatsApp</span>
                          </label>
                          <ErrorMessage name="consent" component="div" className="field-error" />
                        </div>
                        <div className="cta-actions text-white">
                          <button
                            type="submit"
                            className="button bg-white p-2 text-primary font-bold"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? 'Submitting...' : 'Plan My Event'}
                          </button>
                        </div>
                        <div className="form-status">
                          {status === 'success' && (
                            <p className="status-message success">Thanks! Our team will get in touch soon.</p>
                          )}
                          {status === 'error' && (
                            <p className="status-message error">Something went wrong. Please try again.</p>
                          )}
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
