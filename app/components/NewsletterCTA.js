export default function NewsletterCTA() {
  return (
    <div className="background-black">
      <section className="section">
        <div className="space-7rem"></div>
        <div className="space-7rem"></div>
        <div className="space-7rem"></div>
        <div className="w-layout-blockcontainer cta-container w-container">
          <div className="cta-wrapper">
            <div className="w-layout-hflex cta-card slide-down-animation">
              <h2 className="cta-title">
                Expert <span className="italics">Stock Analysis</span>
              </h2>
              <div className="space-1rem"></div>
              <p className="max-width-30rem">
                Subscribe alongside tens of thousands of investors and
                immediately receive expert up-to-date stock picks.
              </p>
              <div className="space-2rem"></div>
              <div className="sign-up-form w-form">
                <form
                  id="wf-form-Subscribe-To-Newsletter"
                  name="wf-form-Subscribe-To-Newsletter"
                  data-name="Subscribe To Newsletter"
                  method="get"
                  className="sign-up-form-container"
                  data-wf-page-id="66e3df8d47eb3991ca9dbefe"
                  data-wf-element-id="d2f74130-cfa6-9378-383c-8bf2dd17b6f4"
                >
                  <input
                    className="sign-up-text-field w-input"
                    maxLength="256"
                    name="Newsletter-Email-2"
                    data-name="Newsletter Email 2"
                    aria-label="Enter your email"
                    placeholder="Enter your email"
                    type="email"
                    id="Newsletter-Email-2"
                    required=""
                  />
                  <input
                    type="submit"
                    data-wait="Please wait..."
                    className="button-subscribe w-button"
                    value="→"
                  />
                </form>
                <div className="success-message-sign-up-form w-form-done">
                  <div>Thank you! Your submission has been received!</div>
                </div>
                <div className="error-message w-form-fail">
                  <div className="red-font">
                    Oops! Something went wrong while submitting the form.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
