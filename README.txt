NG ASSOCIATE Attendance - PWA package

Files:
- index.html : attendance app
- manifest.json : install/app metadata
- sw.js : service worker
- icons/ : app icons

IMPORTANT:
This app uses Supabase for central multi-phone attendance sync, so host these files on HTTPS.
After hosting, open the HTTPS site in PWABuilder and use the Android package option to create an APK/AAB.

The Supabase/API requests are intentionally not cached by the service worker.
