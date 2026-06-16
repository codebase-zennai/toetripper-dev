'use client';

import Navbar from '../components/Navbar';
import WebflowClientOnly from '../components/WebflowClientOnly';
import Footer from '../components/Footer';
import NewsletterCTA from '../components/NewsletterCTA';
import ThemesHero from './components/ThemesHero';
import ThemesImages from './components/ThemesImages';
import ThemesList from './components/ThemesList';
import '../about/about.css';

export default function TravelThemesPage() {
  return (
    <WebflowClientOnly>
      <>
        <Navbar />
        <ThemesHero />
        {/* <ThemesImages /> */}
        <ThemesList />
        <NewsletterCTA />
        <Footer />
      </>
    </WebflowClientOnly>
  );
}
