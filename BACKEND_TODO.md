# Chakavak Backend TODO

## 1) Auth (Phone/SMS OTP)
- [ ] Endpoint: `POST /auth/request-otp` (phone -> challengeId)
- [ ] Endpoint: `POST /auth/verify-otp` (challengeId + code -> access/refresh token)
- [ ] Rate limit per phone/device/IP
- [ ] OTP expiration, retry policy, and abuse protection

## 2) Realtime Audio Rooms
- [ ] Room CRUD: create/list/detail/close
- [ ] WebRTC signaling service (join/leave, ICE exchange)
- [ ] Role management: host/speaker/listener
- [ ] Raise-hand queue with moderation actions (approve/reject)
- [ ] Mute/unmute controls + room-wide moderation events

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
