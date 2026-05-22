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
- [x] Sound reactions broadcast channel (REST پایه آماده، websocket گام بعد)
- [x] Backchannel text chat per room (REST پایه آماده، realtime گام بعد)
- [x] Random pair matching (Speed Chitchat) with timeout + extend flow (MVP queue/match)

## 4) Safety & Governance
- [x] In-room report API + moderation queue
- [x] Device/IP ban system and audit trail (MVP in-memory)
- [x] Trust & safety admin dashboard APIs (MVP list/report/ban endpoints)

## 5) Platform/Infra
- [x] Presence service (who is online)
- [x] Push notification service (room invites, follows) - API stub
- [x] Analytics events for retention funnels - API ingest stub
