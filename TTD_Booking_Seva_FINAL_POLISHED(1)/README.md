# TTD Booking Seva - Fixed Login Version

## Customer login
The customer login now reads the same 50 records embedded in `auth.js`.

Test account:
- Email: `aarav1@example.com`
- Password: `TTD@100001`

Password rule:
- Customer ID `TTD100001` -> `TTD@100001`
- Customer ID `TTD100002` -> `TTD@100002`
- ...
- Customer ID `TTD100050` -> `TTD@100050`

## IMPORTANT
Open `index.html` first and use Customer Login. Do not open `customer-dashboard.html` directly.

If the browser previously stored an old login state, use the Logout button or clear site data/localStorage and then log in again.

This is a front-end demonstration only. It is not an official TTD website and does not process real tickets or payments. For production authentication, use a secure backend such as Supabase Auth/Firebase/server-side sessions.


## Added live-site pages
- `darshan.html` — darshan timing cards
- `sevas.html` — seva and offer cards
- `gallery.html` — devotional visual gallery
- `temple.html` — CSS 3D temple experience
- `contact.html` — help center
- Enhanced `style.css` — 3D hover, devotional texture, glow, responsive layout
- Cursor glow/dot effect added to the enhanced pages and main dashboards

## Run
Extract the ZIP and open `index.html`.
All pages are linked through the navigation.


## Final homepage update
The homepage was expanded with:
- Hero section with project explanation
- 3D temple visual
- Visitor journey
- Feature cards
- Project statistics
- Darshan/seva information section
- Customer and owner calls-to-action
- Clear demonstration disclaimer
- Responsive mobile layout
- Cursor glow and 3D hover effects

The homepage avoids presenting invented timings, prices or availability as official facts.
