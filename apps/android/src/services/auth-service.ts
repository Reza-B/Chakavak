export type OtpChallenge = {
  challengeId: string;
  expiresInSec: number;
};

export type AuthSession = {
  accessToken: string;
  refreshToken: string;
  user: { id: string; phone?: string; nickname?: string };
};

const mockStore = new Map<string, { phone: string; code: string; expiresAt: number }>();

export async function requestOtp(phone: string): Promise<OtpChallenge> {
  await wait(250);
  const challengeId = `ch_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`;
  mockStore.set(challengeId, { phone, code: '12345', expiresAt: Date.now() + 120_000 });
  return { challengeId, expiresInSec: 120 };
}

export async function verifyOtp(challengeId: string, code: string): Promise<AuthSession> {
  await wait(250);
  const challenge = mockStore.get(challengeId);
  if (!challenge || challenge.expiresAt < Date.now() || challenge.code !== code) {
    throw new Error('verify_otp_failed');
  }
  mockStore.delete(challengeId);
  return {
    accessToken: `mock_access_${Date.now()}`,
    refreshToken: `mock_refresh_${Date.now()}`,
    user: { id: `phone:${challenge.phone}`, phone: challenge.phone },
  };
}

export async function guestLogin(deviceId: string, nickname?: string): Promise<AuthSession> {
  await wait(200);
  if (!deviceId) throw new Error('guest_login_failed');
  return {
    accessToken: `mock_guest_access_${Date.now()}`,
    refreshToken: `mock_guest_refresh_${Date.now()}`,
    user: { id: `guest:${deviceId}`, nickname: nickname ?? 'Guest' },
  };
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
