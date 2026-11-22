import { DivingExperience } from '../types';

export interface RecommendationResult {
  experienceId: string;
  experienceTitle: string;
  destination: string;
  duration: string;
  priceDisplay: string;
  explanation: string;
  suitableProfile: string;
  requirements: string;
  nextStep: string;
  imageUrl: string;
  alternativeExperienceId?: string;
  alternativeTitle?: string;
}

/**
 * Robust fallback generator that never relies on arbitrary array indices.
 */
const getSafeFallback = (id: string, experiences: DivingExperience[]): DivingExperience => {
  const found = experiences.find(e => e.id === id);
  if (found) return found;

  // If specific ID is missing, try to find any active experience
  const firstActive = experiences.find(e => e.active);
  if (firstActive) return firstActive;

  // Ultimate safe object if catalogue is completely empty
  return {
    id: 'divesafe-experience',
    title: 'DiveSafe Phuket Guided Experience',
    category: 'beginner',
    shortDesc: 'Personalized diving experience arranged by Roman Zack and team.',
    description: 'Contact DiveSafe directly via WhatsApp to receive a personalized diving proposal.',
    duration: '1 Full Day',
    priceThb: 4200,
    priceNote: 'Starting price • Gear & transfers included',
    maxDepth: 'Dependent on certification',
    prerequisites: 'Comfort in water or valid certification card.',
    highlights: ['Personalized instructor guidance', 'Small group safety', 'Phuket premier dive sites'],
    included: ['Tanks & weights', 'Transfers and catering'],
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    active: true
  };
};

