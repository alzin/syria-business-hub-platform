
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useRealtimeNotifications } from "@/hooks/useRealtimeNotifications";
import { useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import PostDetail from "./pages/PostDetail";
import UserProfile from "./pages/UserProfile";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import "./i18n";

const queryClient = new QueryClient();

const AppContent = () => {
  const { user } = useAuth();
  
  // Only set up realtime notifications if user is authenticated
  useRealtimeNotifications();
  
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/post/:id" element={<PostDetail />} />
      <Route path="/user/:id" element={<UserProfile />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
