'use client';

import { useEffect, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  phone: Yup.string().required('Phone number is required'),
  destination: Yup.string().required('Destination is required'),
  travelTiming: Yup.date().required('Travel date is required').nullable(),
  travellers: Yup.number()
    .required('Number of travellers is required')
    .positive()
    .integer(),
  budget: Yup.string(),
  message: Yup.string(),
  consent: Yup.boolean().oneOf([true], 'You must agree to be contacted'),
});

export default function CustomizeItineraryModal({
  isOpen,
  onClose,
  packageTitle = '',
  packageDestination = '',
}) {
  const [status, setStatus] = useState('idle');
  const overlayRef = useRef(null);

  /* lock body scroll & trap focus */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  /* close on Escape */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const initialValues = {
    name: '',
    phone: '',
    destination: packageDestination,
    travelTiming: '',
    travellers: '',
    budget: '',
    message: packageTitle
      ? `I'm interested in the "${packageTitle}" package.`
      : '',
    consent: false,
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setStatus('submitting');
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus('success');
      resetForm();
      setTimeout(() => {
        setStatus('idle');
        onClose();
      }, 3000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[1000] flex items-center justify-center"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Customize Your Itinerary"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative mx-4 flex w-full max-w-3xl flex-col overflow-hidden bg-white shadow-2xl"
        style={{
          maxHeight: '90vh',
          animation: 'modalSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-black/60 transition-colors hover:bg-black/10 hover:text-black"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Scrollable content */}
        <div className="overflow-y-auto" style={{ maxHeight: '90vh' }}>
          {/* Tagline header */}
          <div
            className="px-6 pb-6 pt-8 md:px-10 md:pt-10"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-[var(--secondary)]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--secondary)]">
                Personalized Travel
              </span>
            </div>
            <h2 className="mb-3 text-2xl font-bold leading-tight text-white md:text-3xl">
              Not a Booking Vendor.
              <br />
              <span className="text-[var(--secondary)]">
                A Structured Travel Partner.
              </span>
            </h2>
            <p className="text-sm leading-relaxed text-white/80 md:text-base">
              We don&apos;t bulk book. Every itinerary is crafted personally for
              you — built on clarity, execution discipline, and long-term trust.
              Not discounts. Not mass inventory.{' '}
              <strong className="text-white">Your trip, your way.</strong>
            </p>
          </div>

          {/* Form */}
          <div className="px-6 py-6 md:px-10 md:py-8">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ isSubmitting }) => (
                <Form noValidate>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
                    {/* Name */}
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="modal-name"
                        className="text-xs font-semibold uppercase tracking-wide text-black/50"
                      >
                        Your Name *
                      </label>
                      <Field
                        type="text"
                        id="modal-name"
                        name="name"
                        placeholder="Enter your full name"
                        disabled={isSubmitting}
                        className="rounded-none border border-black/15 bg-transparent px-3 py-2.5 text-sm text-black outline-none transition-colors focus:border-[var(--primary)]"
                      />
                      <ErrorMessage
                        name="name"
                        component="span"
                        className="text-xs text-red-500"
                      />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="modal-phone"
                        className="text-xs font-semibold uppercase tracking-wide text-black/50"
                      >
                        Phone / WhatsApp *
                      </label>
                      <Field
                        type="tel"
                        id="modal-phone"
                        name="phone"
                        placeholder="Primary contact number"
                        disabled={isSubmitting}
                        className="rounded-none border border-black/15 bg-transparent px-3 py-2.5 text-sm text-black outline-none transition-colors focus:border-[var(--primary)]"
                      />
                      <ErrorMessage
                        name="phone"
                        component="span"
                        className="text-xs text-red-500"
                      />
                    </div>

                    {/* Destination */}
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="modal-destination"
                        className="text-xs font-semibold uppercase tracking-wide text-black/50"
                      >
                        Destination *
                      </label>
                      <Field
                        type="text"
                        id="modal-destination"
                        name="destination"
                        placeholder="Where would you like to go?"
                        disabled={isSubmitting}
                        className="rounded-none border border-black/15 bg-transparent px-3 py-2.5 text-sm text-black outline-none transition-colors focus:border-[var(--primary)]"
                      />
                      <ErrorMessage
                        name="destination"
                        component="span"
                        className="text-xs text-red-500"
                      />
                    </div>

                    {/* Travel date */}
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="modal-travelTiming"
                        className="text-xs font-semibold uppercase tracking-wide text-black/50"
                      >
                        Travel Date *
                      </label>
                      <Field
                        type="date"
                        id="modal-travelTiming"
                        name="travelTiming"
                        disabled={isSubmitting}
                        className="rounded-none border border-black/15 bg-transparent px-3 py-2.5 text-sm text-black outline-none transition-colors focus:border-[var(--primary)]"
                      />
                      <ErrorMessage
                        name="travelTiming"
                        component="span"
                        className="text-xs text-red-500"
                      />
                    </div>

                    {/* Travellers */}
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="modal-travellers"
                        className="text-xs font-semibold uppercase tracking-wide text-black/50"
                      >
                        Travellers *
                      </label>
                      <Field
                        type="number"
                        id="modal-travellers"
                        name="travellers"
                        min="1"
                        placeholder="Number of travellers"
                        disabled={isSubmitting}
                        className="rounded-none border border-black/15 bg-transparent px-3 py-2.5 text-sm text-black outline-none transition-colors focus:border-[var(--primary)]"
                      />
                      <ErrorMessage
                        name="travellers"
                        component="span"
                        className="text-xs text-red-500"
                      />
                    </div>

                    {/* Budget */}
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="modal-budget"
                        className="text-xs font-semibold uppercase tracking-wide text-black/50"
                      >
                        Budget per person
                      </label>
                      <Field
                        type="text"
                        id="modal-budget"
                        name="budget"
                        placeholder="Optional but helpful"
                        disabled={isSubmitting}
                        className="rounded-none border border-black/15 bg-transparent px-3 py-2.5 text-sm text-black outline-none transition-colors focus:border-[var(--primary)]"
                      />
                    </div>

                    {/* Message — full width */}
                    <div className="flex flex-col gap-1 md:col-span-2">
                      <label
                        htmlFor="modal-message"
                        className="text-xs font-semibold uppercase tracking-wide text-black/50"
                      >
                        Additional Details
                      </label>
                      <Field
                        as="textarea"
                        id="modal-message"
                        name="message"
                        rows="3"
                        placeholder="Special requests, preferences, must-visit spots..."
                        disabled={isSubmitting}
                        className="resize-none rounded-none border border-black/15 bg-transparent px-3 py-2.5 text-sm text-black outline-none transition-colors focus:border-[var(--primary)]"
                      />
                    </div>
                  </div>

                  {/* Consent */}
                  <div className="mt-5">
                    <label className="flex cursor-pointer items-start gap-2 text-sm text-black/70">
                      <Field
                        type="checkbox"
                        name="consent"
                        disabled={isSubmitting}
                        className="mt-0.5"
                      />
                      <span>
                        I agree to be contacted by ToeTripper via call or
                        WhatsApp
                      </span>
                    </label>
                    <ErrorMessage
                      name="consent"
                      component="span"
                      className="mt-1 block text-xs text-red-500"
                    />
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full border border-black px-6 py-3 text-sm font-bold text-white transition-colors duration-200 hover:opacity-90 disabled:opacity-50 sm:w-auto"
                      style={{ backgroundColor: 'var(--primary)' }}
                    >
                      {isSubmitting
                        ? 'Submitting...'
                        : 'Craft My Itinerary'}
                    </button>

                    <button
                      type="button"
                      onClick={onClose}
                      className="w-full border border-black/20 bg-transparent px-6 py-3 text-sm font-semibold text-black/60 transition-colors duration-200 hover:bg-black/5 sm:w-auto"
                    >
                      Maybe Later
                    </button>
                  </div>

                  {/* Status messages */}
                  {status === 'success' && (
                    <p className="mt-4 text-center text-sm font-medium text-green-600">
                      🎉 Thank you! Our travel specialist will reach out to
                      craft your perfect itinerary.
                    </p>
                  )}
                  {status === 'error' && (
                    <p className="mt-4 text-center text-sm font-medium text-red-500">
                      Something went wrong. Please try again.
                    </p>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
