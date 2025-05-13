'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function EmailVerificationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('Verifying your email...');
  const [countdown, setCountdown] = useState(5);

  const startCountdown = useCallback(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          router.push('/login');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [router]);

  const verifyEmail = useCallback(async (token: string) => {
    try {
      const response = await fetch(`/api/verify-email?token=${token}`);
      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setMessage('Your email has been successfully verified!');
        startCountdown();
      } else {
        setStatus('error');
        setMessage(data.message || 'Verification failed.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('An error occurred during verification.');
    }
  }, [startCountdown]);

  useEffect(() => {
    const token = searchParams.get('token');
    const verified = searchParams.get('verified');

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
    router.push('/login');
  };

  // ... return JSX as-is (unchanged)
