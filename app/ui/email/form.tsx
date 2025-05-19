'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function EmailVerificationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('Verifying your email...');
  const [countdown, setCountdown] = useState(5);
  
  // This will hold where to redirect
  const [redirectPath, setRedirectPath] = useState('');

  const startCountdown = useCallback(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          router.push(redirectPath);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [router, redirectPath]);

  const verifyEmail = useCallback(async (token: string) => {
    try {
      const response = await fetch(`/api/verify-email?token=${token}`);
      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setMessage('Your email has been successfully verified!');

        // Check if the API returns user type in the response
        if (data.userType) {
          setRedirectPath(data.userType === 'client_users' ? '/postjob' : '/login');
        }
        // Default redirection will happen based on URL params or default logic

        startCountdown();
      } else {
        setStatus('error');
        setMessage(data.message || 'Verification failed.');
      }
    } catch (err) {
      console.error('Email verification error:', err);
      setStatus('error');
      setMessage('An error occurred during verification.');
    }
  }, [startCountdown]);

  useEffect(() => {
    const token = searchParams.get('token');
    const verified = searchParams.get('verified');
    const type = searchParams.get('type'); // read the user type from URL

    // Determine redirect path based on available information
    const determineRedirectPath = () => {
      // First priority: Check URL parameter
      if (type === 'client_users') {
        return '/postjob';
      }
      
      // Second priority: If type is explicitly set to something else
      if (type && type !== 'client_users') {
        return '/login';
      }
      
      // Default fallback if no type is specified
      return '/login';
    };
    
    // Set the redirect path
    const path = determineRedirectPath();
    setRedirectPath(path);

    if (verified === 'true') {
      setStatus('success');
      setMessage('Your email has been successfully verified!');
      startCountdown();
      return;
    }

    if (!token) {
      setStatus('error');
      setMessage('Verification token is missing.');
      return;
    }

    verifyEmail(token);
  }, [searchParams, startCountdown, verifyEmail]);

  const handleRedirectNow = () => {
    router.push(redirectPath);
  };

  const getRedirectButtonText = () => {
    return redirectPath === '/login' ? 'Login' : 'Post Job';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Email Verification</h2>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          {status === 'verifying' && (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600">{message}</p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-green-800 mb-2">Verification Successful!</h3>
              <p className="text-green-600 mb-6">{message}</p>
              <div className="space-y-4">
                <p className="text-gray-600">Redirecting to {redirectPath} in {countdown} seconds...</p>
                <button
                  onClick={handleRedirectNow}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Go to {getRedirectButtonText()} Now
                </button>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-red-800 mb-2">Verification Failed</h3>
              <p className="text-red-600 mb-6">{message}</p>
              <div className="space-y-4">
                <button
                  onClick={() => router.push('/register')}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Back to Register
                </button>
                <button
                  onClick={() => router.push('/login')}
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Go to Login
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
