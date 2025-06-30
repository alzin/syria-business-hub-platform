
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import NewPasswordForm from '@/components/auth/NewPasswordForm';

const ResetPassword: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {user ? (
          <NewPasswordForm />
        ) : (
          <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4">Invalid Reset Link</h2>
            <p className="text-gray-600">
              This password reset link is invalid or has expired. Please request a new password reset.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
