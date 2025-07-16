import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { findByShortcode, recordClick } from '../utils/storage';

export default function RedirectPage() {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const data = findByShortcode(shortcode);
    if (!data) return navigate('/shorten');

    const now = new Date();
    const expiry = new Date(data.expiresAt);
    if (now > expiry) return navigate('/shorten');

    recordClick(shortcode, {
      timestamp: now.toISOString(),
      referrer: document.referrer,
      location: 'MockLocation'
    });

    window.location.href = data.originalURL;
  }, [shortcode]);

  return <p>Redirecting...</p>;
}