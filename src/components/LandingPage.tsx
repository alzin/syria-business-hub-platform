import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '@/components/landing/HeroSection';
import StatsSection from '@/components/landing/StatsSection';
import ExpertiseAreasSection from '@/components/landing/ExpertiseAreasSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import BenefitsSection from '@/components/landing/BenefitsSection';
import CTASection from '@/components/landing/CTASection';
import CommunitySection from '@/components/landing/CommunitySection';
import Footer from '@/components/landing/Footer';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleNavigateToMainPage = () => {
    // Navigate to main posts page
    navigate('/?posts=true');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Hero Section now handles its own background and scroll-triggered posts */}
      <HeroSection onNavigateToMainPage={handleNavigateToMainPage} />
      
      {/* Stats Section - With improved contrast */}
      <div className="relative bg-background -mt-20 pt-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <StatsSection />
        </div>
      </div>

      {/* Expertise Areas Section */}
      <ExpertiseAreasSection onNavigateToMainPage={handleNavigateToMainPage} />

      {/* Features Section */}
      <FeaturesSection />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* CTA Section */}
      <CTASection onNavigateToMainPage={handleNavigateToMainPage} />

      {/* Community Section */}
      <CommunitySection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;