/* Exercise library: unique images, muscles, cues, mistakes, video links */
const IMG = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/";
const yt = (q) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q + " proper form")}`;

function E(o) {
  return {
    id: o.id,
    name: o.name,
    primary: o.primary || [],
    secondary: o.secondary || [],
    cues: o.cues || [],
    mistakes: o.mistakes || [],
    alts: o.alts || "",
    video: o.video || yt(o.name),
    videoLabel: o.videoLabel || "YouTube form videos",
    img0: IMG + o.id + "/0.jpg",
    img1: IMG + o.id + "/1.jpg"
  };
}

window.EX = {
  // —— Warm-up ——
  treadmill: E({
    id: "Walking_Treadmill", name: "Treadmill walk",
    primary: ["quadriceps"], secondary: ["calves", "glutes", "hamstrings"],
    cues: [
      "Start at 5.5–6 km/h. Hold rails only if needed for balance.",
      "Stand tall, eyes forward, soft elbows, natural arm swing.",
      "Breathe through the nose/mouth calmly — this is heat-up, not a race."
    ],
    mistakes: ["Sprinting on day 1", "Looking down at phone the whole time", "Leaning hard on handrails"],
    video: "https://www.youtube.com/results?search_query=treadmill+warm+up+walking+form",
    alts: "Stationary bike easy 5 min"
  }),
  armCircles: E({
    id: "Arm_Circles", name: "Arm circles",
    primary: ["shoulders"], secondary: ["traps"],
    cues: [
      "Arms out to sides at shoulder height, palms down.",
      "Make small circles 15 forward, then 15 backward.",
      "Grow the circle slowly; keep ribs down, no shrugging."
    ],
    mistakes: ["Whipping arms with momentum", "Shrugging shoulders to ears", "Bending elbows a lot"]
  }),
  ankleCircles: E({
    id: "Ankle_Circles", name: "Ankle circles",
    primary: [], secondary: [],
    cues: [
      "Hold a wall or rack. Lift one foot.",
      "Draw 10 slow circles each direction, then switch feet.",
      "Move only the ankle — knee stays quiet."
    ],
    mistakes: ["Rushing", "Putting weight on the circling foot"]
  }),
  kneeCircles: E({
    id: "Knee_Circles", name: "Knee circles",
    primary: [], secondary: [],
    cues: [
      "Feet together, hands on knees, soft bend.",
      "Gently circle knees 8–10 each way.",
      "Small range if knees feel stiff — pain-free only."
    ],
    mistakes: ["Forcing big circles into pain", "Locking knees"]
  }),
  hipCircles: E({
    id: "Standing_Hip_Circles", name: "Standing hip circles",
    primary: ["abductors"], secondary: ["adductors", "glutes"],
    cues: [
      "Hands on hips, soft knees.",
      "Draw a circle with your hips: forward → side → back → side.",
      "10 each direction. Keep chest quiet."
    ],
    mistakes: ["Bending only the spine", "Going so big you lose balance"]
  }),
  torsoRotation: E({
    id: "Torso_Rotation", name: "Torso rotations",
    primary: ["abdominals"], secondary: ["middle back"],
    cues: [
      "Feet shoulder-width, arms across chest or out soft.",
      "Rotate left/right from mid-back, hips mostly still.",
      "20 total calm turns."
    ],
    mistakes: ["Swinging with arms only", "Twisting knees hard"]
  }),
  bwSquat: E({
    id: "Bodyweight_Squat", name: "Bodyweight squat",
    primary: ["quadriceps"], secondary: ["glutes", "hamstrings"],
    cues: [
      "Feet about shoulder-width, toes slightly out.",
      "Sit hips back and down as if to a chair. Chest up.",
      "Knees track over mid-foot. Stand by pushing floor away. 10 slow reps."
    ],
    mistakes: ["Heels lifting", "Knees caving in", "Rounding upper back hard"],
    video: "https://www.youtube.com/results?search_query=bodyweight+squat+form+beginner"
  }),
  wallPush: E({
    id: "Pushups", name: "Wall or knee push-up",
    primary: ["chest"], secondary: ["shoulders", "triceps"],
    cues: [
      "Wall: hands on wall, body straight, bend elbows to bring chest toward wall.",
      "Knee push-up: knees down, same straight line shoulders-to-knees.",
      "8–10 controlled reps. Feel chest and triceps."
    ],
    mistakes: ["Hips sagging", "Flaring elbows fully to 90°", "Only nodding head to wall"],
    video: "https://www.youtube.com/results?search_query=knee+push+up+proper+form"
  }),
  scapPull: E({
    id: "Scapular_Pull-Up", name: "Dead hang / scap pull",
    primary: ["lats"], secondary: ["middle back", "forearms", "traps"],
    cues: [
      "Hang from pull-up bar, arms straight, feet off floor if possible.",
      "Pack shoulders down and slightly back without bending elbows (scap pull).",
      "Hold hang 20–30 sec or do 6–8 tiny scap pulls."
    ],
    mistakes: ["Shrugging up into ears", "Swinging", "Bending elbows into a pull-up too early"],
    video: "https://www.youtube.com/results?search_query=dead+hang+scapular+pull+up+form"
  }),
  walkLunge: E({
    id: "Bodyweight_Walking_Lunge", name: "Walking lunge (bodyweight)",
    primary: ["quadriceps"], secondary: ["glutes", "hamstrings", "abductors", "adductors"],
    cues: [
      "Step forward, lower until both knees ~90° if comfortable.",
      "Front knee tracks toes; back knee soft toward floor.",
      "Push through front foot to next step. 6 each leg."
    ],
    mistakes: ["Front knee collapsing inward", "Tiny unbalanced steps", "Torso collapsing forward"],
    video: "https://www.youtube.com/results?search_query=walking+lunge+form+bodyweight"
  }),

  // —— Main lifts ——
  legPress: E({
    id: "Leg_Press", name: "Leg press",
    primary: ["quadriceps"], secondary: ["glutes", "hamstrings", "calves", "adductors"],
    cues: [
      "Feet mid-platform, shoulder-width. Full foot contact.",
      "Unlock sled, lower until knees ~90° (or as deep as pain-free).",
      "Press through mid-foot/heels without locking knees violently at top."
    ],
    mistakes: ["Lowering so deep lower back rounds off pad", "Bouncing at bottom", "Only toes on platform"],
    video: "https://www.youtube.com/watch?v=IZxyjW7MPJQ",
    videoLabel: "Leg press form (YouTube)"
  }),
  machineChest: E({
    id: "Machine_Bench_Press", name: "Smith / machine chest press",
    primary: ["chest"], secondary: ["shoulders", "triceps"],
    cues: [
      "Seat so handles meet mid-chest. Shoulder blades back into pad.",
      "Lower with control, elbows ~45–60° from torso.",
      "Press up without shrugging. Leave a tiny bend at lockout."
    ],
    mistakes: ["Elbows flared flat to 90°", "Bouncing", "Neck craning forward"],
    video: yt("smith machine bench press"),
    alts: "Dumbbell bench if preferred"
  }),
  latPulldown: E({
    id: "Wide-Grip_Lat_Pulldown", name: "Wide-grip lat pulldown",
    primary: ["lats"], secondary: ["biceps", "middle back", "shoulders", "traps"],
    cues: [
      "Thighs under pads. Overhand grip wider than shoulders.",
      "Lean back slightly (~15°). Pull bar to upper chest — lead with elbows.",
      "Squeeze lats 1 sec. Return slow (2–3 sec). Never behind the neck."
    ],
    mistakes: ["Pulling behind neck", "Using only arms / curling the bar", "Leaning so far it becomes a row"],
    video: "https://www.youtube.com/watch?v=CAwf7n6Luuc",
    videoLabel: "Lat pulldown form"
  }),
  lateralRaise: E({
    id: "Side_Lateral_Raise", name: "Dumbbell lateral raise",
    primary: ["shoulders"], secondary: ["traps"],
    cues: [
      "Light DBs, slight elbow bend, soft knees.",
      "Raise arms out to sides until hands ~shoulder height (like pouring a jug).",
      "Pause 1 sec, lower in 2–3 sec. Feel side delts burn — ego weight kills this."
    ],
    mistakes: ["Swinging torso", "Raising above ears with traps", "Straight locked elbows"],
    video: "https://www.youtube.com/watch?v=3VcKaXpzqRo",
    videoLabel: "Lateral raise form"
  }),
  plank: E({
    id: "Plank", name: "Plank",
    primary: ["abdominals"], secondary: ["shoulders", "glutes"],
    cues: [
      "Forearms and toes (or knees). Body in one line.",
      "Squeeze glutes, pull ribs down, push floor away with forearms.",
      "Breathe steady. Stop if hips sag — that means set is done."
    ],
    mistakes: ["Hips sagging or piking up", "Holding breath", "Looking up hard"],
    video: yt("forearm plank proper form")
  }),
  inclinePress: E({
    id: "Incline_Dumbbell_Press", name: "Incline DB / Smith press",
    primary: ["chest"], secondary: ["shoulders", "triceps"],
    cues: [
      "Bench 30–45°. Shoulder blades packed. Feet flat.",
      "Lower DBs to upper-chest line with elbows ~45–60°.",
      "Press up and slightly together. Glutes stay on bench."
    ],
    mistakes: ["Bench too upright (becomes shoulder press)", "Elbows flared flat", "Bouncing off chest"],
    video: "https://www.youtube.com/watch?v=8iPEnn-ltC8",
    videoLabel: "Incline dumbbell press (Scott Herman)"
  }),
  cableFly: E({
    id: "Cable_Crossover", name: "Cable fly (high to low)",
    primary: ["chest"], secondary: ["shoulders"],
    cues: [
      "Pulleys high. Step forward, soft elbow bend.",
      "Sweep hands down and in like hugging a barrel. Squeeze chest.",
      "Control the return — don't let cables yank shoulders back."
    ],
    mistakes: ["Bending elbows so much it becomes a press", "Using hips to swing", "Going behind the body into shoulder pinch"],
    video: yt("high to low cable fly form")
  }),
  ohp: E({
    id: "Seated_Dumbbell_Press", name: "Seated dumbbell shoulder press",
    primary: ["shoulders"], secondary: ["triceps", "traps"],
    cues: [
      "Back supported. DBs at ear level, palms forward.",
      "Press up until arms long but not violently locked.",
      "Lower to ear level. Brace core — avoid big lower-back arch."
    ],
    mistakes: ["Excessive back arch", "Pressing forward instead of up", "Banging weights together hard"],
    video: yt("seated dumbbell shoulder press form")
  }),
  pushdown: E({
    id: "Triceps_Pushdown", name: "Rope triceps pushdown",
    primary: ["triceps"], secondary: [],
    cues: [
      "Elbows pinned to ribs. Rope or bar from high pulley.",
      "Push down to full elbow extension; split rope at bottom if using rope.",
      "Only forearms move. Slow return."
    ],
    mistakes: ["Elbows drifting forward", "Leaning whole body into the stack", "Partial reps only"],
    video: yt("rope tricep pushdown form")
  }),
  ohExt: E({
    id: "Seated_Triceps_Press", name: "Overhead DB triceps extension",
    primary: ["triceps"], secondary: [],
    cues: [
      "One DB held with both hands overhead, upper arms by ears.",
      "Bend elbows to lower weight behind head — feel stretch.",
      "Extend without flaring elbows wide."
    ],
    mistakes: ["Elbows flaring out", "Moving upper arms", "Using too heavy a DB"],
    video: yt("overhead dumbbell tricep extension form")
  }),
  airBike: E({
    id: "Air_Bike", name: "Bicycle crunch (easy)",
    primary: ["abdominals"], secondary: [],
    cues: [
      "Lie on back, hands lightly by head (don't pull neck).",
      "Alternate elbow to opposite knee; other leg extends.",
      "Slow and controlled — quality over speed."
    ],
    mistakes: ["Yanking on the neck", "Racing with no control"],
    video: yt("bicycle crunch proper form")
  }),
  straightArm: E({
    id: "Straight-Arm_Pulldown", name: "Straight-arm lat pulldown",
    primary: ["lats"], secondary: [],
    cues: [
      "High cable, straight bar or rope. Arms nearly straight.",
      "Push bar in an arc down toward thighs. Feel lats.",
      "Slow return to stretch. Slight forward lean OK."
    ],
    mistakes: ["Bending elbows into a press-down", "Standing too upright and shrugging"],
    video: yt("straight arm pulldown form")
  }),
  cableRow: E({
    id: "Seated_Cable_Rows", name: "Seated cable row",
    primary: ["middle back"], secondary: ["lats", "biceps", "shoulders"],
    cues: [
      "Sit tall, slight knee bend, chest up.",
      "Pull handle to stomach; elbows drive back; squeeze shoulder blades 1 sec.",
      "Return to full stretch without rounding lower back."
    ],
    mistakes: ["Rounding lumbar spine", "Yanking with momentum", "Shrugging traps only"],
    video: yt("seated cable row proper form")
  }),
  dbCurl: E({
    id: "Dumbbell_Bicep_Curl", name: "Dumbbell biceps curl",
    primary: ["biceps"], secondary: ["forearms"],
    cues: [
      "Arms at sides, curl up while turning palm up (supinate).",
      "Elbows stay near ribs. Squeeze at top 1 sec.",
      "Lower in 2–3 sec."
    ],
    mistakes: ["Swinging the torso", "Elbows drifting forward a lot", "Half reps"],
    video: yt("dumbbell bicep curl form")
  }),
  hammer: E({
    id: "Hammer_Curls", name: "Hammer curl",
    primary: ["biceps"], secondary: ["forearms"],
    cues: [
      "Neutral grip (thumbs up) the whole time.",
      "Curl without rotating wrists. Targets brachialis + forearms.",
      "Controlled tempo."
    ],
    mistakes: ["Turning into a regular curl mid-rep", "Swinging"],
    video: yt("hammer curl form")
  }),
  reverseCurl: E({
    id: "Reverse_Barbell_Curl", name: "Reverse curl",
    primary: ["forearms"], secondary: ["biceps"],
    cues: [
      "Overhand grip on EZ bar or light bar.",
      "Curl up with knuckles facing up. Light weight.",
      "Great for forearm thickness / wrist resilience."
    ],
    mistakes: ["Too heavy", "Wrist collapsing painfully"],
    video: yt("reverse curl form forearms")
  }),
  wristDown: E({
    id: "Palms-Down_Wrist_Curl_Over_A_Bench", name: "Reverse wrist curl",
    primary: ["forearms"], secondary: [],
    cues: [
      "Forearms on bench, wrists over edge, palms down, light DB/bar.",
      "Extend wrists up, lower slowly.",
      "High reps, light load."
    ],
    mistakes: ["Heavy ego loading", "Moving elbows instead of wrists"],
    video: yt("reverse wrist curl form")
  }),
  wristUp: E({
    id: "Palms-Up_Barbell_Wrist_Curl_Over_A_Bench", name: "Wrist curl",
    primary: ["forearms"], secondary: [],
    cues: [
      "Forearms on bench, palms up.",
      "Curl weight up using wrists only, squeeze, lower slow.",
      "You may feel a deep forearm pump — normal."
    ],
    mistakes: ["Letting bar roll into fingers only with no control", "Too heavy"],
    video: yt("wrist curl form")
  }),
  hangKnee: E({
    id: "Hanging_Leg_Raise", name: "Hanging knee raise / hang",
    primary: ["abdominals"], secondary: ["forearms"],
    cues: [
      "Dead hang, shoulders packed.",
      "For abs: bring knees up and curl pelvis slightly at top.",
      "For grip day: just hold the hang 20–40 sec."
    ],
    mistakes: ["Swinging like a pendulum", "Only hip flexors with no pelvis curl"],
    video: yt("hanging knee raise form")
  }),
  smithSquat: E({
    id: "Smith_Machine_Squat", name: "Smith / goblet squat",
    primary: ["quadriceps"], secondary: ["glutes", "hamstrings", "lower back", "adductors"],
    cues: [
      "Bar on upper traps (not neck). Feet slightly forward of bar line on Smith.",
      "Sit down between heels, chest up, depth you control.",
      "Drive up. Or use goblet squat with one DB at chest."
    ],
    mistakes: ["Knees caving", "Heels rising", "Looking at the floor"],
    video: yt("smith machine squat form"),
    alts: "Leg press if knees prefer it today"
  }),
  legExt: E({
    id: "Leg_Extensions", name: "Leg extension",
    primary: ["quadriceps"], secondary: [],
    cues: [
      "Pad on lower shin. Back against seat.",
      "Extend knees to straighten legs, squeeze quads, lower slow.",
      "Don't slam the stack."
    ],
    mistakes: ["Using momentum", "Hips lifting off seat"],
    video: yt("leg extension machine form")
  }),
  rdl: E({
    id: "Romanian_Deadlift", name: "Romanian deadlift (DB/bar)",
    primary: ["hamstrings"], secondary: ["glutes", "lower back"],
    cues: [
      "Soft knees, hinge hips back, DBs close to legs.",
      "Feel hamstring stretch; spine long (neutral).",
      "Stand by driving hips forward. Not a squat."
    ],
    mistakes: ["Rounding the low back", "Squatting the weight", "Looking up hard"],
    video: yt("dumbbell romanian deadlift form")
  }),
  lunges: E({
    id: "Dumbbell_Lunges", name: "Reverse / walking lunge",
    primary: ["quadriceps"], secondary: ["glutes", "hamstrings", "abductors", "adductors"],
    cues: [
      "Step back (easier on knees) or forward. Both knees bend.",
      "Front shin mostly vertical; torso upright.",
      "Push through front foot to stand."
    ],
    mistakes: ["Front knee diving in", "Tiny unstable steps"],
    video: yt("dumbbell reverse lunge form")
  }),
  calfStand: E({
    id: "Standing_Calf_Raises", name: "Standing calf raise",
    primary: ["calves"], secondary: [],
    cues: [
      "Ball of foot on step/machine, full stretch at bottom.",
      "Rise high on toes, squeeze 1 sec, lower slow."
    ],
    mistakes: ["Bouncing", "Only partial range"],
    video: yt("standing calf raise form")
  }),
  calfSeat: E({
    id: "Seated_Calf_Raise", name: "Seated calf raise",
    primary: ["calves"], secondary: [],
    cues: [
      "Pad on thighs, stretch calves at bottom.",
      "Press through balls of feet to top, slow lower."
    ],
    mistakes: ["Tiny pulses only"],
    video: yt("seated calf raise form")
  }),
  cableCrunch: E({
    id: "Cable_Crunch", name: "Cable crunch",
    primary: ["abdominals"], secondary: [],
    cues: [
      "Kneel at high cable with rope. Crunch ribs toward pelvis.",
      "Think 'shorten abs', not 'pull with arms'."
    ],
    mistakes: ["Pulling only with arms", "Rounding from the neck"],
    video: yt("cable crunch form")
  }),
  flatBench: E({
    id: "Barbell_Bench_Press_-_Medium_Grip", name: "Flat bench / Smith press",
    primary: ["chest"], secondary: ["shoulders", "triceps"],
    cues: [
      "Eyes under bar. Shoulder blades set. Slight arch, glutes down.",
      "Lower to mid-chest, press up. Wrists stacked over elbows."
    ],
    mistakes: ["Bouncing bar", "Flaring elbows hard", "Feet dancing"],
    video: yt("barbell bench press form beginner"),
    alts: "DB bench OK"
  }),
  declinePress: E({
    id: "Decline_Dumbbell_Bench_Press", name: "Decline or flat DB press",
    primary: ["chest"], secondary: ["shoulders", "triceps"],
    cues: [
      "If no decline bench, do flat DB press with same cues as incline but flat.",
      "Control the stretch at bottom; press up."
    ],
    mistakes: ["Going too deep with unstable shoulders"],
    video: yt("dumbbell bench press form")
  }),
  pecDeck: E({
    id: "Butterfly", name: "Pec deck / machine fly",
    primary: ["chest"], secondary: [],
    cues: [
      "Soft elbows, bring pads/handles together, squeeze chest.",
      "Return to stretch without pain in front shoulder."
    ],
    mistakes: ["Locking elbows straight", "Slamming weights"],
    video: yt("pec deck fly form")
  }),
  arnold: E({
    id: "Arnold_Dumbbell_Press", name: "Arnold press",
    primary: ["shoulders"], secondary: ["triceps"],
    cues: [
      "Start palms facing you at shoulders.",
      "Rotate palms out while pressing overhead.",
      "Reverse on the way down."
    ],
    mistakes: ["Using momentum", "Huge back arch"],
    video: yt("arnold press form")
  }),
  cableLat: E({
    id: "Cable_Seated_Lateral_Raise", name: "Cable lateral raise",
    primary: ["shoulders"], secondary: [],
    cues: [
      "Cable in far hand across body, raise out to side to shoulder height.",
      "Constant tension — lighter than DBs often."
    ],
    mistakes: ["Shrugging", "Leaning away hard"],
    video: yt("cable lateral raise form"),
    alts: "Or standing DB lateral raise"
  }),
  dips: E({
    id: "Bench_Dips", name: "Bench dips",
    primary: ["triceps"], secondary: ["chest", "shoulders"],
    cues: [
      "Hands on bench behind you, feet out. Lower by bending elbows.",
      "Shoulders down. Don't go deeper than comfortable."
    ],
    mistakes: ["Shoulders shrugging into ears", "Going too deep if front shoulder hurts"],
    video: yt("bench dip form triceps")
  }),
  bentRow: E({
    id: "Bent_Over_Barbell_Row", name: "Bent-over row (DB/Smith)",
    primary: ["middle back"], secondary: ["lats", "biceps", "shoulders", "lower back"],
    cues: [
      "Hinge ~45°, flat back. Pull DBs/bar to hips/waist.",
      "Squeeze blades. Lower with control."
    ],
    mistakes: ["Rounding spine", "Standing too upright", "Yanking"],
    video: yt("dumbbell bent over row form"),
    alts: "Chest-supported row if available"
  }),
  facePull: E({
    id: "Face_Pull", name: "Face pull",
    primary: ["shoulders"], secondary: ["middle back", "traps"],
    cues: [
      "Rope at upper chest/face height. Pull to face, hands beside ears.",
      "Externally rotate at end (knuckles to sky). Great for rear delts / posture."
    ],
    mistakes: ["Pulling too low to stomach", "Using too much weight"],
    video: yt("face pull proper form")
  }),
  concCurl: E({
    id: "Concentration_Curls", name: "Concentration curl",
    primary: ["biceps"], secondary: [],
    cues: [
      "Sit, elbow braced on inner thigh, curl DB up.",
      "Squeeze hard at top. Slow lower."
    ],
    mistakes: ["Swinging the torso", "Partial range"],
    video: yt("concentration curl form")
  }),
  legCurl: E({
    id: "Lying_Leg_Curls", name: "Lying leg curl",
    primary: ["hamstrings"], secondary: [],
    cues: [
      "Pad above heels. Curl heels toward glutes, squeeze, lower slow."
    ],
    mistakes: ["Hips lifting off pad", "Bouncing"],
    video: yt("lying leg curl form")
  }),
  hipThrust: E({
    id: "Barbell_Hip_Thrust", name: "Hip thrust / glute bridge",
    primary: ["glutes"], secondary: ["hamstrings"],
    cues: [
      "Upper back on bench, chin tucked. Drive hips up, squeeze glutes.",
      "Don't overextend lower back at top."
    ],
    mistakes: ["Arching lumbar instead of hinging hips", "Looking up hard"],
    video: yt("hip thrust form glutes"),
    alts: "Floor glute bridge if no bench setup"
  }),

  // —— Stretches ——
  chestStretch: E({
    id: "Dynamic_Chest_Stretch", name: "Chest / doorway stretch",
    primary: ["chest"], secondary: ["shoulders"],
    cues: [
      "Forearm on doorframe/wall, elbow ~90°, gentle lean until chest opens.",
      "Hold 25–30 sec each side. Breathe. Mild stretch only."
    ],
    mistakes: ["Forcing into sharp pain", "Shrugging the stretch shoulder"],
    video: yt("doorway chest stretch")
  }),
  shoulderStretch: E({
    id: "Shoulder_Stretch", name: "Cross-body shoulder stretch",
    primary: ["shoulders"], secondary: [],
    cues: [
      "Bring one arm across chest. Other hand pulls gently above elbow.",
      "Hold 30 sec. Keep shoulders down."
    ],
    mistakes: ["Pulling on the elbow joint hard", "Raising the shoulder"],
    video: yt("cross body shoulder stretch")
  }),
  triStretch: E({
    id: "Triceps_Stretch", name: "Overhead triceps stretch",
    primary: ["triceps"], secondary: [],
    cues: [
      "Reach one hand down the back. Other hand gently presses the elbow.",
      "Hold 30 sec each. Soft neck."
    ],
    mistakes: ["Cranking the neck", "Bouncing"],
    video: yt("overhead tricep stretch")
  }),
  catStretch: E({
    id: "Cat_Stretch", name: "Cat stretch (spine)",
    primary: ["lower back"], secondary: ["middle back"],
    cues: [
      "On all fours. Exhale: round spine to ceiling (cat).",
      "Inhale: return to neutral or slight soft belly (easy cow).",
      "8–10 slow breaths. Great after rows/squats."
    ],
    mistakes: ["Moving only the neck", "Forcing extreme range"],
    video: yt("cat cow stretch for beginners")
  }),
  childPose: E({
    id: "Childs_Pose", name: "Child's pose",
    primary: ["lower back"], secondary: ["lats", "glutes"],
    cues: [
      "Kneel, sit hips toward heels, arms reach forward on floor.",
      "Forehead rests if comfortable. Breathe into ribs/back 40–45 sec."
    ],
    mistakes: ["Forcing hips if knees complain — widen knees", "Holding breath"],
    video: yt("childs pose stretch how to")
  }),
  hamStretch: E({
    id: "Hamstring_Stretch", name: "Hamstring stretch",
    primary: ["hamstrings"], secondary: [],
    cues: [
      "One heel forward, soft knee. Hinge at hips with flat back.",
      "Feel stretch in back of thigh — not stabbing behind knee. 30 sec."
    ],
    mistakes: ["Rounding hard and yanking toes", "Locking the knee painfully"],
    video: yt("standing hamstring stretch form")
  }),
  quadStretch: E({
    id: "Standing_Elevated_Quad_Stretch", name: "Standing quad stretch",
    primary: ["quadriceps"], secondary: [],
    cues: [
      "Hold wall. Grab ankle, bring heel toward glute.",
      "Knees close together, gentle tuck of pelvis. 30 sec."
    ],
    mistakes: ["Arching lower back", "Pulling into knee pain"],
    video: yt("standing quad stretch")
  }),
  calfStretch: E({
    id: "Calf_Stretch_Hands_Against_Wall", name: "Calf wall stretch",
    primary: ["calves"], secondary: [],
    cues: [
      "Hands on wall, back leg straight, heel down, lean in.",
      "Then bend back knee slightly for deeper calf. 30 sec each."
    ],
    mistakes: ["Heel lifting", "Front foot too close"],
    video: yt("wall calf stretch")
  }),
  hipFlex: E({
    id: "Kneeling_Hip_Flexor", name: "Kneeling hip flexor stretch",
    primary: [], secondary: [],
    cues: [
      "Kneel on one knee (pad under knee). Front foot forward.",
      "Gently tuck pelvis and shift hips forward until front-of-hip stretch.",
      "30 sec each. Perfect after sitting at office."
    ],
    mistakes: ["Arching low back instead of tucking pelvis", "Lunging too aggressively"],
    video: yt("kneeling hip flexor stretch")
  }),
  frontShoulder: E({
    id: "Chest_And_Front_Of_Shoulder_Stretch", name: "Front shoulder stretch",
    primary: ["shoulders"], secondary: ["chest"],
    cues: [
      "Clasp hands behind back or hold a post and turn gently away.",
      "Open chest without pain. 25–30 sec."
    ],
    mistakes: ["Forcing if shoulder is irritated"],
    video: yt("front shoulder stretch")
  })
};

/* Muscle guide data. Atlas figures use text-free art + programmatic labels.
   The approved Legs source is kept intact and displayed through accurate front/posterior crops. */
const MIMG = (file) => `assets/muscles/${file}`;

/**
 * `figures` = atlas figure ids drawn for this muscle (labels/pointers from js/atlas.js).
 * `image`   = single approved labelled image (back + legs only).
 * `anatomy` = short accurate summary shown under the figure.
 */
window.MUSCLE_INFO = {
  chest: {
    label: "Chest (pectoralis major)",
    tip: "Pushing muscle. Presses and flies train it; incline presses bias the upper (clavicular) fibres.",
    anatomy:
      "<b>Pectoralis major</b> is one fan-shaped muscle on the front of the chest. It starts from the collarbone, breastbone, upper rib cartilages and (variably) the upper abdominal fascia, then attaches to the upper arm bone. As a whole it brings the arm across the body and turns it inward. Its broad <b>sternocostal head</b> includes most middle and lower fibres; the <b>clavicular head</b> is the upper portion. A small, variable <b>abdominal part</b> may form the lowest fibres. <b>Pectoralis minor</b> is a separate muscle lying underneath.",
    figures: ["chest"],
    credit: "HEAL atlas — pectoralis major, labels drawn on a text-free illustration"
  },
  shoulders: {
    label: "Shoulders (deltoid)",
    tip: "Front delt = presses, side delt = lateral raises, rear delt = face pulls and rows.",
    anatomy:
      "The <b>deltoid</b> is one triangular muscle that caps the shoulder. It has three regions with different jobs: <b>anterior</b> (front — raises the arm forward), <b>lateral</b> (side — lifts the arm out to the side and gives shoulder width) and <b>posterior</b> (rear — pulls the arm back). All three attach to the same spot on the outside of the upper arm bone.",
    figures: ["shoulder-anterior", "shoulder-posterior"],
    credit: "HEAL atlas — deltoid front and back views"
  },
  triceps: {
    label: "Triceps (triceps brachii)",
    tip: "Back of the upper arm. Straightens the elbow — pushdowns, overhead extensions, dips, presses.",
    anatomy:
      "<b>Triceps brachii</b> is the only big muscle on the <b>back</b> of the upper arm. Its three heads — <b>long</b>, <b>lateral</b> and <b>medial</b> — join one tendon at the point of the elbow. Its main job is <b>straightening the elbow</b>. The long head also crosses the shoulder, so it is stretched most when the arm is overhead.",
    figures: ["arm-posterior"],
    credit: "HEAL atlas — right arm, back view"
  },
  biceps: {
    label: "Biceps (front of upper arm)",
    tip: "Front of the upper arm. Bends the elbow and turns the palm up. Hammer and reverse curls shift work to the brachialis and brachioradialis.",
    anatomy:
      "<b>Biceps brachii</b> sits on the <b>front</b> of the upper arm and has two heads: the <b>long head</b> (outer side) and the <b>short head</b> (inner side). Both join one tendon near the elbow. It <b>bends the elbow</b> and <b>turns the palm up</b> (supination). <b>Brachialis</b> is a separate muscle lying under the biceps near the elbow — it bends the elbow in every grip.",
    figures: ["arm-anterior"],
    credit: "HEAL atlas — right arm, front view"
  },
  forearms: {
    label: "Forearms",
    tip: "Grip, wrist curls, reverse curls, hangs. Palm side = flexors, back of forearm = extensors, thumb side = brachioradialis.",
    anatomy:
      "The forearm holds many small muscles grouped by side. The <b>flexors</b> (palm side, starting near the inner elbow) bend the wrist and fingers — your grip. The <b>extensors</b> (back of the forearm, starting near the outer elbow) lift the wrist and fingers. <b>Brachioradialis</b> runs along the thumb side from above the elbow to the wrist and helps bend the elbow, strongest with a thumbs-up grip.",
    figures: ["arm-anterior", "arm-posterior"],
    credit: "HEAL atlas — right arm, front and back views"
  },
  lats: {
    label: "Lats (latissimus dorsi)",
    tip: "Wide back 'wings'. Pulldowns, rows and straight-arm pulldowns.",
    anatomy:
      "<b>Latissimus dorsi</b> (green in the image) is the widest muscle of the back. It runs from the lower spine, pelvis and lower ribs up to the front of the upper arm bone. It <b>pulls the arm down and back</b> toward the body and turns the arm inward.",
    image: "assets/muscles/back/back-overview.jpg",
    imageDark: true,
    imageLegend: [
      { name: "Trapezius", color: "#3b82f6" },
      { name: "Rhomboids", color: "#f59e0b" },
      { name: "Posterior deltoid", color: "#a855f7" },
      { name: "Teres major", color: "#86efac" },
      { name: "Latissimus dorsi", color: "#22c55e" },
      { name: "Erector spinae", color: "#67e8f9" }
    ],
    credit: "HEAL back collage — overview panel"
  },
  "middle back": {
    label: "Mid-back (rhomboids & middle trapezius)",
    tip: "Squeezes the shoulder blades together. Rows and face pulls. Posture muscles.",
    anatomy:
      "The <b>rhomboid minor</b> is the smaller, superior band running from C7–T1 to the medial end of the scapular spine. The larger <b>rhomboid major</b> lies below it, running from T2–T5 to the medial border of the scapula. Both lie <b>under the trapezius</b> and work with its middle fibres to retract the shoulder blades.",
    image: "assets/muscles/back/back-mid.jpg",
    imageDark: true,
    imageLegend: [
      { name: "Rhomboid minor", color: "#f59e0b" },
      { name: "Rhomboid major", color: "#ea580c" }
    ],
    credit: "HEAL back collage — mid-back panel"
  },
  traps: {
    label: "Traps (trapezius)",
    tip: "Neck-to-mid-back diamond. Upper fibres lift the shoulders; lower fibres pull the shoulder blades down.",
    anatomy:
      "<b>Trapezius</b> (blue in the image) is one large diamond-shaped muscle from the skull and neck down to the middle of the back, reaching out to each shoulder. Its <b>upper</b> fibres raise and rotate the shoulder blade (shrugging, reaching overhead). Its <b>middle</b> fibres pull the blades together. Its <b>lower</b> fibres draw the blades down.",
    image: "assets/muscles/back/back-traps.jpg",
    imageDark: true,
    imageLegend: [
      { name: "Trapezius — upper fibres", color: "#3b82f6" },
      { name: "Trapezius — middle fibres", color: "#60a5fa" },
      { name: "Trapezius — lower fibres", color: "#93c5fd" },
      { name: "Posterior deltoid", color: "#a855f7" }
    ],
    credit: "HEAL back collage — traps panel"
  },
  abdominals: {
    label: "Abs / core",
    tip: "Crunch-type moves curl the trunk; planks and bracing train stiffness. Visible abs also need a lower waist fat level.",
    anatomy:
      "The front abdominal wall has four muscles. <b>Rectus abdominis</b> (the 'six-pack') is <b>one long muscle</b> on each side of the midline, split into segments by tendon bands. 'Upper' and 'lower' abs are regions of this one muscle, not separate muscles. It <b>curls the ribs toward the pelvis</b>. The <b>external obliques</b> wrap the sides of the waist. The <b>internal obliques</b> lie underneath them, and the <b>transversus abdominis</b> is the deepest layer, working like a corset.",
    figures: ["core"],
    credit: "HEAL atlas — abdominal wall, front view"
  },
  quadriceps: {
    label: "Quads (quadriceps femoris)",
    tip: "Front thigh. Straightens the knee — squats, leg press, lunges, leg extensions.",
    anatomy:
      "<b>Quadriceps femoris</b> (red on the legs map) is a group of four muscles on the front of the thigh: <b>rectus femoris</b>, <b>vastus lateralis</b>, <b>vastus medialis</b> and <b>vastus intermedius</b> (deep, hidden under rectus femoris). They share one tendon over the kneecap and <b>straighten the knee</b>. Rectus femoris also crosses the hip and helps lift the thigh.",
    image: MIMG("legs-front-thighs.jpg"),
    credit: "Front-thigh crop of your approved Legs image"
  },
  hamstrings: {
    label: "Hamstrings",
    tip: "Back thigh. Bends the knee and extends the hip — Romanian deadlifts and leg curls.",
    anatomy:
      "The <b>hamstrings</b> (green on the legs map) are three muscles on the back of the thigh: <b>biceps femoris</b> (outer side), plus <b>semitendinosus</b> and <b>semimembranosus</b> (inner side). They <b>bend the knee</b> and <b>extend the hip</b> (push the thigh backward), so they work in both hinges and curls.",
    image: MIMG("legs-posterior.jpg"),
    credit: "Posterior crop of your approved Legs image"
  },
  glutes: {
    label: "Glutes (gluteus maximus)",
    tip: "Hip extension power — hip thrusts, squats, Romanian deadlifts, lunges.",
    anatomy:
      "<b>Gluteus maximus</b> (purple on the back-of-legs map) is the largest muscle of the hip. It <b>extends the hip</b> (stands you up from a squat, drives a hip thrust) and turns the thigh outward. <b>Gluteus medius and minimus</b> sit higher on the side of the hip; they are not coloured on this map (see Outer hips).",
    image: MIMG("legs-posterior.jpg"),
    credit: "Posterior crop of your approved Legs image"
  },
  calves: {
    label: "Calves (gastrocnemius & soleus)",
    tip: "Straight-knee raises = gastrocnemius; bent-knee raises = soleus.",
    anatomy:
      "The calf has two main muscles sharing the <b>Achilles tendon</b>. <b>Gastrocnemius</b> (blue on the legs map) is the upper two-headed bulge. It crosses the knee, so it works best with the knee straight. <b>Soleus</b> (orange) is flatter and lies underneath, showing at the sides lower down. It works with the knee bent. Both <b>point the foot</b> (raise the heel).",
    image: MIMG("legs-posterior.jpg"),
    credit: "Posterior crop of your approved Legs image"
  },
  "lower back": {
    label: "Lower back (erector spinae)",
    tip: "Holds the spine straight in hinges, rows and squats. Train it as a stabiliser; stretch gently.",
    anatomy:
      "<b>Erector spinae</b> is a paired group of longitudinal back muscles. From lateral to medial its columns are <b>iliocostalis</b>, <b>longissimus</b> and <b>spinalis</b>. Together they extend the spine, help bend it to the side and hold it neutral when you lean forward or carry load.",
    image: "assets/muscles/back/back-lower.jpg",
    imageDark: true,
    imageLegend: [
      { name: "Iliocostalis (lateral)", color: "#14b8a6" },
      { name: "Longissimus (intermediate)", color: "#38bdf8" },
      { name: "Spinalis (medial)", color: "#60a5fa" }
    ],
    credit: "HEAL back collage — spinal muscles panel"
  },
  abductors: {
    label: "Outer hips (gluteus medius & minimus)",
    tip: "Keep the pelvis level and the knee tracking on single-leg work.",
    anatomy:
      "<b>Gluteus medius</b> and the smaller <b>gluteus minimus</b> sit on the <b>side of the hip</b>, above and partly under gluteus maximus. They <b>move the thigh out to the side</b> and, more importantly, <b>keep the pelvis level</b> when you stand on one leg. They are <b>not coloured</b> on the legs map.",
    image: MIMG("legs-posterior.jpg"),
    credit: "Posterior crop of your approved Legs image — outer hips not coloured"
  },
  adductors: {
    label: "Inner thighs (adductors)",
    tip: "Pull the legs together and steady the knees in squats and lunges.",
    anatomy:
      "The <b>adductors</b> (purple on the front-of-legs map) are a group on the inner thigh — <b>adductor longus, brevis and magnus</b>, plus <b>gracilis</b> and <b>pectineus</b>. They <b>pull the thigh toward the midline</b>. The large adductor magnus also helps extend the hip, so deep squats and lunges train it.",
    image: MIMG("legs-front-thighs.jpg"),
    credit: "Front-thigh crop of your approved Legs image"
  }
};

/**
 * Parts inside each muscle (heads / regions / separate helper muscles).
 * `fig`   = "figureId:labelKey" in window.ATLAS — the card shows the matching number + colour.
 * `deep`  = true when the structure is deep and not drawn in any figure.
 * `hits`  = exercise ids from window.EX in YOUR plan that train that part.
 */
window.MUSCLE_PARTS = {
  biceps: [
    {
      name: "Biceps — long head",
      fig: "arm-anterior:biceps-long",
      where: "Outer side of the front of the upper arm. Its tendon runs over the top of the shoulder joint.",
      does: "Bends the elbow and turns the palm up. Because it crosses the shoulder, it is stretched more when the elbow is behind the body.",
      hits: ["dbCurl", "hammer"],
      tip: "Both biceps heads work in every curl — grip and arm position only shift the emphasis a little. Let the arm straighten fully at the bottom of each rep."
    },
    {
      name: "Biceps — short head",
      fig: "arm-anterior:biceps-short",
      where: "Inner side of the front of the upper arm (closer to the chest). Starts from a small bony hook on the shoulder blade.",
      does: "Same job as the long head: bends the elbow and turns the palm up.",
      hits: ["concCurl", "dbCurl"],
      tip: "Curls with the elbow in front of the body (concentration curl) are commonly used to emphasise the short head. Turn the palm up hard at the top."
    },
    {
      name: "Brachialis (separate muscle, under the biceps)",
      fig: "arm-anterior:brachialis",
      where: "Lower half of the upper arm, underneath the biceps. Its edges show on both sides of the arm just above the elbow.",
      does: "Pure elbow bender. It works in every grip, and does relatively more of the work when the palm faces down or sideways.",
      hits: ["hammer", "reverseCurl", "dbCurl"],
      tip: "Not part of the biceps. A well-developed brachialis pushes the biceps up and makes the arm look thicker from the side."
    }
  ],
  triceps: [
    {
      name: "Triceps — long head",
      fig: "arm-posterior:triceps-long",
      where: "Inner side of the back of the upper arm (the side nearest your body). It starts on the shoulder blade, so it crosses the shoulder.",
      does: "Straightens the elbow and also helps pull the arm down and back at the shoulder. It is stretched most with the arm overhead.",
      hits: ["ohExt", "pushdown", "dips"],
      tip: "Overhead extensions load the long head in its stretched position. A different muscle from the biceps long head, on the opposite side of the arm."
    },
    {
      name: "Triceps — lateral head",
      fig: "arm-posterior:triceps-lateral",
      where: "Outer side of the back of the upper arm — the outer part of the 'horseshoe'.",
      does: "Straightens the elbow. Works hard in pushdowns, dips and all pressing.",
      hits: ["pushdown", "dips", "flatBench", "machineChest"],
      tip: "Rope pushdown: keep the elbows pinned at your sides and spread the rope at the bottom."
    },
    {
      name: "Triceps — medial head",
      fig: "arm-posterior:triceps-medial",
      where: "Mostly deep, under the long and lateral heads. Shows on the surface just above the elbow.",
      does: "Straightens the elbow in every triceps exercise and pressing movement, including light work.",
      hits: ["pushdown", "ohExt", "dips"],
      tip: "There is no special exercise for it — it works whenever the elbow straightens. Finish each rep with a controlled lockout."
    }
  ],
  chest: [
    {
      name: "Clavicular head (upper chest)",
      fig: "chest:pec-clavicular",
      where: "Upper part of pectoralis major, starting from the inner half of the collarbone.",
      does: "Raises the arm forward and upward and brings it across the body.",
      hits: ["inclinePress", "machineChest"],
      tip: "A 30–45° incline press emphasises these upper fibres. Keep the shoulder blades back and down on the bench."
    },
    {
      name: "Sternocostal head (middle and lower chest)",
      fig: "chest:pec-sternocostal",
      where: "The main bulk of pectoralis major, starting from the breastbone and upper rib cartilages.",
      does: "Brings the arm across the body (hug), pushes forward, and pulls the arm down from overhead.",
      hits: ["flatBench", "machineChest", "pecDeck", "declinePress"],
      tip: "Flat pressing and the pec deck are the main builders. Control the stretch at the bottom."
    },
    {
      name: "Inferior fibres (lower chest region)",
      fig: "chest:pec-abdominal",
      where: "The lower edge of pectoralis major. The yellow area is a teaching region that includes inferior sternocostal fibres and the small, variable abdominal part.",
      does: "Helps pull a raised arm down and across the body.",
      hits: ["declinePress", "cableFly"],
      tip: "Decline pressing and high-to-low flies may bias the inferior fibres, but they do not isolate an abdominal head."
    },
    {
      name: "Pectoralis minor (separate muscle, deep)",
      deep: true,
      where: "Underneath pectoralis major, from the 3rd–5th ribs up to a bony point at the front of the shoulder blade.",
      does: "Pulls the shoulder blade forward and down. It helps steady the shoulder blade during pushing.",
      hits: [],
      tip: "Not drawn because pectoralis major covers it. Your plan has no direct pectoralis-minor exercise; the doorway stretch lengthens this area but is not strength work."
    }
  ],
  shoulders: [
    {
      name: "Anterior deltoid (front)",
      fig: "shoulder-anterior:delt-anterior",
      where: "Front of the shoulder cap, from the outer third of the collarbone.",
      does: "Raises the arm forward and helps every pressing movement.",
      hits: ["ohp", "arnold", "inclinePress", "flatBench"],
      tip: "Chest presses already train it a lot, so extra front raises are rarely needed."
    },
    {
      name: "Lateral deltoid (side)",
      fig: "shoulder-anterior:delt-lateral",
      where: "Outer side of the shoulder cap, from the bony tip of the shoulder (acromion). Visible in both the front and back views.",
      does: "Lifts the arm out to the side. It gives the shoulders their width.",
      hits: ["lateralRaise", "cableLat", "ohp"],
      tip: "Lateral raises are the main builder: light weight, no swinging, and keep the upper traps relaxed."
    },
    {
      name: "Posterior deltoid (rear)",
      fig: "shoulder-posterior:delt-posterior",
      where: "Back of the shoulder cap, from the ridge (spine) of the shoulder blade.",
      does: "Pulls the arm backward and rotates it outward. Helps balance posture against all the pressing.",
      hits: ["facePull", "bentRow", "cableRow"],
      tip: "Face pulls: pull toward the forehead with the elbows high and rotate the hands back at the end."
    }
  ],
  forearms: [
    {
      name: "Forearm flexors (palm side)",
      fig: "arm-anterior:flexors",
      where: "Palm side of the forearm, starting from the inner elbow. Includes the wrist flexors and the finger flexors.",
      does: "Bends the wrist toward the palm and closes the fingers — your grip.",
      hits: ["wristUp", "scapPull", "hangKnee"],
      tip: "Palms-up wrist curls train them directly; dead hangs and hanging raises train grip endurance."
    },
    {
      name: "Forearm extensors (back of forearm)",
      fig: "arm-posterior:extensors",
      where: "Back (knuckle side) of the forearm, starting from the outer elbow.",
      does: "Lifts the wrist back and opens the fingers. Steadies the wrist whenever you grip.",
      hits: ["wristDown", "reverseCurl"],
      tip: "Usually weaker than the flexors — palms-down wrist curls and reverse curls fill the gap."
    },
    {
      name: "Brachioradialis (thumb side)",
      fig: "arm-anterior:brachioradialis",
      where: "Thumb side of the forearm, from just above the elbow down to the wrist. The muscle belly is in the upper forearm.",
      does: "Helps bend the elbow, strongest with a thumbs-up (neutral) grip.",
      hits: ["hammer", "reverseCurl"],
      tip: "A forearm muscle, not part of the biceps. Hammer curls are its best exercise."
    }
  ],
  lats: [
    {
      name: "Latissimus dorsi",
      shown: "Labelled “Latissimus Dorsi (Lats)” (green) in the image above.",
      where: "Sides of the mid and lower back (green in the image), from the lower spine and pelvis to the front of the upper arm bone.",
      does: "Pulls the arm down and back toward the body (pull-down and row actions).",
      hits: ["latPulldown", "straightArm", "cableRow", "bentRow"],
      tip: "Lead with the elbows and pull to the upper chest. The straight-arm pulldown is the best drill for feeling the lats."
    }
  ],
  "middle back": [
    {
      name: "Rhomboid minor",
      shown: "Labelled “Rhomboid Minor” (orange, upper part) in the image above.",
      where: "The small superior rhomboid, from C7–T1 to the medial end of the scapular spine. It lies under the trapezius.",
      does: "Retracts and downwardly rotates the shoulder blade and assists elevation.",
      hits: ["cableRow", "bentRow", "facePull"],
      tip: "Pause for one second with the shoulder blades squeezed at the end of each row."
    },
    {
      name: "Rhomboid major",
      shown: "Labelled “Rhomboid Major” (orange, lower part) in the image above.",
      where: "Below rhomboid minor, from T2–T5 to the medial border of the shoulder blade.",
      does: "Retracts and downwardly rotates the shoulder blade and helps hold it against the rib cage.",
      hits: ["cableRow", "bentRow", "facePull"],
      tip: "Pause for one second with the shoulder blades squeezed at the end of each row."
    },
    {
      name: "Middle trapezius",
      shown: "Not in this deep view — labelled “Trapezius (Middle Fibres)” in the Traps image.",
      where: "Middle band of the trapezius, across the shoulder blades. It covers the rhomboids.",
      does: "Pulls the shoulder blades together, working with the rhomboids.",
      hits: ["facePull", "cableRow", "bentRow"],
      tip: "Good posture work after long laptop hours."
    }
  ],
  traps: [
    {
      name: "Upper trapezius",
      shown: "Labelled “Trapezius (Upper Fibres)” (blue) in the image above.",
      where: "From the base of the skull and neck out to the top of the shoulder.",
      does: "Raises the shoulder blades (shrug) and rotates them upward when you reach overhead.",
      hits: ["ohp", "lateralRaise"],
      tip: "It already works in overhead presses. On lateral raises, keep the shoulders down so the side delts do the work."
    },
    {
      name: "Lower trapezius",
      shown: "Labelled “Trapezius (Lower Fibres)” (blue) in the image above.",
      where: "Lower point of the trapezius diamond, between and below the shoulder blades.",
      does: "Draws the shoulder blades down and helps rotate them upward for overhead reaching.",
      hits: ["scapPull", "facePull", "latPulldown"],
      tip: "Scap pulls teach it: hang from the bar and pull the shoulders down away from the ears without bending the elbows."
    }
  ],
  abdominals: [
    {
      name: "Rectus abdominis — upper region",
      fig: "core:rectus-upper",
      where: "The segments of the six-pack above the navel. Same muscle as the lower region.",
      does: "Curls the rib cage down toward the pelvis.",
      hits: ["cableCrunch", "airBike"],
      tip: "You cannot isolate this region from the rest of rectus abdominis. Cable crunch: bring the ribs toward the pelvis instead of only bending at the hips."
    },
    {
      name: "Rectus abdominis — lower region",
      fig: "core:rectus-lower",
      where: "The part of the same muscle below the navel, down to the pubic bone.",
      does: "Curls the pelvis up toward the ribs (tilts the pelvis backward).",
      hits: ["hangKnee", "airBike"],
      tip: "Hanging knee raise: curl the pelvis up at the top. Just lifting the knees is mostly hip-flexor work."
    },
    {
      name: "External oblique",
      fig: "core:external-oblique",
      where: "The outer layer on the sides of the waist. Fibres run down and forward, like hands in front pockets.",
      does: "Rotates the trunk to the opposite side, bends it sideways, and resists twisting.",
      hits: ["airBike", "torsoRotation", "plank"],
      tip: "Bicycle crunch: rotate the rib cage toward the knee instead of pulling on the neck."
    },
    {
      name: "Internal oblique (deep)",
      deep: true,
      where: "Directly under the external oblique, with fibres running the opposite way.",
      does: "Rotates the trunk to the same side and works with the external oblique of the other side.",
      hits: ["airBike", "plank"],
      tip: "Not drawn in the figure (it is covered by the external oblique). It trains alongside the obliques in rotation and bracing."
    },
    {
      name: "Transversus abdominis (deepest)",
      deep: true,
      where: "The deepest abdominal layer, wrapping around the waist like a corset.",
      does: "Pulls the abdominal wall in and stiffens the trunk. It doesn't bend the spine.",
      hits: ["plank"],
      tip: "Not drawn in the figure (deepest layer). Brace before squats and presses; in a plank, keep the ribs down and the glutes tight."
    }
  ],
  quadriceps: [
    {
      name: "Rectus femoris",
      where: "Centre of the front thigh. The only quad that also crosses the hip.",
      does: "Straightens the knee and helps lift the thigh at the hip.",
      hits: ["legExt", "smithSquat", "legPress", "lunges"],
      tip: "Rectus femoris crosses both the hip and knee, so its contribution changes with hip angle. Leg extensions directly train knee extension, but do not isolate it from the other quadriceps."
    },
    {
      name: "Vastus lateralis",
      where: "Outer front thigh — the largest quad.",
      does: "Straightens the knee.",
      hits: ["smithSquat", "legPress", "lunges", "legExt"],
      tip: "Builds the outer 'sweep' of the thigh over months of squatting and pressing."
    },
    {
      name: "Vastus medialis",
      where: "Inner front thigh, the 'teardrop' just above the inner knee.",
      does: "Straightens the knee and helps keep the kneecap on track.",
      hits: ["legExt", "lunges", "legPress"],
      tip: "Control the lockout of leg extensions instead of slamming it."
    },
    {
      name: "Vastus intermedius (deep)",
      deep: true,
      where: "Underneath rectus femoris, so not visible on the map.",
      does: "Straightens the knee with the other vasti.",
      hits: ["smithSquat", "legPress", "legExt"],
      tip: "Works in every knee-straightening exercise."
    }
  ],
  hamstrings: [
    {
      name: "Biceps femoris",
      where: "Outer back of the thigh.",
      does: "Bends the knee. Its long head also extends the hip.",
      hits: ["rdl", "legCurl"],
      tip: "Romanian deadlift: hinge at the hips, keep the weights close and feel the stretch behind the thigh."
    },
    {
      name: "Semitendinosus & semimembranosus",
      where: "Inner back of the thigh.",
      does: "Bend the knee and extend the hip.",
      hits: ["rdl", "legCurl"],
      tip: "Lying leg curl: keep the hips pressed into the pad and lower slowly."
    }
  ],
  glutes: [
    {
      name: "Gluteus maximus",
      where: "The large rounded muscle of the buttock (purple on the back-of-legs map).",
      does: "Extends the hip (standing up, driving the hips forward) and rotates the thigh outward.",
      hits: ["hipThrust", "smithSquat", "rdl", "lunges", "legPress"],
      tip: "Hip thrust: squeeze at the top with the ribs down — don't arch the lower back to finish."
    }
  ],
  calves: [
    {
      name: "Gastrocnemius",
      where: "The upper two-headed calf bulge (blue on the map). It crosses the knee.",
      does: "Raises the heel (points the foot) and helps bend the knee.",
      hits: ["calfStand", "legPress"],
      tip: "Standing (straight-knee) raises target it. Use a full stretch at the bottom and pause at the top."
    },
    {
      name: "Soleus",
      where: "Flatter muscle under the gastrocnemius. It shows at the sides of the lower calf (orange on the map).",
      does: "Raises the heel, especially with the knee bent.",
      hits: ["calfSeat"],
      tip: "Seated (bent-knee) raises target it."
    }
  ],
  "lower back": [
    {
      name: "Iliocostalis",
      shown: "Labelled “Iliocostalis (Lateral)” in the image above.",
      where: "The lateral (outer) erector-spinae column, running upward from the common sacral and iliac origin toward the ribs.",
      does: "Extends the spine on both sides together and bends it to the same side when one side contracts.",
      hits: ["rdl", "bentRow", "smithSquat"],
      tip: "Trained as a stabiliser in hinges and rows — keep a neutral spine."
    },
    {
      name: "Longissimus",
      shown: "Labelled “Longissimus (Intermediate)” in the image above.",
      where: "The intermediate and longest erector-spinae column, between iliocostalis and spinalis.",
      does: "Extends and laterally flexes the vertebral column and helps maintain upright posture.",
      hits: ["rdl", "bentRow", "smithSquat"],
      tip: "Brace before lifting and let the hips, rather than the lower back, drive a hinge."
    },
    {
      name: "Spinalis",
      shown: "Labelled “Spinalis (Medial)” in the image above.",
      where: "The narrow medial (inner) erector-spinae column, closest to the spinous processes.",
      does: "Assists spinal extension and postural control.",
      hits: ["rdl", "bentRow", "smithSquat"],
      tip: "Trained as a stabiliser in hinges and rows — keep a neutral spine. Stretch gently afterwards (cat stretch, child's pose)."
    }
  ],
  abductors: [
    {
      name: "Gluteus medius & minimus",
      notShown: true,
      where: "Side of the hip, above the hip joint. Gluteus medius is largely superficial; gluteus minimus lies deep beneath it. Neither is coloured on the legs map.",
      does: "Moves the thigh out to the side and keeps the pelvis level on one leg.",
      hits: ["lunges", "walkLunge"],
      tip: "On lunges, keep the front knee over the middle of the foot — don't let it cave inward."
    }
  ],
  adductors: [
    {
      name: "Adductor group",
      where: "Inner thigh (purple on the front-of-legs map): adductor longus, brevis, magnus, gracilis, pectineus.",
      does: "Pulls the thigh toward the midline. Adductor magnus also helps extend the hip.",
      hits: ["smithSquat", "legPress", "lunges"],
      tip: "Deep squats and lunges already train them; no separate machine needed for now."
    }
  ]
};

window.BODY_OVERVIEW = ["overview-front", "overview-back"];

window.BODY_REGIONS = [
  {
    id: "arms",
    label: "Arms",
    blurb: "Biceps and brachialis (front of upper arm), triceps (back), and the forearm muscles.",
    image: "assets/muscles/atlas/arm-anterior-thumb.jpg",
    muscles: ["biceps", "triceps", "forearms"]
  },
  {
    id: "chest",
    label: "Chest",
    blurb: "Pectoralis major — presses and flies.",
    image: "assets/muscles/atlas/chest-thumb.jpg",
    muscles: ["chest"]
  },
  {
    id: "shoulders",
    label: "Shoulders",
    blurb: "Deltoid — front, side and rear regions.",
    image: "assets/muscles/atlas/shoulder-anterior-thumb.jpg",
    muscles: ["shoulders"]
  },
  {
    id: "back",
    label: "Back",
    blurb: "Lats, rhomboids, trapezius, erector spinae — pulldowns and rows.",
    image: "assets/muscles/back/back-overview-thumb.jpg",
    muscles: ["lats", "middle back", "traps", "lower back"]
  },
  {
    id: "core",
    label: "Core / abs",
    blurb: "Rectus abdominis, obliques, transversus — crunches, raises, planks.",
    image: "assets/muscles/atlas/core-thumb.jpg",
    muscles: ["abdominals"]
  },
  {
    id: "legs",
    label: "Legs",
    blurb: "Quads, hamstrings, glutes, adductors, calves — squat, hinge, lunge.",
    image: MIMG("legs-posterior.jpg"),
    muscles: ["quadriceps", "hamstrings", "glutes", "calves", "abductors", "adductors"]
  }
];
