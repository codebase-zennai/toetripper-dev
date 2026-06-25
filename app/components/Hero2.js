"use client";

import HeroLeft from "./HeroLeft";
import HeroRight from "./HeroRight";

export default function Hero() {
    return (
        <>
            <section className="new-hero-section flex justify-center items-center">
                <div className="h-100 w-100 flex gap-4 new-hero-inner">
                    <div className="w-1/2 h-full">
                        <HeroLeft/>
                    </div>
                    <div className="w-1/2 bg-red-500 h-full">
                        <HeroRight />
                    </div>
                </div>
            </section>
        </>
    )
}