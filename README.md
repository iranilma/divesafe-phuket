# DiveSafe Phuket – Digital Experience & Booking Hub

A commercial-grade, fully interactive web application and booking management prototype designed specifically for **DiveSafe Phuket** (https://divesafephuket.com/).

---

## 🌊 Authentic Business Verification & Baseline Data

Built directly on verified facts, services, and policies inspected from the official website:
- **Operating Brand**: DiveSafe Phuket — *"The sea is Calling"*
- **Lead Professional**: Roman Zack (20+ years guiding Phuket diving)
- **Official Licensing**: Tourism Authority of Thailand (**TAT no. 34/03074**)
- **Dive Center Certification**: **SSI Dive Center ID 766703** (plus PADI / multi-agency certifications)
- **Official Address**: 43/24 Moo 5 Rawai, Rawai, Phuket 83130, Thailand
- **WhatsApp / Phone**: `+66 94 001 8590` (Configurable in Settings)
- **Email**: `booking@divesafephuket.com`
- **Supported Languages**: English, Russian (*Мы говорим по-русски*), Hebrew (*עברית*)
- **Published Prices**:
  - Discover Scuba Diving (DSD) / Try Dive: `4,200 THB`
  - Open Water Diver (3 Days standard): `12,900 THB`
  - Open Water Diver (2 Days Fast-Track): `12,400 THB`
  - Open Water Diver (4 Beach Dives, Kata Beach): `11,500 THB`
  - Advanced Adventurer / Advanced Open Water: `11,900 THB`
  - Open Water + Advanced Combo (4 Days): `22,500 THB`
  - Racha Yai & Racha Noi Day Trip (2–3 Dives): `4,200 THB` (Snorkeling: `2,900 THB`)
  - Phi Phi Islands & Shark Point Day Trip (3 Dives): `4,200 THB` (+ `600 THB` Marine Park Fee)
  - King Cruiser Wreck, Shark Point & Koh Dok Mai: `4,200 THB`
  - Half-Day Shore Refresher (Kata Beach): `3,200 THB`
  - Full-Day Boat Scuba Refresher (Racha Yai): `4,800 THB`
  - Enriched Air Nitrox Specialty: `6,500 THB`
  - Similan Islands & Richelieu Rock Liveaboard: *Quotation on request*

---

## 🚀 Key Product Features

### A. Customer-Facing Digital Experience Hub
1. **Tropical Luxury Aesthetics**: Deep ocean blues, turquoise accents, coral highlights, responsive modern typography, and authentic imagery.
2. **Three Personalised Customer Journeys**:
   - **Journey A – I'm a Beginner** (*"Your First Diving Adventure Starts Here"*): 6-step questionnaire evaluating experience, swimming confidence, and trial vs. certification preferences.
   - **Journey B – I'm a Certified Diver** (*"Explore Phuket's Best Dive Sites"*): 5-step questionnaire evaluating certification level, logged dives, last dive date, and diving interests (wrecks, deep, reefs, sharks, multiple dives).
   - **Journey C – I Want to Learn to Dive** (*"Start Your Diving Certification Journey"*): 5-step questionnaire for prospective students (Open Water, Advanced Adventurer, Fast-Track, or Zero-to-Hero Combo).
3. **Dynamic Interactive Recommendation Engine**:
   - Matches visitor inputs with the most suitable verified DiveSafe program.
   - Highlights prerequisites, max depth, duration, and tailored rationale.
   - Clearly displays safety and medical fitness disclaimers.
4. **Centralized WhatsApp Enquiry System**:
   - Generates formatted, structured messages following official DiveSafe booking standards (including participants, dates, hotel name, and shoe/fin size).
   - 1-click WhatsApp web/app launch to `https://wa.me/66940018590`.
5. **Searchable & Filterable Experience Catalogue**:
   - Interactive category tabs (Beginner, Certified, Courses, Refresher, Specialty).
   - Detail modal with complete itineraries, prerequisites, and inclusions.
6. **Destination Showcases**:
   - Depth profiles, trip durations, and marine life for Phi Phi, Racha Islands, King Cruiser Wreck, Shark Point, Koh Dok Mai, and Kata Beach.
7. **Multilingual Architecture**:
   - Full English, Russian, and Hebrew support.
   - Automatic `dir="rtl"` layout switching for Hebrew.

---

### B. Administrative Booking & Lead Management Dashboard
Accessible at `#/admin` with demo credentials:
- **Username**: `admin`
- **Password**: `demo123` *(with 1-click instant login button)*

1. **Executive Overview**:
   - Metric cards (Total Enquiries, New Uncontacted, Follow-ups, Booking Pending, Confirmed, Pipeline Value in THB).
   - Interactive Recharts (Enquiry trends, journey breakdown donut, popular trips, lead sources).
   - Live system activity log.
2. **Lead Management Table**:
   - Searchable by customer name, ID, email, accommodation, or experience.
   - Filter by status and journey type.
   - Inline status change dropdown with immediate persistence.
3. **Customer Profiles**:
   - Deep-dive modal with personal details, diving credentials, hotel transfer notes, and shoe/fin sizes.
   - Internal staff notes system with real-time note creation.
   - Scheduled follow-up reminder picker.
   - WhatsApp quick-dispatch tool with 4 pre-written customer service templates.
4. **Booking Pipeline (Kanban Board)**:
   - Visual drag-and-drop or step buttons across 6 stages: *New Enquiries → Contacted → Follow-up → Booking Pending → Confirmed → Completed*.
5. **Booking Calendar**:
   - Monthly interactive view displaying day departures.
   - Color-coded badges for Confirmed (green), Pending (yellow), and Enquiries (cyan).
   - Day-click inspection modal.
6. **Experience Catalogue Manager**:
   - Add, edit, or toggle active/inactive status of any experience, price, or duration.
7. **Analytics Hub**:
   - Booking conversion funnel, destination popularity, and acquisition channels.
8. **Automation Centre**:
   - 4 simulated workflows: New Enquiry Ingestion, Follow-up Reminders, Confirmed Booking Sync, and WhatsApp Generator.
9. **Settings**:
   - Configurable WhatsApp business phone, shop address, manager name, and 1-click demo database reset.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom Ocean theme
- **Icons**: Lucide React
- **Data Visualizations**: Recharts
- **Data Layer**: Centralized reactive React Context + LocalStorage synchronization with cross-tab events (`divesafe-data-sync`)
- **Routing**: Clean client hash navigation (`#/admin`)

---

## 🏃 Running the Application

```bash
cd divesafe-phuket
npm install
npm run dev
```

Or preview the production build:
```bash
npm run build
npm run preview -- --port 4173
```
