import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { TripProvider } from './context/TripContext';
import { ChatProvider } from './context/ChatContext';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AiChatDrawer } from './components/ai/AiChatDrawer';
import { AiTripPlannerModal } from './components/ai/AiTripPlannerModal';
import { CheckoutModal } from './components/bookings/CheckoutModal';

import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { DestinationDetails } from './pages/DestinationDetails';
import { AiTripPlannerPage } from './pages/AiTripPlannerPage';
import { ItineraryEditorPage } from './pages/ItineraryEditorPage';
import { StaysPage } from './pages/StaysPage';
import { StayDetailsPage } from './pages/StayDetailsPage';
import { FlightsPage } from './pages/FlightsPage';
import { ActivitiesPage } from './pages/ActivitiesPage';
import { TrainsPage } from './pages/TrainsPage';
import { BusesPage } from './pages/BusesPage';
import { CabsPage } from './pages/CabsPage';
import { CarRentalsPage } from './pages/CarRentalsPage';
import { EventsPage } from './pages/EventsPage';
import { RestaurantsPage } from './pages/RestaurantsPage';
import { CruisesPage } from './pages/CruisesPage';
import { UserDashboard } from './pages/UserDashboard';
import { PartnerPortal } from './pages/PartnerPortal';
import { AdminDashboard } from './pages/AdminDashboard';
import { TravelGuidesPage } from './pages/TravelGuidesPage';
import { AuthPages } from './pages/AuthPages';
import { HelpLegalPages } from './pages/HelpLegalPages';

export const AppContent: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [activeParam, setActiveParam] = useState<any>(null);

  // Modals
  const [plannerModalOpen, setPlannerModalOpen] = useState<boolean>(false);
  const [prefilledDestination, setPrefilledDestination] = useState<string>('Kyoto');
  const [checkoutModalOpen, setCheckoutModalOpen] = useState<boolean>(false);
  const [checkoutItem, setCheckoutItem] = useState<any>(null);

  const handleNavigate = (tab: string, param?: any) => {
    setCurrentTab(tab);
    setActiveParam(param || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPlannerModal = (destName?: string) => {
    setPrefilledDestination(destName || 'Kyoto');
    setPlannerModalOpen(true);
  };

  const handleOpenCheckoutModal = (item: any) => {
    setCheckoutItem(item);
    setCheckoutModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-brand-500 selection:text-white">
      {/* Sticky Navbar */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenPlannerModal={() => handleOpenPlannerModal()}
      />

      {/* Main Dynamic View */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <Home
            onNavigate={handleNavigate}
            onOpenPlannerModal={() => handleOpenPlannerModal()}
          />
        )}

        {(currentTab === 'explore' || currentTab === 'destinations') && (
          <Explore
            onNavigate={handleNavigate}
            onOpenPlannerModal={() => handleOpenPlannerModal()}
          />
        )}

        {currentTab === 'destination-details' && (
          <DestinationDetails
            destinationId={activeParam?.id || 'dest-kyoto'}
            onNavigate={handleNavigate}
            onOpenPlannerModal={handleOpenPlannerModal}
          />
        )}

        {currentTab === 'planner' && (
          <AiTripPlannerPage
            onNavigate={handleNavigate}
            onOpenPlannerModal={() => handleOpenPlannerModal()}
          />
        )}

        {currentTab === 'itinerary-editor' && (
          <ItineraryEditorPage
            onNavigate={handleNavigate}
            onOpenCheckoutModal={handleOpenCheckoutModal}
          />
        )}

        {currentTab === 'stays' && (
          <StaysPage
            onNavigate={handleNavigate}
            onOpenCheckoutModal={handleOpenCheckoutModal}
          />
        )}

        {currentTab === 'stay-details' && (
          <StayDetailsPage
            stayId={activeParam?.id || 'stay-kyoto-hoshinoya'}
            onNavigate={handleNavigate}
            onOpenCheckoutModal={handleOpenCheckoutModal}
          />
        )}

        {currentTab === 'flights' && (
          <FlightsPage
            onNavigate={handleNavigate}
            onOpenCheckoutModal={handleOpenCheckoutModal}
          />
        )}

        {currentTab === 'trains' && (
          <TrainsPage
            onNavigate={handleNavigate}
            onOpenCheckoutModal={handleOpenCheckoutModal}
          />
        )}

        {currentTab === 'buses' && (
          <BusesPage
            onNavigate={handleNavigate}
            onOpenCheckoutModal={handleOpenCheckoutModal}
          />
        )}

        {currentTab === 'cabs' && (
          <CabsPage
            onNavigate={handleNavigate}
            onOpenCheckoutModal={handleOpenCheckoutModal}
          />
        )}

        {(currentTab === 'car-rentals' || currentTab === 'cars') && (
          <CarRentalsPage
            onNavigate={handleNavigate}
            onOpenCheckoutModal={handleOpenCheckoutModal}
          />
        )}

        {currentTab === 'events' && (
          <EventsPage
            onNavigate={handleNavigate}
            onOpenCheckoutModal={handleOpenCheckoutModal}
          />
        )}

        {(currentTab === 'restaurants' || currentTab === 'dining') && (
          <RestaurantsPage
            onNavigate={handleNavigate}
            onOpenCheckoutModal={handleOpenCheckoutModal}
          />
        )}

        {currentTab === 'cruises' && (
          <CruisesPage
            onNavigate={handleNavigate}
            onOpenCheckoutModal={handleOpenCheckoutModal}
          />
        )}

        {(currentTab === 'activities' || currentTab === 'experiences') && (
          <ActivitiesPage
            onNavigate={handleNavigate}
            onOpenCheckoutModal={handleOpenCheckoutModal}
          />
        )}

        {currentTab === 'dashboard' && (
          <UserDashboard
            initialTab={activeParam?.tab || 'overview'}
            onNavigate={handleNavigate}
            onOpenPlannerModal={handleOpenPlannerModal}
            onOpenCheckoutModal={handleOpenCheckoutModal}
          />
        )}

        {currentTab === 'partner' && (
          <PartnerPortal onNavigate={handleNavigate} />
        )}

        {currentTab === 'admin' && (
          <AdminDashboard onNavigate={handleNavigate} />
        )}

        {currentTab === 'guides' && (
          <TravelGuidesPage
            onNavigate={handleNavigate}
            onOpenPlannerModal={handleOpenPlannerModal}
          />
        )}

        {currentTab === 'auth-login' && (
          <AuthPages mode="login" onNavigate={handleNavigate} />
        )}

        {currentTab === 'auth-register' && (
          <AuthPages mode="register" onNavigate={handleNavigate} />
        )}

        {(currentTab === 'about' || currentTab === 'terms' || currentTab === 'privacy' || currentTab === 'cancellation') && (
          <HelpLegalPages
            pageType={currentTab as any}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Floating AI Chat Assistant */}
      <AiChatDrawer onNavigate={handleNavigate} />

      {/* Modals */}
      <AiTripPlannerModal
        isOpen={plannerModalOpen}
        onClose={() => setPlannerModalOpen(false)}
        initialDestination={prefilledDestination}
        onSuccess={() => handleNavigate('itinerary-editor')}
      />

      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        item={checkoutItem}
        onSuccess={() => handleNavigate('dashboard', { tab: 'bookings' })}
      />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <TripProvider>
        <ChatProvider>
          <AppContent />
        </ChatProvider>
      </TripProvider>
    </AuthProvider>
  );
}
