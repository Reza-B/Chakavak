export type OtpChallenge = {
  challengeId: string;
  expiresInSec: number;
};

export async function requestOtp(phone: string): Promise<OtpChallenge> {
  await wait(350);
  return { challengeId: `challenge_${phone}_${Date.now()}`, expiresInSec: 120 };
}

export async function verifyOtp(challengeId: string, code: string): Promise<{ accessToken: string }> {
  await wait(350);
  if (!challengeId || code !== '12345') {
    throw new Error('invalid_otp');
  }
  return { accessToken: `mock_access_${Date.now()}` };
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
