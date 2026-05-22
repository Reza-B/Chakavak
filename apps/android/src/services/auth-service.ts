export type OtpChallenge = {
  challengeId: string;
  expiresInSec: number;
};

export type AuthSession = {
  accessToken: string;
  refreshToken: string;
  user: { id: string; phone?: string; nickname?: string };
};

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:3001/api';

export async function requestOtp(phone: string): Promise<OtpChallenge> {
  const res = await fetch(`${API_BASE_URL}/auth/request-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone }),
  });
  if (!res.ok) throw new Error('request_otp_failed');
  return res.json();
}

export async function verifyOtp(challengeId: string, code: string): Promise<AuthSession> {
  const res = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ challengeId, code }),
  });
  if (!res.ok) throw new Error('verify_otp_failed');
  return res.json();
}

export async function guestLogin(deviceId: string, nickname?: string): Promise<AuthSession> {
  const res = await fetch(`${API_BASE_URL}/auth/guest-login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ deviceId, nickname }),
  });
  if (!res.ok) throw new Error('guest_login_failed');
  return res.json();
}
