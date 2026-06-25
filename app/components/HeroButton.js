"use client";

import Link from "next/link";

export default function HeroButton({ text, url }) {
  return (
    <Link
      href={url}
      data-w-id="5636032a-1271-e473-ecbe-20e393bd2447"
      className="button-with-circle-icon w-inline-block"
    >
      <p className="button-text">{text}</p>
      <p className="button-text-absolute">{text}</p>

      <div className="button-arrow-wrapper">
        <img
          width="Auto"
          height="Auto"
          alt=""
          src="https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66e3f449091e597be1c4c815_arrow_outward.svg"
          loading="eager"
          className="arrow"
        />
      </div>
    </Link>
  );
}