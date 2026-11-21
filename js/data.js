window.HEAL = {
  profile: {
    name: "Sumanth",
    heightCm: 168,
    startDate: "2026-11-22",
    birthday: "2026-12-20",
    birthdayLabel: "20 Dec 2026",
    goal: "Athletic lean physique (Baki-like), strong wrists/forearms, trek-ready",
    github: "Dev-Inn-ovator"
  },

  measurementsStart: {
    weightKg: 64.7,
    waistCm: 92,
    chestCm: 96,
    armCm: 27,
    thighCm: 50,
    wristCm: 14,
    forearmCm: 24
  },

  /* Nov 22 → Dec 20 = 29 calendar days. Realistic with diet + gym after a 3-day warm-up. */
  targets45: {
    weightKg: "63.5–65 (waist first)",
    waistCm: "88–90",
    chestCm: "96.5–97.5",
    armCm: "27.5–28.5",
    thighCm: "50.5–51.5",
    forearmCm: "24.2–24.8",
    note: "29-day checkpoint only: expect waist down a bit and a small pump/strength bump — not a full look change."
  },

  /*
   * Baki Hanma canon: 168 cm / ~76 kg (same height as you).
   * Fan pages quoting 46" chest / 17" arms (~117 / 43 cm) at 76 kg are anime exaggeration.
   * Numbers below are a lean combat-athlete / gymnast look at your height — realistic natural ceiling.
   */
  targetsBaki: {
    weightKg: "72–76",
    waistCm: "78–82",
    chestCm: "102–108",
    armCm: "35–38",
    thighCm: "56–60",
    forearmCm: "28–30",
    wristCm: "14–15 (bone)",
    months: "18–36 months consistent",
    note:
      "Thigh 56–60 cm is mid-thigh athletic size at 168 cm (average man ~54 cm; competitive naturals often ~58–64). +6–10 cm from 50 reads clearly once waist drops."
  },

  bakiTimeline: {
    title: "How long to look Baki-like?",
    heightNote: "Canon Baki is 168 cm / ~76 kg — same height as you.",
    steps: [
      { when: "3–4 weeks (→ 20 Dec)", what: "Waist starts down; lifts feel smoother. Clothes may sit a little better. Not a physique yet." },
      { when: "8–12 weeks", what: "Clearer waist, slight arm/shoulder shape, strength up. People may notice posture/energy first." },
      { when: "6–12 months", what: "Athletic lean look: better V-taper, arms ~30–32, thighs ~53–55, waist toward mid-80s if diet holds." },
      { when: "18–36 months", what: "Close to Baki-like proportions if training + protein + sleep stay consistent: ~72–76 kg lean, waist ~78–82, arms ~35–38, thighs ~56–60." }
    ],
    caveat: "Genetics, sleep, and weekly adherence matter more than any single program."
  },

  weakPoints: [
    { area: "Waist / belly", now: "92 cm", why: "Highest priority. Diet + training.", focus: "Protein, cardio, sleep, waist Sundays" },
    { area: "Arms", now: "27 cm", why: "Need consistent push + pull.", focus: "Presses, laterals, curls 2×/week" },
    { area: "Forearms / wrists", now: "24 / 14 cm", why: "Boxing base later.", focus: "Hammers, reverse curls, wrist work, hangs" },
    { area: "Legs / trek", now: "thigh 50 cm", why: "Athletic mid-thigh target is 56–60 cm with consistent legs work and a lower waist.", focus: "Never skip legs; incline walks" },
    { area: "Chest / V-taper", now: "96 cm", why: "Upper chest + side delts.", focus: "Incline + laterals" }
  ],

  measureSchedule: {
    weight: { frequency: "Every Sunday morning", how: "After toilet, before food. Same scale." },
    waist: { frequency: "Every Sunday with weight", how: "Tape at navel, relaxed, after exhale." },
    muscles: { frequency: "Every 14 days (Sunday)", sites: ["Chest", "Arm mid", "Forearm", "Thigh 25cm above knee", "Wrist"], how: "Same side, morning." },
    photos: { frequency: "Every 14 days with full tape", how: "Front/side/back, same light." },
    strength: { frequency: "Every gym session", how: "Log each set in Gym tab." }
  },

  phases: {
    reentry: {
      id: "reentry",
      title: "Phase 1 — Warm-up",
      when: "Days 1–3 (22–24 Nov)",
      gymDays: "3 easy sessions",
      mins: "35–45",
      protein: "120–130 g",
      kcal: "~2000–2050 gym days",
      study: "3 hours weeknights",
      creatine: "Off",
      note: "Start today. Learn form, light loads, finish every session. From Day 4 the Build PPL unlocks."
    },
    build: {
      id: "build",
      title: "Phase 2 — Build",
      when: "Days 4–14 (25 Nov – 5 Dec)",
      gymDays: "5 sessions / week",
      mins: "55–70",
      protein: "125–135 g",
      kcal: "~2050 gym / ~1860 rest",
      study: "3.5–4.5 hours → push toward 5",
      creatine: "3 g daily in post-gym shake",
      note: "Log every set. Leave 1–2 reps in reserve. Add incline walk for trek base."
    },
    full: {
      id: "full",
      title: "Phase 3 — Full plan",
      when: "Day 15+ (6 Dec → 20 Dec)",
      gymDays: "5–6 sessions (Sun rest)",
      mins: "75–90",
      protein: "125–135 g",
      kcal: "~2050 gym / ~1860 rest",
      study: "5 hours weekdays · weekend toward 10",
      creatine: "3 g daily",
      note: "Full PPL. Never skip the session warm-up. Consistency through 20 Dec."
    }
  },

  buyOnlyIfNeeded: [
    { item: "Zinc 15–30 mg", why: "With dinner, not with curd/milk.", when: "This week if budget OK" },
    { item: "Basic multivitamin", why: "Small gaps while diet stabilises.", when: "Optional Week 2+" },
    { item: "Amul / Mother Dairy paneer", why: "Chicken/egg swap 1–2×/week.", when: "When bored" },
    { item: "Banana, apple, amla", why: "Pre-gym.", when: "Weekly" },
    { item: "Guava OR papaya", why: "Fiber / lower gut comfort — whichever fresh.", when: "Weekly" },
    { item: "Roasted chana", why: "4–5 pm office backup.", when: "Optional" }
  ],

  supplementsOwned: [
    { name: "MB Whey", dose: "1 scoop post-gym (rest day if protein short)", note: "~25 g" },
    { name: "MB Creatine", dose: "From Build phase: 3 g (1 scoop) daily in shake", note: "No loading" },
    { name: "MB Omega-3", dose: "1 cap with lunch", note: "EPA500+DHA400" },
    { name: "Briyo D3 2000 IU", dose: "1 with lunch", note: "With food" },
    { name: "Mg bisglycinate", dose: "1–2 tabs at bedtime", note: "Drop to 1 if stools loose" },
    { name: "DC Protein oats", dose: "50 g + 200 g milk breakfast", note: "Small soy OK; no extra soya foods" }
  ],

  nutritionBase: {
    soyNote: "50 g oats only soy source — fine. No soya chunks.",
    fridgeRule: "Cook 250 g chicken morning → cool 10 min → pack lunch half → fridge dinner half immediately → reheat steaming.",
    paneer: "Amul or Mother Dairy 100–120 g bhurji as 1–2×/week swap.",
    meals: [
      { when: "07:40 Pre-gym breakfast", items: "50 g oats + 200 g milk · beet–apple–amla juice · 65 g banana · sabja 5 g soaked", p: "~24 g" },
      { when: "09:10 Post-gym", items: "Whey + 200 g milk (+ creatine in Build/Full)", p: "~32 g" },
      { when: "13:15 Lunch", items: "Rice 55 g dry + ~125 g raw-share chicken + salad + 100 g curd · Omega-3 + D3", p: "~35–40 g" },
      { when: "16:15–17:00 Snack", items: "Guava/papaya/apple+cucumber 150 g · almonds 6 g · walnuts 8 g (or chana)", p: "~6–10 g" },
      { when: "19:00–19:30 Dinner", items: "Fridge chicken + wheat dosa OR 3-egg omelet/bhurji + dosa · salad · papaya/raisins", p: "~28–35 g" },
      { when: "Study mid-block", items: "Soaked 2 prunes + 1 anjeer (+ raisins)", p: "~1 g" }
    ],
    recipes: [
      { id: "R1", name: "Protein oats", time: "5 min", steps: ["Boil 200 g milk", "Add 50 g oats 3–4 min", "Cinnamon optional"] },
      { id: "R2", name: "Jeera rice", time: "12 min", steps: ["55 g rice", "2 g oil + jeera + 110 g water", "3 whistles"] },
      { id: "R3", name: "Chicken bhuna 250 g", time: "20 min", steps: ["Onion → GG paste → tomato → spices → chicken", "Cook until white inside", "Lemon off heat"] },
      { id: "R4", name: "Egg omelet/bhurji", time: "8 min", steps: ["3 eggs + spinach + tomato + 5 g oil"] },
      { id: "R5", name: "Wheat dosa", time: "3 min", steps: ["30 g atta + 65 g water", "Hot tawa, 2 g oil"] },
      { id: "R6", name: "Beet–apple–amla", time: "8 min", steps: ["Beet 35→45→65 g ladder", "Apple 150 g · amla 10–20 g"] },
      { id: "R7", name: "Shake", time: "1 min", steps: ["Whey + 200 g milk", "Build+: creatine 3 g"] },
      { id: "R8", name: "Paneer bhurji", time: "12 min", steps: ["100–120 g paneer", "Light onion-tomato"] }
    ]
  },

  /* ref = key in window.EX ; sets like "4×8-10" */
  reentry: [
    {
      id: "r1", label: "Day 1", title: "Full-body easy A", focus: "Machines + mobility", duration: "35–40 min",
      warmupKeys: ["treadmill", "armCircles", "ankleCircles", "hipCircles", "bwSquat"],
      work: [
        { ref: "legPress", sets: "3×12", rest: "90s" },
        { ref: "machineChest", sets: "3×12", rest: "90s" },
        { ref: "latPulldown", sets: "3×12", rest: "90s" },
        { ref: "lateralRaise", sets: "2×15", rest: "60s" },
        { ref: "plank", sets: "3×20-30s", rest: "60s" }
      ],
      stretchKeys: ["catStretch", "childPose", "chestStretch", "hamStretch"],
      cardio: "5 min easy treadmill or bike"
    },
    {
      id: "r2", label: "Day 2", title: "Push pattern", focus: "Chest / shoulders / triceps groove", duration: "40 min",
      warmupKeys: ["treadmill", "armCircles", "torsoRotation", "wallPush", "bwSquat"],
      work: [
        { ref: "inclinePress", sets: "3×10-12", rest: "90s" },
        { ref: "cableFly", sets: "3×12-15", rest: "60s" },
        { ref: "ohp", sets: "3×10-12", rest: "90s" },
        { ref: "pushdown", sets: "3×12-15", rest: "60s" },
        { ref: "airBike", sets: "2×12/side", rest: "45s" }
      ],
      stretchKeys: ["chestStretch", "shoulderStretch", "triStretch", "frontShoulder"],
      cardio: "5–8 min easy bike"
    },
    {
      id: "r3", label: "Day 3", title: "Pull + forearms", focus: "Back width + grip", duration: "40 min",
      warmupKeys: ["treadmill", "armCircles", "scapPull", "torsoRotation", "kneeCircles"],
      work: [
        { ref: "latPulldown", sets: "3×10-12", rest: "90s" },
        { ref: "cableRow", sets: "3×10-12", rest: "90s" },
        { ref: "dbCurl", sets: "3×12", rest: "60s" },
        { ref: "hammer", sets: "3×12", rest: "60s" },
        { ref: "wristDown", sets: "2×15", rest: "45s" },
        { ref: "hangKnee", sets: "3×20-40s hang", rest: "60s" }
      ],
      stretchKeys: ["catStretch", "childPose", "hamStretch", "shoulderStretch"],
      cardio: "5 min walk"
    }
  ],

  ppl: [
    {
      id: "push-a", label: "Push A", title: "Upper chest · shoulders · triceps", duration: "75–90 min",
      warmupKeys: ["treadmill", "armCircles", "torsoRotation", "wallPush", "bwSquat"],
      work: [
        { ref: "inclinePress", sets: "4×8-10", rest: "90–120s" },
        { ref: "lateralRaise", sets: "4×12-15", rest: "60s" },
        { ref: "cableFly", sets: "3×12-15", rest: "60s" },
        { ref: "ohp", sets: "3×10-12", rest: "90s" },
        { ref: "pushdown", sets: "3×12-15", rest: "60s" },
        { ref: "ohExt", sets: "3×12", rest: "60s" }
      ],
      stretchKeys: ["chestStretch", "shoulderStretch", "triStretch"],
      cardio: "8–10 min treadmill 6.5 km/h incline 2–3%"
    },
    {
      id: "pull-a", label: "Pull A", title: "Back width · biceps · forearms", duration: "75–90 min",
      warmupKeys: ["treadmill", "armCircles", "scapPull", "torsoRotation"],
      work: [
        { ref: "latPulldown", sets: "4×10-12", rest: "90s" },
        { ref: "straightArm", sets: "3×15", rest: "60s" },
        { ref: "cableRow", sets: "4×10-12", rest: "90s" },
        { ref: "dbCurl", sets: "3×12", rest: "60s" },
        { ref: "hammer", sets: "3×12-15", rest: "60s" },
        { ref: "reverseCurl", sets: "3×15", rest: "60s" },
        { ref: "hangKnee", sets: "3×12-15", rest: "60s" }
      ],
      stretchKeys: ["catStretch", "childPose", "hamStretch"],
      cardio: "8–10 min bike or walk"
    },
    {
      id: "legs-a", label: "Legs A", title: "Quads · glutes · calves · abs", duration: "80–90 min",
      warmupKeys: ["treadmill", "hipCircles", "ankleCircles", "bwSquat", "walkLunge"],
      work: [
        { ref: "smithSquat", sets: "4×8-10", rest: "120s" },
        { ref: "legPress", sets: "4×12-15", rest: "90s" },
        { ref: "legExt", sets: "3×12-15", rest: "60s" },
        { ref: "lunges", sets: "3×10/leg", rest: "90s" },
        { ref: "calfStand", sets: "4×12-15", rest: "45s" },
        { ref: "cableCrunch", sets: "3×15-20", rest: "45s" },
        { ref: "hangKnee", sets: "3×12-15", rest: "45s" },
        { ref: "plank", sets: "3×40-60s", rest: "45s" }
      ],
      stretchKeys: ["quadStretch", "hamStretch", "calfStretch", "hipFlex"],
      cardio: "8–10 min incline walk"
    },
    {
      id: "push-b", label: "Push B", title: "Flat/lower chest · shoulders · triceps", duration: "75–90 min",
      warmupKeys: ["treadmill", "armCircles", "wallPush", "torsoRotation"],
      work: [
        { ref: "flatBench", sets: "4×6-8", rest: "120s" },
        { ref: "declinePress", sets: "3×10-12", rest: "90s" },
        { ref: "pecDeck", sets: "3×12-15", rest: "60s" },
        { ref: "arnold", sets: "3×10-12", rest: "90s" },
        { ref: "cableLat", sets: "3×15", rest: "45s" },
        { ref: "dips", sets: "3×10-15", rest: "60s" }
      ],
      stretchKeys: ["chestStretch", "shoulderStretch", "triStretch", "frontShoulder"],
      cardio: "8–10 min treadmill"
    },
    {
      id: "pull-b", label: "Pull B", title: "Thickness · rear delts · grip", duration: "75–90 min",
      warmupKeys: ["treadmill", "scapPull", "armCircles", "torsoRotation"],
      work: [
        { ref: "bentRow", sets: "4×8-10", rest: "90–120s" },
        { ref: "latPulldown", sets: "3×12", rest: "60s" },
        { ref: "facePull", sets: "4×15-20", rest: "45s" },
        { ref: "concCurl", sets: "3×12", rest: "60s" },
        { ref: "wristUp", sets: "3×20", rest: "45s" },
        { ref: "wristDown", sets: "3×20", rest: "45s" },
        { ref: "plank", sets: "3×10/side dips", rest: "45s" }
      ],
      stretchKeys: ["catStretch", "childPose", "shoulderStretch"],
      cardio: "8–10 min bike"
    },
    {
      id: "legs-b", label: "Legs B", title: "Hamstrings · glutes · calves · abs", duration: "80–90 min",
      warmupKeys: ["treadmill", "hipCircles", "bwSquat", "walkLunge", "ankleCircles"],
      work: [
        { ref: "rdl", sets: "4×8-10", rest: "120s" },
        { ref: "legCurl", sets: "3×12-15", rest: "60s" },
        { ref: "hipThrust", sets: "4×10-12", rest: "90s" },
        { ref: "legPress", sets: "3×12-15", rest: "90s" },
        { ref: "calfSeat", sets: "4×15-20", rest: "45s" },
        { ref: "airBike", sets: "3×20", rest: "45s" },
        { ref: "plank", sets: "3×20-40s", rest: "45s" }
      ],
      stretchKeys: ["hamStretch", "quadStretch", "calfStretch", "hipFlex", "childPose"],
      cardio: "10 min incline walk"
    }
  ],

  timetableByPhase: {
    reentry: {
      sleep: "Bed by 00:30–01:00 · Wake 07:30–08:00 (~7 h)",
      studyStart: "19:45 or 20:00",
      studyEnd: "22:45–23:00 (3 h) then magnesium → sleep",
      pruneTime: "During study mid-break (~21:30)",
      rows: [
        { t: "07:30", a: "Wake · 500 ml warm water · toilet window (no strain, no phone)" },
        { t: "07:40", a: "EAT: oats + juice + banana (breakfast = pre-gym)" },
        { t: "08:00", a: "Leave for Cult (15 min)" },
        { t: "08:15–09:00", a: "GYM warm-up session 35–45 min" },
        { t: "09:10", a: "EAT: whey shake · shower" },
        { t: "09:25–10:15", a: "Cook rice + 250 g chicken · pack lunch · fridge dinner half · pack 4 pm snack" },
        { t: "10:20–11:00", a: "Commute / start work (flexible)" },
        { t: "13:15", a: "EAT lunch (reheat steaming) · Omega-3 + D3" },
        { t: "16:15", a: "EAT packed snack" },
        { t: "17:30–18:00", a: "Leave office" },
        { t: "18:40–19:30", a: "Home · EAT dinner (fridge chicken + dosa OR eggs + dosa)" },
        { t: "19:45–22:45", a: "STUDY 3 h · 50 min work / 5–8 min stand · ~21:30 soak/eat prunes+anjeer" },
        { t: "22:50", a: "Magnesium 1–2 tabs · optional warm soak 10–15 min" },
        { t: "00:30–01:00", a: "SLEEP (phone away)" }
      ]
    },
    build: {
      sleep: "Bed ~00:45–01:15 · Wake 07:30–08:00",
      studyStart: "19:30–19:45",
      studyEnd: "23:30–00:15 (3.5–4.5 h)",
      pruneTime: "~21:45 mid-study",
      rows: [
        { t: "07:30", a: "Wake · water · toilet window" },
        { t: "07:40", a: "EAT pre-gym breakfast" },
        { t: "08:10–09:20", a: "GYM 55–70 min (shorten cook if session runs long)" },
        { t: "09:25", a: "EAT whey + creatine 3 g" },
        { t: "09:35–10:20", a: "Cook / pack / fridge" },
        { t: "13:15", a: "EAT lunch + supplements" },
        { t: "16:15", a: "EAT snack" },
        { t: "18:40–19:25", a: "EAT dinner" },
        { t: "19:40–00:00", a: "STUDY block · prunes mid-way · build toward 4.5 h" },
        { t: "End", a: "Magnesium · sleep by 01:15 latest" }
      ]
    },
    full: {
      sleep: "Protect ~7 h. If 5 h study: start ~19:30 end ~00:30, sleep, wake 07:30.",
      studyStart: "19:30",
      studyEnd: "00:30 (5 h with breaks)",
      pruneTime: "~22:00",
      rows: [
        { t: "07:30", a: "Wake · water" },
        { t: "07:40", a: "EAT pre-gym" },
        { t: "08:10–09:40", a: "GYM up to 75–90 min (or cut cardio/stretch if office tight)" },
        { t: "09:45", a: "EAT shake + creatine · quick shower" },
        { t: "10:00–10:40", a: "Cook pack fridge (meal-prep speed matters)" },
        { t: "13:15", a: "EAT lunch + Omega-3 + D3" },
        { t: "16:15", a: "EAT snack" },
        { t: "18:40–19:20", a: "EAT dinner" },
        { t: "19:30–00:30", a: "STUDY 5 h · breaks every 50 min · prunes ~22:00" },
        { t: "00:35", a: "Magnesium · lights out ~00:45–01:00" }
      ]
    }
  }
};
