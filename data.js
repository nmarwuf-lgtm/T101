// ============================================================
// MedTerm – data.js  v3.0
// Chapter 1 – FULL content from Dr. Luay's book
// Chapters 2-14 – standard content
// ============================================================

const CHAPTERS = [
  // ══════════════════════════════════════════════════════════
  //  CHAPTER 1  –  INTRODUCTION TO HUMAN ANATOMY & PHYSIOLOGY
  //  Source: د. لؤي محمد ناصر – HUMAN ANATOMY AND PHYSIOLOGY (I)
  //  Pages 1 – 10  (full book content)
  // ══════════════════════════════════════════════════════════
  {
    id: 1,
    icon: "🔬",
    title: "مقدمة في علم التشريح والفسيولوجيا",
    titleEn: "Introduction to Human Anatomy and Physiology",
    pages: "1–10",
    color: "#63b3ed",
    desc: "مستويات التنظيم · الوضع التشريحي · الاتجاهات · مناطق الجسم · التجاويف · التوازن الداخلي",
    author: "د. لؤي محمد ناصر",

    // ── OVERVIEW (used in Overview page & AI prompts) ──────
    overview: "يُعرِّف هذا الفصل بعلم التشريح وعلم الفسيولوجيا وفروعهما، ويشرح مستويات التنظيم الهيكلي للجسم من الذرات حتى الكائن الحي، ثم يتناول الوضع التشريحي القياسي والمصطلحات الاتجاهية الأحد عشر، ومناطق الجسم الرئيسية والتقسيمات البطنية، والمستويات التشريحية الأربعة، وتجاويف الجسم الأمامية والخلفية، وأخيراً مفهوم التوازن الداخلي وآليتَي التغذية الراجعة.",

    // ── TERMS  (shown in Doctor tab + Translation tab) ─────
    terms: [
      { en: "Anatomy",              ar: "علم التشريح",                   pron: "أناتومي",       desc: "علم يدرس بنية جسم الإنسان والعلاقات بين أجزائه" },
      { en: "Physiology",           ar: "علم وظائف الأعضاء",             pron: "فيزيولوجي",     desc: "علم يدرس وظائف أجزاء الجسم وكيفية عملها" },
      { en: "Gross Anatomy",        ar: "التشريح العياني",                pron: "غروس أناتومي",  desc: "دراسة بنية الجسم بالعين المجردة دون مجهر" },
      { en: "Histology",            ar: "علم الأنسجة (التشريح المجهري)", pron: "هيستولوجي",     desc: "يتطلب مجهراً لدراسة الأنسجة المكوِّنة لأعضاء الجسم" },
      { en: "Cell",                 ar: "الخلية",                        pron: "سيل",            desc: "أصغر وحدة مستقلة في الحياة، وظائفها: النمو والاستقلاب والتكاثر" },
      { en: "Tissue",               ar: "النسيج",                        pron: "تيشو",           desc: "مجموعة خلايا متشابهة تؤدي وظيفة محددة" },
      { en: "Organ",                ar: "العضو",                         pron: "أورغان",         desc: "تجميع متكامل من نوعين أو أكثر من الأنسجة تعمل معاً" },
      { en: "System",               ar: "الجهاز",                        pron: "سيستم",          desc: "مجموعة أعضاء تعمل معاً لأداء وظيفة رئيسية" },
      { en: "Epithelial Tissue",    ar: "النسيج الطلائي",                pron: "إيبيثيليال",     desc: "يُوجد في الطبقة الخارجية للجلد وبطانة الأعضاء والأوعية وتجاويف الجسم" },
      { en: "Connective Tissue",    ar: "النسيج الضام",                  pron: "كونكتيف",        desc: "يربط ويدعم معظم أجزاء الجسم: الجلد والعظام والأوتار" },
      { en: "Muscle Tissue",        ar: "النسيج العضلي",                 pron: "ماسل",           desc: "ينتج الحركة بالانقباض – هيكلي وملساء وقلبي" },
      { en: "Nerve Tissue",         ar: "النسيج العصبي",                 pron: "نيرف",           desc: "يوجد في الدماغ والنخاع والأعصاب، يستجيب للمحفزات وينقل النبضات" },
      { en: "Anatomical Position",  ar: "الوضع التشريحي القياسي",       pron: "أناتوميكال بوزيشن", desc: "واقف منتصب مواجهاً للمراقب، القدمان متضامتان، راحتا اليدين للأمام" },
      { en: "Superior (Cranial)",   ar: "علوي (قحفي)",                   pron: "سوبيريور",       desc: "باتجاه الرأس أو أعلى بنية أخرى – المثال: الرأس علوي بالنسبة للبطن" },
      { en: "Inferior (Caudal)",    ar: "سفلي (ذيلي)",                   pron: "إنفيريور",       desc: "بعيداً عن الرأس نحو الأسفل – المثال: السرة سفلية بالنسبة للذقن" },
      { en: "Anterior (Ventral)",   ar: "أمامي (بطني)",                  pron: "أنتيريور",       desc: "باتجاه مقدمة الجسم – المثال: عظمة القص أمامية بالنسبة للعمود الفقري" },
      { en: "Posterior (Dorsal)",   ar: "خلفي (ظهري)",                   pron: "بوستيريور",      desc: "باتجاه خلف الجسم – المثال: القلب خلفي بالنسبة لعظمة القص" },
      { en: "Medial",               ar: "وسطي (إنسي)",                   pron: "ميديال",         desc: "باتجاه خط منتصف الجسم – المثال: القلب وسطي بالنسبة للذراع" },
      { en: "Lateral",              ar: "جانبي (وحشي)",                  pron: "لاتيرال",        desc: "بعيداً عن خط منتصف الجسم – المثال: الذراعان جانبيتان بالنسبة للصدر" },
      { en: "Intermediate",         ar: "وسيط",                          pron: "إنترمديت",       desc: "بين بنية أكثر وسطية وأخرى أكثر جانبية – المثال: عظمة الترقوة وسيطة" },
      { en: "Proximal",             ar: "قريب",                          pron: "بروكسيمال",      desc: "أقرب لنقطة أصل الجزء أو اتصال الطرف بالجذع – المثال: الكوع قريب من الرسغ" },
      { en: "Distal",               ar: "بعيد",                          pron: "ديستال",         desc: "أبعد عن نقطة الأصل – المثال: الركبة بعيدة بالنسبة للفخذ" },
      { en: "Superficial (External)",ar: "سطحي (خارجي)",                 pron: "سوبرفيشال",      desc: "باتجاه سطح الجسم – المثال: الجلد سطحي بالنسبة للعضلات" },
      { en: "Deep (Internal)",      ar: "عميق (داخلي)",                  pron: "ديب",            desc: "بعيداً عن سطح الجسم – المثال: الرئتان عميقتان بالنسبة للجلد" },
      { en: "Sagittal Plane",       ar: "المستوى السهمي",                pron: "ساجيتال بلين",   desc: "يقسم الجسم إلى نصفين أيمن وأيسر" },
      { en: "Frontal (Coronal) Plane",ar:"المستوى الأمامي التاجي",       pron: "فرونتال بلين",   desc: "يقسم الجسم إلى قسمين أمامي وخلفي" },
      { en: "Transverse Plane",     ar: "المستوى العرضي",                pron: "ترانسفيرس بلين", desc: "يقسم الجسم أفقياً إلى قسمين علوي وسفلي" },
      { en: "Oblique Plane",        ar: "المستوى المائل",                pron: "أوبليك بلين",    desc: "يقسم الجسم بشكل مائل" },
      { en: "Thoracic Cavity",      ar: "التجويف الصدري",                pron: "ثوراسيك كافيتي", desc: "يحتوي القلب والرئتين، محمي بالقفص الصدري والقص" },
      { en: "Mediastinum",          ar: "المنصف",                        pron: "ميدياستينوم",    desc: "المنطقة الوسطى في الصدر بين الرئتين، يحتوي القلب والمريء والقصبة" },
      { en: "Abdomino-pelvic Cavity",ar:"التجويف البطني الحوضي",         pron: "أبدومينو-بيلفيك",desc: "يمتد من الحجاب الحاجز إلى قاع الحوض" },
      { en: "Homeostasis",          ar: "التوازن الداخلي (الاتزان)",     pron: "هوميوستاسيس",   desc: "الحفاظ على بيئة داخلية مستقرة ثابتة رغم تغيُّر الظروف الخارجية" },
      { en: "Receptor",             ar: "المستقبل",                      pron: "ريسيبتور",       desc: "يستقبل معلومات عن التغير في البيئة الداخلية أو الخارجية" },
      { en: "Integration Center",   ar: "مركز التكامل (التحكم)",         pron: "إنتيغريشن سنتر", desc: "يستقبل المعلومات من المستقبل ويعالجها" },
      { en: "Effector",             ar: "المؤثِّر",                      pron: "إيفكتور",        desc: "يستجيب لأوامر مركز التحكم – يعارض المحفز أو يعززه" },
      { en: "Negative Feedback",    ar: "التغذية الراجعة السلبية",       pron: "نيغاتيف فيدباك", desc: "تعيد المتغير إلى نطاقه الطبيعي – الأكثر شيوعاً (مثال: تنظيم الحرارة)" },
      { en: "Positive Feedback",    ar: "التغذية الراجعة الإيجابية",    pron: "بوزيتيف فيدباك", desc: "تعزز التغيير وتزيده – أقل شيوعاً (مثال: انقباضات الولادة)" }
    ],

    // ── DETAILED SECTIONS (Doctor tab – rich content) ──────
    sections: [
      {
        id: "definitions",
        title: "تعريفات أساسية",
        icon: "📖",
        content: [
          {
            heading: "علم التشريح (Anatomy)",
            body: "هو العلم الذي يدرس بنية أعضاء الجسم البشري والعلاقات فيما بينها.",
            bodyEn: "Anatomy is the science of body structures and the relationships among them."
          },
          {
            heading: "علم الفسيولوجيا (Physiology)",
            body: "هو العلم الذي يدرس وظائف أجزاء الجسم وكيف تعمل.",
            bodyEn: "Physiology is the science of body function — how the body parts work."
          },
          {
            heading: "فروع التشريح",
            body: "• التشريح العياني (Gross Anatomy): يدرس بنية الجسم بالعين المجردة دون مجهر.\n• التشريح المجهري – علم الأنسجة (Histology): يتطلب مجهراً لدراسة الأنسجة.",
            bodyEn: "• Gross Anatomy: studies body structure without microscope.\n• Histology (Microscopic Anatomy): requires microscope to study tissues."
          }
        ]
      },
      {
        id: "levels",
        title: "مستويات التنظيم الهيكلي",
        icon: "🧬",
        content: [
          {
            heading: "التسلسل الهرمي (من الأصغر للأكبر)",
            body: "الذرات ← الجزيئات ← المركبات ← الخلية ← النسيج ← العضو ← الجهاز ← الكائن الحي",
            bodyEn: "Atoms → Molecules → Compounds → Cell → Tissue → Organ → System → Organism"
          },
          {
            heading: "1 – الذرات والجزيئات والمركبات",
            body: "أبسط مستوى. أكثر العناصر شيوعاً في الكائنات الحية: الكربون، الهيدروجين، الأكسجين، النيتروجين، الفوسفور، الكبريت.",
            bodyEn: "Most common elements: carbon, hydrogen, oxygen, nitrogen, phosphorus, sulfur."
          },
          {
            heading: "2 – الخلية (Cell)",
            body: "أصغر وحدة مستقلة في الحياة. وظائفها الأساسية: النمو، الاستقلاب، الاستثارة، التكاثر.",
            bodyEn: "Smallest independent units of life. Basic functions: growth, metabolism, irritability, reproduction."
          },
          {
            heading: "3 – النسيج (Tissue)",
            body: "مجموعة خلايا متشابهة تؤدي وظيفة محددة. أنواعه الأربعة: طلائي، ضام، عضلي، عصبي.",
            bodyEn: "Tissue: many similar cells performing a specific function. 4 types: Epithelial, Connective, Muscle, Nerve."
          },
          {
            heading: "4 – العضو (Organ)",
            body: "تجميع متكامل من نوعين أو أكثر من الأنسجة تعمل معاً. مثال: المعدة مبنية من جميع أنواع الأنسجة.",
            bodyEn: "An integrated collection of 2+ tissue types working together. Example: stomach."
          },
          {
            heading: "5 – الجهاز (System)",
            body: "مجموعة أعضاء تعمل معاً لأداء وظيفة رئيسية. مثال: الجهاز التنفسي يحتوي رئتين وقصبة وحجاب حاجز.",
            bodyEn: "A group of organs working together for a major function. Example: respiratory system."
          },
          {
            heading: "6 – الكائن الحي (Organism)",
            body: "جميع أجهزة الجسم مجتمعةً تشكّل الكائن الحي الكامل.",
            bodyEn: "All organ systems together form the entire organism."
          }
        ]
      },
      {
        id: "tissues4",
        title: "الأنسجة الأربعة",
        icon: "🧫",
        content: [
          {
            heading: "1 – النسيج الطلائي (Epithelial Tissue)",
            body: "يُوجد في الطبقة الخارجية للجلد، بطانة الأعضاء، الأوعية الدموية واللمفاوية، وتجاويف الجسم.",
            bodyEn: "Found in outer skin layer, lining of organs, blood/lymph vessels, body cavities."
          },
          {
            heading: "2 – النسيج الضام (Connective Tissue)",
            body: "يربط ويدعم معظم أجزاء الجسم. يشكّل معظم الجلد والعظام والأوتار.",
            bodyEn: "Connects and supports the body; constitutes skin, bone and tendons."
          },
          {
            heading: "3 – النسيج العضلي (Muscle Tissue)",
            body: "ينتج الحركة من خلال قدرته على الانقباض. يشمل العضلات الهيكلية والملساء والقلبية.",
            bodyEn: "Produces movement through contraction: skeletal, smooth, cardiac muscles."
          },
          {
            heading: "4 – النسيج العصبي (Nerve Tissue)",
            body: "يُوجد في الدماغ والنخاع الشوكي والأعصاب. يستجيب للمحفزات وينقل النبضات العصبية.",
            bodyEn: "Found in brain, spinal cord, nerves. Responds to stimuli and transmits impulses."
          }
        ]
      },
      {
        id: "position",
        title: "الوضع التشريحي القياسي",
        icon: "🧍",
        content: [
          {
            heading: "التعريف",
            body: "الوضع التشريحي هو نقطة المرجع المقبولة عالمياً لوصف مواضع أجزاء الجسم.",
            bodyEn: "Anatomical position is the universally accepted reference point for positional descriptions."
          },
          {
            heading: "وصف الوضع",
            body: "الشخص واقف منتصباً – مواجهٌ للمراقب – القدمان متضامتان – الذراعان مدليتان على الجانبين – راحتا اليدين نحو الأمام.",
            bodyEn: "Standing erect, facing observer, feet together, arms hanging at sides, palms facing forward."
          }
        ]
      },
      {
        id: "directions",
        title: "المصطلحات الاتجاهية (11 مصطلح)",
        icon: "🧭",
        content: [
          {
            heading: "ملاحظة مهمة",
            body: "معظم المصطلحات تأتي في أزواج متضادة. جميع الأمثلة مأخوذة من الكتاب مباشرةً.",
            bodyEn: "Most directional terms come in opposing pairs. Examples are from the textbook directly."
          },
          {
            heading: "Superior ↔ Inferior",
            body: "علوي: باتجاه الرأس (الرأس علوي بالنسبة للبطن).\nسفلي: بعيداً عن الرأس (السرة سفلية بالنسبة للذقن).",
            bodyEn: "Superior: toward the head (head is superior to abdomen).\nInferior: away from head (navel is inferior to chin)."
          },
          {
            heading: "Anterior ↔ Posterior",
            body: "أمامي: باتجاه مقدمة الجسم (القص أمامي بالنسبة للعمود الفقري).\nخلفي: باتجاه خلف الجسم (القلب خلفي بالنسبة للقص).",
            bodyEn: "Anterior: toward front (breastbone anterior to spine).\nPosterior: toward back (heart posterior to breastbone)."
          },
          {
            heading: "Medial ↔ Lateral",
            body: "وسطي: باتجاه خط المنتصف (القلب وسطي بالنسبة للذراع).\nجانبي: بعيداً عن المنتصف (الذراعان جانبيتان بالنسبة للصدر).",
            bodyEn: "Medial: toward midline (heart medial to arm).\nLateral: away from midline (arms lateral to chest)."
          },
          {
            heading: "Proximal ↔ Distal",
            body: "قريب: أقرب لنقطة اتصال الطرف بالجذع (الكوع قريب من الرسغ).\nبعيد: أبعد عن نقطة الأصل (الركبة بعيدة من الفخذ).",
            bodyEn: "Proximal: closer to trunk (elbow proximal to wrist).\nDistal: farther from trunk (knee distal to thigh)."
          },
          {
            heading: "Superficial ↔ Deep  +  Intermediate",
            body: "سطحي: باتجاه سطح الجسم (الجلد سطحي بالنسبة للعضلات).\nعميق: بعيداً عن السطح (الرئتان عميقتان بالنسبة للجلد).\nوسيط: بين بنية أكثر وسطية وأكثر جانبية (الترقوة وسيطة بين القص والكتف).",
            bodyEn: "Superficial: toward surface (skin superficial to muscles).\nDeep: away from surface (lungs deep to skin).\nIntermediate: between medial and lateral structures."
          }
        ]
      },
      {
        id: "regions",
        title: "مناطق الجسم",
        icon: "🗺️",
        content: [
          {
            heading: "المناطق الخمس الرئيسية",
            body: "الرأس – الرقبة – الجذع (Torso) – الطرف العلوي – الطرف السفلي",
            bodyEn: "Head – Neck – Trunk (Torso) – Upper Extremity – Lower Extremity"
          },
          {
            heading: "الرأس (Head)",
            body: "منطقة وجهية: العينان والأنف والفم.\nمنطقة قحفية (Cranium): تغطي الدماغ وتدعمه.",
            bodyEn: "Facial region: eyes, nose, mouth.\nCranial region: covers and supports the brain."
          },
          {
            heading: "الرقبة (Neck) – المنطقة العنقية",
            body: "تدعم الرأس وتسمح له بالحركة.",
            bodyEn: "Supports the head and permits it to move."
          },
          {
            heading: "الجذع (Trunk / Torso)",
            body: "ترتبط به الرقبة والأطراف. يتقسم إلى:\n• الصدر (Thorax): القفص الصدري.\n• المنطقة الثديية (Mammary): تحيط بالحلمة.\n• المنطقة القصية (Sternal): بين المنطقتين الثديتين.\n• المنطقة الإبطية (Axillary): الإبط.\n• المنطقة الفقرية (Vertebral): على طول الظهر.\n• البطن (Abdomen): تحت الصدر.",
            bodyEn: "Divided into: Thorax, Mammary, Sternal, Axillary, Vertebral regions and Abdomen."
          },
          {
            heading: "تقسيمات البطن – 9 مناطق",
            body: "مراق أيمن | شرسوفي | مراق أيسر\nقطن أيمن | سري | قطن أيسر\nحرقفي أيمن | تحت معدي | حرقفي أيسر",
            bodyEn: "Right Hypochondriac | Epigastric | Left Hypochondriac\nRight Lumbar | Umbilical | Left Lumbar\nRight Iliac | Hypogastric | Left Iliac"
          },
          {
            heading: "تقسيمات البطن – 4 أرباع",
            body: "الربع العلوي الأيمن (RUQ) | الربع العلوي الأيسر (LUQ)\nالربع السفلي الأيمن (RLQ) | الربع السفلي الأيسر (LLQ)",
            bodyEn: "Right Upper Quadrant (RUQ) | Left Upper Quadrant (LUQ)\nRight Lower Quadrant (RLQ) | Left Lower Quadrant (LLQ)"
          }
        ]
      },
      {
        id: "planes",
        title: "المستويات والمقاطع التشريحية",
        icon: "✂️",
        content: [
          {
            heading: "تعريف",
            body: "المستويات التشريحية هي سطوح وهمية تقسّم الجسم إلى أقسام لأغراض التوصيف الدقيق.",
            bodyEn: "Body planes are imaginary surfaces that divide the body into sections."
          },
          {
            heading: "1 – المستوى السهمي (Sagittal)",
            body: "يقسم الجسم إلى نصفين أيمن وأيسر. إذا كان المنتصف تماماً يُسمى المتوسط (Midsagittal).",
            bodyEn: "Divides the body into right and left halves."
          },
          {
            heading: "2 – المستوى الأمامي / التاجي (Frontal / Coronal)",
            body: "يقسم الجسم إلى قسمين أمامي وخلفي.",
            bodyEn: "Divides the body into anterior and posterior sections."
          },
          {
            heading: "3 – المستوى العرضي (Transverse)",
            body: "يقسم الجسم أفقياً إلى قسمين علوي وسفلي.",
            bodyEn: "Divides the body into upper and lower sections."
          },
          {
            heading: "4 – المستوى المائل (Oblique)",
            body: "يقسم الجسم بشكل مائل إلى قسمين علوي وسفلي.",
            bodyEn: "Divides the body obliquely into upper and lower sections."
          }
        ]
      },
      {
        id: "cavities",
        title: "تجاويف الجسم",
        icon: "🫀",
        content: [
          {
            heading: "التجويفان الرئيسيان",
            body: "1. التجويف البطني الأمامي (Ventral): أكبر.\n2. التجويف الظهري الخلفي (Dorsal): أصغر.",
            bodyEn: "1. Ventral (anterior) cavity – larger.\n2. Dorsal (posterior) cavity – smaller."
          },
          {
            heading: "التجويف البطني الأمامي",
            body: "يتضمن:\n• التجويف الصدري (علوي): يحتوي القلب والرئتين، محمي بالقفص الصدري. يتضمن التجاويف الجنبية والمنصف والتأموري.\n• التجويف البطني الحوضي (سفلي): يمتد من الحجاب الحاجز إلى قاع الحوض.\n  – البطن: المعدة والأمعاء والكبد والطحال والمرارة.\n  – الحوض: المثانة والمستقيم وأجزاء من الأعضاء التناسلية.",
            bodyEn: "Thoracic cavity: heart, lungs, mediastinum.\nAbdominopelvic: abdomen (stomach, intestines, liver, spleen) + pelvis (bladder, rectum, reproductive organs)."
          },
          {
            heading: "التجويف الظهري الخلفي",
            body: "• التجويف القحفي (Cranial): يحتوي الدماغ.\n• القناة الفقرية (Vertebral Canal): تحتوي النخاع الشوكي.",
            bodyEn: "• Cranial cavity: contains the brain.\n• Vertebral canal: contains the spinal cord."
          }
        ]
      },
      {
        id: "homeostasis",
        title: "التوازن الداخلي (Homeostasis)",
        icon: "⚖️",
        content: [
          {
            heading: "التعريف",
            body: "التوازن الداخلي يعني الاستقرار والتوازن. الحفاظ على بيئة داخلية مستقرة يتطلب مراقبةً وتعديلاً مستمرَّين. هذا التعديل يُسمى التنظيم التوازني (Homeostatic Regulation).",
            bodyEn: "Homeostasis refers to stability and balance. Maintaining a stable internal environment requires constant monitoring and adjustments — called homeostatic regulation."
          },
          {
            heading: "آلية التنظيم – 3 أجزاء",
            body: "1. المستقبل (Receptor): يستقبل معلومات عن التغير.\n2. مركز التكامل (Integration Center): يستقبل المعلومات ويعالجها.\n3. المؤثِّر (Effector): يستجيب لأوامر مركز التحكم – إما بمعارضة المحفز أو تعزيزه.",
            bodyEn: "1. Receptor: receives info about environmental change.\n2. Integration Center: processes the information.\n3. Effector: responds by opposing or enhancing the stimulus."
          },
          {
            heading: "التغذية الراجعة السلبية (Negative Feedback) – الأكثر شيوعاً",
            body: "تعيد المتغير إلى نطاقه الطبيعي. مثال: عند ارتفاع حرارة الجسم يتعرق لتبريدها، وعند انخفاضها يرتجف لرفعها.",
            bodyEn: "Reverses the change back to normal range. Example: body temperature regulation via sweating/shivering."
          },
          {
            heading: "التغذية الراجعة الإيجابية (Positive Feedback) – أقل شيوعاً",
            body: "تعزز التغيير وتزيده. مثال: انقباضات الرحم أثناء الولادة تزداد كلما زاد الضغط حتى تكتمل الولادة.",
            bodyEn: "Enhances the change. Example: uterine contractions during childbirth increase until delivery."
          }
        ]
      }
    ],

    // ── CHAPTER IMAGES (صور الفصل من الكتاب) ──────────────
    images: [
      {
        id: "img_levels",
        title: "مستويات التنظيم الهيكلي",
        titleEn: "Levels of Structural Organization",
        desc: "توضح هذه الصورة التدرج من المستوى الكيميائي (ذرات وجزيئات) إلى المستوى الخلوي، ثم النسيجي، فالعضوي، فجهاز الأعضاء، وأخيراً مستوى الكائن الحي الكامل. كل مستوى أكثر تعقيداً من السابق.",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Figure_01_01_01.jpg/600px-Figure_01_01_01.jpg",
        fallback: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Anatomy_and_Physiology_OpenStax.jpg/480px-Anatomy_and_Physiology_OpenStax.jpg",
        labels: ["الكيميائي", "الخلوي", "النسيجي", "العضوي", "جهاز الأعضاء", "الكائن الحي"]
      },
      {
        id: "img_position",
        title: "الوضع التشريحي القياسي",
        titleEn: "Anatomical Position",
        desc: "الوضع المرجعي القياسي: الشخص واقف منتصباً يواجه المراقب، القدمان متضامتان، الذراعان مدليتان على الجانبين مع توجيه راحتَي اليدين للأمام. كل المصطلحات الاتجاهية تُبنى على هذا الوضع.",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Blausen_0019_AnatomicalDirectionalReferences.png/400px-Blausen_0019_AnatomicalDirectionalReferences.png",
        fallback: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Anatomical_Position.jpg/300px-Anatomical_Position.jpg",
        labels: ["الوجه للأمام (Anterior)", "راحتا اليدين للأمام", "القدمان متضامتان"]
      },
      {
        id: "img_directions",
        title: "جدول المصطلحات الاتجاهية التشريحية",
        titleEn: "Anatomical Directional Terms Table",
        desc: "جدول من الكتاب يعرض 11 مصطلحاً اتجاهياً مع تعريف كل منهم ومثاله التوضيحي. تُستخدم هذه المصطلحات في التقارير الطبية لوصف موضع جزء من الجسم بالنسبة لجزء آخر.",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Anatomical_terms_of_location_-_anterior_posterior.jpg/400px-Anatomical_terms_of_location_-_anterior_posterior.jpg",
        fallback: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Blausen_0019_AnatomicalDirectionalReferences.png/400px-Blausen_0019_AnatomicalDirectionalReferences.png",
        labels: ["Superior/علوي", "Inferior/سفلي", "Anterior/أمامي", "Posterior/خلفي", "Medial/وسطي", "Lateral/جانبي", "Proximal/قريب", "Distal/بعيد", "Superficial/سطحي", "Deep/عميق", "Intermediate/وسيط"]
      },
      {
        id: "img_regions",
        title: "مناطق جسم الإنسان",
        titleEn: "Body Regions",
        desc: "توضح الصورة مناطق الجسم المسماة من الكتاب: منطقة الرأس (الجبهة والعين والأذن والخد والذقن)، الرقبة العنقية، الصدر، المنطقة الإبطية، مناطق عضلات الذراع. تُستخدم هذه الأسماء في التوصيف الطبي.",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Human_body_features.jpg/400px-Human_body_features.jpg",
        fallback: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Gray1219.png/320px-Gray1219.png",
        labels: ["الرأس", "الرقبة العنقية", "الصدر الصدري", "الإبط الإبطي", "البطن", "الحوض"]
      },
      {
        id: "img_abdomen",
        title: "تقسيمات البطن – 9 مناطق و4 أرباع",
        titleEn: "Abdominal Regions and Quadrants",
        desc: "الصورة اليسرى تظهر التقسيم إلى 9 مناطق (المراق الأيمن – الشرسوفي – المراق الأيسر – القطن الأيمن – السري – القطن الأيسر – الحرقفي الأيمن – تحت المعدي – الحرقفي الأيسر). الصورة اليمنى تظهر 4 أرباع: RUQ وLUQ وRLQ وLLQ.",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Abdo_regions.jpg/500px-Abdo_regions.jpg",
        fallback: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Blausen_0002_AbdominalQuadrants.png/400px-Blausen_0002_AbdominalQuadrants.png",
        labels: ["9 مناطق", "4 أرباع", "RUQ", "LUQ", "RLQ", "LLQ", "السري", "الشرسوفي"]
      },
      {
        id: "img_planes",
        title: "المستويات التشريحية الأربعة",
        titleEn: "Body Planes and Sections",
        desc: "المستوى السهمي يقسم الجسم يميناً وشمالاً. المستوى التاجي الأمامي يقسمه أمام وخلف. المستوى العرضي يقسمه أعلى وأسفل. توضح الصور الثلاث في الكتاب كيف يُقطع الجسم على كل مستوى.",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/BodyPlanes.jpg/500px-BodyPlanes.jpg",
        fallback: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Human_anatomy_planes%2C_labeled.jpg/400px-Human_anatomy_planes%2C_labeled.jpg",
        labels: ["السهمي – يمين/يسار", "التاجي – أمام/خلف", "العرضي – أعلى/أسفل", "المائل"]
      },
      {
        id: "img_cavities",
        title: "تجاويف الجسم",
        titleEn: "Body Cavities",
        desc: "التجويفان الرئيسيان: الأمامي البطني (يضم الصدري والبطني الحوضي) والظهري الخلفي (يضم القحفي والفقري). الصورة تعرض منظرين: جانبي وأمامي.",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/2201_BodyCavities.jpg/500px-2201_BodyCavities.jpg",
        fallback: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Body_cavities.jpg/400px-Body_cavities.jpg",
        labels: ["تجويف قحفي (دماغ)", "قناة فقرية (نخاع)", "صدري (قلب+رئتان)", "بطني (أعضاء الهضم)", "حوضي (مثانة+رحم)", "أمامي بطني", "خلفي ظهري"]
      },
      {
        id: "img_homeostasis",
        title: "مخطط التوازن الداخلي",
        titleEn: "Homeostasis Diagram",
        desc: "يوضح المخطط آلية التغذية الراجعة: محفز → مستقبل → مركز التكامل → مؤثِّر → استجابة، ثم يعود الأثر للمستقبل (تغذية راجعة). يُبيِّن أيضاً مسارَي التغذية: السلبية (إعادة التوازن) والإيجابية (تعزيز التغيير).",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Homeostasis_Feedback_Loop.jpg/500px-Homeostasis_Feedback_Loop.jpg",
        fallback: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Negative_Feedback.jpg/400px-Negative_Feedback.jpg",
        labels: ["Receptor/مستقبل", "Integration Center/مركز التحكم", "Effector/مؤثِّر", "التغذية الراجعة", "السلبية ↔ الإيجابية"]
      }
    ],

    // ── AI EXPLANATIONS ─────────────────────────────────────
    aiContent: {
      chatgpt: `📌 **مقدمة مبسطة:**
تخيّل جسمك كمدينة منظمة: الخلايا كالمنازل، الأنسجة كالأحياء، الأعضاء كالمباني، والأجهزة كمرافق المدينة. هكذا يُنظَّم الجسم من البسيط للمعقد!

✅ **أهم 5 نقاط للحفظ:**
1. **Anatomy** = البنية | **Physiology** = الوظيفة – الفرق بسيط!
2. التسلسل: ذرة ← خلية ← نسيج ← عضو ← جهاز ← كائن حي
3. الأنسجة الأربعة: طلائي 🛡️ | ضام 🔗 | عضلي 💪 | عصبي ⚡
4. الاتجاهات كلها تعتمد على الوضع التشريحي (واقف، وجه للأمام، راحتان للأمام)
5. Homeostasis = جسمك يحافظ على نفسه تلقائياً (37°C دائماً!)

🏥 **التطبيق التمريضي:**
- "الألم في RUQ" يعني الربع العلوي الأيمن من البطن – ستفهم تقارير الأطباء أسرع
- معرفة الاتجاهات تساعدك في إعطاء الحقن في المكان الصحيح
- فهم Homeostasis يشرح لماذا نقيس العلامات الحيوية

💡 **نصيحة للمراجعة:**
اعمل قائمة بالأزواج المتضادة: Superior/Inferior، Anterior/Posterior... وضع مثالاً من جسمك لكل زوج!`,

      gemini: `🔬 **التحليل العلمي:**

**لماذا يهم هذا الفصل للطالب؟**
هذا الفصل هو "لغة الطب" – بدون مصطلحاته لن تفهم أي تقرير طبي أو تشخيص.

**مستويات التنظيم – منطق التدرج:**
| المستوى | مثال | لماذا مهم؟ |
|---|---|---|
| الخلية | خلية عضلية | أصغر وحدة حية |
| النسيج | عضلي قلبي | تخصص وظيفي |
| العضو | القلب | تعاون الأنسجة |
| الجهاز | القلبي الوعائي | تحقيق وظيفة كبرى |

**الاتجاهات التشريحية – ترابطها:**
- كل مصطلح له ضده → Superior ↔ Inferior
- الاتجاهات النسبية لا المطلقة → الكوع "قريب" من الرسغ لكن "بعيد" من الكتف
- تُطبَّق دائماً في الوضع التشريحي القياسي

**Homeostasis – أهمية سريرية:**
- ارتفاع الحرارة > 38.5°C = فشل الـ Negative Feedback
- ضغط الدم المرتفع = خلل في تنظيم Homeostasis الأوعية
- الأنسولين والغلوكاغون = مثال مثالي على الـ Negative Feedback

🔗 **الربط مع الفصول التالية:**
فهم التجاويف يساعدك في فصل التنفس (الصدري) والهضم (البطني) والبول (الحوضي)`,

      notebook: `📓 **ملاحظات الدراسة – الفصل 1**
*(مصدر: كتاب د. لؤي محمد ناصر)*

**📌 التعريفات الجوهرية:**
- Anatomy = بنية الجسم (Structure)
- Physiology = وظيفة الجسم (Function)
- Histology = دراسة الأنسجة بالمجهر

**📌 تسلسل مستويات التنظيم:**
Atoms → Molecules → Cells → Tissues → Organs → Systems → Organism

**📌 الأنسجة الأربعة (اختصار CEMN):**
- C = Connective (ضامة) – ربط ودعم
- E = Epithelial (طلائية) – تغطية وبطانة
- M = Muscle (عضلية) – حركة
- N = Nerve (عصبية) – نقل الإشارات

**📌 الاتجاهات الـ11 (أزواج + Intermediate):**
1. Superior ↔ Inferior
2. Anterior ↔ Posterior
3. Medial ↔ Lateral
4. Proximal ↔ Distal
5. Superficial ↔ Deep
+  Intermediate (مستقل)

**📌 المستويات الأربعة:**
| المستوى | التقسيم |
|---|---|
| Sagittal | يمين / يسار |
| Frontal (Coronal) | أمام / خلف |
| Transverse | أعلى / أسفل |
| Oblique | مائل |

**📌 تجاويف الجسم:**
- Dorsal = Cranial (دماغ) + Vertebral (نخاع)
- Ventral = Thoracic (قلب+رئتان) + Abdomino-pelvic

**📌 Homeostasis – المكونات:**
Receptor → Integration Center → Effector → Response → Feedback
- Negative (الأشيع): يُعيد للطبيعي
- Positive (النادر): يُعزز التغيير

**📌 نقاط للامتحان:**
- السرة سفلية للذقن (Inferior)
- الكوع قريب من الرسغ (Proximal)
- الجلد سطحي للعضلات (Superficial)`
    },

    // ── QUIZ ────────────────────────────────────────────────
    quiz: [
      { q: "ما تعريف علم التشريح (Anatomy)؟", opts: ["دراسة وظائف أعضاء الجسم", "دراسة بنية أعضاء الجسم والعلاقات بينها", "دراسة الأمراض وعلاجها", "دراسة الأنسجة بالمجهر"], ans: 1 },
      { q: "ما الفرع الذي يستخدم المجهر لدراسة الأنسجة؟", opts: ["Gross Anatomy", "Physiology", "Histology", "Pathology"], ans: 2 },
      { q: "ما الترتيب الصحيح من الأصغر للأكبر؟", opts: ["نسيج ← خلية ← عضو ← جهاز", "خلية ← نسيج ← عضو ← جهاز", "جهاز ← عضو ← خلية ← نسيج", "عضو ← خلية ← نسيج ← جهاز"], ans: 1 },
      { q: "أي نسيج يُوجد في الجلد والعظام والأوتار؟", opts: ["الطلائي", "الضام", "العضلي", "العصبي"], ans: 1 },
      { q: "في الوضع التشريحي، إلى أين تتجه راحتا اليدين؟", opts: ["للخلف", "للأسفل", "للأمام", "للداخل"], ans: 2 },
      { q: "ما معنى Inferior؟", opts: ["علوي – باتجاه الرأس", "سفلي – بعيداً عن الرأس", "أمامي", "خلفي"], ans: 1 },
      { q: "ما معنى Proximal؟", opts: ["بعيد عن الجذع", "أقرب لنقطة الأصل أو اتصال الطرف بالجذع", "باتجاه السطح", "باتجاه الخلف"], ans: 1 },
      { q: "أي مستوى يقسم الجسم إلى نصفين أيمن وأيسر؟", opts: ["Frontal Plane", "Transverse Plane", "Sagittal Plane", "Oblique Plane"], ans: 2 },
      { q: "ما التجويف الذي يحتوي على القلب والرئتين؟", opts: ["البطني", "القحفي", "الصدري", "الحوضي"], ans: 2 },
      { q: "ما المنطقة التشريحية الوسطى في الصدر بين الرئتين؟", opts: ["الجنبة", "المنصف (Mediastinum)", "التامور", "الحجاب الحاجز"], ans: 1 },
      { q: "ما النوع الأكثر شيوعاً من التغذية الراجعة؟", opts: ["الإيجابية", "السلبية", "كلاهما بالتساوي", "لا يوجد تغذية راجعة"], ans: 1 },
      { q: "الجلد سطحي (Superficial) بالنسبة للعضلات الهيكلية – هذا يعني؟", opts: ["الجلد أعمق", "الجلد أقرب لسطح الجسم", "الجلد أبعد عن الرأس", "الجلد في المنتصف"], ans: 1 }
    ]
  },

  // ══════════════════════════════════════════════════════════
  //  CHAPTERS 2 – 14  (standard content)
  // ══════════════════════════════════════════════════════════
  {
    id: 2, icon: "🔬", title: "الخلايا والأنسجة", titleEn: "Cells and Tissues",
    pages: "11–20", color: "#4fd1c5",
    desc: "الخلية كوحدة أساسية، أنواع الأنسجة الأربعة",
    overview: "يتناول هذا الفصل بنية الخلية ووظائفها، الغشاء الخلوي، النواة، العضيات، وأنواع الأنسجة: الطلائية والضامة والعضلية والعصبية.",
    terms: [
      { en: "Cell Membrane", ar: "الغشاء الخلوي", pron: "سيل ميمبرين", desc: "الغلاف الخارجي للخلية يتحكم بما يدخل ويخرج منها" },
      { en: "Nucleus", ar: "النواة", pron: "نيوكلياس", desc: "مركز تحكم الخلية تحتوي على الحمض النووي DNA" },
      { en: "Mitochondria", ar: "الميتوكوندريا", pron: "ميتوكوندريا", desc: "مصنع الطاقة في الخلية - تنتج ATP" },
      { en: "Epithelial Tissue", ar: "النسيج الطلائي", pron: "إيبيثيليال", desc: "يبطن الأسطح الداخلية والخارجية للجسم" },
      { en: "Connective Tissue", ar: "النسيج الضام", pron: "كونكتيف", desc: "يربط ويدعم ويحمي أنسجة وأعضاء الجسم" },
      { en: "Muscle Tissue", ar: "النسيج العضلي", pron: "ماسل", desc: "مسؤول عن الحركة والقوة" },
      { en: "Nervous Tissue", ar: "النسيج العصبي", pron: "نيرفاس", desc: "ينقل الإشارات الكهربائية في الجسم" },
      { en: "Cytoplasm", ar: "السيتوبلازم", pron: "سايتوبلازم", desc: "السائل الهلامي داخل الخلية يحتضن العضيات" }
    ],
    quiz: [
      { q: "ما هي وظيفة الميتوكوندريا؟", opts: ["تخزين الماء", "إنتاج الطاقة ATP", "نقل البروتينات", "التكاثر"], ans: 1 },
      { q: "كم نوعاً من الأنسجة يوجد في جسم الإنسان؟", opts: ["2", "3", "4", "5"], ans: 2 },
      { q: "ما هو دور النسيج الطلائي؟", opts: ["إنتاج الطاقة", "تبطين الأسطح الداخلية والخارجية", "نقل الإشارات العصبية", "تحريك الجسم"], ans: 1 }
    ]
  },
  {
    id: 3, icon: "🦷", title: "الجهاز الهيكلي", titleEn: "Skeletal System",
    pages: "21–30", color: "#b794f4",
    desc: "عظام الجسم، المفاصل، وظائف الهيكل العظمي",
    overview: "يشمل هذا الفصل تشريح الهيكل العظمي 206 عظمة، تصنيف العظام حسب شكلها، تشريح العظمة، المفاصل وأنواعها، وعملية تكوين العظام.",
    terms: [
      { en: "Periosteum", ar: "السمحاق", pron: "بيريوستيوم", desc: "الغشاء الضام المحيط بالعظمة من الخارج" },
      { en: "Compact Bone", ar: "العظم المتراص", pron: "كومباكت بون", desc: "الطبقة الخارجية الصلبة للعظمة" },
      { en: "Spongy Bone", ar: "العظم الإسفنجي", pron: "سبونجي بون", desc: "الطبقة الداخلية المسامية تحتوي نخاع العظم" },
      { en: "Diaphysis", ar: "جسم العظمة", pron: "دايافيسيس", desc: "الجزء الطويل الأوسط من العظمة الطويلة" },
      { en: "Epiphysis", ar: "رأس العظمة", pron: "إيبيفيسيس", desc: "النهايتان المتوسعتان للعظمة الطويلة" },
      { en: "Joint / Articulation", ar: "المفصل", pron: "جوينت", desc: "نقطة تلاقي عظمتين أو أكثر" },
      { en: "Cartilage", ar: "الغضروف", pron: "كارتيلج", desc: "نسيج ضام مرن يغطي أسطح المفاصل" },
      { en: "Bone Marrow", ar: "نخاع العظم", pron: "بون ماروو", desc: "النسيج الإسفنجي داخل العظم يصنع خلايا الدم" }
    ],
    quiz: [
      { q: "كم عدد عظام جسم الإنسان البالغ؟", opts: ["196", "206", "216", "220"], ans: 1 },
      { q: "ما هو السمحاق؟", opts: ["نخاع العظم", "الغشاء المحيط بالعظمة", "مفصل الركبة", "العظم الإسفنجي"], ans: 1 },
      { q: "أين يصنع الجسم خلايا الدم الحمراء؟", opts: ["الكبد", "الطحال", "نخاع العظم", "الكلى"], ans: 2 }
    ]
  },
  {
    id: 4, icon: "💪", title: "الجهاز العضلي", titleEn: "Muscular System",
    pages: "31–40", color: "#fc8181",
    desc: "أنواع العضلات، آلية الانقباض، العضلات الرئيسية",
    overview: "يغطي هذا الفصل أنواع العضلات الثلاثة (هيكلية، ملساء، قلبية)، آلية الانقباض العضلي، وأهم عضلات الجسم ووظائفها.",
    terms: [
      { en: "Skeletal Muscle", ar: "العضلة الهيكلية", pron: "سكيليتال ماسل", desc: "عضلة إرادية مخططة تربط بالعظام وتحرك الجسم" },
      { en: "Smooth Muscle", ar: "العضلة الملساء", pron: "سموث ماسل", desc: "عضلة لاإرادية توجد في جدران الأعضاء الداخلية" },
      { en: "Cardiac Muscle", ar: "العضلة القلبية", pron: "كارديك ماسل", desc: "عضلة مخططة لاإرادية خاصة بالقلب" },
      { en: "Tendon", ar: "الوتر", pron: "تيندون", desc: "نسيج ضام يربط العضلة بالعظمة" },
      { en: "Origin", ar: "منشأ العضلة", pron: "أوريجن", desc: "نقطة الاتصال الثابتة للعضلة" },
      { en: "Insertion", ar: "مدغم العضلة", pron: "إنسيرشن", desc: "نقطة الاتصال المتحركة للعضلة" },
      { en: "Flexion", ar: "الثني", pron: "فليكشن", desc: "تقليل الزاوية بين جزأين من الجسم" },
      { en: "Extension", ar: "المد", pron: "إكستينشن", desc: "تكبير الزاوية بين جزأين من الجسم" }
    ],
    quiz: [
      { q: "أي نوع من العضلات يتحكم فيه الإرادة؟", opts: ["الملساء", "القلبية", "الهيكلية", "اللاإرادية"], ans: 2 },
      { q: "ما هو دور الوتر؟", opts: ["ربط العظام ببعض", "ربط العضلة بالعظمة", "تغطية المفصل", "نقل الأعصاب"], ans: 1 },
      { q: "Flexion تعني:", opts: ["المد", "الثني", "الدوران", "الإبعاد"], ans: 1 }
    ]
  },
  {
    id: 5, icon: "🧠", title: "الجهاز العصبي", titleEn: "Nervous System",
    pages: "41–50", color: "#fbd38d",
    desc: "الدماغ، الحبل الشوكي، الأعصاب، ومراكز التحكم",
    overview: "يشرح هذا الفصل تقسيمات الجهاز العصبي، الخلية العصبية وبنيتها، الدماغ وأجزاؤه، الحبل الشوكي، والجهاز العصبي المحيطي والذاتي.",
    terms: [
      { en: "Neuron", ar: "الخلية العصبية", pron: "نيورون", desc: "الوحدة الأساسية في الجهاز العصبي تنقل الإشارات الكهربائية" },
      { en: "Axon", ar: "المحور العصبي", pron: "أكسون", desc: "امتداد طويل من الخلية العصبية ينقل الإشارات بعيداً عنها" },
      { en: "Dendrites", ar: "التشعبات (الزوائد الشجيرية)", pron: "دندرايتس", desc: "امتدادات قصيرة تستقبل الإشارات من خلايا أخرى" },
      { en: "Synapse", ar: "المشبك العصبي", pron: "سينابس", desc: "نقطة الاتصال بين خليتين عصبيتين" },
      { en: "Central Nervous System", ar: "الجهاز العصبي المركزي", pron: "CNS", desc: "الدماغ والحبل الشوكي" },
      { en: "Peripheral Nervous System", ar: "الجهاز العصبي المحيطي", pron: "PNS", desc: "كافة الأعصاب خارج الدماغ والحبل الشوكي" },
      { en: "Cerebrum", ar: "المخ الكبير", pron: "سيريبروم", desc: "الجزء الأكبر من الدماغ مسؤول عن التفكير والحواس والحركة الإرادية" },
      { en: "Cerebellum", ar: "المخيخ", pron: "سيريبيلوم", desc: "يتحكم في التوازن وتنسيق الحركة" }
    ],
    quiz: [
      { q: "ما هو الجزء الأكبر في الدماغ؟", opts: ["المخيخ", "جذع الدماغ", "المخ الكبير", "الوطاء"], ans: 2 },
      { q: "ما هي وظيفة المخيخ؟", opts: ["التفكير", "التوازن وتنسيق الحركة", "التنفس", "ضربات القلب"], ans: 1 },
      { q: "ما الفرق بين Axon وDendrites؟", opts: ["لا فرق", "Axon ينقل الإشارة بعيداً، Dendrites تستقبلها", "Dendrites أطول", "Axon يستقبل فقط"], ans: 1 }
    ]
  },
  {
    id: 6, icon: "❤️", title: "الجهاز الدوري", titleEn: "Cardiovascular System",
    pages: "51–60", color: "#fc8181",
    desc: "القلب، الأوعية الدموية، وتدفق الدم",
    overview: "يتناول هذا الفصل تشريح القلب وغرفه وصماماته، أنواع الأوعية الدموية، الدورتان الدموية الكبرى والصغرى، وضغط الدم.",
    terms: [
      { en: "Atrium", ar: "الأذين", pron: "أيتريوم", desc: "الغرفة العلوية في القلب تستقبل الدم الوارد" },
      { en: "Ventricle", ar: "البطين", pron: "فينتريكل", desc: "الغرفة السفلية في القلب تضخ الدم للخارج" },
      { en: "Aorta", ar: "الشريان الأبهر", pron: "إيأورتا", desc: "أكبر شريان في الجسم يخرج من البطين الأيسر" },
      { en: "Artery", ar: "الشريان", pron: "آرتري", desc: "وعاء دموي يحمل الدم من القلب للأنسجة" },
      { en: "Vein", ar: "الوريد", pron: "فين", desc: "وعاء دموي يحمل الدم من الأنسجة إلى القلب" },
      { en: "Capillary", ar: "الشعيرة الدموية", pron: "كابيلاري", desc: "أصغر الأوعية الدموية مكان تبادل الغازات والمواد" },
      { en: "Systemic Circulation", ar: "الدورة الجهازية الكبرى", pron: "سيستيميك", desc: "تحمل الدم من القلب لكامل الجسم وترجعه" },
      { en: "Pulmonary Circulation", ar: "الدورة الرئوية الصغرى", pron: "بولموناري", desc: "تحمل الدم بين القلب والرئتين لتبادل الغازات" }
    ],
    quiz: [
      { q: "كم عدد غرف القلب؟", opts: ["2", "3", "4", "5"], ans: 2 },
      { q: "ما هو الفرق بين الشريان والوريد؟", opts: ["لا فرق", "الشريان يحمل الدم من القلب، الوريد يحمله إلى القلب", "الوريد أكبر", "الشريان يحمل دم فاسد"], ans: 1 },
      { q: "ما هو الأبهر؟", opts: ["أصغر وريد", "أكبر شريان في الجسم", "صمام قلبي", "شعيرة دموية"], ans: 1 }
    ]
  },
  {
    id: 7, icon: "🫁", title: "الجهاز التنفسي", titleEn: "Respiratory System",
    pages: "61–70", color: "#4fd1c5",
    desc: "الرئتان، مسالك الهواء، وآلية التنفس",
    overview: "يشرح هذا الفصل مكونات الجهاز التنفسي من الأنف حتى الحويصلات الهوائية، آلية الشهيق والزفير، وتبادل الغازات.",
    terms: [
      { en: "Trachea", ar: "القصبة الهوائية", pron: "تراكيا", desc: "الأنبوب الذي يوصل الهواء من الحنجرة إلى الرئتين" },
      { en: "Bronchi", ar: "القصبتان الهوائيتان", pron: "برونكاي", desc: "فروع القصبة الهوائية تدخل إلى كل رئة" },
      { en: "Alveoli", ar: "الحويصلات الهوائية", pron: "ألفيولاي", desc: "أكياس هوائية صغيرة مكان تبادل الأكسجين وثاني أكسيد الكربون" },
      { en: "Diaphragm", ar: "الحجاب الحاجز", pron: "دايافراغم", desc: "عضلة أسفل الصدر الرئيسية في عملية التنفس" },
      { en: "Larynx", ar: "الحنجرة", pron: "لارينكس", desc: "صندوق الصوت يحتوي الحبال الصوتية" },
      { en: "Pharynx", ar: "البلعوم", pron: "فارينكس", desc: "مجرى مشترك للهواء والطعام خلف التجويف الأنفي والفمي" },
      { en: "Inhalation", ar: "الشهيق", pron: "إنهيليشن", desc: "إدخال الهواء إلى الرئتين" },
      { en: "Exhalation", ar: "الزفير", pron: "إكسهيليشن", desc: "إخراج الهواء من الرئتين" }
    ],
    quiz: [
      { q: "أين يحدث تبادل الغازات في الرئة؟", opts: ["القصبة الهوائية", "الحنجرة", "الحويصلات الهوائية", "البلعوم"], ans: 2 },
      { q: "ما هي الوظيفة الرئيسية للحجاب الحاجز؟", opts: ["تصفية الهواء", "المساعدة في التنفس", "نقل الأكسجين", "إنتاج الصوت"], ans: 1 },
      { q: "ما هو صندوق الصوت؟", opts: ["البلعوم", "القصبة الهوائية", "الحنجرة", "الحويصلة الهوائية"], ans: 2 }
    ]
  },
  {
    id: 8, icon: "🫃", title: "الجهاز الهضمي", titleEn: "Digestive System",
    pages: "71–80", color: "#68d391",
    desc: "معالجة الغذاء من الفم إلى الأمعاء",
    overview: "يغطي هذا الفصل مراحل الهضم، أعضاء الجهاز الهضمي من الفم للمستقيم، وظائف كل عضو، والغدد الهضمية.",
    terms: [
      { en: "Esophagus", ar: "المريء", pron: "إيسوفاغوس", desc: "أنبوب عضلي ينقل الطعام من الفم إلى المعدة" },
      { en: "Stomach", ar: "المعدة", pron: "ستوماك", desc: "كيس عضلي يطحن الطعام ويبدأ هضم البروتينات" },
      { en: "Small Intestine", ar: "الأمعاء الدقيقة", pron: "سمول إنتستاين", desc: "الجزء الأطول من الجهاز الهضمي مكان امتصاص المواد الغذائية" },
      { en: "Large Intestine", ar: "الأمعاء الغليظة", pron: "لارج إنتستاين", desc: "تمتص الماء وتشكل البراز" },
      { en: "Liver", ar: "الكبد", pron: "ليفر", desc: "أكبر غدة في الجسم تصنع الصفراء وتنقي الدم" },
      { en: "Pancreas", ar: "البنكرياس", pron: "بانكرياس", desc: "غدة تفرز إنزيمات هضمية وهرمون الأنسولين" },
      { en: "Peristalsis", ar: "التمعج", pron: "بيريستالسيس", desc: "حركات تموجية لجدران القناة الهضمية تدفع الطعام" },
      { en: "Bile", ar: "الصفراء", pron: "بايل", desc: "سائل تنتجه الكبد يساعد على هضم الدهون" }
    ],
    quiz: [
      { q: "ما هو المكان الرئيسي لامتصاص المواد الغذائية؟", opts: ["المعدة", "الأمعاء الدقيقة", "الكبد", "الأمعاء الغليظة"], ans: 1 },
      { q: "ما هي وظيفة الصفراء؟", opts: ["هضم البروتين", "هضم الدهون", "امتصاص الماء", "إنتاج الأنسولين"], ans: 1 },
      { q: "ما الفرق بين الأمعاء الدقيقة والغليظة؟", opts: ["الدقيقة أقصر", "الدقيقة تمتص الغذاء، الغليظة تمتص الماء", "لا فرق", "الغليظة تهضم البروتين"], ans: 1 }
    ]
  },
  {
    id: 9, icon: "💧", title: "الجهاز البولي", titleEn: "Urinary System",
    pages: "81–90", color: "#63b3ed",
    desc: "الكلى، تنقية الدم، وإنتاج البول",
    overview: "يتناول هذا الفصل تشريح الجهاز البولي (الكلى، الحالب، المثانة، الإحليل)، عملية تكوين البول، وتنظيم الكبيبة الكلوية.",
    terms: [
      { en: "Kidney", ar: "الكلية", pron: "كيدني", desc: "عضو يصفي الدم ويصنع البول، جسم الإنسان له كليتان" },
      { en: "Nephron", ar: "النيفرون (الكبيبة الكلوية)", pron: "نيفرون", desc: "الوحدة الوظيفية الأساسية في الكلية" },
      { en: "Ureter", ar: "الحالب", pron: "يوريتر", desc: "أنبوب ينقل البول من الكلية إلى المثانة" },
      { en: "Urinary Bladder", ar: "المثانة البولية", pron: "يورينري بلادر", desc: "كيس عضلي يخزن البول قبل إخراجه" },
      { en: "Urethra", ar: "الإحليل", pron: "يوريثرا", desc: "الأنبوب الذي يخرج البول من المثانة إلى الخارج" },
      { en: "Glomerulus", ar: "الكبيبة", pron: "غلوميرولوس", desc: "شبكة من الشعيرات الدموية في النيفرون تصفي الدم" },
      { en: "Renal Cortex", ar: "قشرة الكلية", pron: "رينال كورتيكس", desc: "الطبقة الخارجية للكلية تحتوي معظم النيفرونات" },
      { en: "Renal Medulla", ar: "نخاع الكلية", pron: "رينال ميدولا", desc: "الطبقة الداخلية للكلية تحتوي أهرامات كلوية" }
    ],
    quiz: [
      { q: "ما هي الوحدة الوظيفية الأساسية للكلية؟", opts: ["الكبيبة", "النيفرون", "الحالب", "قشرة الكلية"], ans: 1 },
      { q: "ما الترتيب الصحيح لمسار البول؟", opts: ["مثانة←كلية←حالب←إحليل", "كلية←حالب←مثانة←إحليل", "كلية←إحليل←مثانة←حالب", "حالب←كلية←مثانة←إحليل"], ans: 1 },
      { q: "ما هي وظيفة المثانة البولية؟", opts: ["تصفية الدم", "تخزين البول", "تصنيع الهرمونات", "التحكم في الضغط"], ans: 1 }
    ]
  },
  {
    id: 10, icon: "🔴", title: "الدم والجهاز الليمفاوي", titleEn: "Blood & Lymphatic System",
    pages: "91–100", color: "#fc8181",
    desc: "مكونات الدم، المناعة، والجهاز الليمفاوي",
    overview: "يشرح هذا الفصل مكونات الدم (كريات حمراء، بيضاء، صفائح، بلازما)، فصائل الدم، الجهاز الليمفاوي ودوره في المناعة.",
    terms: [
      { en: "Red Blood Cells (Erythrocytes)", ar: "كريات الدم الحمراء", pron: "إريثروسايتس", desc: "تحمل الأكسجين من الرئتين لأنسجة الجسم" },
      { en: "White Blood Cells (Leukocytes)", ar: "كريات الدم البيضاء", pron: "ليوكوسايتس", desc: "خلايا المناعة تحارب العدوى والأمراض" },
      { en: "Platelets (Thrombocytes)", ar: "الصفائح الدموية", pron: "ثرومبوسايتس", desc: "تساعد في تجلط الدم ووقف النزيف" },
      { en: "Plasma", ar: "بلازما الدم", pron: "بلازما", desc: "الجزء السائل من الدم يحمل خلايا الدم والمواد الغذائية" },
      { en: "Hemoglobin", ar: "الهيموغلوبين", pron: "هيموغلوبين", desc: "البروتين في كريات الدم الحمراء يحمل الأكسجين" },
      { en: "Lymph Node", ar: "العقدة الليمفاوية", pron: "ليمف نود", desc: "تصفي اللمف وتحتوي خلايا مناعية" },
      { en: "Spleen", ar: "الطحال", pron: "سبلين", desc: "أكبر عضو ليمفاوي يصفي الدم ويخزن صفائح دموية" },
      { en: "Antibody", ar: "الجسم المضاد", pron: "أنتيبودي", desc: "بروتين ينتجه جهاز المناعة لمكافحة مسببات الأمراض" }
    ],
    quiz: [
      { q: "ما هي وظيفة الهيموغلوبين؟", opts: ["تجلط الدم", "حمل الأكسجين", "مكافحة العدوى", "إنتاج الطاقة"], ans: 1 },
      { q: "أي خلايا دم مسؤولة عن المناعة؟", opts: ["الحمراء", "الصفائح", "البيضاء", "البلازما"], ans: 2 },
      { q: "ما هي وظيفة الصفائح الدموية؟", opts: ["حمل الأكسجين", "مكافحة البكتيريا", "تجلط الدم", "تصنيع الهرمونات"], ans: 2 }
    ]
  },
  {
    id: 11, icon: "⚡", title: "الجهاز الغدي الصماوي", titleEn: "Endocrine System",
    pages: "101–110", color: "#b794f4",
    desc: "الغدد والهرمونات وتنظيم وظائف الجسم",
    overview: "يتناول هذا الفصل الغدد الصماء الرئيسية (النخامية، الدرقية، فوق الكلوية، البنكرياس، التناسلية) وهرموناتها ووظائفها.",
    terms: [
      { en: "Hormone", ar: "الهرمون", pron: "هورمون", desc: "مادة كيميائية تنتجها الغدد الصماء تنظم وظائف الجسم" },
      { en: "Pituitary Gland", ar: "الغدة النخامية", pron: "بيتيوتاري", desc: "الغدة الرئيسية في الجسم تتحكم في غدد أخرى" },
      { en: "Thyroid Gland", ar: "الغدة الدرقية", pron: "ثايرويد", desc: "تنظم عملية التمثيل الغذائي وتنمو في الرقبة" },
      { en: "Adrenal Gland", ar: "الغدة فوق الكلوية", pron: "أدرينال", desc: "تفرز الأدرينالين وهرمونات الإجهاد" },
      { en: "Insulin", ar: "الأنسولين", pron: "إنسيولين", desc: "هرمون يخفض مستوى السكر في الدم، تفرزه خلايا بيتا في البنكرياس" },
      { en: "Glucagon", ar: "الغلوكاجون", pron: "غلوكاغون", desc: "هرمون يرفع مستوى السكر في الدم عند انخفاضه" },
      { en: "Adrenaline (Epinephrine)", ar: "الأدرينالين", pron: "إيبينيفرين", desc: "هرمون استجابة الطوارئ يرفع ضغط الدم ومعدل القلب" },
      { en: "Negative Feedback", ar: "التغذية الراجعة السلبية", pron: "نيغاتيف فيدباك", desc: "آلية تنظيمية تعيد مستوى الهرمون لطبيعته" }
    ],
    quiz: [
      { q: "أي غدة تُعد الغدة الرئيسية في الجسم؟", opts: ["الدرقية", "النخامية", "فوق الكلوية", "البنكرياس"], ans: 1 },
      { q: "ما وظيفة الأنسولين؟", opts: ["رفع السكر", "خفض السكر في الدم", "تنظيم النوم", "تسريع التنفس"], ans: 1 },
      { q: "أين تقع الغدة الدرقية؟", opts: ["الدماغ", "الرقبة", "البطن", "الصدر"], ans: 1 }
    ]
  },
  {
    id: 12, icon: "👁️", title: "الحواس الخاصة", titleEn: "Special Senses",
    pages: "111–120", color: "#fbd38d",
    desc: "الرؤية، السمع، الشم، التذوق، واللمس",
    overview: "يشرح هذا الفصل تشريح ووظيفة حواس الإنسان الخمس: العين والرؤية، الأذن والسمع والتوازن، الأنف والشم، اللسان والتذوق، والجلد واللمس.",
    terms: [
      { en: "Cornea", ar: "القرنية", pron: "كورنيا", desc: "القبة الشفافة في مقدمة العين تكسر الضوء" },
      { en: "Retina", ar: "الشبكية", pron: "ريتينا", desc: "الطبقة الداخلية للعين تحتوي الخلايا الحساسة للضوء" },
      { en: "Cochlea", ar: "القوقعة", pron: "كوكليا", desc: "عضو السمع في الأذن الداخلية يحول الصوت لإشارات عصبية" },
      { en: "Olfactory Receptors", ar: "مستقبلات الشم", pron: "أولفاكتوري", desc: "خلايا عصبية في الأنف تكشف الروائح" },
      { en: "Taste Buds", ar: "البراعم الذوقية", pron: "تيست بادز", desc: "مستقبلات الذوق على اللسان تميز المذاقات الأساسية" },
      { en: "Lens", ar: "العدسة", pron: "لينز", desc: "بنية شفافة خلف القزحية تركز الضوء على الشبكية" },
      { en: "Eardrum (Tympanic Membrane)", ar: "طبلة الأذن", pron: "تيمبانيك", desc: "غشاء يهتز استجابةً للصوت ينقل الاهتزازات للعظيمات" },
      { en: "Pupil", ar: "حدقة العين", pron: "بيوبل", desc: "الفتحة في مركز القزحية تتحكم بكمية الضوء الداخل" }
    ],
    quiz: [
      { q: "أين تتركز الصور في العين؟", opts: ["القرنية", "الشبكية", "القزحية", "العدسة"], ans: 1 },
      { q: "ما هي وظيفة القوقعة؟", opts: ["تنظيم التوازن", "تحويل الصوت لإشارات عصبية", "تصفية الهواء", "اكتشاف الروائح"], ans: 1 },
      { q: "ماذا يعني تقلص حدقة العين؟", opts: ["تحسين الرؤية في الظلام", "الحد من الضوء الزائد", "تعظيم الضوء الداخل", "الحماية من الغبار"], ans: 1 }
    ]
  },
  {
    id: 13, icon: "🧬", title: "الجهاز التناسلي", titleEn: "Reproductive System",
    pages: "121–130", color: "#f687b3",
    desc: "التشريح التناسلي الذكري والأنثوي والتكاثر",
    overview: "يغطي هذا الفصل تشريح الجهاز التناسلي الذكري والأنثوي، مراحل دورة الحيض، الإخصاب والحمل، وتطور الجنين.",
    terms: [
      { en: "Testes", ar: "الخصيتان", pron: "تيستيز", desc: "الغدد التناسلية الذكرية تنتج الحيوانات المنوية والتستوستيرون" },
      { en: "Ovaries", ar: "المبيضان", pron: "أوفاريز", desc: "الغدد التناسلية الأنثوية تنتج البويضات والهرمونات" },
      { en: "Uterus", ar: "الرحم", pron: "يوتيروس", desc: "العضو المجوف حيث ينمو الجنين خلال الحمل" },
      { en: "Fallopian Tubes", ar: "قناتا فالوب", pron: "فالوبيان تيوبز", desc: "تنقلان البويضة من المبيض إلى الرحم" },
      { en: "Sperm", ar: "الحيوانات المنوية", pron: "سبيرم", desc: "الخلايا الجنسية الذكرية التي تخصب البويضة" },
      { en: "Ovum (Egg)", ar: "البويضة", pron: "أوفوم", desc: "الخلية الجنسية الأنثوية" },
      { en: "Fertilization", ar: "الإخصاب", pron: "فيرتيلايزيشن", desc: "اتحاد الحيوان المنوي مع البويضة لتكوين البيضة الملقحة" },
      { en: "Menstrual Cycle", ar: "الدورة الشهرية", pron: "مينستروال سايكل", desc: "دورة شهرية في جسم المرأة تستعد فيها الرحم للحمل" }
    ],
    quiz: [
      { q: "أين يُنتج التستوستيرون؟", opts: ["المبيضان", "الخصيتان", "الغدة النخامية", "الغدة فوق الكلوية"], ans: 1 },
      { q: "ما هي وظيفة قناتَي فالوب؟", opts: ["تخزين البويضات", "نقل البويضة من المبيض إلى الرحم", "إنتاج الهرمونات", "حماية الجنين"], ans: 1 },
      { q: "أين يحدث الإخصاب عادةً؟", opts: ["الرحم", "قناة فالوب", "المبيض", "عنق الرحم"], ans: 1 }
    ]
  },
  {
    id: 14, icon: "🧪", title: "الجلد والجهاز التكاملي", titleEn: "Integumentary System",
    pages: "131–140", color: "#68d391",
    desc: "طبقات الجلد، الشعر، الأظافر والغدد الجلدية",
    overview: "يختتم الكتاب بشرح طبقات الجلد (البشرة، الأدمة، تحت الأدمة)، وظائف الجلد الحمائية والتنظيمية، وملحقاته من شعر وأظافر وغدد.",
    terms: [
      { en: "Epidermis", ar: "البشرة", pron: "إيبيدرميس", desc: "الطبقة الخارجية من الجلد توفر الحماية الأولى" },
      { en: "Dermis", ar: "الأدمة", pron: "دِرميس", desc: "الطبقة الوسطى تحتوي الشعر والغدد والأعصاب" },
      { en: "Hypodermis", ar: "تحت الأدمة", pron: "هايبودرميس", desc: "الطبقة الأعمق من الدهون توفر العزل والحماية" },
      { en: "Keratin", ar: "الكيراتين", pron: "كيراتين", desc: "بروتين يصنع البشرة والشعر والأظافر صلبة ومقاومة" },
      { en: "Melanin", ar: "الميلانين", pron: "ميلانين", desc: "الصبغة المسؤولة عن لون الجلد والشعر والعينين" },
      { en: "Sweat Glands", ar: "الغدد العرقية", pron: "سويت غلاندز", desc: "تفرز العرق لتبريد الجسم وإزالة الفضلات" },
      { en: "Sebaceous Glands", ar: "الغدد الدهنية (الزهمية)", pron: "سيباشس غلاندز", desc: "تفرز الزهم لترطيب الجلد والشعر" },
      { en: "Thermoregulation", ar: "تنظيم حرارة الجسم", pron: "ثيرموريغيوليشن", desc: "آلية الجسم للحفاظ على درجة حرارة ثابتة" }
    ],
    quiz: [
      { q: "ما هي الطبقة الخارجية من الجلد؟", opts: ["الأدمة", "البشرة", "تحت الأدمة", "الطبقة الدهنية"], ans: 1 },
      { q: "ما هو دور الميلانين؟", opts: ["تبريد الجسم", "تحديد لون الجلد", "حماية من البكتيريا", "امتصاص الماء"], ans: 1 },
      { q: "أي الغدد تفرز الزهم؟", opts: ["العرقية", "الزهمية (الدهنية)", "الدرقية", "الصماء"], ans: 1 }
    ]
  }
];

