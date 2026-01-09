"use client";

import {
  Activity,
  Clock3,
  Flag,
  Languages,
  Lock,
  Luggage,
  MapPin,
  Users,
} from "lucide-react";

const tourDetails = [
  { label: "Starting Location", value: "Mumbai", icon: MapPin },
  { label: "Ending Location", value: "Mumbai", icon: Flag },
  { label: "Duration", value: "2h 30m", icon: Clock3 },
  { label: "Tour Style", value: "Shared, Private", icon: Lock },
  { label: "Language", value: "English", icon: Languages },
  { label: "Group Size", value: "Max 6", icon: Users },
  { label: "Tour Type", value: "City Tour", icon: Luggage },
  { label: "Physicality", value: "Low", icon: Activity },
];

const tourPricing = [
  { label: "Base walking tour", amount: "₹4,200" },
  { label: "Local family lunch (optional)", amount: "₹1,400" },
  { label: "Pottery add-on", amount: "₹950" },
  { label: "Community contribution", amount: "₹550" },
];

const totalAmount = "₹7,100";

export default function Info() {
  return (
    <section className="section background-black py-16">
      <div className="w-layout-blockcontainer container padding-13-5rem w-container">
        <div className="flex flex-col gap-10 text-white">
          <header className="flex flex-col gap-3 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.4em] text-white/60">
              Package Overview
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Essential Tour Details
            </h2>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
              A refined snapshot of everything you need to know for this curated
              experience. Designed to be clear, elegant, and ready for your next
              adventure.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tourDetails.map(({ label, value, icon: Icon }) => (
              <article
                key={label}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_40px_-25px_rgba(0,0,0,0.9)] backdrop-blur transition-transform duration-200 hover:-translate-y-1 hover:border-white/25"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white">
                    <Icon size={22} strokeWidth={1.4} />
                  </div>
                  <span className="text-xs font-medium uppercase tracking-[0.35em] text-white/60">
                    {label}
                  </span>
                </div>
                <p className="mt-5 text-lg font-semibold text-white sm:text-xl">
                  {value}
                </p>
              </article>
            ))}
          </div>
          <div className="space-4rem"></div>
          <div className="flex flex-col gap-8 text-white lg:flex-row lg:items-start">
            <div className="blog-post slide-up-animation w-richtext gap-10 text-left text-white">
              <div>
                <h4>
                  <strong>Discover Dharavi's Industry Heartbeat</strong>
                </h4>
                <p>
                  Discover why Dharavi is the heart of small-scale industry in
                  Mumbai with our Dharavi Tour. Known to many as "one of the
                  largest slums in Asia", we prefer to think of Dharavi as
                  Mumbai's beating heart. It houses about one million of
                  Mumbai's inhabitants and its industries have an annual
                  turnover of approximately US$ 665 million.
                </p>
              </div>
              <div>
                <h4>
                  <strong>Hands-on Experiences</strong>
                </h4>
                <p>
                  Through our educational walking tours, visitors experience a
                  wide range of business activities: recycling, pottery-making,
                  embroidery, bakery, soap factory, leather tanning,
                  poppadom-making, and many more.
                </p>
              </div>
              <div>
                <h4>
                  <strong>Community Stories</strong>
                </h4>
                <p>
                  We'll also visit the residential areas of Dharavi. People from
                  all over India have come to live in Dharavi, making it a
                  microcosm of India. This diversity is apparent in the temples,
                  mosques, churches, and pagodas that stand side by side.
                </p>
              </div>
              <div>
                <h4>
                  <strong>Give Back While You Explore</strong>
                </h4>
                <p>
                  Our community centre, funded through the profits from the
                  tours, is also located in the residential area. We will visit
                  it and you will learn about the programs that our NGO, Reality
                  Gives, offers the community.
                </p>
              </div>
              <div>
                <h4>
                  <strong>Extend the Journey</strong>
                </h4>
                <p>
                  Our 2 hour and 30-minute introduction to Dharavi aims to give
                  visitors a nuanced understanding of life and work in Mumbai
                  slums. Add a lunch with a local family or a pottery class
                  after the morning tour to deepen your connection and generate
                  extra income for residents.
                </p>
              </div>
              <blockquote>
                Not only will you gain additional insight into Dharavi, but
                you'll also provide a local family with valuable support.
                Experience the heart of Mumbai while making a positive impact.
              </blockquote>
            </div>

            <aside className="w-full max-w-[30rem] rounded-3xl border border-white/15 bg-white/[0.06] p-6 shadow-[0_24px_44px_-28px_rgba(0,0,0,0.85)] backdrop-blur">
              <div className="flex flex-col gap-4">
                <header className="text-left">
                  <h5 className="font-semibold uppercase tracking-[0.35em] text-white/60">
                    Price breakup
                  </h5>
                  <h4 className="my-2 text-2xl font-semibold text-white">
                    Customize your visit
                  </h4>
                </header>
                <ul className="gap-3 package-ul text-sm text-white/80">
                  {tourPricing.map(({ label, amount }) => (
                    <li
                      key={label}
                      className="flex items-center justify-between"
                    >
                      <span>{label}</span>
                      <span className="font-semibold text-white">{amount}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between border-t border-white/20 pt-4 mb-10 text-sm font-semibold text-white">
                  <h5>Total estimate</h5>
                  <span className="text-lg">{totalAmount}</span>
                </div>
                <button
                  type="button"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Contact us for more info
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