export const getRecommendation = (
  journeyType: 'beginner' | 'certified' | 'courses',
  answers: Record<string, any>,
  experiences: DivingExperience[]
): RecommendationResult => {
  const findExp = (id: string) => getSafeFallback(id, experiences);

  // =========================================================================
  // JOURNEY A: BEGINNER
  // =========================================================================
  if (journeyType === 'beginner') {
    const q2 = answers.q2; // 'Just trying diving (1-day trial)' | 'Full Certification' | 'Both / Undecided'
    const q5 = answers.q5; // 'Yes, comfortable in water' | 'Basic swimming ability' | 'Not very confident' | 'Prefer shore'

    if (q2 === 'Full Certification') {
      if (q5 === 'Prefer shore') {
        const exp = findExp('open-water-4-beach');
        return {
          experienceId: exp.id,
          experienceTitle: exp.title,
          destination: 'Kata Beach Reef & Shallow Training Sites',
          duration: exp.duration,
          priceDisplay: exp.priceThb ? `${exp.priceThb.toLocaleString()} THB` : 'Contact for pricing',
          explanation:
            'Because you want full international certification but prefer shore departures without boat travel or seasickness, our shore-based Open Water course at Kata Beach allows you to complete pool skills and 4 ocean reef dives at a relaxed pace.',
          suitableProfile: 'Students wanting lifetime certification without long boat journeys.',
          requirements: exp.prerequisites || 'Age 10+, basic swimming ability (200m swim & 10 min float).',
          nextStep: 'Confirm your Phuket stay dates to reserve your instructor training schedule.',
          imageUrl: exp.imageUrl,
          alternativeExperienceId: 'open-water-standard',
          alternativeTitle: 'Boat-based Open Water Diver (3 Days)'
        };
      }

      const exp = findExp('open-water-standard');
      return {
        experienceId: exp.id,
        experienceTitle: exp.title,
        destination: 'Racha Yai Island & Chalong Training Facilities',
        duration: exp.duration,
        priceDisplay: exp.priceThb ? `${exp.priceThb.toLocaleString()} THB` : 'Contact for pricing',
        explanation:
          'Because you are looking to become an autonomous certified diver, the standard 3-Day Open Water course offers the most thorough, enjoyable, and safe foundation with personal instruction from Roman Zack.',
        suitableProfile: 'Beginners looking for an official international lifetime license (up to 18 meters) accepted globally.',
        requirements: exp.prerequisites || 'Age 10+, basic swimming ability (200m swim & 10 min float). Good general health.',
        nextStep: 'Submit your dates to receive digital course materials and confirm instructor schedule.',
        imageUrl: exp.imageUrl,
        alternativeExperienceId: 'ow-aow-combo',
        alternativeTitle: 'Open Water + Advanced Combo (4 Days)'
      };
    }

    if (q2 === 'Both / Undecided') {
      const exp = findExp('dsd-beginner');
      return {
        experienceId: exp.id,
        experienceTitle: 'Discover Scuba Diving (Trial with Course Credit Option)',
        destination: 'Racha Yai Island (Bungalow Bay & Siam Bay)',
        duration: exp.duration,
        priceDisplay: exp.priceThb ? `${exp.priceThb.toLocaleString()} THB` : '4,200 THB',
        explanation:
          'If you are undecided between a 1-day trial and a full multi-day course, Discover Scuba Diving is the ideal risk-free entry. You experience real open ocean diving under close 1:2 instructor supervision, and your trial dives and skills can be credited directly toward your Open Water certification if you choose to continue!',
        suitableProfile: 'Beginners who want to try diving first before committing to a 3-day course.',
        requirements: exp.prerequisites || 'Age 10+, comfortable in water. Medical questionnaire required.',
        nextStep: 'Select your preferred day to join our morning boat departure from Chalong Pier.',
        imageUrl: exp.imageUrl,
        alternativeExperienceId: 'open-water-standard',
        alternativeTitle: 'Direct Open Water Diver (3 Days)'
      };
    }

    if (q5 === 'Not very confident' || q5 === 'Prefer shore') {
      const exp = findExp('dsd-beginner');
      return {
        experienceId: exp.id,
        experienceTitle: 'Discover Scuba Diving – Shallow Bay & Gentle Pacing',
        destination: 'Racha Yai Protected Bay / Shallow Coral Garden',
        duration: exp.duration,
        priceDisplay: exp.priceThb ? `${exp.priceThb.toLocaleString()} THB` : '4,200 THB',
        explanation:
          'Because you prefer extra comfort and gentle conditions, we conduct your first breaths in a calm, swimming-pool-like shallow bay with strict 1:2 instructor ratios, no current, and infinite patience from our senior team.',
        suitableProfile: 'First-time divers seeking maximum personal attention, reassurance, and safety.',
        requirements: 'Age 10+, able to breathe comfortably through a regulator. No prior experience required.',
        nextStep: 'Reserve with our team to request a dedicated instructor for personalized pacing.',
        imageUrl: exp.imageUrl,
        alternativeExperienceId: 'open-water-4-beach',
        alternativeTitle: 'Shore-Based Beach Experience'
      };
    }

    // Default Beginner: Discover Scuba Diving
    const exp = findExp('dsd-beginner');
    return {
      experienceId: exp.id,
      experienceTitle: exp.title,
      destination: 'Racha Yai Island (Bungalow Bay & Siam Bay)',
      duration: exp.duration,
      priceDisplay: exp.priceThb ? `${exp.priceThb.toLocaleString()} THB` : '4,200 THB',
      explanation:
        'The perfect introduction to scuba diving! You will take your first breaths in clear, warm waters and complete 2 ocean dives guided every step of the way without classroom exams.',
      suitableProfile: 'Holiday makers wanting an unforgettable underwater adventure without multi-day study.',
      requirements: 'No certification needed. Age 10+. Basic comfort in water.',
      nextStep: 'Select your preferred day to join our morning boat departure from Chalong Pier.',
      imageUrl: exp.imageUrl,
      alternativeExperienceId: 'open-water-standard',
      alternativeTitle: 'Upgrade to Open Water 3-Day Course'
    };
  }

  // =========================================================================
  // JOURNEY B: CERTIFIED DIVER
  // =========================================================================
  if (journeyType === 'certified') {
    const cert = answers.qB1; // 'Open Water Diver' | 'Advanced Open Water' | 'Rescue Diver' | 'Divemaster / Instructor' | 'Other Certification'
    const loggedDives = answers.qB2; // '1 - 10 dives' | '11 - 30 dives' | '31 - 70 dives' | '70+ dives'
    const lastDive = answers.qB3; // 'Within the last 3 months' | '3 - 6 months ago' | '6 - 12 months ago' | '1 - 3 years ago' | 'Over 3 years ago'
    const interests: string[] = answers.qB4 || [];

    const isRusty =
      lastDive === '1 - 3 years ago' ||
      lastDive === 'Over 3 years ago' ||
      (lastDive === '6 - 12 months ago' && loggedDives === '1 - 10 dives');

    const isAdvancedQualified =
      cert === 'Advanced Open Water' ||
      cert === 'Rescue Diver' ||
      cert === 'Divemaster / Instructor';

    const wantsWreckOrDeep =
      interests.some(i => i.toLowerCase().includes('wreck')) ||
      interests.some(i => i.toLowerCase().includes('deep'));

    // Condition 1: Diver needs refresher
    if (isRusty) {
      const exp = findExp('scuba-skills-refresher');
      return {
        experienceId: exp.id,
        experienceTitle: exp.title,
        destination: 'Racha Yai Island (Clear, calm 15–25m visibility)',
        duration: exp.duration,
        priceDisplay: exp.priceThb ? `${exp.priceThb.toLocaleString()} THB` : '4,800 THB',
        explanation:
          'Because it has been over 6 months or several years since your last dive, a relaxed skills update at Racha Yai ensures you refresh regulator recovery, mask clearing, and buoyancy with zero stress before heading to deeper sites.',
        suitableProfile: 'Certified divers who want to regain confidence and peace of mind before multi-day diving.',
        requirements: 'Any recognized Open Water certification card or digital credential.',
        nextStep: 'Provide your certification number and shoe size to reserve your refresher gear.',
        imageUrl: exp.imageUrl,
        alternativeExperienceId: 'kata-beach-refresher',
        alternativeTitle: 'Half-Day Shore Refresher (Kata Beach)'
      };
    }

    // Condition 2: Open Water diver wanting Wreck / Deep (Safety constraint check)
    if (wantsWreckOrDeep && !isAdvancedQualified) {
      const exp = findExp('day-trip-phi-phi');
      return {
        experienceId: exp.id,
        experienceTitle: `${exp.title} (Recommended for Open Water)`,
        destination: 'Phi Phi National Marine Park & Shark Point',
        duration: exp.duration,
        priceDisplay: exp.priceThb ? `${exp.priceThb.toLocaleString()} THB (+ 600 THB Marine Park Fee)` : '4,200 THB',
        explanation:
          'Because you hold an Open Water certification (max 18m depth), the King Cruiser wreck sits at 30+ meters and requires Advanced certification. We recommend our magnificent Phi Phi Islands day trip (turtle and shark sightings within your 18m limit), and suggest doing the 2-Day Advanced Adventurer course to unlock deep wrecks safely!',
        suitableProfile: 'Open Water divers seeking thrilling marine encounters within safe depth limits.',
        requirements: 'Open Water Diver certification (or equivalent).',
        nextStep: 'Select your preferred departure day or ask our team about doing the Advanced course.',
        imageUrl: exp.imageUrl,
        alternativeExperienceId: 'advanced-adventurer',
        alternativeTitle: 'Advanced Adventurer Course (Unlocks 30m & Wrecks)'
      };
    }

    // Condition 3: Experienced / Advanced diver wanting Wreck or Deep
    if (isAdvancedQualified && wantsWreckOrDeep) {
      const exp = findExp('day-trip-king-cruiser');
      return {
        experienceId: exp.id,
        experienceTitle: exp.title,
        destination: 'King Cruiser Wreck, Shark Point & Koh Dok Mai',
        duration: exp.duration,
        priceDisplay: exp.priceThb ? `${exp.priceThb.toLocaleString()} THB` : '4,200 THB',
        explanation:
          'Your certification and interest in wrecks make the King Cruiser Day Trip an ideal match. Dive an 85-meter submerged catamaran wreck at 30m, followed by soft coral pinnacles and wall cavern diving at Koh Dok Mai.',
        suitableProfile: 'Advanced divers who love pelagic marine life, wreck structures, and deep walls.',
        requirements: exp.prerequisites || 'Advanced Open Water or Deep Adventure Diver, minimum 20 logged dives recommended.',
        nextStep: 'Check boat schedule and reserve with your preferred date.',
        imageUrl: exp.imageUrl,
        alternativeExperienceId: 'day-trip-phi-phi',
        alternativeTitle: 'Phi Phi Islands & Shark Point'
      };
    }

    // Condition 4: Low dive count diver or preferring calm waters
    if (loggedDives === '1 - 10 dives') {
      const exp = findExp('day-trip-racha');
      return {
        experienceId: exp.id,
        experienceTitle: exp.title,
        destination: 'Racha Yai & Racha Noi Islands',
        duration: exp.duration,
        priceDisplay: exp.priceThb ? `${exp.priceThb.toLocaleString()} THB` : '4,200 THB',
        explanation:
          'With 1–10 logged dives, Racha Yai and Racha Noi offer the perfect balance of exceptional visibility (up to 30m), gentle currents, and vibrant hard coral gardens to build your comfort as a certified diver.',
        suitableProfile: 'Certified divers looking for relaxed, high-visibility reef diving.',
        requirements: 'Open Water Diver certification or higher.',
        nextStep: 'Select your date for morning pickup from your hotel.',
        imageUrl: exp.imageUrl,
        alternativeExperienceId: 'day-trip-phi-phi',
        alternativeTitle: 'Phi Phi Islands Day Trip'
      };
    }

    // Default Certified: Phi Phi Islands
    const exp = findExp('day-trip-phi-phi');
    return {
      experienceId: exp.id,
      experienceTitle: exp.title,
      destination: 'Phi Phi National Marine Park (Koh Bida Nok, Turtle Rock & Shark Point)',
      duration: exp.duration,
      priceDisplay: exp.priceThb ? `${exp.priceThb.toLocaleString()} THB (+ 600 THB Marine Park Fee)` : '4,200 THB',
      explanation:
        'Phi Phi offers Phuket’s most vibrant biodiversity. You will explore limestone walls, swim with blacktip reef sharks, observe hawksbill turtles, and drift along colourful soft corals at Shark Point.',
      suitableProfile: 'Certified Open Water or Advanced divers who want iconic Thailand landscapes and marine megafauna.',
      requirements: exp.prerequisites || 'Open Water certification or higher.',
      nextStep: 'Confirm your hotel location for pier pickup coordination.',
      imageUrl: exp.imageUrl,
      alternativeExperienceId: 'day-trip-racha',
      alternativeTitle: 'Racha Yai & Racha Noi 3-Dive Trip'
    };
  }

  // =========================================================================
  // JOURNEY C: LEARN TO DIVE / COURSES
  // =========================================================================
  const currentCert = answers.qC2; // 'None' | 'Open Water Diver' | 'Scuba Diver (12m)'
  const levelWanted = answers.qC3; // 'Beginner Certification (Open Water)' | 'Advanced Training' | 'Fast-Track (2 Days)' | 'Zero-to-Hero Combo (4 Days)'
  const courseBefore = answers.qC1; // 'No, complete beginner to scuba theory' | 'Yes, completed online theory / e-learning' | 'Completed pool training elsewhere (Referral)' | 'Have read dive manuals / books'

  // Combo package: Zero-to-Hero
  if (levelWanted === 'Zero-to-Hero Combo (4 Days)') {
    const exp = findExp('ow-aow-combo');
    return {
      experienceId: exp.id,
      experienceTitle: exp.title,
      destination: 'Racha Islands, Phi Phi & King Cruiser Wreck',
      duration: exp.duration,
      priceDisplay: exp.priceThb ? `${exp.priceThb.toLocaleString()} THB` : '22,500 THB',
      explanation:
        'The complete package! Progress seamlessly from your very first pool breath to a certified 30-meter Advanced Diver across 4 action-packed days and 9 open ocean dives. You save 2,300 THB compared to booking separately.',
      suitableProfile: 'Committed ocean enthusiasts wanting maximum training and best package value.',
      requirements: exp.prerequisites || 'Good health, basic swimming ability. Age 12+.',
      nextStep: 'Submit your dates so Roman Zack can schedule your personal coaching itinerary.',
      imageUrl: exp.imageUrl,
      alternativeExperienceId: 'open-water-standard',
      alternativeTitle: 'Standard Open Water Only (3 Days)'
    };
  }

  // Advanced training
  if (currentCert === 'Open Water Diver' || levelWanted === 'Advanced Training') {
    const exp = findExp('advanced-adventurer');
    return {
      experienceId: exp.id,
      experienceTitle: exp.title,
      destination: 'King Cruiser Wreck & Phi Phi Islands Boat Dives',
      duration: exp.duration,
      priceDisplay: exp.priceThb ? `${exp.priceThb.toLocaleString()} THB` : '11,900 THB',
      explanation:
        'Take your diving to 30 meters! The Advanced Adventurer program includes Deep Diving, Underwater Navigation, and 3 adventure electives (like Wreck, Buoyancy, or Boat) with zero classroom exams.',
      suitableProfile: 'Certified Open Water divers wanting deeper limits and greater confidence in currents.',
      requirements: exp.prerequisites || 'Open Water Diver certification (any agency: SSI, PADI, CMAS, etc.).',
      nextStep: 'Pick your elective adventure dives with instructor Roman Zack.',
      imageUrl: exp.imageUrl,
      alternativeExperienceId: 'nitrox-specialty',
      alternativeTitle: 'Add Enriched Air Nitrox Specialty'
    };
  }

  // Fast-Track 2 Days or already completed e-learning
  if (
    levelWanted === 'Fast-Track (2 Days)' ||
    courseBefore === 'Yes, completed online theory / e-learning'
  ) {
    const exp = findExp('open-water-2day');
    return {
      experienceId: exp.id,
      experienceTitle: exp.title,
      destination: 'Racha Yai Island & Phuket Marine Training Center',
      duration: exp.duration,
      priceDisplay: exp.priceThb ? `${exp.priceThb.toLocaleString()} THB` : '12,400 THB',
      explanation:
        'Since you have completed theory online beforehand, you spend zero holiday hours in the classroom. Enjoy 2 focused days of pool skills and 4 ocean boat dives to earn your lifetime card.',
      suitableProfile: 'Organized holiday travelers wanting maximum water time in minimum days.',
      requirements: exp.prerequisites || 'Proof of completed digital theory e-learning prior to arrival. Age 10+.',
      nextStep: 'Submit your dates so we can issue or verify your digital student training link.',
      imageUrl: exp.imageUrl,
      alternativeExperienceId: 'ow-aow-combo',
      alternativeTitle: 'Combo Package with Advanced'
    };
  }

  // Referral diver
  if (courseBefore === 'Completed pool training elsewhere (Referral)') {
    const exp = findExp('open-water-standard');
    return {
      experienceId: exp.id,
      experienceTitle: 'Open Water Diver – Ocean Dives Referral Completion',
      destination: 'Racha Yai & Racha Noi Islands (4 Boat Dives)',
      duration: '2 Days (Boat Dives Only)',
      priceDisplay: 'Contact for quotation',
      explanation:
        'You have already done classroom and pool training at home. Simply complete your 4 required ocean checkout dives in Phuket’s clear, tropical waters under Roman Zack’s guidance to complete your certification.',
      suitableProfile: 'Students with signed referral paperwork from any recognized diving agency.',
      requirements: 'Signed student training record / referral document from your initial instructor.',
      nextStep: 'Send a photo of your referral form via WhatsApp to schedule your 4 boat dives.',
      imageUrl: exp.imageUrl,
      alternativeExperienceId: 'open-water-standard',
      alternativeTitle: 'Full Open Water Course'
    };
  }

  // Default Course: Standard Open Water Diver 3 Days
  const exp = findExp('open-water-standard');
  return {
    experienceId: exp.id,
    experienceTitle: exp.title,
    destination: 'Racha Yai & Racha Noi Islands (4 Boat Ocean Dives)',
    duration: exp.duration,
    priceDisplay: exp.priceThb ? `${exp.priceThb.toLocaleString()} THB` : '12,900 THB',
    explanation:
      'The ultimate beginner certification course. Learn step-by-step from Roman Zack and team. Includes digital study app, pool practice session, and 4 wonderful ocean boat dives.',
    suitableProfile: 'Anyone wanting the world’s most trusted scuba diving certification for life.',
    requirements: exp.prerequisites || 'Age 10+, able to swim 200m and tread water for 10 min. Normal health.',
    nextStep: 'Enter your arrival dates to reserve your instructor and boat slots.',
    imageUrl: exp.imageUrl,
    alternativeExperienceId: 'ow-aow-combo',
    alternativeTitle: 'Open Water + Advanced Combo (4 Days)'
  };
};
