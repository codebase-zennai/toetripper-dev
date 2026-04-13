'use client';

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

export default function NewsletterCTA() {
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

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
      // Create FormData for Web3Forms (client-side)
      const form = new FormData();
      form.append('access_key', 'daf9a9ea-4b7c-4b7e-b541-5e80800c84d8');
      form.append('name', values.name);
      form.append('email', `${values.name.toLowerCase().replace(/\s+/g, '.')}@newsletter.toetripper.com`);
      form.append('phone', values.phone);
      form.append('destination', values.destination);
      form.append('travelTiming', values.travelTiming);
      form.append('travellers', values.travellers);
      form.append('budget', values.budget);
      form.append('message', values.message);
      form.append('form_type', 'general');
      form.append('subject', `New Newsletter Signup (General) from ${values.name}`);
      form.append('from_name', 'Toe Tripper Newsletter');
      form.append('to_email', 'info@toetripper.com');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: form,
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        resetForm();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error(result.message || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Form error:', error);
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
                    Let's Plan Your <span className="italics">Trip</span>
                  </h2>
                  <div className="space-1rem"></div>
                  <p className="text-white">
                    Share your travel requirements with us and our team will get in
                    touch to curate a personalized travel solution for you.
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
                            <label htmlFor="destination">Where do you want to travel?</label>
                            <Field
                              type="text"
                              id="destination"
                              name="destination"
                              placeholder="Destination"
                              disabled={isSubmitting}
                            />
                            <ErrorMessage name="destination" component="div" className="field-error" />
                          </div>

                          <div className="form-field">
                            <label htmlFor="travelTiming">When do you plan to travel?</label>
                            <Field
                              type="date"
                              id="travelTiming"
                              name="travelTiming"
                              disabled={isSubmitting}
                            />
                            <small className="helper-text">Select your travel date</small>
                            <ErrorMessage name="travelTiming" component="div" className="field-error" />
                          </div>

                          <div className="form-field">
                            <label htmlFor="travellers">How many people are travelling?</label>
                            <Field
                              type="number"
                              id="travellers"
                              name="travellers"
                              min="1"
                              placeholder="Number of travellers"
                              disabled={isSubmitting}
                            />
                            <ErrorMessage name="travellers" component="div" className="field-error" />
                          </div>

                          <div className="form-field">
                            <label htmlFor="budget">Your approximate budget per person</label>
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
                            {isSubmitting ? 'Submitting...' : 'Plan My Trip'}
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
