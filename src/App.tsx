
import React, { Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/providers/AuthProvider";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { RecoveryTokenHandler } from "@/components/auth/RecoveryTokenHandler";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { initializePortalContainer } from "@/utils/portal-container";

// Critical pages loaded immediately
import Index from "./pages/Index";
import Auth from "@/pages/Auth";

// Essential pages lazy loaded
const Friends = React.lazy(() => import("@/pages/Friends"));
const FriendRequestsPage = React.lazy(() => import("@/pages/FriendRequestsPage"));
const FollowersPage = React.lazy(() => import("@/pages/FollowersPage"));
const Notifications = React.lazy(() => import("@/pages/Notifications"));
const Messages = React.lazy(() => import("@/pages/Messages"));
const Profile = React.lazy(() => import("@/pages/Profile"));
const Projects = React.lazy(() => import("@/pages/Projects"));
const Reels = React.lazy(() => import("@/pages/Reels"));
const PasswordReset = React.lazy(() => import("@/pages/PasswordReset"));
// Opportunities removed
const Settings = React.lazy(() => import("@/pages/settings/Settings"));
const AccountSettings = React.lazy(() => import("@/pages/settings/AccountSettings"));
const PersonalizationSettings = React.lazy(() => import("@/pages/settings/PersonalizationSettings"));
const PrivacySettings = React.lazy(() => import("@/pages/settings/PrivacySettings"));
const SecuritySettings = React.lazy(() => import("@/pages/settings/SecuritySettings"));
const NotificationSettings = React.lazy(() => import("@/pages/NotificationSettings"));
const StatisticsSettings = React.lazy(() => import("@/pages/settings/StatisticsSettings"));
const NotFound = React.lazy(() => import("@/pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10, // 10 minutes - increased for better caching
      retry: 1,
      refetchOnWindowFocus: false, // Reduce unnecessary network calls
    },
  },
});

const App = () => {
  // Initialize portal container on app start
  useEffect(() => {
    initializePortalContainer();
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <Toaster />
            <BrowserRouter>
              <AuthProvider>
                <RecoveryTokenHandler />
              <Routes>
              {/* Critical pages - no lazy loading */}
              <Route path="/auth" element={<Auth />} />
              
              <Route path="/" element={
                <AuthGuard>
                  <Index />
                </AuthGuard>
              } />
              
              {/* Core features - lazy loaded */}
              <Route path="/password-reset" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <PasswordReset />
                </Suspense>
              } />
              <Route path="/profile/:userId" element={
                <AuthGuard>
                  <Suspense fallback={<LoadingSpinner />}>
                    <Profile />
                  </Suspense>
                </AuthGuard>
              } />
              <Route path="/friends" element={
                <AuthGuard>
                  <Suspense fallback={<LoadingSpinner />}>
                    <Friends />
                  </Suspense>
                </AuthGuard>
              } />
              <Route path="/followers" element={
                <AuthGuard>
                  <Suspense fallback={<LoadingSpinner />}>
                    <FollowersPage />
                  </Suspense>
                </AuthGuard>
              } />
              <Route path="/friends/requests" element={
                <AuthGuard>
                  <Suspense fallback={<LoadingSpinner />}>
                    <FriendRequestsPage />
                  </Suspense>
                </AuthGuard>
              } />
              <Route path="/messages" element={
                <AuthGuard>
                  <Suspense fallback={<LoadingSpinner />}>
                    <Messages />
                  </Suspense>
                </AuthGuard>
              } />
              <Route path="/notifications" element={
                <AuthGuard>
                  <Suspense fallback={<LoadingSpinner />}>
                    <Notifications />
                  </Suspense>
                </AuthGuard>
              } />
              <Route path="/projects" element={
                <AuthGuard>
                  <Suspense fallback={<LoadingSpinner />}>
                    <Projects />
                  </Suspense>
                </AuthGuard>
              } />
              {/* Reels removed - FASE 2 */}
              {/* Opportunities removed */}
              
              {/* Settings pages */}
              <Route path="/settings" element={
                <AuthGuard>
                  <Suspense fallback={<LoadingSpinner />}>
                    <Settings />
                  </Suspense>
                </AuthGuard>
              } />
              <Route path="/settings/account" element={
                <AuthGuard>
                  <Suspense fallback={<LoadingSpinner />}>
                    <AccountSettings />
                  </Suspense>
                </AuthGuard>
              } />
              <Route path="/settings/personalization" element={
                <AuthGuard>
                  <Suspense fallback={<LoadingSpinner />}>
                    <PersonalizationSettings />
                  </Suspense>
                </AuthGuard>
              } />
              <Route path="/settings/privacy" element={
                <AuthGuard>
                  <Suspense fallback={<LoadingSpinner />}>
                    <PrivacySettings />
                  </Suspense>
                </AuthGuard>
              } />
              <Route path="/settings/security" element={
                <AuthGuard>
                  <Suspense fallback={<LoadingSpinner />}>
                    <SecuritySettings />
                  </Suspense>
                </AuthGuard>
              } />
              <Route path="/settings/notifications" element={
                <AuthGuard>
                  <Suspense fallback={<LoadingSpinner />}>
                    <NotificationSettings />
                  </Suspense>
                </AuthGuard>
              } />
              <Route path="/settings/statistics" element={
                <AuthGuard>
                  <Suspense fallback={<LoadingSpinner />}>
                    <StatisticsSettings />
                  </Suspense>
                </AuthGuard>
              } />
              
              
              {/* 404 fallback */}
              <Route path="*" element={
                <AuthGuard>
                  <Suspense fallback={<LoadingSpinner />}>
                    <NotFound />
                  </Suspense>
                </AuthGuard>
              } />
              </Routes>
              </AuthProvider>
            </BrowserRouter>
          </ThemeProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;
