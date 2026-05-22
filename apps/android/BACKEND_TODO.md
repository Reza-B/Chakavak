# Chakavak Backend TODO

## 1) Auth (Phone/SMS OTP)
- [x] Endpoint: `POST /auth/request-otp` (phone -> challengeId)
- [x] Endpoint: `POST /auth/verify-otp` (challengeId + code -> access/refresh token)
- [x] Rate limit per phone/device/IP (OTP + guest login)
- [x] OTP expiration, retry policy, and abuse protection

## 2) Realtime Audio Rooms
- [x] Room CRUD: create/list/detail/close
- [x] Join/leave room API آماده شد (signaling و ICE در گام بعد)
- [x] Role management: host/speaker/listener
- [x] Raise-hand queue with moderation actions (approve/reject)
- [x] Mute/unmute controls + room-wide moderation events

## 3) Engagement & Social
- [ ] Sound reactions broadcast channel
- [ ] Backchannel text chat per room
- [ ] Random pair matching (Speed Chitchat) with timeout + extend flow

## 4) Safety & Governance
- [ ] In-room report API + moderation queue
- [ ] Device/IP ban system and audit trail
- [ ] Trust & safety admin dashboard APIs

## 5) Platform/Infra
- [ ] Presence service (who is online)
- [ ] Push notification service (room invites, follows)
- [ ] Analytics events for retention funnels