// Body organs data
const ORGANS = [
  { id: 1, emoji: "🧠", nameAr: "الدماغ", nameEn: "Brain", category: "nervous",
    facts: ["يزن الدماغ حوالي 1.4 كيلوغرام", "يحتوي على 86 مليار خلية عصبية", "يستهلك 20% من طاقة الجسم رغم أنه 2% من وزنه", "درجة حرارته أعلى من باقي الجسم"] },
  { id: 2, emoji: "❤️", nameAr: "القلب", nameEn: "Heart", category: "cardiovascular",
    facts: ["ينبض القلب حوالي 100,000 مرة يومياً", "يضخ 5 لترات من الدم في الدقيقة", "يبدأ النبض قبل الولادة بأسبوعين", "العضلة القلبية لا تتوقف عن العمل"] },
  { id: 3, emoji: "🫁", nameAr: "الرئتان", nameEn: "Lungs", category: "respiratory",
    facts: ["مساحة سطح الرئتين تعادل ملعب تنس", "نتنفس حوالي 20,000 مرة يومياً", "الرئة اليمنى أكبر قليلاً من اليسرى", "يمكن إزالة رئة واحدة والحياة بشكل طبيعي"] },
  { id: 4, emoji: "🟤", nameAr: "الكبد", nameEn: "Liver", category: "digestive",
    facts: ["الكبد يؤدي أكثر من 500 وظيفة", "الوحيد الذي يتجدد ذاتياً", "يصنع الصفراء لهضم الدهون", "ينقي الدم من السموم والأدوية"] },
  { id: 5, emoji: "🔴", nameAr: "الكلية", nameEn: "Kidney", category: "urinary",
    facts: ["تصفي الكليتان 200 لتر من الدم يومياً", "تنتجان 1-2 لتر بول يومياً", "تحتوي الكلية على مليون نيفرون", "تنظمان ضغط الدم ومستوى الأملاح"] },
  { id: 6, emoji: "🟢", nameAr: "الطحال", nameEn: "Spleen", category: "lymphatic",
    facts: ["أكبر عضو ليمفاوي في الجسم", "يصفي الدم ويزيل كريات الدم الحمراء القديمة", "يخزن صفائح دموية في الطوارئ", "يمكن العيش بدونه"] },
  { id: 7, emoji: "🟡", nameAr: "المعدة", nameEn: "Stomach", category: "digestive",
    facts: ["تستوعب المعدة حتى 4 لترات من الطعام", "حموضة المعدة تقتل معظم البكتيريا", "تفرغ المعدة خلال 4-5 ساعات", "تنتج حمض الهيدروكلوريك"] },
  { id: 8, emoji: "🫀", nameAr: "الأوعية الدموية", nameEn: "Blood Vessels", category: "cardiovascular",
    facts: ["إجمالي طول الأوعية يبلغ 96,000 كيلومتر", "الشعيرات الدموية أرق من شعرة الإنسان", "الشرايين أكثر مرونة من الأوردة", "بعض الشعيرات أضيق من كريات الدم الحمراء"] }
];
