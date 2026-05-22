# Chakavak Clubhouse-like MVP Roadmap

این سند برنامه اجرایی مرحله‌به‌مرحله برای رسیدن به یک MVP قابل‌استفاده شبیه کلاب‌هاوس است.

## 0) هدف MVP
برای اینکه MVP «واقعاً قابل کار کردن» باشد، باید این موارد end-to-end کار کنند:

- ورود با OTP واقعی + ورود مهمان با محدودیت
- لیست/ایجاد/ورود/خروج اتاق
- نقش‌ها: host / speaker / listener
- Raise hand + approve/reject
- صوت زنده پایدار (تاخیر پایین + reconnect)
- Explore برای اتاق‌های public
- Backchannel و reactions realtime
- گزارش تخلف حداقلی
- بیلد اندروید قابل انتشار

---

## 1) فازبندی اجرایی

### فاز 1 — Foundation & Quality (3-5 روز)
- [ ] یکپارچه‌سازی اسکریپت‌ها و envها در monorepo
- [ ] CI پایه: lint/typecheck/build برای هر اپ
- [ ] i18n پایه (fa/en) برای mobile
- [ ] الگوی استاندارد loading/error/empty state
- [ ] قرارداد API مشترک (OpenAPI یا schema)

**Done معیار:** پروژه پایدار، قابل توسعه تیمی، و آماده staging.

### فاز 2 — Auth واقعی + Guest Policy (5-7 روز)
- [ ] پیاده‌سازی `POST /auth/request-otp` با Faraz SMS
- [ ] پیاده‌سازی `POST /auth/verify-otp`
- [ ] JWT access/refresh + rotation
- [ ] محدودیت ورود مهمان (device/ip/day)
- [ ] TTL و rate-limit برای OTP

**Done معیار:** ورود امن واقعی با OTP + مهمان محدود.

### فاز 3 — Rooms Core (7-10 روز)
- [ ] Room CRUD واقعی
- [ ] join/leave
- [ ] role enforcement (host/speaker/listener)
- [ ] raise-hand queue + approve/reject
- [ ] mute all / mute speaker

**Done معیار:** مدیریت اتاق و استیج قابل استفاده.

### فاز 4 — Realtime Interaction (4-6 روز)
- [ ] WebSocket gateway برای room events
- [ ] backchannel realtime
- [ ] reactions realtime
- [ ] presence count
- [ ] anti-spam ساده

**Done معیار:** تعامل زنده پایدار در اتاق.

### فاز 5 — Audio Engine (10-15 روز)
- [ ] انتخاب و ادغام LiveKit (پیشنهادی)
- [ ] publish/subscribe صوت
- [ ] speaker promotion/demotion
- [ ] reconnect و adaptive behavior
- [ ] Android audio focus/background behavior

**Done معیار:** اتاق صوتی واقعی با کیفیت MVP.

### فاز 6 — Explore & Discovery (4-6 روز)
- [ ] لیست اتاق‌های public
- [ ] دسته‌بندی/تاپیک
- [ ] جستجوی ساده
- [ ] trending ranking پایه

**Done معیار:** کاربر بتواند سریع اتاق مناسب پیدا کند.

### فاز 7 — Safety + Ops Lite + Release (5-8 روز)
- [ ] گزارش تخلف در اتاق
- [ ] endpointهای moderation پایه
- [ ] ops-lite web page ساده
- [ ] crash/analytics lightweight
- [ ] Android release readiness

**Done معیار:** MVP قابل انتشار.

---

## 2) تصمیمات فنی تثبیت‌شده

- Backend: **NestJS**
- Database: **PostgreSQL**
- OTP Provider: **Faraz SMS**
- Realtime: **WebSocket (Nest Gateway)**
- Audio: **LiveKit (پیشنهادی برای سرعت + کیفیت)**
- Analytics سبک OSS: **PostHog**

---

## 3) برآورد کل زمان

- حالت فشرده: **6 تا 8 هفته**
- حالت واقع‌بینانه با پولیش: **9 تا 12 هفته**

---

## 4) برنامه اجرای مرحله‌ای (اولویت عملی)

### مرحله بعدی فوری (Sprint A)
1. Auth واقعی با Faraz + guest limits
2. اتصال mobile auth service به backend واقعی
3. تکمیل validation/rate-limit

### Sprint B
1. تکمیل Room APIs + اتصال mobile rooms service
2. role guard های دقیق
3. صف raise-hand سرتاسری

### Sprint C
1. WebSocket realtime (chat/reactions/presence)
2. تست پایداری و performance

### Sprint D
1. ادغام LiveKit
2. QA صوتی روی Android

---

## 5) Definition of Done نهایی MVP

- [ ] OTP واقعی + guest محدود
- [ ] room lifecycle کامل
- [ ] moderation stage کامل
- [ ] realtime chat/reactions
- [ ] audio پایدار و reconnect
- [ ] explore public rooms
- [ ] report abuse پایه
- [ ] android build قابل انتشار

