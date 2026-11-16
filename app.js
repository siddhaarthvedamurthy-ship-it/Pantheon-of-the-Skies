/* ============================================================
   PANTHEON OF THE SKIES — app.js
   Production-grade Archaeo-Astronomy Simulator
   ============================================================ */

'use strict';

/* ============================================================
   CIVILIZATION DATA REGISTRY
   ============================================================ */
const CIVS = {

  vedic: {
    name: 'Vedic India',
    themeClass: 'theme-vedic',
    accent: '#E8A838',
    bgImage: '',

    deities: [
      {
        id: 'surya',
        name: 'Surya',
        role: 'The Sun — Eye of the Gods, First of the Adityas',
        domains: ['Sun','Light','Time','Vision','Health'],
        img: '',
        myth: 'Surya is the living sun himself — the eye of the gods (Chaksus) who rides a chariot drawn by seven horses, the seven metres of the Rigveda, driven by his charioteer Aruna, the red glow of dawn. Nothing in heaven or earth can hide from his gaze: he watches every deed of mortal and god alike. The Gayatri mantra (Rigveda III.62.10) begs his light to illumine the mind, and the Surya Sukta (Rigveda I.50) hails him as the dispenser of life, health and immortality. He is the father of Yama (death), Yami and the twin physicians, the Ashvins. He is the first of the six Adityas — the bright sons of Aditi, born of the line of Daksha — followed by Indra, Agni, Varuna, Vayu and Soma.',
        stats: { vehicle: 'Seven-horse chariot driven by Aruna', consort: 'Sanjna, daughter of Vishvakarma', children: 'Yama, Yami, the Ashvins, Manu', key_text: 'Rigveda I.50 (Surya Sukta)' }
      },
      {
        id: 'indra',
        name: 'Indra',
        role: 'Shakra — King of the Devas, God of Thunder',
        domains: ['Storm','Lightning','War','Heaven'],
        img: '',
        myth: 'Indra is the mightiest Rigvedic deity — nearly 250 hymns extol him. He wields the Vajra (thunderbolt) forged from sage Dadhichi\'s bones to slay the cosmic serpent Vritra and release the celestial waters. He rides the white elephant Airavata and governs Svarga (heaven). Master of the monsoon, he is both feared and beloved. His Soma drinking is legendary, fuelling his cosmic battles. He is one of the six Adityas, the bright sons of Aditi of the line of Daksha.',
        stats: { vehicle: 'Airavata (white elephant)', weapon: 'Vajra (thunderbolt)', realm: 'Svarga (3rd Heaven)', vedic_hymns: '~250 hymns in Rigveda' }
      },
      {
        id: 'agni',
        name: 'Agni',
        role: 'The Sacred Fire — Messenger of Gods and Men',
        domains: ['Fire','Sacrifice','Purification','Home'],
        img: '',
        myth: 'Agni is the eternal intermediary between mortal and divine. Born two-headed — he is present in every sacred hearth, every yagna (ritual fire). The Rigveda opens with "Agnim ile purohitam" — I praise Agni the priest. He carries sacrificial offerings to the gods on fragrant smoke, is the witness of marriages, and purifies the dead. He rides a ram and wears a crown of flames. He is one of the six Adityas, the bright sons of Aditi of the line of Daksha.',
        stats: { vehicle: 'Ram (Mesha)', faces: 'Two Heads', realm: 'All three worlds', rigveda_hymns: '~200+ hymns' }
      },
      {
        id: 'varuna',
        name: 'Varuna',
        role: 'Lord of Cosmic Order — Guardian of Rta',
        domains: ['Ocean','Cosmic Law','Night Sky','Oath'],
        img: '',
        myth: 'Varuna is the all-seeing sovereign of Rta — the cosmic moral order that holds the universe together. He rides the makara (sea-dragon) across primordial waters, binds sinners with his noose (Pasha), and releases the repentant. His thousand eyes are the stars. In Vedic cosmology he governs the night sky and the western quarter. He is the guardian of oaths and the punisher of falsehood. Later he became the lord of all waters. He is one of the six Adityas, the bright sons of Aditi of the line of Daksha.',
        stats: { vehicle: 'Makara (sea-dragon)', weapon: 'Pasha (cosmic noose)', domain: 'Rta, cosmic waters', eyes: '1000 (the stars)' }
      },
      {
        id: 'vayu',
        name: 'Vayu',
        role: 'God of Wind — Breath of the Cosmos',
        domains: ['Wind','Breath','Speed','Vital Force'],
        img: '',
        myth: 'Vayu is the life-breath of the cosmos — the first to drink Soma at dawn before the gods. He is the father of Hanuman and the Pandava hero Bhima. His vehicle is the mriga (antelope), symbol of fleet-footed wind. As Prana (vital breath), he sustains all life within every living being. The Atharvaveda hails Vayu as the breath of the cosmic Purusha. He governs the northwest direction and commands the maruts (storm troops). He is one of the six Adityas, the bright sons of Aditi of the line of Daksha.',
        stats: { vehicle: 'Mriga (antelope/deer)', sons: 'Hanuman, Bhima', direction: 'Northwest (Vayavya)', form: 'Prana in all beings' }
      },
      {
        id: 'soma',
        name: 'Soma',
        role: 'Moon God — Lord of the Sacred Drink',
        domains: ['Moon','Ritual Drink','Plants','Mind'],
        img: '',
        myth: 'Soma is simultaneously the moon deity and the sacred ritual drink pressed from a mountain plant. The ninth mandala of the Rigveda (Soma Mandala) contains 114 hymns entirely dedicated to Soma Pavamana. He is the king of plants and the Brahmins\' patron. The moon waxes as the gods drink Soma, wanes as mortals partake. He rules the mind (manas), dew, and healing. His silver radiance inspired the Vedic concept of immortal nectar — amrita. He is one of the six Adityas, the bright sons of Aditi of the line of Daksha.',
        stats: { vehicle: 'Silver chariot (drawn by white horses)', realm: 'Chandraloka (Moon realm)', drink: 'Psychoactive ritual soma', texts: 'Entire Rigveda Mandala IX' }
      }
    ],    stars: [
  { name: 'Ashwini', modern: 'Alpha Arietis (Hamal)', ra0: 31.792, dec0: 23.462, mag: 2.01, color: '#FFC080', myth: 'Represents cosmic life-force, swift healing, and the dawn of creation. The twins travel in a golden chariot bringing rejuvenation to the cosmos.', mass: '1.5 M☉', distance: '65.8 ly', radius: '14.9 R☉' },
  { name: 'Bharani', modern: '41 Arietis', ra0: 42.496, dec0: 27.261, mag: 3.61, color: '#FFA060', myth: 'The cosmic portal of birth, death, and transformation. It controls the transition of souls and the strict laws of karma.', mass: '2.6 M☉', distance: '166 ly', radius: '2.1 R☉' },
  { name: 'Krittika', modern: 'Eta Tauri (Alcyone / Pleiades)', ra0: 56.871, dec0: 24.105, mag: 2.85, color: '#A0C8FF', myth: 'The intense fire that purifies raw elements. Mythologically known as the foster mothers of the war god Kartikeya, representing protective fury.', mass: '6.0 M☉', distance: '440 ly', radius: '10.0 R☉' },
  { name: 'Rohini', modern: 'Alpha Tauri (Aldebaran)', ra0: 68.979, dec0: 16.509, mag: 0.85, color: '#FF8040', myth: 'The \'Red One\', celebrated as the most beautiful cosmic mansion. It signifies fertility, agricultural abundance, and pure creative growth.', mass: '1.16 M☉', distance: '65.3 ly', radius: '44.1 R☉' },
  { name: 'Mrigashirsha', modern: 'Lambda Orionis (Meissa)', ra0: 83.783, dec0: 9.934, mag: 3.39, color: '#B0D0FF', myth: 'Symbolizes the eternal search, curiosity, and wandering across realms. Represents the soothing, refreshing qualities of the divine lunar nectar.', mass: '27.9 M☉', distance: '1100 ly', radius: '10.0 R☉' },
  { name: 'Ardra', modern: 'Alpha Orionis (Betelgeuse)', ra0: 88.792, dec0: 7.407, mag: 0.50, color: '#FF6040', myth: 'The cosmic storm clearing away old decay. Out of devastation and sorrow (the tear), new consciousness and clarity are forged.', mass: '16.5 M☉', distance: '642 ly', radius: '887 R☉' },
  { name: 'Punarvasu', modern: 'Beta Geminorum (Pollux)', ra0: 116.329, dec0: 28.026, mag: 1.14, color: '#FFD090', myth: 'The return of light, prosperity, and safety. Like arrows returning to the quiver, it brings back harmony, boundless space, and renewal.', mass: '1.91 M☉', distance: '33.7 ly', radius: '8.8 R☉' },
  { name: 'Pushya', modern: 'Delta Cancri (Asellus Australis)', ra0: 131.171, dec0: 18.154, mag: 3.94, color: '#FFC880', myth: 'Considered the most spiritually nurturing of all lunar mansions. It pours down spiritual wisdom, divine nourishment, and auspicious fortune.', mass: '2.1 M☉', distance: '131 ly', radius: '11.0 R☉' },
  { name: 'Ashlesha', modern: 'Alpha Hydrae (Alphard)', ra0: 141.896, dec0: -8.659, mag: 1.98, color: '#FFA870', myth: 'Represents hidden primal energies, intense intuition, and kundalini. Governs the mysteries of deep poison and its ultimate transformation into medicine.', mass: '3.03 M☉', distance: '177 ly', radius: '50.5 R☉' },
  { name: 'Magha', modern: 'Alpha Leonis (Regulus)', ra0: 152.092, dec0: 11.967, mag: 1.35, color: '#B0D0FF', myth: 'The seat of linear heritage and royal power. Connects the earthly plane directly with the ancient souls who preserve cosmic history.', mass: '3.8 M☉', distance: '79.3 ly', radius: '3.0 R☉' },
  { name: 'Purva Phalguni', modern: 'Delta Leonis (Zosma)', ra0: 168.558, dec0: 20.524, mag: 2.56, color: '#FFD8A0', myth: 'The space of rest, marital bliss, and creative recreation. Represents the natural enjoyment of earthly wealth and physical relaxation.', mass: '2.2 M☉', distance: '58.4 ly', radius: '2.14 R☉' },
  { name: 'Uttara Phalguni', modern: 'Beta Leonis (Denebola)', ra0: 177.263, dec0: 14.572, mag: 2.14, color: '#FFD0A0', myth: 'Governs formal contracts, long-term societal duties, kindness, and noble friendships that sustain civil societies.', mass: '1.75 M☉', distance: '35.9 ly', radius: '1.73 R☉' },
  { name: 'Hasta', modern: 'Delta Corvi (Algorab)', ra0: 187.467, dec0: -16.515, mag: 2.94, color: '#B8D8FF', myth: 'Represents solar rays extending like hands to wake up humanity. It controls precise craftsmanship, magic, healing, and absolute focus.', mass: '2.7 M☉', distance: '86.9 ly', radius: '4.9 R☉' },
  { name: 'Chitra', modern: 'Alpha Virginis (Spica)', ra0: 201.300, dec0: -11.161, mag: 0.98, color: '#B0D4FF', myth: 'The glowing canvas of illusions and beautiful design. Vishwakarma uses this sector to craft the forms, palaces, and geometric dimensions of the universe.', mass: '11.43 M☉', distance: '250 ly', radius: '7.47 R☉' },
  { name: 'Swati', modern: 'Alpha Boötis (Arcturus)', ra0: 213.913, dec0: 19.182, mag: -0.05, color: '#FFB060', myth: 'Represents the free movement of the soul, individual liberty, and life breath (Prana). It signifies adaptation and ultimate mental agility.', mass: '1.08 M☉', distance: '36.7 ly', radius: '25.4 R☉' },
  { name: 'Vishakha', modern: 'Alpha2 Librae (Zubenelgenubi)', ra0: 222.721, dec0: -16.042, mag: 2.75, color: '#FFC890', myth: 'A dual-powered center combining spiritual alignment and raw ambition. Symbolizes focused conquest and targeted victory over dark forces.', mass: '1.82 M☉', distance: '75.8 ly', radius: '2.4 R☉' },
  { name: 'Anuradha', modern: 'Delta Scorpionis (Dschubba)', ra0: 240.083, dec0: -22.622, mag: 2.29, color: '#FF9060', myth: 'The devotion that blossoms in harsh situations. It builds networks of trust, harmony, and coordination across conflicting factions.', mass: '13.0 M☉', distance: '402 ly', radius: '6.7 R☉' },
  { name: 'Jyeshtha', modern: 'Alpha Scorpionis (Antares)', ra0: 247.350, dec0: -26.432, mag: 1.05, color: '#FF6040', myth: 'The \'Eldest\' lunar mansion, indicating high mystical mastery, structural authority, and the mental power to defend against chaos.', mass: '11.2 M☉', distance: '550 ly', radius: '680 R☉' },
  { name: 'Mula', modern: 'Lambda Scorpionis (Shaula)', ra0: 263.400, dec0: -37.104, mag: 1.62, color: '#FF9060', myth: 'The galactic center. Nirriti breaks down material attachments to reveal core fundamental truths. It forces you to uproot assumptions.', mass: '10.4 M☉', distance: '700 ly', radius: '8.8 R☉' },
  { name: 'Purva Ashadha', modern: 'Delta Sagittarii (Kaus Media)', ra0: 275.246, dec0: -29.828, mag: 2.72, color: '#FFB070', myth: 'The invisible, all-pervading ocean of unmanifested potentials. It represents declaration of war against injustice and clearing away wheat from chaff.', mass: '5.0 M☉', distance: '305 ly', radius: '16.0 R☉' },
  { name: 'Uttara Ashadha', modern: 'Sigma Sagittarii (Nunki)', ra0: 283.813, dec0: -26.297, mag: 2.05, color: '#FFB880', myth: 'Represents permanent victory and global alignment with dharma. Backed by the collective power of all universal virtues.', mass: '7.8 M☉', distance: '228 ly', radius: '4.5 R☉' },
  { name: 'Shravana', modern: 'Alpha Aquilae (Altair)', ra0: 297.696, dec0: 8.868, mag: 0.76, color: '#FFE0C0', myth: 'The cosmic domain of listening to divine cosmic rhythms. It maps oral transmissions of timeless knowledge and the preservation of space.', mass: '1.79 M☉', distance: '16.7 ly', radius: '1.63 R☉' },
  { name: 'Dhanishta', modern: 'Alpha Delphini (Sualocin)', ra0: 309.908, dec0: 15.912, mag: 3.77, color: '#FFD0A0', myth: 'The cosmic symphony of time and rhythm. It bestows sudden structural wealth, musical talents, and perfect attunement to universal flow.', mass: '2.8 M☉', distance: '241 ly', radius: '3.9 R☉' },
  { name: 'Shatabhisha', modern: 'Gamma Aquarii (Sadachbia)', ra0: 335.413, dec0: -1.387, mag: 3.84, color: '#B8D8FF', myth: 'The fortress of 100 healers. It hides secrets inside vast dark cosmic waters, overseeing karmic net entrapments and miraculous health recoveries.', mass: '1.9 M☉', distance: '158 ly', radius: '3.0 R☉' },
  { name: 'Purva Bhadrapada', modern: 'Alpha Pegasi (Markab)', ra0: 346.192, dec0: 15.205, mag: 2.49, color: '#FFD0A0', myth: 'The fierce transformational lightning fire. It breaks illusions violently, channeling high spiritual sacrifice and ascetic transformation.', mass: '3.5 M☉', distance: '140 ly', radius: '4.7 R☉' },
  { name: 'Uttara Bhadrapada', modern: 'Gamma Pegasi (Algenib)', ra0: 3.308, dec0: 15.184, mag: 2.83, color: '#B8D0FF', myth: 'The silent power operating from dark galactic trenches. It stabilizes shifting realities, controlling peace, stillness, and deep dream worlds.', mass: '8.9 M☉', distance: '333 ly', radius: '4.8 R☉' },
  { name: 'Revati', modern: 'Zeta Piscium', ra0: 18.433, dec0: 7.575, mag: 5.24, color: '#FFE0C0', myth: 'The final frontier of the zodiac wheel. Pushan safely guides departing souls across boundaries, ensuring a safe passage and path illumination.', mass: '1.33 M☉', distance: '188 ly', radius: '1.7 R☉' }
],
    calendar: {
      title: 'Vedic Lunisolar Calendar (Panchanga)',
      system: 'The Vedic calendar fuses solar and lunar reckoning through the concept of the Panchanga — five limbs of time. It is based on the 27-Nakshatra system (each nakshatra = 13°20\' arc), the Tithi (lunar day = 1/30th of a synodic month), and the Ritu (season).',
      math: [
        'Synodic Month = 29.530589 solar days',
        'Sidereal Year = 365.25636 solar days',
        '27 Nakshatras × 13°20\' = 360° (full zodiac)',
        'Tithi = Synodic Month / 30 ≈ 0.9843 days',
        'Intercalary month (Adhika Masa) every ~32.5 months',
        'Yuga cycle: 4,320,000 years (Mahayuga)',
        'Kalpa (Brahma\'s day) = 4,320,000,000 years'
      ],
      cycles: [
        { name: 'Tithi (Lunar Day)', val: '~0.984 solar days' },
        { name: 'Nakshatra Day', val: '~0.915 solar days' },
        { name: 'Synodic Month', val: '29.5306 days' },
        { name: 'Sidereal Month', val: '27.3217 days' },
        { name: 'Solar Year (Savana)', val: '360 days (ritual)' },
        { name: 'Tropical Year', val: '365.2422 days' },
        { name: 'Kali Yuga', val: '432,000 years' },
        { name: 'Dvapara Yuga', val: '864,000 years' },
        { name: 'Treta Yuga', val: '1,296,000 years' },
        { name: 'Krita/Satya Yuga', val: '1,728,000 years' },
        { name: 'Mahayuga (4 Yugas)', val: '4,320,000 years' },
        { name: 'Kalpa (Brahma\'s Day)', val: '4,320,000,000 years' }
      ],
      lore: 'The Rigveda\'s Nasadiya Sukta (10.129) begins with the primordial void: "Neither existence nor non-existence was there." The Vedic rishis observed the heliacal risings of nakshatras to fix the timing of yajnas. The Vedanga Jyotisha (c. 1200 BC) is the first astronomical treatise, tracking the sun and moon through nakshatras. The 19-year Metonic cycle was known as the Sapta-panchashika (5-year yuga) multiplied by ~4.'
    }
  },

  egypt: {
    name: 'Ancient Egypt',
    themeClass: 'theme-egypt',
    accent: '#1D4FA3',
    bgImage: '',

    deities: [
      {
        id: 'apophis',
        name: 'Apophis (Apep)',
        role: 'The Chaos Serpent — Enemy of the Sun',
        domains: ['Chaos','Darkness','Destruction','Eclipse'],
        img: '',
        myth: 'Apophis is the great serpent of unmaking, born of the primeval darkness of Nun — never worshipped, only warded against. Every night, as Ra\'s barque sails the twelve hours of the Duat, Apophis lies coiled in wait, his gaze petrifying, his voice a hiss that shatters stone. Were he ever to swallow the barque, dawn would fail — an eclipse, then eternal night. Priests burned wax effigies of him daily, and the Book of Overthrowing Apep was recited in the temples to arm the gods who fought him. Yet he can never be destroyed, only defeated: chaos is repelled each night and rises again, for without Apophis there would be no dawn to win.',
        stats: { form: 'Giant serpent of primeval darkness', realm: 'The Duat — the twelve hours of night', enemy: 'Ra and his barque of a million years', fate: 'Defeated every dawn, never destroyed' }
      },
      {
        id: 'ra',
        name: 'Ra / Ra-Horakhty',
        role: 'The Sun God — King of All Gods',
        domains: ['Sun','Creation','Kingship','Day'],
        img: '',
        myth: 'Ra, the supreme solar deity, sails across the sky in his celestial barque by day and battles the serpent Apophis in the underworld each night. At dawn he emerges as Khepri (scarab), at noon he is Ra in full power, at sunset Atum. Every pharaoh was his son. Ra absorbed other deities — becoming Amun-Ra, Ra-Horakhty (Horus of the Horizon). The Pyramid Texts record his nightly journey through the twelve hours of the Duat.',
        stats: { forms: 'Ra, Khepri (dawn), Atum (dusk)', crown: 'Solar disk + cobra uraeus', barque: 'Mandjet (day), Mesektet (night)', texts: 'Pyramid Texts, Book of the Dead' }
      },
      {
        id: 'osiris',
        name: 'Osiris',
        role: 'Lord of the Afterlife — God of Resurrection',
        domains: ['Death','Resurrection','Nile Flood','Agriculture'],
        img: '',
        myth: 'Osiris was the first divine king of Egypt, murdered by his brother Set who dismembered his body and scattered the 14 pieces across Egypt. Isis, his devoted sister-wife, reassembled him and breathed life back into him long enough to conceive Horus. Osiris rules the Duat (underworld) where he weighs hearts on the scales of Ma\'at against the feather of truth. His green skin symbolises resurrection, vegetation, and the Nile\'s fertile silt.',
        stats: { skin: 'Green (resurrection/vegetation)', symbols: 'Crook + Flail, white mummy wrappings', consort: 'Isis', son: 'Horus' }
      },
      {
        id: 'set',
        name: 'Set (Seth)',
        role: 'Lord of Storms, Desert and Disorder',
        domains: ['Storms','Desert','Violence','Foreign Lands'],
        img: '',
        myth: 'Set is the red lord of the desert wastes, of storms and of everything that breaks order — the murderer of his brother Osiris and the rival of Horus in the eighty-year Contendings before the tribunal of the Ennead. Yet Set is no simple devil: each night he stands at the prow of Ra\'s solar barque, hurling his harpoon to hold back Apophis — the only god strong enough to subdue the chaos serpent. Pharaohs such as Seti bore his name; he defends the sun even as he menaces it. His cult centres were Nubt (Ombos) and Avaris, and his sacred animal — the enigmatic Set-beast — belongs to no known species.',
        stats: { animal: 'The Set-animal (sha), species unknown', weapon: 'Was-sceptre of power', cult_centres: 'Nubt (Ombos), Avaris', deeds: 'Slew Osiris; defends Ra against Apophis' }
      },
      {
        id: 'horus',
        name: 'Horus',
        role: 'Sky God — Divine Falcon, Patron of Pharaohs',
        domains: ['Sky','Kingship','War','Protection'],
        img: '',
        myth: 'Horus, the falcon-headed sky god, avenged his father Osiris in the great battle against Set. His right eye is the sun, his left eye the moon — lost and restored by Thoth, it became the Wedjat (Eye of Horus), the most powerful protective amulet in Egypt. Every living pharaoh was Horus incarnate. The Contendings of Horus and Set describes their epic 80-year struggle before the tribunal of the Ennead declared Horus the rightful king.',
        stats: { head: 'Peregrine Falcon', eyes: 'Right = Sun, Left = Moon', mother: 'Isis', father: 'Osiris' }
      }
    ],    stars: [
  { name: 'Sopdet', modern: 'Sirius (α Canis Majoris)', ra0: 101.288, dec0: -16.716, mag: -1.46, color: '#A0C8FF', myth: 'The star of the year. Sopdet\'s heliacal rising after 70 days of invisibility announced Wepet Renpet and the Nile flood. The only decan whose identification is certain.', mass: '2.06 M☉', distance: '8.6 ly', radius: '1.71 R☉' },
  { name: 'Sit', modern: 'Procyon (α Canis Minoris)', ra0: 114.825, dec0: 5.225, mag: 0.34, color: '#FFE0C0', myth: 'The Lesser Dog Star, follower of Sopdet. It rises before the greater Dog and opens the second ten-day week of the year.', mass: '1.5 M☉', distance: '11.5 ly', radius: '2.05 R☉' },
  { name: 'Knem', modern: 'Castor (α Geminorum)', ra0: 113.65, dec0: 31.888, mag: 1.58, color: '#FFE0C0', myth: 'The dual force, rising near Castor and Pollux. Carries the Horus element in the decanal lists.', mass: '~2.2 M☉', distance: '51 ly', radius: '~2.4 R☉' },
  { name: 'Hat-djat', modern: 'Regulus (α Leonis)', ra0: 152.092, dec0: 11.967, mag: 1.35, color: '#B0D0FF', myth: 'Head of the hunt in the Lion\'s mane — the royal decan opening Leo, a symbol of kingship.', mass: '3.8 M☉', distance: '79.3 ly', radius: '3.0 R☉' },
  { name: 'Phu-djat', modern: 'Denebola (β Leonis)', ra0: 177.263, dec0: 14.572, mag: 2.14, color: '#FFE0C0', myth: 'End of the hunt — the Lion\'s tail, closing the second Leo decade.', mass: '1.75 M☉', distance: '35.9 ly', radius: '1.73 R☉' },
  { name: 'Tem', modern: 'Beta Comae Berenices', ra0: 197.968, dec0: 27.878, mag: 4.26, color: '#FFF4E0', myth: 'The evening-sun form of Atum-Ra, set in the hair of Coma Berenices at the close of Leo.', mass: '1.1 M☉', distance: '29.8 ly', radius: '1.07 R☉' },
  { name: 'Wseti', modern: 'Vindemiatrix (ε Virginis)', ra0: 195.542, dec0: 10.959, mag: 2.85, color: '#FFD8A0', myth: 'The supreme grain thresher — the harvest decan opening Virgo.', mass: '2.6 M☉', distance: '110 ly', radius: '10 R☉' },
  { name: 'Bekati', modern: 'Spica (α Virginis)', ra0: 201.3, dec0: -11.161, mag: 0.98, color: '#B0D4FF', myth: 'The wheat ear of Virgo, decan of abundance.', mass: '11.43 M☉', distance: '250 ly', radius: '7.47 R☉' },
  { name: 'Tepi-a Khentet', modern: 'Arcturus (α Boötis)', ra0: 213.913, dec0: 19.182, mag: -0.05, color: '#FFB060', myth: 'The one in front — the path-opening decan at the close of Virgo.', mass: '1.08 M☉', distance: '36.7 ly', radius: '25.4 R☉' },
  { name: 'Khentet', modern: 'Menkent (θ Centauri)', ra0: 211.671, dec0: -36.37, mag: 2.06, color: '#FFB070', myth: 'The guide above, rising near the autumn equinox from the Centaurus field.', mass: '~2 M☉', distance: '58.8 ly', radius: '10.6 R☉' },
  { name: 'Khentet-Kheret', modern: 'Hadar (β Centauri)', ra0: 210.956, dec0: -60.373, mag: 0.61, color: '#B0D0FF', myth: 'The guide below, lower companion of Khentet in Centaurus.', mass: '12 M☉', distance: '390 ly', radius: '9 R☉' },
  { name: 'Tjemes', modern: 'Alniyat (σ Scorpii)', ra0: 245.298, dec0: -25.593, mag: 2.88, color: '#FF9060', myth: 'The red one of Khentet — the name means red, and many scholars identify Tjemes with Antares itself; shown here as Antares\'s neighbour.', mass: '~18 M☉', distance: '~700 ly', radius: '~12 R☉' },
  { name: 'Sapti-khennu', modern: 'Antares (α Scorpii)', ra0: 247.35, dec0: -26.432, mag: 1.05, color: '#FF6040', myth: 'The scorpion\'s heart — a dangerous, powerful star at the threshold of Scorpio.', mass: '11.2 M☉', distance: '550 ly', radius: '680 R☉' },
  { name: 'Hetep-Redui', modern: 'Sargas (θ Scorpii)', ra0: 264.33, dec0: -42.998, mag: 1.86, color: '#FFD8A0', myth: 'The boatman in the middle of the scorpion\'s tail, tied to the solar boat.', mass: '5.7 M☉', distance: '300 ly', radius: '26 R☉' },
  { name: 'Sheshmu', modern: 'Kaus Media (δ Sagittarii)', ra0: 275.246, dec0: -29.828, mag: 2.72, color: '#FFB070', myth: 'The wine-press god of the western Archer.', mass: '5.0 M☉', distance: '305 ly', radius: '16 R☉' },
  { name: 'Knemu', modern: 'Nunki (σ Sagittarii)', ra0: 283.813, dec0: -26.297, mag: 2.05, color: '#FFB880', myth: 'The shepherd-demigod of the central Archer, a decanal reflection of Khnum.', mass: '7.8 M☉', distance: '228 ly', radius: '4.5 R☉' },
  { name: 'Tjes-Arq', modern: 'Ascella (ζ Sagittarii)', ra0: 285.65, dec0: -29.88, mag: 2.6, color: '#FFD0A0', myth: 'The binding and loosening — decan of knots in the eastern Archer.', mass: '~4 M☉', distance: '88 ly', radius: '~4 R☉' },
  { name: 'Wareti', modern: 'Altair (α Aquilae)', ra0: 297.696, dec0: 8.868, mag: 0.76, color: '#FFE0C0', myth: 'The sheep at the threshold of Capricorn, rising with the Eagle.', mass: '1.79 M☉', distance: '16.7 ly', radius: '1.63 R☉' },
  { name: 'Sasa', modern: 'Alshain (β Aquilae)', ra0: 298.828, dec0: 6.407, mag: 3.71, color: '#FFE0C0', myth: 'The winter solstice decan of the western Eagle.', mass: '1.3 M☉', distance: '44.7 ly', radius: '~3 R☉' },
  { name: 'Khau', modern: 'Dabih (β Capricorni)', ra0: 305.252, dec0: -14.781, mag: 3.05, color: '#FFD0A0', myth: 'The thousand — decan of multiplicity in central Capricorn.', mass: '~5 M☉', distance: '~330 ly', radius: '~30 R☉' },
  { name: 'Aret', modern: 'Deneb Algedi (δ Capricorni)', ra0: 326.758, dec0: -16.127, mag: 2.85, color: '#FFE0C0', myth: 'The jaw — decan of word and command, where Mars was exalted in the later zodiac.', mass: '2.1 M☉', distance: '~105 ly', radius: '~8.5 R☉' },
  { name: 'Remen-hare-Khry', modern: 'Sadalsuud (β Aquarii)', ra0: 322.89, dec0: -5.571, mag: 2.91, color: '#FFD8A0', myth: 'The upper and lower shoulder — decan of the Nile waters in western Aquarius.', mass: '~5 M☉', distance: '~540 ly', radius: '~50 R☉' },
  { name: 'Tjes-Arq-Aqer', modern: 'Sadalmelik (α Aquarii)', ra0: 331.446, dec0: -0.32, mag: 2.95, color: '#B8D8FF', myth: 'The lifting upright — rising of the waters in central Aquarius.', mass: '5.1 M☉', distance: '520 ly', radius: '77 R☉' },
  { name: 'Wareti-Repu', modern: 'Skat (δ Aquarii)', ra0: 343.66, dec0: -15.821, mag: 3.27, color: '#B8D8FF', myth: 'The two souls — the dual ba of eastern Aquarius.', mass: '~3 M☉', distance: '~160 ly', radius: '~2.5 R☉' },
  { name: 'Hepa-renpet', modern: 'Gamma Piscium', ra0: 349.29, dec0: 3.283, mag: 3.69, color: '#FFE0C0', myth: 'The year-keeper of southern Pisces.', mass: '~2.5 M☉', distance: '~138 ly', radius: '~10 R☉' },
  { name: 'Hepa-djesert', modern: 'Alrescha (α Piscium)', ra0: 30.513, dec0: 2.764, mag: 3.82, color: '#FFE0C0', myth: 'The hidden desert — the mystical knot that binds the two fish.', mass: '~2.5 M☉', distance: '~140 ly', radius: '~3 R☉' },
  { name: 'Phu-hor', modern: 'Eta Piscium', ra0: 22.871, dec0: 15.342, mag: 3.62, color: '#FFE0C0', myth: 'The end of Horus — threshold of spring, where Venus was exalted in the later zodiac.', mass: '~2.5 M☉', distance: '~170 ly', radius: '~10 R☉' },
  { name: 'Khent-Heru', modern: 'Hamal (α Arietis)', ra0: 31.792, dec0: 23.462, mag: 2.01, color: '#FFC080', myth: 'Front Horus — the spring equinox decan of western Aries.', mass: '1.5 M☉', distance: '65.8 ly', radius: '14.9 R☉' },
  { name: 'Knem-Heru', modern: 'Sheratan (β Arietis)', ra0: 28.66, dec0: 20.808, mag: 2.64, color: '#FFC080', myth: 'The potter — creative force of central Aries, where the Sun was exalted in the later zodiac.', mass: '~2.7 M☉', distance: '~60 ly', radius: '~2.5 R☉' },
  { name: 'Smat', modern: '41 Arietis (Bharani)', ra0: 42.496, dec0: 27.261, mag: 3.61, color: '#FFA060', myth: 'Forerunner of the Pleiades at the close of Aries.', mass: '2.6 M☉', distance: '166 ly', radius: '2.1 R☉' },
  { name: 'Sertua', modern: 'Alcyone (η Tauri)', ra0: 56.871, dec0: 24.105, mag: 2.85, color: '#A0C8FF', myth: 'The Seven Sisters on the Bull\'s shoulder, where the Moon was exalted in the later zodiac.', mass: '6.0 M☉', distance: '440 ly', radius: '10 R☉' },
  { name: 'Hepi', modern: 'Aldebaran (α Tauri)', ra0: 68.979, dec0: 16.509, mag: 0.85, color: '#FF8040', myth: 'The bull\'s eye, connected to Hapi the flood god.', mass: '1.16 M☉', distance: '65.3 ly', radius: '44.1 R☉' },
  { name: 'Phui-Hepi', modern: 'Hyadum I (γ Tauri)', ra0: 64.946, dec0: 15.628, mag: 3.65, color: '#FFD8A0', myth: 'The bull\'s horn in the Hyades field.', mass: '~2.7 M☉', distance: '~154 ly', radius: '~13 R☉' },
  { name: 'Tjes-Arq-Khentu', modern: 'Alnilam (ε Orionis)', ra0: 84.053, dec0: -1.202, mag: 1.69, color: '#B0D0FF', myth: 'The belt of Sah/Osiris — the first Orion decade.', mass: '~32 M☉', distance: '~2000 ly', radius: '~28 R☉' },
  { name: 'Knem-Khentu', modern: 'Betelgeuse (α Orionis)', ra0: 88.792, dec0: 7.407, mag: 0.5, color: '#FF6040', myth: 'The body of Sah/Osiris — when Orion was invisible, Osiris slept in the underworld.', mass: '16.5 M☉', distance: '642 ly', radius: '887 R☉' },
  { name: 'Tepa-Khentu', modern: 'Wezen (δ Canis Majoris)', ra0: 107.096, dec0: -26.393, mag: 1.83, color: '#FFA860', myth: 'The herald of Sopdet in western Canis Major — closes the year cycle.', mass: '16.9 M☉', distance: '1600 ly', radius: '215 R☉' },
],
    calendar: {
      title: 'Egyptian Civil Calendar — The Sothic Cycle',
      system: 'Egypt used a civil calendar of 365 days (3 seasons × 4 months × 30 days + 5 Epagomenal Days). The Sothic cycle anchored astronomical time: every 1,460 Julian years (1,461 Egyptian years), the New Year\'s Day and Sirius\' heliacal rising coincided again.',
      math: [
        'Civil Year = 3 seasons × 4 months × 30 days + 5 epagomenal = 365 days',
        'Tropical Year ≈ 365.2422 days',
        'Drift per year = 0.2422 days (no leap year)',
        'Full calendar cycle = 365 × 4 = 1,460 years to reset',
        'Sothic Cycle (Sirius) = 1,460 Julian years = 1,461 Egyptian years',
        'Three seasons: Akhet (Flood), Peret (Growth), Shemu (Harvest)',
        'Lunar calendar also used: 29-30 day months for religious feasts'
      ],
      cycles: [
        { name: 'Civil Month', val: '30 days' },
        { name: 'Epagomenal Days', val: '5 days (gods\' birthdays)' },
        { name: 'Civil Year', val: '365 days' },
        { name: 'Sothic Cycle', val: '1,460 Julian years' },
        { name: 'Akhet (Flood season)', val: '4 months (Thoth–Choiak)' },
        { name: 'Peret (Planting season)', val: '4 months (Tybi–Pharmouthi)' },
        { name: 'Shemu (Harvest season)', val: '4 months (Pachons–Mesori)' },
        { name: 'Hour Division', val: '12 day + 12 night hours' }
      ],
      lore: 'The Pyramid Texts (c. 2400 BC) are the oldest religious texts in the world, recording the star-knowledge embedded in pyramid architecture. The Great Pyramid\'s southern air shafts pointed to Orion\'s Belt and Thuban (then pole star) c. 2450 BC. Dendera\'s temple ceiling (c. 50 BC) contains the famous Circular Zodiac — the earliest complete star map, now in the Louvre. The Egyptian astronomer-priests (Kherep Serqet) tracked 36 decans — star groups rising at 10-day intervals.'
    }
  },

  greece: {
    name: 'Classical Greece',
    themeClass: 'theme-greece',
    accent: '#C8B8A0',
    bgImage: '',

    deities: [
      {
        id: 'hades',
        name: 'Hades',
        role: 'Lord of the Underworld — The Unseen One',
        domains: ['Underworld','Death','Wealth','The Dead'],
        img: '',
        myth: 'Hades, son of Kronos and Rhea, drew the lot of the mists and darkness when the world was divided three ways among the brothers, and rules the dead beneath the earth from his shadowed halls of Erebos. He is stern and unyielding but never evil — the Greeks feared even to speak his name, calling him instead Pluto, "the Wealthy One", for all riches of gem and grain spring from his dark soil. His helm of darkness renders its wearer invisible, and the three-headed hound Cerberus guards his gate. His queen is Persephone, whom he carried off from the fields of her mother Demeter.',
        stats: { symbol: 'Helm of darkness (Kyneê)', companion: 'Cerberus, the three-headed hound', consort: 'Persephone, daughter of Demeter', realm: 'Erebos, beneath the earth' }
      },
      {
        id: 'poseidon',
        name: 'Poseidon',
        role: 'Lord of the Sea — Earth Shaker',
        domains: ['Ocean','Earthquakes','Horses','Storms'],
        img: '',
        myth: 'Poseidon, son of Kronos, drew the lot of the sea when the world was divided three ways, and rules all waters from his palace of gold at Aegae beneath the Aegean. He strikes the earth with his trident causing earthquakes — men call him Ennosigaios, the Earth-Shaker. He and Athena competed for patronage of Athens — he struck rock and produced a salt spring, she grew the olive tree, and the people chose her gift. Creator of horses by striking the ocean with his trident, he rides a chariot of white steeds over the waves.',
        stats: { weapon: 'Trident (Triaina)', realm: 'All seas and oceans', palace: 'Aegae, beneath the Aegean', dispute: 'Lost Athens to Athena' }
      },
      {
        id: 'zeus',
        name: 'Zeus',
        role: 'King of Olympos — Sovereign of Sky and Thunder',
        domains: ['Thunder','Lightning','Justice','Kingship'],
        img: '',
        myth: 'Zeus, the youngest son of Kronos and Rhea, was saved from being swallowed by his father by a trick of stone-substitution. He freed his swallowed siblings and led the Olympians in the Titanomachy — a ten-year war against the Titans — sealing them in Tartarus. When the victory was won, the brothers drew lots: Zeus took the sky, Poseidon the sea, Hades the underworld. He rules from Mount Olympos with his thunderbolt forged by the Cyclopes, the god of hospitality (Xenia) and the divine guarantee of oaths. His eagle soars as divine messenger across both heaven and earth.',
        stats: { weapon: 'Keraunos (thunderbolt)', bird: 'Eagle', tree: 'Oak', oracle: 'Dodona (oldest Greek oracle)' }
      },
      {
        id: 'hestia',
        name: 'Hestia',
        role: 'Goddess of the Hearth — First and Last of the Children',
        domains: ['Hearth','Home','Family','Fire'],
        img: '',
        myth: 'Hestia, daughter of Kronos and Rhea, was the first of her father\'s children to be swallowed and the last to be set free — the beginning and the end of the Olympian line. She is the virgin goddess of the hearth-fire that burns in every home and in the prytaneion (city hall) of every Greek town, the gentlest of all the gods. She renounced her throne on Olympos to tend the sacred flame, and every prayer and every sacrifice begins and ends with her. No adventures are told of her — her whole story is the fire that must never go out.',
        stats: { symbol: 'Hearth flame and kettle', vow: 'Eternal virginity, sworn to Zeus', throne: 'Gave up her seat on Olympos', honour: 'First and last portion of every sacrifice' }
      },
      {
        id: 'demeter',
        name: 'Demeter',
        role: 'Goddess of the Harvest — Mother of the Grain',
        domains: ['Harvest','Agriculture','Fertility','Mysteries'],
        img: '',
        myth: 'Demeter, daughter of Kronos and Rhea, is the goddess of grain and the abundance of the earth. When Hades carried her daughter Persephone down to the underworld, Demeter withheld her gifts and the world starved, until Zeus brokered a bargain: Persephone spends part of each year below and returns each spring — the ancient explanation of the seasons. In her grief she came to Eleusis disguised as an old woman, and there taught mortals her sacred rites: the Eleusinian Mysteries, the most holy initiation of the ancient world, promising its initiates a blessed afterlife.',
        stats: { symbol: 'Wheat sheaf and torch', daughter: 'Persephone (by Zeus)', sanctuary: 'Eleusis', rites: 'The Eleusinian Mysteries' }
      },
      {
        id: 'hera',
        name: 'Hera',
        role: 'Queen of Olympos — Goddess of Marriage',
        domains: ['Marriage','Queenship','Childbirth','Family'],
        img: '',
        myth: 'Hera, daughter of Kronos and Rhea, is sister and wife of Zeus and the queen of the gods — cow-eyed, golden-throned, and jealous beyond measure of her husband\'s countless affairs. She tormented Herakles and Io, championed the Greeks at Troy, and once led a rebellion to bind Zeus in a hundred knots. Yet she is the divine guardian of marriage, childbirth and lawful order — the one goddess whose union makes Zeus king. Her sacred animals are the peacock and the cow, her sacred city Argos.',
        stats: { symbol: 'Diadem, sceptre, peacock', city: 'Argos', children: 'Ares, Hephaestus, Hebe, Eileithyia', title: 'Queen of gods and men' }
      }
    ],    stars: [
  // PTOLEMY'S ALMAGEST PRIMARY STARS (11 stars)
  { name: 'Kyon (The Dog)', modern: 'Alpha Canis Majoris (Sirius)', ra0: 101.288, dec0: -16.716, mag: -1.46, color: '#A0C8FF', myth: 'Ptolemy\'s premier tracking anchor. Celebrated by Homer and Hipparchus as the swiftest cosmic watchdog, whose scorching midsummer appearance brought heatwaves.', mass: '2.06 M☉', distance: '8.6 ly', radius: '1.71 R☉' },
  { name: 'Arktouros (The Bear Watcher)', modern: 'Alpha Boötis (Arcturus)', ra0: 213.913, dec0: 19.182, mag: -0.05, color: '#FFB060', myth: 'The eternal guardian of the northern sky, tasked with tracking and driving the Great Bear (Ursa Major) around the celestial polar axis.', mass: '1.08 M☉', distance: '36.7 ly', radius: '25.4 R☉' },
  { name: 'Aix (The Goat)', modern: 'Alpha Aurigae (Capella)', ra0: 79.171, dec0: 45.998, mag: 0.08, color: '#FFE0A0', myth: 'Represented the divine goat that nursed the infant Zeus on Crete. Its horn was broken off to become the Cornucopia, filling with endless cosmic bounty.', mass: '2.56 M☉', distance: '42.8 ly', radius: '11.98 R☉' },
  { name: 'Stachys (The Ear of Grain)', modern: 'Alpha Virginis (Spica)', ra0: 201.300, dec0: -11.161, mag: 0.98, color: '#B0D4FF', myth: 'Held in the left hand of the celestial virgin. Symbolised Demeter\'s absolute gift of harvest agriculture to civilised humanity.', mass: '11.43 M☉', distance: '250 ly', radius: '7.47 R☉' },
  { name: 'Antares (The Rival of Mars)', modern: 'Alpha Scorpionis (Antares)', ra0: 247.350, dec0: -26.432, mag: 1.05, color: '#FF6040', myth: 'Named for its intense, deep-crimson hue that closely rivalled the brilliance and erratic motion of the war planet Pyroeis (Mars).', mass: '11.2 M☉', distance: '550 ly', radius: '680 R☉' },
  { name: 'Aetos (The Eagle)', modern: 'Alpha Aquilae (Altair)', ra0: 297.696, dec0: 8.868, mag: 0.76, color: '#FFE0C0', myth: 'The massive celestial eagle that carried the lightning thunderbolts of Zeus and was sent to retrieve Ganymede to serve as cupbearer.', mass: '1.79 M☉', distance: '16.7 ly', radius: '1.63 R☉' },
  { name: 'Lyra (The Lyre)', modern: 'Alpha Lyrae (Vega)', ra0: 279.233, dec0: 38.784, mag: 0.03, color: '#C0D8FF', myth: 'The foundational stringed instrument fashioned by Hermes and played by Orpheus to charm the gods of the underworld into submission.', mass: '2.13 M☉', distance: '25 ly', radius: '2.36 R☉' },
  { name: 'Prokyon (The Forerunner)', modern: 'Alpha Canis Minoris (Procyon)', ra0: 114.825, dec0: 5.225, mag: 0.34, color: '#FFE0C0', myth: 'Literally translates to \'Before the Dog\', so named because its orbital position causes it to rise across the horizon right before Kyon (Sirius).', mass: '1.5 M☉', distance: '11.4 ly', radius: '2.05 R☉' },
  { name: 'Basiliskos (The Little King)', modern: 'Alpha Leonis (Regulus)', ra0: 152.092, dec0: 11.967, mag: 1.35, color: '#B0D0FF', myth: 'The premier imperial star of Hellenistic astrology. Ptolemy noted it as the supreme regulator of governance and martial destiny.', mass: '3.8 M☉', distance: '79.3 ly', radius: '3.0 R☉' },
  { name: 'Protrygeter (The Vintage Harbinger)', modern: 'Epsilon Virginis (Vindemiatrix)', ra0: 195.542, dec0: 10.959, mag: 2.85, color: '#FFD0A0', myth: 'Its morning appearance served as a calendar alarm telling Greek vineyards that it was time to harvest grapes for winemaking.', mass: '2.6 M☉', distance: '109.6 ly', radius: '10.6 R☉' },
  { name: 'Kanobos', modern: 'Alpha Carinae (Canopus)', ra0: 95.988, dec0: -52.696, mag: -0.74, color: '#C0E0FF', myth: 'Named for Menelaus\' naval helmsman. Sat low on the Mediterranean horizon, anchoring the steering oar of the colossal ship Argo Navis.', mass: '8.0 M☉', distance: '310 ly', radius: '71.0 R☉' },

  // EARLY GREEK ASTERISMS (5 stars)
  { name: 'Propus (The Forward Foot)', modern: 'Eta Geminorum', ra0: 93.717, dec0: 22.507, mag: 3.31, color: '#FFC880', myth: 'Tracked by Hipparchus as the projecting base line of Gemini. Marked the westernmost point where the ecliptic boundaries crossed.', mass: '2.5 M☉', distance: '350 ly', radius: '140 R☉' },
  { name: 'Kornephoros (The Club Bearer)', modern: 'Beta Herculis', ra0: 247.554, dec0: 21.489, mag: 2.77, color: '#FFD0A0', myth: 'The brightest structural anchor of the \'Kneeler\' constellation. It maps the mighty arm of Heracles as he brandishes his club.', mass: '2.9 M☉', distance: '139 ly', radius: '17.0 R☉' },
  { name: 'Aspidiske (The Little Shield)', modern: 'Iota Carinae', ra0: 139.271, dec0: -59.275, mag: 2.21, color: '#B8D0FF', myth: 'Detailed in early maritime logs as the defensive shield mount fixed onto the ornate side railing of the legendary ship Argo Navis.', mass: '7.4 M☉', distance: '690 ly', radius: '56.0 R☉' },
  { name: 'Tetrapleuron (The Quadrangle)', modern: 'Zeta Sagittarii (Ascella)', ra0: 285.650, dec0: -29.880, mag: 2.60, color: '#FFB880', myth: 'An early geometric asterism tracking the square foundational matrix forming the armpit and bow assembly of Sagittarius.', mass: '3.4 M☉', distance: '89 ly', radius: '4.5 R☉' },
  { name: 'Asterion (The Starry One)', modern: 'Beta Canum Venaticorum', ra0: 188.433, dec0: 41.357, mag: 4.24, color: '#FFE0C0', myth: 'Tracked in northern Aratus texts as a solitary beacon pacing the flanks of the Great Bear, later formalised into the hunting hounds.', mass: '1.05 M☉', distance: '27.5 ly', radius: '1.11 R☉' },

  // THE PLEIADES (9 stars)
  { name: 'Alcyone (The Leader)', modern: 'Eta Tauri', ra0: 56.871, dec0: 24.105, mag: 2.85, color: '#A0C8FF', myth: 'The central, brightest sibling nymph of the Pleiades. She was seduced by Poseidon, anchoring maritime weather changes.', mass: '6.0 M☉', distance: '440 ly', radius: '10.0 R☉' },
  { name: 'Maia (The Eldest)', modern: '20 Tauri', ra0: 56.454, dec0: 24.368, mag: 3.87, color: '#B8D8FF', myth: 'The eldest, most beautiful mountain nymph who birthed the messenger god Hermes within a cave on Mount Cyllene.', mass: '5.0 M☉', distance: '360 ly', radius: '5.5 R☉' },
  { name: 'Merope (The Mortal Sister)', modern: '23 Tauri', ra0: 56.579, dec0: 23.948, mag: 4.14, color: '#C0D8FF', myth: 'The \'Lost Pleiad\'. She hid her face in deep shame across the night sky because she chose to marry a mortal king (Sisyphus) rather than a god.', mass: '4.5 M☉', distance: '380 ly', radius: '4.3 R☉' },
  { name: 'Taygeta (The Mountain Nymph)', modern: '19 Tauri', ra0: 56.300, dec0: 24.467, mag: 4.30, color: '#C0D0FF', myth: 'To escape the lustful pursuits of Zeus, Artemis temporarily transformed Taygeta into a golden-horned doe to hide in the forests.', mass: '4.8 M☉', distance: '409 ly', radius: '4.5 R☉' },
  { name: 'Electra (The Sorrowful)', modern: '17 Tauri', ra0: 56.200, dec0: 24.113, mag: 3.72, color: '#B8D0FF', myth: 'Mother of the founder of Troy. Myth describes her tearing her hair out and dimming her star\'s light following the fiery destruction of Troy.', mass: '5.0 M☉', distance: '370 ly', radius: '6.0 R☉' },
  { name: 'Celaeno (The Dark Sibling)', modern: '16 Tauri', ra0: 56.200, dec0: 24.289, mag: 5.45, color: '#A0B8E0', myth: 'Known as the \'Swarthy One\'. Her faint magnitude required crisp Mediterranean night air for ancient navigators to glimpse her.', mass: '3.7 M☉', distance: '434 ly', radius: '4.4 R☉' },
  { name: 'Asterope (The Flashing One)', modern: '21 Tauri', ra0: 56.475, dec0: 24.555, mag: 5.76, color: '#A0B8E0', myth: 'Birthed King Oenomaus with Ares. Represented the rapid, flickering stellar scintillation across winter storm cycles.', mass: '3.0 M☉', distance: '431 ly', radius: '2.5 R☉' },
  { name: 'Atlas (The Sky Bearer)', modern: '27 Tauri', ra0: 57.296, dec0: 24.053, mag: 3.62, color: '#C0D0FF', myth: 'The Titan father forced to stand at the western edge of the world, supporting the heavy brass weight of the sky dome on his shoulders.', mass: '4.8 M☉', distance: '380 ly', radius: '5.0 R☉' },
  { name: 'Pleione (The Mother)', modern: '28 Tauri', ra0: 57.296, dec0: 24.137, mag: 5.05, color: '#B0C8F0', myth: 'The protective oceanic nymph mother who guides the cluster. Her movement guarded seafaring vessels against treacherous reef collapses.', mass: '3.4 M☉', distance: '390 ly', radius: '3.2 R☉' },

  // THE HYADES (5 stars)
  { name: 'Phaesyle (The Filtering Nymph)', modern: 'Gamma Tauri', ra0: 64.946, dec0: 15.628, mag: 3.65, color: '#FFC880', myth: 'One of the sister nymphs who wept tears of sorrow for their slain brother Hyas. Their cosmic weeping manifests on earth as seasonal rainy weather.', mass: '2.7 M☉', distance: '154 ly', radius: '13.4 R☉' },
  { name: 'Coronis (The Crowned Nymph)', modern: 'Delta1 Tauri', ra0: 65.733, dec0: 17.543, mag: 3.77, color: '#FFD090', myth: 'Transformed into a star cluster node by Zeus to preserve her safety after she helped nurture and protect the infant wine god Dionysus.', mass: '2.6 M☉', distance: '153 ly', radius: '12.8 R☉' },
  { name: 'Cleeia (The Famous Nymph)', modern: 'Theta2 Tauri', ra0: 67.163, dec0: 15.871, mag: 3.40, color: '#FFD0A0', myth: 'An integral vector point in the Hyades cluster, used by Hellenic sailors to anticipate autumn storms and rising tides.', mass: '2.4 M☉', distance: '149 ly', radius: '12.1 R☉' },
  { name: 'Phaeo (The Gleaming Nymph)', modern: 'Epsilon Tauri', ra0: 67.154, dec0: 19.180, mag: 3.53, color: '#FFD0A0', myth: 'Represents the structural left eye of the Bull. Its shifting color variations were parsed to predict severe weather changes.', mass: '2.5 M☉', distance: '147 ly', radius: '12.5 R☉' },
  { name: 'Eudora (The Generous Pourer)', modern: 'Sigma2 Tauri', ra0: 67.008, dec0: 15.962, mag: 4.67, color: '#FFC890', myth: 'Her name signifies \'rich giver\'. She commands the water distribution mechanisms that drop autumn rains onto agricultural valleys.', mass: '1.9 M☉', distance: '152 ly', radius: '2.1 R☉' }
],
    calendar: {
      title: 'Greek Lunisolar Calendar (Athenian Metonic Cycle)',
      system: 'Athens used a lunisolar calendar of 12 or 13 months, beginning at the first new moon after the summer solstice. The Metonic Cycle (Meton of Athens, 432 BC) discovered that 19 solar years ≈ 235 lunar months, allowing precise calendar intercalation.',
      math: [
        '19 Tropical Years = 6939.6018 days',
        '235 Synodic Months = 6939.6887 days',
        'Difference = 0.087 days per 19-year cycle',
        '12 ordinary years (354 days) + 7 leap years (384 days) = 19 years',
        'Callippic Cycle: 4 × Metonic − 1 day = 76 years',
        'Hipparchan Cycle: 304 years (4 × Callippic)',
        'Olympiad: 4-year festival cycle (first: 776 BC)'
      ],
      cycles: [
        { name: 'Athenian Lunar Month', val: '29 or 30 days' },
        { name: 'Ordinary Year', val: '354 days (12 months)' },
        { name: 'Leap Year (Embolismic)', val: '384 days (13 months)' },
        { name: 'Metonic Cycle', val: '19 years = 235 months' },
        { name: 'Callippic Cycle', val: '76 years' },
        { name: 'Olympiad', val: '4 years' },
        { name: 'Saros Cycle (eclipse)', val: '18 years 11 days' },
        { name: 'Exeligmos', val: '3 × Saros = 54 years' }
      ],
      lore: 'Hipparchus of Nicaea (c. 190–120 BC) discovered axial precession by comparing positions of Spica with earlier Babylonian records — detecting the equinox point had moved ~2° in 150 years. Eratosthenes (c. 276–194 BC) calculated Earth\'s circumference to within ~1% using a gnomon at Alexandria and the known distance to Syene. Aristarchus of Samos (c. 310 BC) proposed the heliocentric model 1,800 years before Copernicus.'
    }
  },

  babylon: {
    name: 'Babylonia',
    themeClass: 'theme-babylon',
    accent: '#C4613A',
    bgImage: '',
    deities: [
      {
        id: 'marduk',
        name: 'Marduk',
        role: 'Supreme God of Babylon — Lord of the Universe',
        domains: ['Creation','Magic','Justice','Water'],
        img: '',
        myth: 'Marduk, champion of the younger gods, slew the primordial chaos-dragon Tiamat and from her split body fashioned heaven and earth — as described in the Enuma Elish (c. 1100 BC), the great Babylonian creation epic. He established 50 divine names (one for each of his powers), fixed the stars in their courses, and created humanity from the blood of Kingu to serve the gods. Babylon\'s great ziggurat Etemenanki ("House of the foundation of heaven and earth") was his temple-mountain.',
        stats: { weapon: 'Marru (spade)', animal: 'Dragon (Mushhushshu)', planet: 'Jupiter', text: 'Enuma Elish' }
      },
      {
        id: 'ishtar',
        name: 'Ishtar / Inanna',
        role: 'Goddess of Love, War and Venus',
        domains: ['Love','War','Venus','Fertility','Power'],
        img: '',
        myth: 'Ishtar (Sumerian: Inanna) is the most powerful goddess of Mesopotamia — goddess of erotic love and brutal warfare simultaneously. Her descent to the underworld through seven gates, surrendering an adornment at each, is one of humanity\'s oldest stories. She demanded the Bull of Heaven to slay Gilgamesh after he refused her. Her planet was Venus, appearing as morning and evening star. The Ishtar Gate of Babylon (575 BC) was covered in lapis lazuli and depicted her sacred lions.',
        stats: { planet: 'Venus (morning + evening)', gate: 'Ishtar Gate, Babylon 575 BC', symbol: 'Eight-pointed star', descent: '7 Gates of the Underworld' }
      },
      {
        id: 'enlil',
        name: 'Enlil',
        role: 'God of Wind and Supreme Authority',
        domains: ['Wind','Storm','Kingship','Fate','Earth'],
        img: '',
        myth: 'Enlil, "Lord of Wind," was the active executive power of the Sumerian pantheon. He separated An (sky) from Ki (earth), creating the space for life. He decreed the Great Flood (Atrahasis Epic, c. 1700 BC) to destroy humanity — the Babylonian Noah story predates the biblical version by over a millennium. His temple Ekur ("Mountain House") at Nippur was the religious center of Sumer. He wrote fate on heavenly tablets.',
        stats: { temple: 'Ekur at Nippur', tablets: 'Tablets of Destiny', flood: 'Decreed the great deluge', realm: 'Earth and atmosphere' }
      },
      {
        id: 'nabu',
        name: 'Nabu',
        role: 'God of Writing and Prophecy',
        domains: ['Writing','Scribes','Astronomy','Prophecy'],
        img: '',
        myth: 'Nabu, son of Marduk, is the divine scribe who records the fates of all beings. His symbol is the clay tablet and stylus. He is the patron deity of the Babylonian scribal tradition — the finest astronomers and mathematicians of the ancient world. His temple at Borsippa (Ezida) was a major center of astronomical observation. Wednesday (in Latin dies Mercurii) is named for Mercury, which the Babylonians identified with Nabu.',
        stats: { planet: 'Mercury', symbol: 'Clay tablet + stylus', temple: 'Ezida at Borsippa', day: 'Wednesday (Nabu\'s Day)' }
      },
      {
        id: 'sin',
        name: 'Sin / Nanna',
        role: 'Moon God — Lord of the Calendar',
        domains: ['Moon','Calendar','Cattle','Wisdom'],
        img: '',
        myth: 'Sin (Sumerian: Nanna), the Moon God, was among the most powerful of Mesopotamian deities. His crescent chariot sailed the night sky, illuminating the darkness. He was the father of Inanna/Ishtar (the planet Venus) and Utu/Shamash (the Sun). His great temple E-gish-nu-gal stood at Ur. The Babylonian calendar was entirely lunar, with months named for his phases. His wisdom came from observing and recording the movements of all celestial bodies.',
        stats: { chariot: 'Crescent-shaped barque', children: 'Shamash (Sun) + Inanna (Venus)', temple: 'E-gish-nu-gal at Ur', symbol: 'Crescent + lunar disc' }
      },
      {
        id: 'shamash',
        name: 'Shamash / Utu',
        role: 'Sun God — God of Justice and Law',
        domains: ['Sun','Justice','Law','Divination','Truth'],
        img: '',
        myth: 'Shamash, the all-seeing sun, traverses the sky in a fiery chariot drawn by the divine horses Etana and Kibra, entering through the mountains at dawn and departing at dusk into the Underworld. As supreme judge, he stands above all human law — the famous Code of Hammurabi (c. 1754 BC) was given to Hammurabi directly by Shamash, depicted on the stele\'s famous relief. He destroys evil with his solar rays and is the patron of diviners.',
        stats: { transport: 'Fiery chariot through sky gates', symbol: 'Winged solar disc + saw', law: 'Hammurabi Code given by Shamash', saw: 'For "cutting through" injustice' }
      }
    ],
    stars: [
  // ENLIL PATH (12 stars)
  { name: 'MUL.SIPA.ZI.AN.NA (True Shepherd)', modern: 'Alpha Orionis (Betelgeuse)', ra0: 88.792, dec0: 7.407, mag: 0.50, color: '#FF6040', myth: 'The cosmic leader of the constellations. Acts as the divine herald carrying decrees between the gods of heaven and earth.', mass: '16.5 M☉', distance: '642 ly', radius: '887 R☉' },
  { name: 'MUL.KAK.SI.SÁ (The Arrow)', modern: 'Alpha Canis Majoris (Sirius)', ra0: 101.288, dec0: -16.716, mag: -1.46, color: '#A0C8FF', myth: 'The most brilliant beacon in the sky. Its piercing ray was believed to measure the deep horizons and trigger the midsummer rain systems.', mass: '2.06 M☉', distance: '8.6 ly', radius: '1.71 R☉' },
  { name: 'MUL.BAN (The Bow)', modern: 'Delta Canis Majoris (Wezen)', ra0: 107.096, dec0: -26.393, mag: 1.83, color: '#FFA860', myth: 'The great Bow of the Elamite wars, drawn beside the Arrow (Sirius) and aimed at sky monsters.', mass: '16.9 M☉', distance: '1600 ly', radius: '215 R☉' },
  { name: 'MUL.MAR.GÍD.DA (The Wagon)', modern: 'Alpha Ursae Majoris (Dubhe)', ra0: 165.933, dec0: 61.751, mag: 1.79, color: '#FFE0C0', myth: 'The Heavenly Wagon, whose unblinking circumpolar rotation in Ursa Major tracked the nightly hours and steered the gods.', mass: '4.25 M☉', distance: '123 ly', radius: '30.0 R☉' },
  { name: 'MUL.UZ (The She-Goat)', modern: 'Alpha Aurigae (Capella)', ra0: 79.171, dec0: 45.998, mag: 0.08, color: '#FFE0A0', myth: 'Tied to the supreme goddess of healing and restoration. Shines directly over northern pastoral lands to bless grazing herds.', mass: '2.56 M☉', distance: '42.8 ly', radius: '11.98 R☉' },
  { name: 'MUL.ŠU.PA (The Leader)', modern: 'Alpha Boötis (Arcturus)', ra0: 213.913, dec0: 19.182, mag: -0.05, color: '#FFB060', myth: 'The majestic axis rod of Enlil\'s northern sky track. It holds structural governance over atmospheric weather and storms.', mass: '1.08 M☉', distance: '36.7 ly', radius: '25.4 R☉' },
  { name: 'MUL.KA.MÚŠ.I.KÚ.E (The Dragon\'s Mouth)', modern: 'Gamma Draconis (Eltanin)', ra0: 269.150, dec0: 51.489, mag: 2.24, color: '#FFD0A0', myth: 'The snapping maw of the primeval chaos serpent. Positioned high up in the circumpolar ceiling as a warning against rebellion.', mass: '1.7 M☉', distance: '148 ly', radius: '48.0 R☉' },
  { name: 'MUL.A.EDIN (The Crown of the Desert)', modern: 'Alpha Canum Venaticorum (Cor Caroli)', ra0: 194.008, dec0: 38.318, mag: 2.89, color: '#FFD8A0', myth: 'Marked the isolated boundary zones where the fertile valley fields dissolved into the high arid Mesopotamian plateau.', mass: '2.9 M☉', distance: '110 ly', radius: '2.5 R☉' },
  { name: 'MUL.BALAG (The Lyre)', modern: 'Beta Lyrae', ra0: 282.521, dec0: 33.364, mag: 3.52, color: '#C0D8FF', myth: 'The sacred celestial harp whose mathematical resonance maintains orderly orbits and structural peace across the sky vault.', mass: '13.0 M☉', distance: '960 ly', radius: '15.0 R☉' },
  { name: 'MUL.GIR.TAB (The Sting)', modern: 'Lambda Scorpionis (Shaula)', ra0: 263.400, dec0: -37.104, mag: 1.62, color: '#FF9060', myth: 'The lethal base of the scorpion configuration, monitoring the southern horizon line to enforce oaths and punish contract breaches.', mass: '10.4 M☉', distance: '700 ly', radius: '8.8 R☉' },
  { name: 'MUL.ŠU.GI (The Old Man)', modern: 'Zeta Persei', ra0: 58.529, dec0: 31.884, mag: 2.85, color: '#FFA870', myth: 'The primordial ancestor. Its fading elevation tracks the late-autumn transitions and the onset of winter frost.', mass: '19.0 M☉', distance: '750 ly', radius: '21.0 R☉' },
  { name: 'MUL.APIN (The Plough)', modern: 'Alpha Andromedae (Alpheratz)', ra0: 2.096, dec0: 29.091, mag: 2.06, color: '#FFC890', myth: 'Used to time the absolute beginning of field plowing and spring agricultural preparation.', mass: '3.8 M☉', distance: '97 ly', radius: '2.7 R☉' },

  // ANU PATH (12 stars)
  { name: 'MUL.LI.9 (Jaw of the Bull)', modern: 'Alpha Tauri (Aldebaran)', ra0: 68.979, dec0: 16.509, mag: 0.85, color: '#FF8040', myth: 'The Crown of the supreme sky father Anu. Marks the seasonal gate where spring turns to hot summer dust storms.', mass: '1.16 M☉', distance: '65.3 ly', radius: '44.1 R☉' },
  { name: 'MUL.MAŠ.TAB.BA.GAL.GAL (Castor)', modern: 'Alpha Geminorum (Castor)', ra0: 113.650, dec0: 31.888, mag: 1.58, color: '#FFD0A0', myth: 'The left side of the twin sentinel pair, tasked by the council of gods to guard doorways against plague spirits.', mass: '2.76 M☉', distance: '51 ly', radius: '2.4 R☉' },
  { name: 'MUL.MAŠ.TAB.BA.GAL.GAL (Pollux)', modern: 'Beta Geminorum (Pollux)', ra0: 116.329, dec0: 28.026, mag: 1.14, color: '#FFD090', myth: 'The fierce right twin weapon bearer who tracks structural balance at the threshold of the midsummer sky gate.', mass: '1.91 M☉', distance: '33.7 ly', radius: '8.8 R☉' },
  { name: 'MUL.UR.GU.LA (The Great Lion)', modern: 'Alpha Leonis (Regulus)', ra0: 152.092, dec0: 11.967, mag: 1.35, color: '#B0D0FF', myth: 'The supreme indicator for royal campaigns. Its baseline movements dictated state treaties and the safety of the monarch.', mass: '3.8 M☉', distance: '79.3 ly', radius: '3.0 R☉' },
  { name: 'MUL.ABSIN (The Furrow)', modern: 'Alpha Virginis (Spica)', ra0: 201.300, dec0: -11.161, mag: 0.98, color: '#B0D4FF', myth: 'The divine trench plowed along the Euphrates banks. Governs grain production and state harvest collection tallies.', mass: '11.43 M☉', distance: '250 ly', radius: '7.47 R☉' },
  { name: 'MUL.ZI.BA.AN.NA (The Scales)', modern: 'Beta Librae (Zubeneschamali)', ra0: 229.250, dec0: -9.383, mag: 2.61, color: '#FFC890', myth: 'The astronomical scales of cosmic justice. Tracks absolute equality across winter and spring seasonal shifts.', mass: '3.5 M☉', distance: '185 ly', radius: '4.9 R☉' },
  { name: 'MUL.ALLA (The Crab)', modern: 'Delta Cancri (Asellus Australis)', ra0: 131.171, dec0: 18.154, mag: 3.94, color: '#FFC880', myth: 'The northern peak anchor along the planet track, noted for testing the path bounds of wandering celestial bodies.', mass: '2.1 M☉', distance: '131 ly', radius: '11.0 R☉' },
  { name: 'MUL.GUB.BA (The Standing Man)', modern: 'Alpha Canis Minoris (Procyon)', ra0: 114.825, dec0: 5.225, mag: 0.34, color: '#FFE0C0', myth: 'The watchman standing right beside the Milky Way river trail, warning the lower paths of oncoming horizon floods.', mass: '1.5 M☉', distance: '11.4 ly', radius: '2.05 R☉' },
  { name: 'MUL.DAR.LUGAL (The King)', modern: 'Alpha Scorpionis (Antares)', ra0: 247.350, dec0: -26.432, mag: 1.05, color: '#FF6040', myth: 'The crimson marker regulating state borders. Shines fiercely during autumn to signal legal boundaries and judicial checks.', mass: '11.2 M☉', distance: '550 ly', radius: '680 R☉' },
  { name: 'MUL.BIR (The Kidney)', modern: 'Zeta Puppis', ra0: 120.896, dec0: -40.003, mag: 2.21, color: '#B8D0FF', myth: 'Considered the inner geometric filter sorting clean freshwater streams as they pass into the swamp systems.', mass: '22.5 M☉', distance: '1080 ly', radius: '14.0 R☉' },
  { name: 'MUL.TI8.MUŠEN (The Eagle)', modern: 'Alpha Aquilae (Altair)', ra0: 297.696, dec0: 8.868, mag: 0.76, color: '#FFE0C0', myth: 'The swift hunting raptor tracking solar paths. Relays daily human infractions back to the solar courtroom of Shamash.', mass: '1.79 M☉', distance: '16.7 ly', radius: '1.63 R☉' },
  { name: 'MUL.ŠU.PA (The Bright One)', modern: 'Gamma Virginis (Porrima)', ra0: 190.413, dec0: -1.449, mag: 2.74, color: '#FFD0A0', myth: 'The ancillary boundary beam adjacent to the furrow. Measures the exact alignment of seasonal crop growth intervals.', mass: '1.4 M☉', distance: '38.1 ly', radius: '2.0 R☉' },

  // EA PATH (12 stars)
  { name: 'MUL.NUN.KI (Divine Place of Eridu)', modern: 'Sigma Sagittarii (Nunki)', ra0: 283.813, dec0: -26.297, mag: 2.05, color: '#FFB880', myth: 'The ancient delta base marker tracking where freshwater conduits merge directly with subterranean ocean reservoirs.', mass: '7.8 M☉', distance: '228 ly', radius: '4.5 R☉' },
  { name: 'MUL.KU6 (The Fish)', modern: 'Alpha Piscis Austrini (Fomalhaut)', ra0: 344.413, dec0: -29.622, mag: 1.16, color: '#C0E0FF', myth: 'The primordial whale swimming the subterranean ocean currents. Tracks early spring moisture distributions.', mass: '1.92 M☉', distance: '25.1 ly', radius: '1.84 R☉' },
  { name: 'MUL.GULA (The Great One)', modern: 'Beta Aquarii (Sadalsuud)', ra0: 322.888, dec0: -5.571, mag: 2.90, color: '#B8D8FF', myth: 'The master matrix coordinate governing deep irrigation streams. Controls the foundational seasonal recharge of the Tigris and Euphrates rivers.', mass: '5.1 M☉', distance: '540 ly', radius: '50.0 R☉' },
  { name: 'MUL.MA.GUR8 (The Bark)', modern: 'Lambda Velorum (Suhail)', ra0: 136.996, dec0: -43.432, mag: 2.21, color: '#B8D0FF', myth: 'The deep horizon freight vessel navigating southern swamp channels to bring sacred offerings to Eridu\'s docks.', mass: '8.5 M☉', distance: '570 ly', radius: '210 R☉' },
  { name: 'MUL.AŠ.IKU (The Field Marker)', modern: 'Alpha Pegasi (Markab)', ra0: 346.192, dec0: 15.205, mag: 2.49, color: '#FFD0A0', myth: 'The fundamental baseline geometry layout used by Ea to measure and parcel the dimensions of the physical world.', mass: '3.5 M☉', distance: '140 ly', radius: '4.7 R☉' },
  { name: 'MUL.SUHUR.MASH (Goat-Fish)', modern: 'Delta Capricorni', ra0: 326.758, dec0: -16.127, mag: 2.85, color: '#FFD0A0', myth: 'The personal icon of Ea, tracking the return of hidden wisdom from winter depths.', mass: '2.0 M☉', distance: '39 ly', radius: '1.9 R☉' },
  { name: 'MUL.SIM.MAH (The Swallow)', modern: 'Epsilon Pegasi', ra0: 326.046, dec0: 9.875, mag: 2.38, color: '#FFD0A0', myth: 'Signalled early migration tracks and marked the physical end of the winter calendar.', mass: '6.7 M☉', distance: '690 ly', radius: '150 R☉' },
  { name: 'MUL.ALLUT (The Turtle)', modern: 'Alpha Canis Minoris (Procyon)', ra0: 114.825, dec0: 5.225, mag: 0.34, color: '#FFE0C0', myth: 'Monitored coastal swamp changes and lower horizon points along the marsh shores.', mass: '1.5 M☉', distance: '11.4 ly', radius: '2.05 R☉' },
  { name: 'MUL.MUSH (The Serpent)', modern: 'Alpha Hydrae (Alphard)', ra0: 141.896, dec0: -8.659, mag: 1.98, color: '#FFA870', myth: 'Represented foundation magic and structural roots stretching beneath the earth.', mass: '3.03 M☉', distance: '177 ly', radius: '50.5 R☉' },
  { name: 'MUL.UGA (The Raven)', modern: 'Gamma Corvi (Gienah)', ra0: 183.950, dec0: -17.542, mag: 2.59, color: '#FFB070', myth: 'Its early morning rising forecast harvest damage from wind storms and rain anomalies.', mass: '4.2 M☉', distance: '165 ly', radius: '4.9 R☉' },
  { name: 'MUL.EN.TE.NA.BAR.HUM (Mouse)', modern: 'Theta Centauri', ra0: 211.671, dec0: -36.370, mag: 2.06, color: '#FFC880', myth: 'Tied to preserving local grain storages against late autumn dampness and rodent pests.', mass: '4.0 M☉', distance: '58.8 ly', radius: '16.0 R☉' },
  { name: 'MUL.UR.IDIM (Wild Hound)', modern: 'Alpha Lupi', ra0: 220.479, dec0: -47.388, mag: 2.30, color: '#FFB880', myth: 'Represented the multi-headed monstrous beasts guarding the underworld gates.', mass: '10.1 M☉', distance: '460 ly', radius: '8.0 R☉' }
],
    calendar: {
      title: 'Babylonian Lunisolar Calendar & MUL.APIN Astronomy',
      system: 'The Babylonian calendar was purely lunar — months began at the first visible crescent after new moon. Intercalary months were added (by royal decree, then systematically from c. 499 BC) to keep pace with the solar year. The 19-year cycle of intercalation was independently discovered (or borrowed) before the Greek Metonic cycle.',
      math: [
        'Babylonian Synodic Month = 29;31,50,8,20 days (sexagesimal)',
        'Converting: 29 + 31/60 + 50/3600 + 8/216000 + 20/12960000 ≈ 29.530594 days',
        'Modern value: 29.530589 days (Babylonians were within 0.0001%)',
        'Saros Cycle discovered: 223 synodic months = 18 years 11 days',
        '19-year cycle: 7 leap months in positions 3,6,8,11,14,17,19',
        'Sixtiesimal (base-60) math used for all calculations',
        'Babylonian zodiac: 12 signs × 30° = 360° (first zodiac system)'
      ],
      cycles: [
        { name: 'Babylonian Month', val: '29 or 30 days' },
        { name: 'Synodic Month (computed)', val: '29.530594 days' },
        { name: 'Solar Year', val: '365;14,44,51 days (sexagesimal)' },
        { name: 'Saros Cycle (eclipse)', val: '223 months ≈ 18 yr 11 days' },
        { name: 'Metonic Cycle', val: '235 months = 19 solar years' },
        { name: 'Great Year', val: '3600 years (Sar × 600)' },
        { name: 'Zodiac Division', val: '12 signs × 30° (invented ~450 BC)' },
        { name: 'Daily Time Division', val: '12 double-hours (beru)' }
      ],
      lore: 'The MUL.APIN (c. 1000 BC) is the foundational Babylonian astronomical compendium listing 66 stars and constellations, paths of the Moon through 17 stars (proto-zodiac), rising and setting dates of stars, and methods for computing intercalation. Babylonian eclipse records in cuneiform stretch back to 747 BC without interruption — the longest continuous scientific dataset in history. Their System A and B for predicting planetary positions (c. 400 BC) represent abstract mathematical astronomy, centuries before Hipparchus.'
    }
  },

  aztec: {
    name: 'Aztec Empire',
    themeClass: 'theme-aztec',
    accent: '#1FA8A8',
    bgImage: '',
    deities: [
      {
        id: 'huitzilopochtli',
        name: 'Huitzilopochtli',
        role: 'Solar War God — Lord of the Fifth Sun',
        domains: ['Sun','War','Sacrifice','Hummingbird','South'],
        img: '',
        myth: 'Huitzilopochtli, "Hummingbird of the South," is the Aztec sun and war god, born fully-armed from the womb of Coatlicue after his 400 siblings tried to kill her. He slew his sister Coyolxauhqui and dismembered her, throwing her body down Coatepec hill — an event re-enacted at the Templo Mayor. The sun must be fed daily with human hearts (chalchiuatl, "precious water" = blood) to fuel its journey, or it will die and the Fifth Sun will end.',
        stats: { weapon: 'Xiuhcoatl (fire serpent)', symbol: 'Eagle with obsidian mirror', feast: 'Panquetzaliztli (20-day period)', temple: 'Templo Mayor, Tenochtitlan' }
      },
      {
        id: 'quetzalcoatl',
        name: 'Quetzalcoatl',
        role: 'Feathered Serpent — God of Wind and Venus',
        domains: ['Wind','Venus','Knowledge','Morning Star','Creation'],
        img: '',
        myth: 'Quetzalcoatl, the Feathered Serpent, is one of the most ancient deities of Mesoamerica appearing at Teotihuacan c. 100–200 AD. As Ehecatl-Quetzalcoatl he is the wind that clears the path for rain gods. As the Morning Star (Tlahuizcalpantecuhtli) he battles the night to bring light. His mythic departure across the sea to the east — vowing to return in the year Ce Acatl (1 Reed) — created psychological vulnerability when Cortés arrived in 1519 AD.',
        stats: { planet: 'Venus (Morning Star)', form: 'Feathered serpent + wind deity', prophecy: 'Return in year Ce Acatl (1 Reed)', site: 'Teotihuacan, Cholula, Chichen Itza' }
      },
      {
        id: 'tlaloc',
        name: 'Tlaloc',
        role: 'Rain God — Master of Waters and Lightning',
        domains: ['Rain','Lightning','Agriculture','Fertility','Mountains'],
        img: '',
        myth: 'Tlaloc, with his goggle eyes and fanged mouth, is one of the oldest Mesoamerican deities (Olmec period). His paradise Tlalocan receives those who die by drowning, lightning, or water-related deaths — a cool, green paradise of abundance. Four smaller Tlalocs assist him, each controlling different rain types from different directions. Children were sacrificed to him — their tears as they were led to sacrifice were believed to bring rain.',
        stats: { eyes: 'Goggle rings (representing water)', paradise: 'Tlalocan (rain paradise)', assistants: '4 Tlaloque (directional rain gods)', children: 'Sacred to him (sacrificed in Atlcahualo ceremony)' }
      },
      {
        id: 'tezcatlipoca',
        name: 'Tezcatlipoca',
        role: 'Smoking Mirror — God of Night and Sorcery',
        domains: ['Night','Sorcery','Earth','Conflict','Jaguar'],
        img: '',
        myth: 'Tezcatlipoca, "Smoking Mirror," is Quetzalcoatl\'s cosmic opposite and eternal rival. His obsidian mirror reflects the sins of men and the true state of the world. He was responsible for exiling Quetzalcoatl from Tollan by showing him his aged, ugly face in the mirror. He is the Jaguar — the spotted skin of night. He is the god who set the previous four Suns in motion and destroyed each one in cosmic jealousy.',
        stats: { mirror: 'Tezcatl — obsidian smoking mirror', animal: 'Jaguar (spotted night sky)', foot: 'Lost to the Earth Monster (replaced with obsidian)', role: 'Rival and dark twin of Quetzalcoatl' }
      },
      {
        id: 'coatlicue',
        name: 'Coatlicue',
        role: 'Earth Mother — She of the Serpent Skirt',
        domains: ['Earth','Death','Rebirth','Mother','Sacrifice'],
        img: '',
        myth: 'Coatlicue, "She of the Skirt of Serpents," is the earth goddess who gave birth to the moon, stars, and Huitzilopochtli. She is depicted with a necklace of hands and hearts, a skull pendant, and clawed feet and hands. She conceived Huitzilopochtli when a ball of feathers (the soul of a sacrificed warrior) descended and impregnated her while she swept the Coatepec temple. Her massive monolithic statue (1.5m, ~8 tons) found in 1790 is one of the greatest sculptures of ancient America.',
        stats: { skirt: 'Two serpents as facing heads', necklace: 'Hands, hearts, skull pendant', size: '1.5m, ~8 metric tons (stone statue)', location: 'National Museum of Anthropology, Mexico City' }
      }
    ],
    stars: [
  {
    "aztecName": "Yohualtecuhtli",
    "literalMeaning": "Lord of the Night",
    "modernName": "Alcyone (Eta Tauri)",
    "rightAscension": "03h 47m 29.1s",
    "declination": "+24° 06' 18\"",
    "magnitude": 2.85,
    "mythology": "Personified as the supreme nocturnal ruler. This exact star had to cross the meridian (center of the sky) at midnight during the New Fire Ceremony to guarantee the sun would rise and the universe would not end."
  },
  {
    "aztecName": "Yacahuiztli",
    "literalMeaning": "The Sharp Nose / Thorn",
    "modernName": "Atlas (27 Tauri)",
    "rightAscension": "03h 49m 09.7s",
    "declination": "+24° 03' 12\"",
    "magnitude": 3.62,
    "mythology": "Personified as a sharp cosmic piercing instrument. It guarded the outer edge of 'Tianquiztli' (The Marketplace cluster / Pleiades), symbolizing defensive barriers and sacrifice."
  },
  {
    "aztecName": "Mixcóatl",
    "literalMeaning": "Cloud Serpent",
    "modernName": "Polaris (Alpha Ursae Minoris)",
    "rightAscension": "02h 31m 49.1s",
    "declination": "+89° 15' 51\"",
    "magnitude": 1.97,
    "mythology": "Personified as the primary god of the hunt and war. Because it remains stationary while the rest of the night sky rotates around it, the Aztecs saw it as the pivotal central axis holding up the heavens."
  },
  {
    "aztecName": "Tezcatlipoca",
    "literalMeaning": "The Smoking Mirror",
    "modernName": "Alioth (Epsilon Ursae Majoris)",
    "rightAscension": "12h 54m 01.7s",
    "declination": "+55° 57' 35\"",
    "magnitude": 1.76,
    "mythology": "Personified as the missing foot or glowing eye of the supreme, all-powerful creator god Tezcatlipoca, who took the physical form of a massive celestial jaguar roaming the northern sky."
  },
  {
    "aztecName": "Coyolxāuhqui",
    "literalMeaning": "Painted with Bells",
    "modernName": "Dubhe (Alpha Ursae Majoris)",
    "rightAscension": "11h 03m 43.7s",
    "declination": "+61° 45' 03\"",
    "magnitude": 1.79,
    "mythology": "Personified as a severed limb of the defeated moon goddess. Her body was dismembered by the sun god Huitzilopochtli and cast into the freezing northern sky as stars."
  },
  {
    "aztecName": "Citlalcolotl",
    "literalMeaning": "The Scorpion Deceiver",
    "modernName": "Antares (Alpha Scorpii)",
    "rightAscension": "16h 29m 24.4s",
    "declination": "-26° 25' 55\"",
    "magnitude": 1.06,
    "mythology": "Personified as the fiery, glowing heart-eye of a giant celestial scorpion. Its distinct red coloration associated it directly with fire, destruction, and impending danger."
  },
  {
    "aztecName": "Mamalhuaztli",
    "literalMeaning": "The Sacred Fire Drill",
    "modernName": "Alnilam (Epsilon Orionis)",
    "rightAscension": "05h 36m 12.8s",
    "declination": "-01° 12' 07\"",
    "magnitude": 1.69,
    "mythology": "Personified as the central tip of the divine wooden tool used by the gods to drill into a sacrificial chest and strike the first spark of creation to renew the world."
  },
  {
    "aztecName": "Huitznāhua",
    "literalMeaning": "Southern Thorn Brother",
    "modernName": "Betelgeuse (Alpha Orionis)",
    "rightAscension": "05h 55m 10.3s",
    "declination": "+07° 24' 25\"",
    "magnitude": 0.50,
    "mythology": "Personified as one of the Centzon Huitznāhua (the 400 Southern Star Gods). He was a warrior brother slain by the sun god and permanently banished to the southern night sky."
  },
  {
    "aztecName": "Citlallātonac",
    "literalMeaning": "Star That Shines",
    "modernName": "Castor (Alpha Geminorum)",
    "rightAscension": "07h 34m 36.0s",
    "declination": "+31° 53' 18\"",
    "magnitude": 1.58,
    "mythology": "Personified alongside his female counterpart as the male creator god of the stars, acting as a crucial structural pillar for the cosmic ballcourt."
  },
  {
    "aztecName": "Citlalicue",
    "literalMeaning": "Her Skirt is Stars",
    "modernName": "Pollux (Beta Geminorum)",
    "rightAscension": "07h 45m 18.9s",
    "declination": "+28° 01' 34\"",
    "magnitude": 1.14,
    "mythology": "Personified as the Milky Way mother goddess who originally created the stars. In Gemini, she stands directly opposite Castor to maintain the cosmic balance of the night sky."
  }
],
    calendar: {
      title: 'Aztec Dual Calendar — Tonalpohualli & Xiuhpohualli',
      system: 'The Aztecs operated two interlocking calendars simultaneously: the 260-day sacred Tonalpohualli (20 day-signs × 13 numbers) and the 365-day solar Xiuhpohualli (18 months × 20 days + 5 nemontemi). These meshed like cogwheels, producing a unique date once every 52 years (18,980 days) — the Calendar Round.',
      math: [
        'Tonalpohualli = 20 day-signs × 13 day-numbers = 260 days',
        'Xiuhpohualli = 18 months × 20 days + 5 nemontemi = 365 days',
        'Calendar Round = LCM(260, 365) = 18,980 days = 52 years',
        'Venus cycle = 583.92 days ≈ 8 solar years = 5 Venus synodic years',
        '5 Venus cycles = 8 solar years = 2920 days',
        'Venus Great Cycle = 104 years (2 Calendar Rounds)',
        'Long Count in Aztec context: computed back to 4 Ahau 8 Cumku'
      ],
      cycles: [
        { name: 'Tonalpohualli (sacred)', val: '260 days (20 × 13)' },
        { name: 'Xiuhpohualli (solar)', val: '365 days (18×20 + 5)' },
        { name: 'Calendar Round', val: '18,980 days = 52 years' },
        { name: 'Nemontemi (unlucky days)', val: '5 days at year end' },
        { name: 'Venus Synodic Period', val: '583.92 days' },
        { name: 'Venus–Solar Cycle', val: '8 solar years = 5 Venus cycles' },
        { name: 'New Fire Ceremony', val: 'Every 52 solar years' },
        { name: 'Aztec Sun Ages', val: '5 Suns (current = 5th)' }
      ],
      lore: 'The Aztec Sun Stone (incorrectly called "Calendar Stone") is a 3.6m, 24-ton basalt disc carved c. 1427 AD depicting the Five Suns cosmology. The four previous suns (4 Jaguar, 4 Wind, 4 Rain, 4 Water) were each destroyed by the gods. The current Fifth Sun (4 Earthquake, or Nahui Ollin) is fated to end in earthquakes. The New Fire Ceremony at the end of each 52-year bundle was the most terrifying Aztec ritual — all fires extinguished, pregnant women locked away lest they become monsters, and the entire empire held its breath waiting for the Pleiades.'
    }
  },

  maya: {
    name: 'Maya Civilization',
    themeClass: 'theme-maya',
    accent: '#2E8B57',
    bgImage: '',
    deities: [
      {
        id: 'itzamna',
        name: 'Itzamna',
        role: 'Lord of the Heavens — Supreme Creator',
        domains: ['Creation','Writing','Healing','Divination','Day'],
        img: '',
        myth: 'Itzamna ("Iguana House") is the supreme Maya deity — the aged creator god who invented writing, the calendar, and medicine. He is the lord of the celestial realm, day and night. His consort is Ix Chel, the moon goddess. He transforms into the Milky Way serpent. As the first shaman, he can resurrect the dead. The Yucatec Maya believed he created the first humans from maize and was responsible for all cultural inventions.',
        stats: { consort: 'Ix Chel (moon goddess)', symbol: 'Serpent body with crocodile head', domain: 'Upperworld (13 heavens)', inventions: 'Writing, calendars, medicine' }
      },
      {
        id: 'kukulkan',
        name: 'Kukulkan',
        role: 'Feathered Serpent — Lord of Wind and Water',
        domains: ['Wind','Creation','Knowledge','Maize','Venus'],
        img: '',
        myth: 'Kukulkan, the Yucatec Maya equivalent of Quetzalcoatl, is the feathered serpent deity whose descending shadow on the staircase of the El Castillo pyramid at Chichen Itza during the spring equinox creates a spectacular serpent of light — the return of Kukulkan to earth. He governs the four cardinal directions and the ceiba tree (world tree). The pyramid\'s 365 steps, 52 panels, and 18 terraces encode the Maya calendar.',
        stats: { pyramid: 'El Castillo, Chichen Itza', equinox: 'Serpent shadow descends steps', steps: '365 (+ 1 platform = 365 total)', panels: '52 (calendar round years)' }
      },
      {
        id: 'hunahpu',
        name: 'Hunahpu & Xbalanque',
        role: 'Hero Twins — Conquerors of the Underworld',
        domains: ['Sun','Moon','Maize','Ballgame','Death'],
        img: '',
        myth: 'The Hero Twins of the Popol Vuh defeated the Lords of Xibalba (underworld) through cunning. Hunahpu (the Sun) and Xbalanque (the Moon/Venus) were born from the spit of their father\'s severed head (Hun Hunahpu, the Maize God) that fertilized their mother Blood Moon. After defeating Seven Macaw and the demons of Xibalba, they ascended to become the Sun and Moon. Their story encodes the Maya astronomical understanding of solar and lunar cycles.',
        stats: { father: 'Hun Hunahpu (Maize God)', text: 'Popol Vuh (K\'iche\' Maya)', fate: 'Became Sun and Moon', ballgame: 'Played in Xibalba to save the dead' }
      },
      {
        id: 'ixchel',
        name: 'Ix Chel',
        role: 'Goddess of the Moon, Medicine and Weaving',
        domains: ['Moon','Medicine','Weaving','Rain','Fertility'],
        img: '',
        myth: 'Ix Chel ("Lady Rainbow") is the aged moon goddess and consort of Itzamna. She controls floods, weaving, medicine, and childbirth. In her terrifying aspect she wears a serpent headdress and skirt of crossed bones. Her island sanctuary of Cozumel was a major Maya pilgrimage site. All Maya women made the journey there at least once in their lifetime. She controls the Moon\'s influence over tides, menstruation, and planting cycles.',
        stats: { symbol: 'Crescent moon + serpent headdress', island: 'Cozumel (sacred pilgrimage)', controls: 'Floods, childbirth, medicine', consort: 'Itzamna' }
      }
    ],
    stars: [
  {
    "mayaName": "K'ak'al Ek'",
    "literalMeaning": "The Fire Star",
    "modernName": "Alcyone (Eta Tauri)",
    "rightAscension": "03h 47m 29.1s",
    "declination": "+24° 06' 18\"",
    "magnitude": 2.85,
    "mythology": "The main star of 'Tzab-ek' (Rattlesnake's Tail). It was tracked meticulously to mark the exact onset of the heavy rainy season."
  },
  {
    "mayaName": "Koba",
    "literalMeaning": "The Tail End Star",
    "modernName": "Atlas (27 Tauri)",
    "rightAscension": "03h 49m 09.7s",
    "declination": "+24° 03' 12\"",
    "magnitude": 3.62,
    "mythology": "Tracked as the final rattle joint on the cosmic rattlesnake, serving as a critical marker for horizon-clearing calculations."
  },
  {
    "mayaName": "K'ak'upal K'atun",
    "literalMeaning": "First Hearthstone of Creation",
    "modernName": "Alnitak (Zeta Orionis)",
    "rightAscension": "05h 40m 45.5s",
    "declination": "-01° 56' 34\"",
    "magnitude": 1.74,
    "mythology": "Personified as the first of three sacred kitchen stones placed by the gods to support the weight of the cosmos."
  },
  {
    "mayaName": "Oxib Xk'ub",
    "literalMeaning": "The Center Hearthstone",
    "modernName": "Alnilam (Epsilon Orionis)",
    "rightAscension": "05h 36m 12.8s",
    "declination": "-01° 12' 07\"",
    "magnitude": 1.69,
    "mythology": "Personified as the middle foundation stone of the celestial hearth, surrounding the primordial smoke of the Orion nebula."
  },
  {
    "mayaName": "Yax K'ub",
    "literalMeaning": "The Third Hearthstone",
    "modernName": "Mintaka (Delta Orionis)",
    "rightAscension": "05h 32m 00.4s",
    "declination": "-00° 17' 57\"",
    "magnitude": 2.23,
    "mythology": "The final stone completing the cosmic fireplace triangle where life and the universe were first cooked by the gods."
  },
  {
    "mayaName": "K'awiil's Torch",
    "literalMeaning": "The Lightning Spark",
    "modernName": "Rigel (Beta Orionis)",
    "rightAscension": "05h 14m 32.3s",
    "declination": "-08° 12' 06\"",
    "magnitude": 0.13,
    "mythology": "Personified as the bright, flashing foot of the lightning god K'awiil, who struck the earth to crack it open and create maize."
  },
  {
    "mayaName": "Xaman Ek'",
    "literalMeaning": "The North Star",
    "modernName": "Polaris (Alpha Ursae Minoris)",
    "rightAscension": "02h 31m 49.1s",
    "declination": "+89° 15' 51\"",
    "magnitude": 1.97,
    "mythology": "Personified as the flat-nosed god of merchants and travellers. It was vital for navigation because it never moves from the north sky."
  },
  {
    "mayaName": "Wuqub Caquix (Head)",
    "literalMeaning": "Seven Macaw's Head",
    "modernName": "Dubhe (Alpha Ursae Majoris)",
    "rightAscension": "11h 03m 43.7s",
    "declination": "+61° 45' 03\"",
    "magnitude": 1.79,
    "mythology": "Personified as the proud eye of the false-sun bird demon. When it dipped below the northern horizon, it signaled a vital seasonal shift."
  },
  {
    "mayaName": "Wuqub Caquix (Plume)",
    "literalMeaning": "The Demon's Plume",
    "modernName": "Alioth (Epsilon Ursae Majoris)",
    "rightAscension": "12h 54m 01.7s",
    "declination": "+55° 57' 35\"",
    "magnitude": 1.76,
    "mythology": "Mapped as the glittering, boastful tail feathers of the demonic bird Seven Macaw, dominating the northern sky."
  },
  {
    "mayaName": "Chimalmat",
    "literalMeaning": "The Shield Star",
    "modernName": "Kochab (Beta Ursae Minoris)",
    "rightAscension": "14h 50m 42.3s",
    "declination": "+74° 09' 20\"",
    "magnitude": 2.07,
    "mythology": "Personified as the loyal wife of Seven Macaw, holding up the protective northern shield constellation."
  },
  {
    "mayaName": "Sina'an Ch'ich'",
    "literalMeaning": "The Scorpion's Sting",
    "modernName": "Antares (Alpha Scorpii)",
    "rightAscension": "16h 29m 24.4s",
    "declination": "-26° 25' 55\"",
    "magnitude": 1.06,
    "mythology": "Personified as the venomous, glowing red eye or stinger of the giant celestial scorpion constellation."
  },
  {
    "mayaName": "Aak Ixtutz",
    "literalMeaning": "The Turtle's Right Eye",
    "modernName": "Castor (Alpha Geminorum)",
    "rightAscension": "07h 34m 36.0s",
    "declination": "+31° 53' 18\"",
    "magnitude": 1.58,
    "mythology": "Personified as the right eye of a giant cosmic turtle. This celestial turtle carried the maize god safely across the sky."
  },
  {
    "mayaName": "Aak Ixone",
    "literalMeaning": "The Turtle's Left Eye",
    "modernName": "Pollux (Beta Geminorum)",
    "rightAscension": "07h 45m 18.9s",
    "declination": "+28° 01' 34\"",
    "magnitude": 1.14,
    "mythology": "Paired with Castor to track the celestial turtle’s slow rotation along the cosmic current."
  },
  {
    "mayaName": "Pek Ch'umil",
    "literalMeaning": "The Fire Dog's Eye",
    "modernName": "Regulus (Alpha Leonis)",
    "rightAscension": "10h 08m 22.3s",
    "declination": "+11° 58' 02\"",
    "magnitude": 1.35,
    "mythology": "Personified as the blazing eye of the celestial dog deity who brought destructive lightning storms down to Earth."
  },
  {
    "mayaName": "Mo' Ch'umil",
    "literalMeaning": "The Macaw's Heart",
    "modernName": "Spica (Alpha Virginis)",
    "rightAscension": "13h 25m 11.6s",
    "declination": "-11° 09' 41\"",
    "magnitude": 0.98,
    "mythology": "Personified as the brilliant heart-center of the divine Macaw bird flying along the zodiac line."
  }
],
    calendar: {
      title: 'Maya Calendar System — Tzolk\'in, Haab\' and Long Count',
      system: 'The Maya calendar system is the most sophisticated indigenous calendar ever devised. Three interlocking systems operate simultaneously: Tzolk\'in (260 days), Haab\' (365 days), and the Long Count — a linear count of days from the Creation Date (11 August 3114 BC in the GMT correlation), capable of tracking millions of years.',
      math: [
        "Tzolk'in = 20 day-names × 13 numbers = 260 days",
        "Haab' = 18 months × 20 days + 5 Wayeb' = 365 days",
        "Calendar Round = LCM(260,365) = 18,980 days = 52 Haab' years",
        'Long Count positional notation: Bak\'tun(144000).K\'atun(7200).Tun(360).Winal(20).K\'in(1)',
        'Creation Date: 4 Ahaw 8 Kumk\'u = 0.0.0.0.0 = Aug 11, 3114 BC',
        'Current b\'ak\'tun 14 began: Dec 21, 2012 AD (13.0.0.0.0)',
        "Maya Tropical Year: 365.2420 days (error 0.0002 vs modern 365.2422)",
        "Dresden Codex Venus: 2920 days = 8 Haab' = 5 Venus synodic cycles (583.92 days each)"
      ],
      cycles: [
        { name: "Tzolk'in (sacred)", val: '260 days (13 × 20)' },
        { name: "Haab' (civil)", val: '365 days (18×20 + 5)' },
        { name: 'Calendar Round', val: '18,980 days = 52 years' },
        { name: "K'in (day)", val: '1 day' },
        { name: "Winal (month)", val: '20 days' },
        { name: "Tun (year)", val: '360 days' },
        { name: "K'atun", val: '7,200 days = 19.7 years' },
        { name: "B'ak'tun", val: '144,000 days = 394.3 years' },
        { name: "Piktun", val: '2,880,000 days = 7,885 years' },
        { name: 'Venus Table Cycle', val: '2920 days = 8 solar years' }
      ],
      lore: 'The Dresden Codex (c. 1200–1250 AD) contains the most precise pre-telescopic astronomical tables ever produced. Its Venus Tables track the synodic cycle of Venus to an accuracy of 2 hours over 500 years. The Maya also tracked Mars (780-day synodic), and the lunar series (lunar node cycle, 6585 days = Saros) and solar eclipse warnings with precision tools only a positional number system with zero could provide. The Maya independently invented the concept of zero — a revolutionary mathematical achievement.'
    }
  },

  inca: {
    name: 'Inca Empire',
    themeClass: 'theme-inca',
    accent: '#E8C820',
    bgImage: '',
    darkClouds: [
      {
        name: 'Yacana',
        literalMeaning: 'The Great Llama',
        ra0: 193.0, dec0: -63.7, width: 9, height: 6, angle: -10,
        mythology: 'The great black Llama of the Andes walks the Milky Way in darkness. Her body is the black rift of the Coalsack beside the Southern Cross, and her two eyes are the brilliant stars Alpha and Beta Centauri, watching all night over her herds. Beneath her neck trots the baby llama, and the Quechua herders say that as long as the dark llama rises each night, the earthly herds will multiply. She is the celestial mother of all camelids — the source of wool, meat and life itself.'
      },
      {
        name: 'Yutu',
        literalMeaning: 'The Tinamou (Partridge)',
        ra0: 196.5, dec0: -62.0, width: 6, height: 4, angle: 20,
        mythology: 'The Tinamou, a small dark cloud pressed close against the Coalsack, is hunted eternally across the sky by the celestial Fox yet never caught. Andean farmers read her position to time their sowing: when the Yutu sinks low toward the horizon at planting season, the rains are near. Some Quechua communities see in the same dark patch the partridge crushed beneath the llama\'s footprint.'
      },
      {
        name: 'Machacuay',
        literalMeaning: 'The Serpent',
        ra0: 208.0, dec0: -57.0, width: 26, height: 6, angle: -18,
        mythology: 'The great Serpent of the sky is drawn as a long black ribbon of dust stretching from the Coalsack toward the head of Scorpius. In the month when Machacuay first rises, snakes wake upon the earth — the Quechua say the sky serpent gives birth to all earthly serpents, and offerings are made so their bites may be avoided. She coils between the llama and the toad, guardian of the river of stars.'
      },
      {
        name: "Hamp'atu",
        literalMeaning: 'The Toad',
        ra0: 267.8, dec0: -26.0, width: 8, height: 5, angle: 0,
        mythology: 'The Toad squats in the dark dust of the Pipe Nebula in Ophiuchus, swollen with rain. The toad is the herald of the waters: when Hamp\'atu rises in the November mists, the planting season has come. The frogs and toads that sing after the first storms are her children, announcing the rains — and dried toads were buried under fields as offerings to call the water forth.'
      },
      {
        name: 'Atoq',
        literalMeaning: 'The Fox',
        ra0: 276.0, dec0: -31.5, width: 7, height: 5, angle: 12,
        mythology: 'The Fox, a dark cloud trailing near the Toad along the Milky Way, is the Trickster of the Andes — forever hunting the Tinamou across the river of stars yet never catching her. Farmers curse him as the thief of the moon\'s light: eclipses were blamed on the celestial fox biting the moon, and the breath of the fox was said to carry sickness on the night winds.'
      }
    ],
    deities: [
      {
        id: 'inti',
        name: 'Inti',
        role: 'Sun God — Father of the Inca',
        domains: ['Sun','Gold','Kingship','Agriculture','Warmth'],
        img: '',
        myth: 'Inti, the radiant Sun God, was the most important deity of the Inca Empire. The Sapa Inca (emperor) was his direct descendant — "Son of the Sun." His golden disc face radiates rays from the Coricancha temple in Cusco, the "Golden Enclosure" whose walls were sheathed in gold. The Inti Raymi festival (Festival of the Sun) at the winter solstice was the greatest religious ceremony in the Inca calendar, attended by 300,000 people.',
        stats: { temple: 'Coricancha, Cusco (golden walls)', festival: 'Inti Raymi (June solstice)', disc: 'Golden face with human features', consort: 'Mama Quilla (Moon)' }
      },
      {
        id: 'viracocha',
        name: 'Viracocha',
        role: 'Creator God — Lord of Sea and Sky',
        domains: ['Creation','Ocean','Thunder','Civilization','Wisdom'],
        img: '',
        myth: 'Viracocha rose from Lake Titicaca at the beginning of time, created the sun, moon, and stars, and fashioned humans from stone at Tiwanaku. He breathed life into the stones, sending them underground to emerge at sacred places (pacarinas). After completing creation, he walked the Andes teaching civilization, then departed across the Pacific Ocean. When Pizarro arrived in 1532, some Inca thought he might be Viracocha returning — a fateful misidentification.',
        stats: { origin: 'Rose from Lake Titicaca', creation: 'Made humans from stone at Tiwanaku', departure: 'Walked into Pacific Ocean westward', confusion: 'Mistaken for Pizarro upon Spanish arrival' }
      },
      {
        id: 'mama_quilla',
        name: 'Mama Quilla',
        role: 'Moon Goddess — Keeper of the Calendar',
        domains: ['Moon','Calendar','Women','Marriage','Tides'],
        img: '',
        myth: 'Mama Quilla ("Mother Moon"), consort of Inti, governs the Inca lunar calendar and is the patron of married women. A silver disc represented her face in the Coricancha temple, opposite Inti\'s golden disc. Lunar eclipses (when an animal attacked the moon) were occasions of great terror — Inca soldiers would make loud noises and shoot arrows at the sky to drive away the predator. The lunar calendar governed religious ceremonies and agricultural timing.',
        stats: { disc: 'Silver in Coricancha temple', festival: 'Coya Raymi (September)', eclipses: 'Attack by animal (frightened away by noise)', calendar: 'Governed religious and agricultural cycle' }
      }
    ],
    stars: [
  {
    "incaName": "Chaska Quyllur",
    "literalMeaning": "The Ultimate Shaggy Star",
    "modernName": "Sirius (Alpha Canis Majoris)",
    "rightAscension": "06h 45m 08.9s",
    "declination": "-16° 42' 58\"",
    "magnitude": -1.46,
    "mythology": "Personified as the ultimate, shaggy protector of all bright stars in the night sky, radiating intense power."
  },
  {
    "incaName": "Pachapacariq Chaska",
    "literalMeaning": "The Cosmic Morning Anchor",
    "modernName": "Canopus (Alpha Carinae)",
    "rightAscension": "06h 23m 57.1s",
    "declination": "-52° 41' 44\"",
    "magnitude": -0.74,
    "mythology": "Revered as the cosmic morning anchor responsible for controlling and bringing forth the dawn each day."
  },
  {
    "incaName": "Chakana Tupa",
    "literalMeaning": "The Royal Stairway Capstone",
    "modernName": "Acrux (Alpha Crucis)",
    "rightAscension": "12h 26m 35.9s",
    "declination": "-63° 05' 57\"",
    "magnitude": 0.77,
    "mythology": "The top architectural stone of the celestial stairway (Chakana), bridging the underworld, the earthly realm, and the heavens."
  },
  {
    "incaName": "Chakana Suyu",
    "literalMeaning": "The Boundary Stairway Stone",
    "modernName": "Gacrux (Gamma Crucis)",
    "rightAscension": "12h 31m 10.0s",
    "declination": "-57° 06' 48\"",
    "magnitude": 1.59,
    "mythology": "The lower boundary stone completing the Southern Cross axis, defining spatial order and sacred celestial alignment."
  },
  {
    "incaName": "Llamacñawin",
    "literalMeaning": "The Eye of the Llama",
    "modernName": "Alpha Centauri (Rigil Kentaurus)",
    "rightAscension": "14h 39m 36.5s",
    "declination": "-60° 50' 02\"",
    "magnitude": -0.27,
    "mythology": "The primary glowing eye of the great celestial Llama dark-cloud constellation, vital for pastoral and agricultural cycles."
  },
  {
    "incaName": "Llamacñawin Iskay",
    "literalMeaning": "The Second Eye of the Llama",
    "modernName": "Beta Centauri (Hadar)",
    "rightAscension": "14h 03m 49.4s",
    "declination": "-60° 22' 23\"",
    "magnitude": 0.61,
    "mythology": "The second eye of the celestial Llama, pairing with Alpha Centauri to watch over the Andean valleys from high above."
  },
  {
    "incaName": "Chuqi Chinchay",
    "literalMeaning": "The Golden Jaguar",
    "modernName": "Antares (Alpha Scorpii)",
    "rightAscension": "16h 29m 24.4s",
    "declination": "-26° 25' 55\"",
    "magnitude": 1.06,
    "mythology": "The fierce Golden Jaguar deity responsible for protecting herding animals, especially llamas and alpacas, from predators."
  },
  {
    "incaName": "Chuchi Quyllur",
    "literalMeaning": "The Hen Star",
    "modernName": "Rigel (Beta Orionis)",
    "rightAscension": "05h 14m 32.3s",
    "declination": "-08° 12' 06\"",
    "magnitude": 0.13,
    "mythology": "Personified as the divine Mother Hen fiercely guarding and guiding her smaller stellar chicks across the sky."
  },
  {
    "incaName": "Hatun Chaska",
    "literalMeaning": "The Supreme Great Star",
    "modernName": "Vega (Alpha Lyrae)",
    "rightAscension": "18h 36m 56.3s",
    "declination": "+38° 47' 01\"",
    "magnitude": 0.03,
    "mythology": "The supreme weaver goddess who watches over textile artisans, spinning cosmic threads across the sky."
  },
  {
    "incaName": "Taruka",
    "literalMeaning": "The Wild Deer Horn",
    "modernName": "Castor (Alpha Geminorum)",
    "rightAscension": "07h 34m 36.0s",
    "declination": "+31° 53' 18\"",
    "magnitude": 1.58,
    "mythology": "The sharp horn of the celestial wild deer caught in the act of leaping across the great cosmic river (the Milky Way)."
  },
  {
    "incaName": "Taruka Iskay",
    "literalMeaning": "The Second Wild Deer Flank",
    "modernName": "Pollux (Beta Geminorum)",
    "rightAscension": "07h 45m 18.9s",
    "declination": "+28° 01' 34\"",
    "magnitude": 1.14,
    "mythology": "The powerful flank of the jumping celestial wild deer, maintaining its momentum across the starfield."
  }
],
    calendar: {
      title: 'Inca Calendar — Ceque System and Solar-Lunar Integration',
      system: 'The Inca calendar was both solar and lunar, structured through the revolutionary Ceque system: 41 sacred lines radiating from the Coricancha temple through Cusco, dividing the year into segments. 328 shrines along these lines (328 = approximately 12 sidereal months) marked the passage of time.',
      math: [
        'Solar year tracked by horizon pillars (sucancas) around Cusco',
        '12 lunar months × ~27.3 days = 327.6 days (sidereal)',
        'Solar correction: 365 - 327.6 = 37.4 days of intercalation',
        'Ceque system: 41 lines × 8 shrines (average) = 328 huacas',
        '328 days ≈ 12 sidereal months (period of quipu recording)',
        'Inti Raymi: June solstice (longest night, shortest day in southern hemisphere)',
        'Coya Raymi: September equinox (month of the Queen/Moon)',
        'Horizon solar calendar: 4 towers for solstices, 4 for equinoxes'
      ],
      cycles: [
        { name: 'Inca Lunar Month', val: '30 days (approximate)' },
        { name: 'Ceque Calendar', val: '328 shrines ≈ 12 × 27.3 days' },
        { name: 'Solar Year (horizon)', val: '365 days (pillar alignment)' },
        { name: 'Inti Raymi', val: 'June solstice (solar New Year)' },
        { name: 'Coya Raymi', val: 'September equinox' },
        { name: 'Capacocha Cycle', val: 'Tied to ruler\'s death + accession' },
        { name: 'Pleiades Year', val: 'Heliacal rise governs planting' }
      ],
      lore: 'The Inca used quipus — knotted string devices — to record astronomical and calendar data. The site of Machu Picchu (c. 1450 AD) contains the famous Intihuatana stone ("Hitching Post of the Sun"), a carved granite pillar aligned to the four cardinal directions. At the equinoxes, the sun sits directly above the stone with no shadow — a physical calendar synchronised to the cosmos. The Antisuyu, Chinchaysuyu, Cuntisuyu, and Collasuyu quarters of the empire were aligned with the solstice and equinox sunrise directions.'
    }
  },

  sangam: {
    name: 'Sangam Indians',
    themeClass: 'theme-sangam',
    accent: '#B85C28',
    bgImage: '',

    deities: [
      {
        id: 'mayon',
        name: 'Mayon',
        role: 'The Dark Lord of Mullai — God of the Forests',
        domains: ['Forests','Pastures','Cattle','Grace'],
        img: '',
        myth: 'Mayon — "the dark one", the Tamil Vishnu (Mal) — presides over the mullai, the fragrant jungle and pastureland of the Sangam world. He is the herdsman god who guards cattle and waits in the green forest for his devotees, the darkest-hued of the five lords of the land. Sangam poets sing of his grace (aruL) falling like rain upon the shepherd folk. In later ages he would be carried into the great temples as Vishnu and Krishna, but in the Sangam age he is the dark god of the wild green mullai.',
        stats: { landscape: 'Mullai (forest and pasture)', flower: 'Konal (jasmine)', people: 'Idaiyar (shepherds)', later_form: 'Vishnu / Krishna' }
      },
      {
        id: 'kadalon',
        name: 'Kadalon',
        role: 'The Lord of the Shore — God of Sea and Rain',
        domains: ['Ocean','Rain','Fishing','Storms'],
        img: '',
        myth: 'Kadalon — "he of the shore", the Tamil Varunan — rules the neithal, the salt-lashed coastline where the land surrenders to the sea. He commands the oceans, the monsoon clouds, and the fishermen who cast their nets into his waters. Sangam poets invoke him as the mighty lord whose roar is the surf and whose wrath is the shipwreck. He stands parallel to the Vedic Varuna as master of all the waters, and his great shore festival opened each year with the raising of Indra\'s banner.',
        stats: { landscape: 'Neithal (coast and sea)', flower: 'Alli (water-lily)', people: 'Parathavar (fisherfolk)', later_form: 'Varuna of the seas' }
      },
      {
        id: 'seyon',
        name: 'Seyon',
        role: 'The Red God of Kurinji — Lord of the Hills',
        domains: ['Hills','War','Youth','Hunting'],
        img: '',
        myth: 'Seyon — "the red one", the Tamil Murugan — is the youthful god of the kurinji hills, where the blue kurinji flowers bloom once in twelve years. He is the hunter-warrior bearing his Vel (divine spear), mounted on the peacock beneath his rooster banner, the beloved youth of the Tamil country. Sangam bards sing of Verrikadal, his sea of battle, and of the twelve-year festival held in his honour. He is the god of the Tamil people par excellence — lord of the high slopes, the red god of victory.',
        stats: { landscape: 'Kurinji (mountain slopes)', flower: 'Kurinji (Strobilanthes)', people: 'Kuravar (hill hunters)', weapon: 'Vel (divine spear)' }
      },
      {
        id: 'kottravai',
        name: 'Kottravai',
        role: 'The Fierce Mother of Palai — Goddess of Victory',
        domains: ['War','Victory','Wasteland','Motherhood'],
        img: '',
        myth: 'Kottravai — "she who cuts" — is the fierce victory goddess of the palai, the sun-scorched wasteland left behind when the rains fail. She is the terrible mother who receives the offerings of warriors before battle and guards the boundaries of the village. In the Sangam age she was worshipped with fish offerings and pongal beneath the veppalai tree; in later centuries her worship flowed into Kali and Durga of the Sanskritic pantheon. Where the five landscapes have their gentle lords, the wasteland keeps its fierce mother.',
        stats: { landscape: 'Palai (dry wasteland)', flower: 'Veppalai', people: 'Maravar (warriors)', later_form: 'Kali / Durga' }
      },
      {
        id: 'vendhan',
        name: 'Vendhan',
        role: 'The King of Marutham — Lord of the Plains',
        domains: ['Rain','Harvest','Kingship','Festivals'],
        img: '',
        myth: 'Vendhan — the Tamil Indra — is king of the marutham, the fertile river-plains where paddy grows and kings hold court. He brings the life-giving rain to the fields and presides over the great Indira Vizha, the festival of the raising of Indra\'s banner, celebrated for days with music, dance and feasting. Sangam kings modelled their rule upon his order: when the king is just, Vendhan sends timely rain; when he is unjust, the plains parch. He is the sovereign of the cultivated plain, god of kingship and harvest.',
        stats: { landscape: 'Marutham (river plains)', flower: 'Marutham (terminalia)', people: 'Uzhavar (farmers)', festival: 'Indira Vizha (banner-raising)' }
      }
    ],    stars: [
  {
    "tamilName": "Puravi (புரவி)",
    "literalMeaning": "The Horse",
    "modernName": "Hamal (Alpha Arietis)",
    "rightAscension": "02h 07m 10.4s",
    "declination": "+23° 27' 45\"",
    "magnitude": 2.01,
    "mythology": "The native Sangam Tamil name for the first segment of the night sky, symbolizing the swift cosmic horse marking the dawn of the celestial track."
  },
  {
    "tamilName": "Aduppu (அடுப்பு)",
    "literalMeaning": "The Hearth / Cooking Stove",
    "modernName": "Sheratan (Beta Arietis)",
    "rightAscension": "01h 54m 38.4s",
    "declination": "+20° 48' 29\"",
    "magnitude": 2.64,
    "mythology": "Named for its distinct three-stone triangular orientation in the night sky, personified as the celestial cooking hearth."
  },
  {
    "tamilName": "Aral / Aru-Meen (ஆரல்)",
    "literalMeaning": "The Sharp Weapon / The Six Stars",
    "modernName": "Alcyone (Eta Tauri / Pleiades)",
    "rightAscension": "03h 47m 29.1s",
    "declination": "+24° 06' 18\"",
    "magnitude": 2.85,
    "mythology": "Deeply revered in classical Tamil literature as a fire spike or sharp weapon. Associated with Murugan (Karthikeya) and the six celestial maidens."
  },
  {
    "tamilName": "Chakkaram / Chem-Meen (சக்கரம்)",
    "literalMeaning": "The Wheel / The Red Star",
    "modernName": "Aldebaran (Alpha Tauri)",
    "rightAscension": "04h 35m 55.2s",
    "declination": "+16° 30' 33\"",
    "magnitude": 0.85,
    "mythology": "Celebrated for its brilliant reddish hue, it was envisioned as a cosmic chariot wheel driving the celestial timeline forward."
  },
  {
    "tamilName": "Maan-Thalai (மான்தலை)",
    "literalMeaning": "The Deer's Head",
    "modernName": "Meissa (Lambda Orionis)",
    "rightAscension": "05h 35m 08.3s",
    "declination": "+09° 56' 03\"",
    "magnitude": 3.39,
    "mythology": "Tracked by ancient Tamil astronomers as the delicate head of a celestial deer leaping across the Orion region."
  },
  {
    "tamilName": "Moothirai (மூதிரை)",
    "literalMeaning": "The Rain Drop / Tear Drop",
    "modernName": "Betelgeuse (Alpha Orionis)",
    "rightAscension": "05h 55m 10.3s",
    "declination": "+07° 24' 25\"",
    "magnitude": 0.50,
    "mythology": "A massive red supergiant seen as a singular, heavy cosmic droplet, marking shifts in moisture and seasonal atmosphere."
  },
  {
    "tamilName": "Kazhai (கழை)",
    "literalMeaning": "The Bamboo Stalk",
    "modernName": "Castor (Alpha Geminorum)",
    "rightAscension": "07h 34m 36.0s",
    "declination": "+31° 53' 18\"",
    "magnitude": 1.58,
    "mythology": "Personified as a straight, rigid bamboo stalk holding up structural points of the northern sky pathway."
  },
  {
    "tamilName": "Kaarkulam (காற்குளம்)",
    "literalMeaning": "The Rain Pond",
    "modernName": "Asellus Australis (Delta Cancri)",
    "rightAscension": "08h 44m 41.1s",
    "declination": "+18° 09' 15\"",
    "magnitude": 3.94,
    "mythology": "A stellar region tracked in early Tamil culture to predict precipitation levels and the filling of irrigation tanks."
  },
  {
    "tamilName": "Kat-Chevi (கட்செவி)",
    "literalMeaning": "The Snake (Eye-Ear)",
    "modernName": "Alphard (Alpha Hydrae)",
    "rightAscension": "09h 27m 35.2s",
    "declination": "-08° 39' 31\"",
    "magnitude": 1.99,
    "mythology": "Literally translating to 'Eye-Ear', mapping the stealthy nature of a serpent guarding the dark equatorial skies."
  },
  {
    "tamilName": "Kodu-Nugam (கொடுநுகம்)",
    "literalMeaning": "The Curved Yoke / Plough Handle",
    "modernName": "Regulus (Alpha Leonis)",
    "rightAscension": "10h 08m 22.3s",
    "declination": "+11° 58' 02\"",
    "magnitude": 1.35,
    "mythology": "An immensely bright star visualized as the curved handle of a heavy agricultural plough, tying astronomy directly to farming cycles."
  },
  {
    "tamilName": "Vada-Meen (வடமீன்)",
    "literalMeaning": "The Northern Star",
    "modernName": "Alcor (80 Ursae Majoris)",
    "rightAscension": "13h 25m 13.5s",
    "declination": "+54° 59' 17\"",
    "magnitude": 3.99,
    "mythology": "An essential northern binary point frequently cited in Sangam literature as a symbol of structural balance and marital fidelity."
  },
  {
    "tamilName": "Mudhal-Meen (முதல்மீன்)",
    "literalMeaning": "The First Star",
    "modernName": "Shaula (Lambda Scorpii)",
    "rightAscension": "17h 33m 36.5s",
    "declination": "-37° 06' 14\"",
    "magnitude": 1.62,
    "mythology": "Located directly toward the dense Galactic Center, recognized by Tamil stargazers as the foundational root or origin star."
  }
],
    calendar: {
      title: 'Tamil Calendar — Panchangam and the 60-Year Cycle',
      system: 'The Tamil calendar is a lunisolar system based on the 60-year (Sashti Abdha) cycle of Jupiter, integrated with Vedic Panchanga elements. The Tamil solar month begins when the sun transits into each zodiac sign (Rashi Sankraman). Month names are derived from the ruling nakshatra at full moon.',
      math: [
        'Tamil Solar Month = Sun\'s transit through each rashi (zodiac sign)',
        'Average Tamil solar month = 30.44 days (varies by elliptical orbit)',
        'Tamil Year = 12 solar months (365.25 days approximately)',
        'Jupiter takes ~11.86 years to orbit Sun',
        '60-year cycle = 5 × 12 (Jupiter years) = ~59.3 Jupiter years ≈ 60 solar years',
        'Yugadi (Tamil New Year) = Day after Amavasya (new moon) in Chithirai',
        'Pongal = Winter solstice + 23 days (Uttarayan, when sun enters Capricorn)'
      ],
      cycles: [
        { name: 'Tamil Solar Month', val: '~30.44 days (solar)' },
        { name: 'Lunar Month (Tamil)', val: '29.53 days' },
        { name: 'Tamil Solar Year', val: '365.25 days' },
        { name: 'Jupiter Sidereal Period', val: '11.862 solar years' },
        { name: '60-Year Cycle (Sashti Abdha)', val: '60 Tamil years' },
        { name: 'Pongal (Winter Solstice festival)', val: 'Jan 14–15 (solar)' },
        { name: 'Karthigai Deepam', val: 'Full moon in Karthikai month' },
        { name: 'Aadi Perukku', val: '18th day of Aadi month (river festival)' }
      ],
      lore: 'The Tolkappiyam (c. 3rd century BC), the oldest extant Tamil grammar, maps the poetic landscape (Akam/Puram) onto astronomical time. The five tinai landscapes correspond to five times of day, five seasons, and five star groups. Tamil astronomers independently developed the Surya Siddhanta (c. 400 AD) astronomical system, calculating the sidereal year to extraordinary precision. Thiruvalluvar\'s Tirukkural, written c. 200 BC–200 AD, references celestial order as the foundation of ethical life.'
    }
  },

  china: {
    name: 'Imperial China',
    themeClass: 'theme-china',
    accent: '#C81428',
    bgImage: '',

    deities: [
      {
        id: 'fuxi',
        name: 'Fuxi (伏羲)',
        role: 'The Heavenly Sovereign — First of the Three August Ones',
        domains: ['Heaven','Creation','Wisdom','Order'],
        img: '',
        myth: 'Fuxi, the Heavenly Sovereign of the Three August Ones (Sanhuang), is the culture hero who first ordered the cosmos for humankind. Depicted as a serpent-bodied being whose intertwined tail with his sister-consort Nüwa forms the double spiral of creation, he raised the human race after the great flood. He watched the patterns of heaven and earth and drew the eight trigrams (bagua) that underlie the I Ching; he invented the fishing net, domesticated animals, instituted marriage, and composed the first music. He is the beginning of Chinese civilisation itself — the form of Heaven among the three sovereigns.',
        stats: { title: 'Tianhuang — the Heavenly Sovereign', inventions: 'Bagua trigrams, fishing nets, marriage', form: 'Human-headed serpent (with Nüwa)', number: 'First of the Sanhuang (三皇)' }
      },
      {
        id: 'shennong',
        name: 'Shennong (神农)',
        role: 'The Earthly Sovereign — The Divine Farmer',
        domains: ['Agriculture','Medicine','Earth','Healing'],
        img: '',
        myth: 'Shennong, the Earthly Sovereign of the Three August Ones, is the Divine Farmer who taught humanity the plough. Blessed with a transparent belly through which he could watch his own digestion, he tasted hundreds of wild herbs upon his own body to learn which healed and which killed — he is the legendary author of the Shennong Bencao Jing, the oldest Chinese pharmacopoeia. He invented the wooden plough (lei), the hoe, the marketplace, and the cultivation of the five grains. Tradition says he died from a poisonous herb he dared to taste — the ultimate sacrifice of the healer — the form of Earth among the three sovereigns.',
        stats: { title: 'Dihuang — the Earthly Sovereign', inventions: 'Plough, five grains, herbal medicine', text: 'Shennong Bencao Jing (pharmacopoeia)', form: 'Transparent jade-green belly' }
      },
      {
        id: 'huangdi',
        name: 'Huangdi (黄帝)',
        role: 'The Yellow Emperor — Ancestor of the Huaxia',
        domains: ['Statecraft','War','Medicine','Civilisation'],
        img: '',
        myth: 'Huangdi, the Yellow Emperor, is the sovereign who unified the warring tribes at the Battle of Zhuolu, defeating the rebel Chiyou and his fog-wizards with the south-pointing chariot that pierced the enchanted mists. All Chinese people call themselves his descendants. He is credited with the Huangdi Neijing, the foundational text of Chinese medicine, as well as the calendar, the compass, the bow and the boat, while his consort Leizu discovered silk. In the Shiji he stands at the head of all history — the human sovereign among the three, the ancestor of emperors and of the nation.',
        stats: { title: 'Huangdi — the Yellow Emperor', battle: 'Zhuolu, against Chiyou', text: 'Huangdi Neijing (medicine)', consort: 'Leizu, discoverer of silk' }
      }
    ],    stars: [
  {
    "chineseMansion": "Jiǎo (角)",
    "literalMeaning": "The Horn",
    "modernName": "Spica (Alpha Virginis)",
    "rightAscension": "13h 25m 11.6s",
    "declination": "-11° 09' 41\"",
    "magnitude": 0.98,
    "mythology": "The literal horn of the Azure Dragon marking the start of the spring season. Used in China to predict agricultural timelines, while its Vedic parallel Chitrā marked the transition into spring months."
  },
  {
    "chineseMansion": "Dī (氐)",
    "literalMeaning": "The Root or Base",
    "modernName": "Zubenelgenubi (Alpha Librae)",
    "rightAscension": "14h 50m 52.7s",
    "declination": "-16° 02' 30\"",
    "magnitude": 2.75,
    "mythology": "Tracked as the foundational root base of the Azure Dragon constellation. Its split shape was mirrored in the Vedic system as Viśākhā, a wide triumphal arch."
  },
  {
    "chineseMansion": "Xīn (心)",
    "literalMeaning": "The Heart",
    "modernName": "Antares (Alpha Scorpii)",
    "rightAscension": "16h 29m 24.4s",
    "declination": "-26° 25' 55\"",
    "magnitude": 1.06,
    "mythology": "Tracked explicitly as the 'Heart of the Dragon.' Imperial astronomers used its intense red color variations to predict the personal fortune and health of the Emperor."
  },
  {
    "chineseMansion": "Shì (室)",
    "literalMeaning": "The Encampment",
    "modernName": "Markab (Alpha Pegasi)",
    "rightAscension": "23h 04m 45.7s",
    "declination": "+15° 12' 19\"",
    "magnitude": 2.49,
    "mythology": "Used by Chinese astronomers as a cosmic blueprint to schedule the physical construction and architectural layout of imperial palace grounds during autumn."
  },
  {
    "chineseMansion": "Lóu (婁)",
    "literalMeaning": "The Bond or Lasso",
    "modernName": "Sheratan (Beta Arietis)",
    "rightAscension": "01h 54m 38.4s",
    "declination": "+20° 48' 29\"",
    "magnitude": 2.64,
    "mythology": "Tracked as a celestial gathering hub used to coordinate national trade markets, livestock assemblies, and seasonal gatherings."
  },
  {
    "chineseMansion": "Mǎo (昴)",
    "literalMeaning": "The Hairy Head",
    "modernName": "Alcyone (Eta Tauri / Pleiades)",
    "rightAscension": "03h 47m 29.1s",
    "declination": "+24° 06' 18\"",
    "magnitude": 2.85,
    "mythology": "A dense cluster representing an old warrior's head, heavily utilized to calculate the exact timing for late-autumn agricultural harvests."
  },
  {
    "chineseMansion": "Zī (觜)",
    "literalMeaning": "The Turtle Beak",
    "modernName": "Meissa (Lambda Orionis)",
    "rightAscension": "05h 35m 08.3s",
    "declination": "+09° 56' 03\"",
    "magnitude": 3.39,
    "mythology": "Located at the tip of Orion, Chinese stargazers mapped this grouping as the sharp beak of a protective celestial turtle."
  },
  {
    "chineseMansion": "Xīng (星)",
    "literalMeaning": "The Star",
    "modernName": "Alphard (Alpha Hydrae)",
    "rightAscension": "09h 27m 35.2s",
    "declination": "-08° 39' 31\"",
    "magnitude": 1.99,
    "mythology": "A solitary bright star in a dark void. Used by imperial court astronomers as a major baseline clock star to determine the absolute peak of mid-summer."
  },
  {
    "chineseMansion": "Zhāng (张)",
    "literalMeaning": "The Extended Net",
    "modernName": "Upsilon-1 Hydrae",
    "rightAscension": "10h 49m 33.9s",
    "declination": "-14° 49' 26\"",
    "magnitude": 3.87,
    "mythology": "The spread net of the Vermilion Bird, strung between Hydra and Crater; governed feasting and the opening of the hunting season."
  },
  {
    "chineseMansion": "Yì (翼)",
    "literalMeaning": "The Wings",
    "modernName": "Alpha Crateris (Alkes)",
    "rightAscension": "10h 59m 47.5s",
    "declination": "-18° 18' 11\"",
    "magnitude": 4.07,
    "mythology": "The wings of the Vermilion Bird themselves; a mansion of music, dance, and the harmonising of distant travellers."
  },
  {
    "chineseMansion": "Zhěn (軫)",
    "literalMeaning": "The Chariot",
    "modernName": "Algorab (Gamma Corvi)",
    "rightAscension": "12h 15m 48.4s",
    "declination": "-17° 32' 31\"",
    "magnitude": 2.93,
    "mythology": "A five-star cluster grouped together by Chinese observers to represent the sturdy, square structural base of a moving imperial war chariot."
  },
  {
    "chineseMansion": "Kàng (亢)",
    "literalMeaning": "The Neck",
    "modernName": "Kappa Virginis",
    "rightAscension": "14h 12m 53.7s",
    "declination": "-10° 16' 27\"",
    "magnitude": 4.15,
    "mythology": "Anchored on this dim star to map the physical neck of the Azure Dragon. Contrastingly, the Vedic system ignored this star entirely, opting for the ultra-bright Arcturus."
  },
  {
    "chineseMansion": "Fáng (房)",
    "literalMeaning": "The Room",
    "modernName": "Pi Scorpii",
    "rightAscension": "15h 58m 51.1s",
    "declination": "-26° 06' 51\"",
    "magnitude": 2.89,
    "mythology": "Anchored on the side of the constellation to mark the inner chamber of the Dragon framework. The Vedic parallel Anurādhā instead used Delta Scorpii."
  },
  {
    "chineseMansion": "Wěi (尾)",
    "literalMeaning": "The Tail",
    "modernName": "Mu-1 Scorpii",
    "rightAscension": "16h 51m 52.2s",
    "declination": "-38° 02' 50\"",
    "magnitude": 3.01,
    "mythology": "Tracks the powerful curling tail of the Azure Dragon. While both cultures saw a tail here, the Vedic system anchored Mūla on the brighter stinger star, Shaula."
  },
  {
    "chineseMansion": "Jī (箕)",
    "literalMeaning": "The Winnowing Basket",
    "modernName": "Gamma Sagittarii",
    "rightAscension": "18h 05m 48.5s",
    "declination": "-29° 34' 48\"",
    "magnitude": 2.98,
    "mythology": "Used to form the crucial outer corner of an agricultural winnowing basket, mapping farming tools into the sky."
  },
  {
    "chineseMansion": "Dǒu (斗)",
    "literalMeaning": "The Dipper",
    "modernName": "Phi Sagittarii",
    "rightAscension": "18h 45m 39.3s",
    "declination": "-26° 59' 27\"",
    "magnitude": 3.17,
    "mythology": "Used to map out the functional handle of the Southern Dipper within the Black Tortoise quadrant."
  },
  {
    "chineseMansion": "Niú (牛)",
    "literalMeaning": "The Ox",
    "modernName": "Beta Capricorni",
    "rightAscension": "20h 21m 00.6s",
    "declination": "-14° 46' 53\"",
    "magnitude": 3.05,
    "mythology": "Tracked along the ecliptic to dictate the state herding seasons. This sits at a massive physical distance gap from its Vedic counterpart Abhijit (Vega)."
  },
  {
    "chineseMansion": "Nǚ (女)",
    "literalMeaning": "The Girl",
    "modernName": "Epsilon Aquarii",
    "rightAscension": "20h 47m 40.5s",
    "declination": "-09° 29' 45\"",
    "magnitude": 4.77,
    "mythology": "A dim star tracked inside the northern quadrant. The Vedic Aryans completely bypassed this faint patch of sky to anchor on the brilliant star Altair."
  },
  {
    "chineseMansion": "Xū (虛)",
    "literalMeaning": "The Emptiness",
    "modernName": "Beta Aquarii",
    "rightAscension": "21h 31m 33.5s",
    "declination": "-05° 34' 16\"",
    "magnitude": 2.91,
    "mythology": "Marked a bleak, stark winter void in the imperial calendar system, whereas the Vedic parallel tracked the compact diamond of Delphinus."
  },
  {
    "chineseMansion": "Wēi (危)",
    "literalMeaning": "The Rooftop",
    "modernName": "Alpha Aquarii",
    "rightAscension": "22h 05m 47.0s",
    "declination": "-00° 19' 11\"",
    "magnitude": 2.95,
    "mythology": "Visualized as the structural peak of a high roof ridge. Its Vedic counterpart focused instead on a hundred celestial healers anchored at Gamma Aquarii."
  },
  {
    "chineseMansion": "Bì (壁)",
    "literalMeaning": "The Wall",
    "modernName": "Gamma Pegasi",
    "rightAscension": "00h 13m 14.2s",
    "declination": "+15° 11' 01\"",
    "magnitude": 2.83,
    "mythology": "Mapped to represent the fortified eastern boundary wall protecting the celestial imperial palace grounds."
  },
  {
    "chineseMansion": "Kuí (奎)",
    "literalMeaning": "The Legs",
    "modernName": "Eta Andromedae",
    "rightAscension": "00h 57m 12.4s",
    "declination": "+23° 25' 04\"",
    "magnitude": 4.42,
    "mythology": "Tracked to carefully construct the wide, striding legs of a great celestial figure walking across the western sky."
  },
  {
    "chineseMansion": "Wèi (胃)",
    "literalMeaning": "The Stomach",
    "modernName": "35 Arietis",
    "rightAscension": "02h 43m 27.1s",
    "declination": "+12° 14' 17\"",
    "magnitude": 4.65,
    "mythology": "Chosen specifically to represent the swelling stomach of a fat, prosperous imperial food granary."
  },
  {
    "chineseMansion": "Bì (畢)",
    "literalMeaning": "The Net",
    "modernName": "Epsilon Tauri",
    "rightAscension": "04h 28m 36.9s",
    "declination": "+19° 10' 49\"",
    "magnitude": 3.53,
    "mythology": "Marks the upper trapping edge of an active celestial hunting net, while its Vedic counterpart focused heavily on the red giant star Aldebaran."
  },
  {
    "chineseMansion": "Shēn (参)",
    "literalMeaning": "Three Stars",
    "modernName": "Zeta Orionis",
    "rightAscension": "05h 40m 45.5s",
    "declination": "-01° 56' 34\"",
    "magnitude": 1.74,
    "mythology": "Anchored directly on Orion's Belt to track three legendary warriors standing in unison. The Vedic system skipped the belt entirely for Betelgeuse."
  },
  {
    "chineseMansion": "Jǐng (井)",
    "literalMeaning": "The Well",
    "modernName": "Mu Geminorum",
    "rightAscension": "06h 22m 57.6s",
    "declination": "+22° 30' 49\"",
    "magnitude": 2.87,
    "mythology": "Marks the boundary opening of the celestial well within the Vermilion Bird quadrant, tracking moisture and cosmic water sources."
  },
  {
    "chineseMansion": "Guǐ (鬼)",
    "literalMeaning": "The Ghost",
    "modernName": "Theta Cancri",
    "rightAscension": "08h 32m 42.0s",
    "declination": "+18° 05' 00\"",
    "magnitude": 5.33,
    "mythology": "The Ghost mansion wraps the misty Praesepe cluster (M44), read by Chinese sky-watchers as a vaporous ghost-fog; an inauspicious mansion governing the spirits of the dead."
  },
  {
    "chineseMansion": "Liǔ (柳)",
    "literalMeaning": "The Willow",
    "modernName": "Delta Hydrae",
    "rightAscension": "08h 37m 39.4s",
    "declination": "+05° 42' 13\"",
    "magnitude": 4.14,
    "mythology": "A drooping willow bough on the neck of the Vermilion Bird; its heliacal rising marked the wood-cutting and mourning rites."
  },],
    calendar: {
      title: 'Chinese Lunisolar Calendar — Heavenly Stems and Earthly Branches',
      system: 'The Chinese calendar is lunisolar — months follow the Moon, while the year tracks the Sun, with intercalary months added every ~3 years. Its most distinctive feature is the sexagenary cycle: 10 Heavenly Stems (Tiangan) × 12 Earthly Branches (Dizhi) = 60-year cycle, governing personal fate, politics, and cosmic rhythm.',
      math: [
        'Sexagenary Cycle = LCM(10,12) = 60 years',
        'Chinese Mean Synodic Month = 29.530585 days (excellent precision)',
        'Chinese Tropical Year (4th c. BC) = 365.25 days',
        'Intercalary month (Runyue) added when no major solar term falls in month',
        '24 Solar Terms (Jieqi): sun moves 15° along ecliptic = ~15.2 days',
        'Metonic-equivalent: 7 leap months per 19 years = 235 months',
        'Jupiter 12-year cycle = matches 12 Earthly Branches (animals)',
        'Saturn 60-year period ≈ 5 × Jupiter orbit (near-coincidence)'
      ],
      cycles: [
        { name: 'Chinese Lunar Month', val: '29 or 30 days' },
        { name: '10 Heavenly Stems (Tiangan)', val: 'Jiǎ Yi Bǐng Dīng Wù Jǐ Gēng Xīn Rén Guǐ' },
        { name: '12 Earthly Branches (Dizhi)', val: 'Rat Ox Tiger Rabbit Dragon Snake Horse Goat Monkey Rooster Dog Pig' },
        { name: 'Sexagenary Cycle', val: '60 years' },
        { name: '24 Solar Terms (Jieqi)', val: '~15.2 days each (sun 15°)' },
        { name: 'Jupiter Sidereal Year', val: '11.86 years (12-branch match)' },
        { name: 'Chinese Solar Year', val: '365.2422 days' },
        { name: 'Runyue (Leap Month)', val: '7 months per 19-year cycle' }
      ],
      lore: 'The oracle bones of the Shang Dynasty (c. 1200 BC) contain the earliest written astronomical records in China — solar and lunar eclipse observations, records of new moons, and the sexagenary cycle. The Shi Jing (Book of Odes, c. 1000 BC) references stars as seasonal markers for agriculture. The Han Dynasty astronomer Zhang Heng (78–139 AD) built the first seismoscope and an armillary sphere driven by a water-clock. Chinese astronomers recorded supernovae that modern astronomers identify as known remnants — the Crab Nebula (SN 1054 AD) was observed as a "guest star" visible in daylight for 23 days.'
    }
  }
};

/* ============================================================
   CIVILIZATION TIMELINE BOUNDARIES
   Maps each civilization key to its historically active epoch range.
   ============================================================ */
const CIV_TIMELINES = {
  egypt:   { min: -6000,  max: -1000, step: 1, label: 'Ancient Egyptians (6000 BC – 1000 BC)' },
  vedic:   { min: -7000,  max: -2000, step: 1, label: 'Vedic Indians (7000 BC – 2000 BC)' },
  sangam:  { min: -300,   max: 300,   step: 1, label: 'Sangam Indians (300 BC – 300 AD)' },
  babylon: { min: -4000,  max: -2000, step: 1, label: 'Babylonia (4000 BC – 2000 BC)' },
  china:   { min: -3000,  max: 1000,  step: 1, label: 'Imperial China (3000 BC – 1000 AD)' },
  greece:  { min: -1000,  max: 1,     step: 1, label: 'Ancient Greeks (1000 BC – 1 AD)' },
  aztec:   { min: 1300,   max: 1500,  step: 1, label: 'Aztec Empire (1300 AD – 1500 AD)' },
  maya:    { min: -2000,  max: 1500,  step: 1, label: 'Maya Civilization (2000 BC – 1500 AD)' },
  inca:    { min: 1200,   max: 1500,  step: 1, label: 'Inca Empire (1200 AD – 1500 AD)' }
};


/* ============================================================
   PRECESSION ALGORITHM
   Approximate axial precession: ~1° per 71.6 years (26,000 year cycle)
   We shift star coordinates based on years from J2000.0 (year 2000 AD)
   ============================================================ */
function precess(ra, dec, yearCE) {
  const T = (yearCE - 2000) / 100; // Julian centuries from J2000
  // IAU 1976 precession angles (arcsec): zeta, z, theta
  const zeta = (2306.2181 * T + 0.30188 * T * T + 0.017998 * T ** 3) / 3600 * Math.PI / 180;
  const z    = (2306.2181 * T + 1.09468 * T * T + 0.018203 * T ** 3) / 3600 * Math.PI / 180;
  const th   = (2004.3109 * T - 0.42665 * T * T - 0.041833 * T ** 3) / 3600 * Math.PI / 180;
  const raR = ra * Math.PI / 180;
  const decR = dec * Math.PI / 180;
  const cosDec = Math.cos(decR);
  const A = cosDec * Math.sin(raR + zeta);
  const B = Math.cos(th) * cosDec * Math.cos(raR + zeta) - Math.sin(th) * Math.sin(decR);
  const C = Math.sin(th) * cosDec * Math.cos(raR + zeta) + Math.cos(th) * Math.sin(decR);
  let newRA = (Math.atan2(A, B) + z) * 180 / Math.PI;
  newRA = ((newRA % 360) + 360) % 360;
  const newDec = Math.asin(Math.max(-1, Math.min(1, C))) * 180 / Math.PI;
  return { ra: newRA, dec: newDec };
}

/* ============================================================
   STATE
   ============================================================ */
let state = {
  activeCiv: 'vedic',
  epochYear: -2000,
  activeTab: 'calendar',
  hoveredStar: null
};

/* ============================================================
   DOM REFERENCES
   ============================================================ */
const $ = id => document.getElementById(id);
const body = document.body;
const bgLayer = $('bg-layer');
const epochDisplay = $('epoch-display');
const epochSlider = $('epoch-slider');
const deityGrid = $('deity-grid');
const deityTitle = $('deity-section-title');
const starmapCanvas = $('starmap-canvas');
const starmapCtx = starmapCanvas.getContext('2d');
const starInfoBar = $('star-info-bar');
const calendarContent = $('calendar-content');
const cyclesContent = $('cycles-content');
const loreContent = $('lore-content');
const footerCivName = $('footer-civ-name');
const modalOverlay = $('modal-overlay');
const modalContent = $('modal-content');
const modalClose = $('modal-close');

/* ============================================================
   AMBIENT STAR CANVAS (background)
   ============================================================ */
const starBgCanvas = $('star-canvas');
const starBgCtx = starBgCanvas.getContext('2d');
let bgStars = [];

function initBgStars() {
  starBgCanvas.width = window.innerWidth;
  starBgCanvas.height = window.innerHeight;
  bgStars = [];
  for (let i = 0; i < 380; i++) {
    bgStars.push({
      x: Math.random() * starBgCanvas.width,
      y: Math.random() * starBgCanvas.height,
      r: Math.random() * 1.2 + 0.2,
      a: Math.random(),
      da: (Math.random() - 0.5) * 0.004
    });
  }
}

function drawBgStars() {
  starBgCtx.clearRect(0, 0, starBgCanvas.width, starBgCanvas.height);
  bgStars.forEach(s => {
    s.a += s.da;
    if (s.a > 1) { s.a = 1; s.da *= -1; }
    if (s.a < 0.1) { s.a = 0.1; s.da *= -1; }
    starBgCtx.beginPath();
    starBgCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    starBgCtx.fillStyle = `rgba(255,255,255,${s.a})`;
    starBgCtx.fill();
  });
  requestAnimationFrame(drawBgStars);
}

window.addEventListener('resize', () => {
  initBgStars();
});

/* ============================================================
   STARMAP RENDERER
   ============================================================ */
let starmapStars = []; // {x, y, r, color, name, modern, data}
let starmapClouds = []; // {x, y, rx, ry, cloud} — Inca dark-cloud constellations

function drawStarmap() {
  const civ = CIVS[state.activeCiv];
  const W = starmapCanvas.width;
  const H = starmapCanvas.height;
  starmapCtx.clearRect(0, 0, W, H);

  // Background gradient
  const grad = starmapCtx.createRadialGradient(W/2, H/2, 0, W/2, H/2, W/2);
  grad.addColorStop(0, '#0a0a20');
  grad.addColorStop(1, '#010108');
  starmapCtx.fillStyle = grad;
  starmapCtx.fillRect(0, 0, W, H);

  // Draw grid lines (RA/DEC)
  starmapCtx.strokeStyle = 'rgba(255,255,255,0.04)';
  starmapCtx.lineWidth = 0.5;
  for (let i = 0; i <= 6; i++) {
    const x = (i / 6) * W;
    starmapCtx.beginPath();
    starmapCtx.moveTo(x, 0);
    starmapCtx.lineTo(x, H);
    starmapCtx.stroke();
  }
  for (let i = 0; i <= 4; i++) {
    const y = (i / 4) * H;
    starmapCtx.beginPath();
    starmapCtx.moveTo(0, y);
    starmapCtx.lineTo(W, y);
    starmapCtx.stroke();
  }

  // Milky Way smear
  const mwGrad = starmapCtx.createLinearGradient(0, H * 0.6, W, H * 0.2);
  mwGrad.addColorStop(0, 'rgba(100,120,200,0.0)');
  mwGrad.addColorStop(0.3, 'rgba(100,120,200,0.06)');
  mwGrad.addColorStop(0.6, 'rgba(140,160,240,0.10)');
  mwGrad.addColorStop(1, 'rgba(100,120,200,0.0)');
  starmapCtx.fillStyle = mwGrad;
  starmapCtx.fillRect(0, 0, W, H);

  // Background random field stars
  const rng = (seed) => { let s = seed; return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; }; };
  const rand = rng(42 + state.epochYear);
  for (let i = 0; i < 200; i++) {
    const fx = rand() * W;
    const fy = rand() * H;
    const fr = rand() * 0.8 + 0.2;
    const fa = rand() * 0.4 + 0.1;
    starmapCtx.beginPath();
    starmapCtx.arc(fx, fy, fr, 0, Math.PI * 2);
    starmapCtx.fillStyle = `rgba(200,220,255,${fa})`;
    starmapCtx.fill();
  }

  // Inca dark-cloud constellations (yana phuyu) — drawn as soft black voids
  starmapClouds = [];
  if (state.activeCiv === 'inca' && civ.darkClouds) {
    civ.darkClouds.forEach(cloud => {
      const p = precess(cloud.ra0, cloud.dec0, state.epochYear);
      const x = ((p.ra / 360) * W * 1.2 - W * 0.1 + W) % W;
      const y = H * 0.5 - (p.dec / 90) * (H * 0.45);
      const pxPerDegX = (W * 1.2) / 360;
      const pxPerDegY = (H * 0.45) / 90;
      const rx = Math.max(6, (cloud.width / 2) * pxPerDegX);
      const ry = Math.max(5, (cloud.height / 2) * pxPerDegY);
      const rot = (cloud.angle || 0) * Math.PI / 180;
      const rMax = Math.max(rx, ry);
      starmapCtx.save();
      starmapCtx.translate(x, y);
      starmapCtx.rotate(rot);
      starmapCtx.scale(1, ry / rMax);
      const cGrad = starmapCtx.createRadialGradient(0, 0, 0, 0, 0, rMax);
      cGrad.addColorStop(0, 'rgba(1,1,10,0.94)');
      cGrad.addColorStop(0.55, 'rgba(2,2,14,0.72)');
      cGrad.addColorStop(1, 'rgba(2,2,14,0)');
      starmapCtx.beginPath();
      starmapCtx.arc(0, 0, rMax, 0, Math.PI * 2);
      starmapCtx.fillStyle = cGrad;
      starmapCtx.fill();
      starmapCtx.restore();
      starmapCtx.fillStyle = 'rgba(185,175,215,0.85)';
      starmapCtx.font = 'italic 11px Cinzel, serif';
      starmapCtx.fillText(cloud.name, x + rx * 0.7 + 6, y + ry * 0.7 + 4);
      starmapClouds.push({
        x, y, rx, ry,
        star: {
          _name: cloud.name,
          _modern: 'Dark Nebula (Yana Phuyu)',
          _mag: '—',
          _color: '#9B8EC4',
          _myth: cloud.mythology,
          _ra0: cloud.ra0,
          _dec0: cloud.dec0,
          mass: '—', distance: '—', radius: '—',
          literalMeaning: cloud.literalMeaning
        }
      });
    });
  }

  // Draw civilization stars with precession
  starmapStars = [];
  const accent = CIVS[state.activeCiv].accent;

  civ.stars.forEach((star, idx) => {
    // Normalize multi-schema star objects
    const starName = star.name || star.aztecName || star.mayaName || star.incaName || star.tamilName || star.chineseMansion || 'Unknown';
    const starModern = star.modern || star.modernName || '';
    const starMag = (star.mag !== undefined) ? star.mag : (star.magnitude !== undefined ? star.magnitude : 3.0);
    const starColor = star.color || '#FFE0C0';
    const starMyth = star.myth || star.mythology || '';

    // For multi-schema stars without ra0/dec0, parse from RA/Dec strings
    let ra0 = star.ra0;
    let dec0 = star.dec0;
    if (ra0 === undefined && star.rightAscension) {
      const rm = star.rightAscension.match(/(\d+)h\s*(\d+)m\s*([\d.]+)s/);
      if (rm) ra0 = (parseFloat(rm[1]) + parseFloat(rm[2])/60 + parseFloat(rm[3])/3600) * 15;
    }
    if (dec0 === undefined && star.declination) {
      const dm = star.declination.match(/([+-]?)(\d+)[°\s]+(\d+)['\'\s]+(\d+)/);
      if (dm) dec0 = (dm[1] === '-' ? -1 : 1) * (parseFloat(dm[2]) + parseFloat(dm[3])/60 + parseFloat(dm[4])/3600);
    }
    if (ra0 === undefined) ra0 = (idx / civ.stars.length) * 360;
    if (dec0 === undefined) dec0 = 0;

    const yearCE = state.epochYear;
    const p = precess(ra0, dec0, yearCE);
    const x = ((p.ra / 360) * W * 1.2 - W * 0.1 + W) % W;
    const y = H * 0.5 - (p.dec / 90) * (H * 0.45);
    const r = 3.5 + (3 - starMag) * 1.2;
    const clampedR = Math.max(2, Math.min(12, r));

    // Glow
    const glow = starmapCtx.createRadialGradient(x, y, 0, x, y, clampedR * 3);
    glow.addColorStop(0, starColor + 'CC');
    glow.addColorStop(0.5, starColor + '44');
    glow.addColorStop(1, 'transparent');
    starmapCtx.beginPath();
    starmapCtx.arc(x, y, clampedR * 3, 0, Math.PI * 2);
    starmapCtx.fillStyle = glow;
    starmapCtx.fill();

    // Star body
    starmapCtx.beginPath();
    starmapCtx.arc(x, y, clampedR, 0, Math.PI * 2);
    starmapCtx.fillStyle = starColor;
    starmapCtx.fill();

    // Label
    starmapCtx.fillStyle = 'rgba(220,200,160,0.85)';
    starmapCtx.font = `${idx === state.hoveredStar ? 'bold ' : ''}11px Cinzel, serif`;
    starmapCtx.fillText(starName, x + clampedR + 5, y + 4);

    // Store for click detection
    starmapStars.push({ x, y, r: clampedR, star: {...star, _name: starName, _modern: starModern, _mag: starMag, _color: starColor, _myth: starMyth, _ra0: ra0, _dec0: dec0 }, idx });
  });
}

starmapCanvas.addEventListener('mousemove', e => {
  const rect = starmapCanvas.getBoundingClientRect();
  const sx = (e.clientX - rect.left) * (starmapCanvas.width / rect.width);
  const sy = (e.clientY - rect.top) * (starmapCanvas.height / rect.height);
  let found = false;
  starmapStars.forEach((s, i) => {
    const d = Math.sqrt((sx - s.x) ** 2 + (sy - s.y) ** 2);
    if (d < s.r * 4) {
      starmapCanvas.style.cursor = 'pointer';
      const sn = s.star.name || s.star.aztecName || s.star.mayaName || s.star.incaName || s.star.tamilName || s.star.chineseMansion || 'Unknown';
      const sm = s.star.modern || s.star.modernName || '—';
      const smag = s.star.mag || s.star.magnitude || '—';
      const sdist = s.star.distance || '—';
      starInfoBar.innerHTML = `<strong style="color:var(--acc1)">${sn}</strong> &mdash; ${sm} &mdash; Mag: ${smag} &mdash; Dist: ${sdist} &mdash; <em>click for full profile</em>`;
      found = true;
    }
  });
  if (!found) {
    starmapCanvas.style.cursor = 'crosshair';
    starInfoBar.innerHTML = '<span>Click a star to reveal its cosmic profile</span>';
  }
});

starmapCanvas.addEventListener('click', e => {
  const rect = starmapCanvas.getBoundingClientRect();
  const sx = (e.clientX - rect.left) * (starmapCanvas.width / rect.width);
  const sy = (e.clientY - rect.top) * (starmapCanvas.height / rect.height);
  starmapClouds.forEach(c => {
    const dx = (sx - c.x) / c.rx;
    const dy = (sy - c.y) / Math.max(c.ry, 1);
    if (dx * dx + dy * dy < 1) openStarModal(c.star);
  });
  starmapStars.forEach(s => {
    const d = Math.sqrt((sx - s.x) ** 2 + (sy - s.y) ** 2);
    if (d < s.r * 5) openStarModal(s.star);
  });
});

/* ============================================================
   EPOCH SLIDER
   ============================================================ */
epochSlider.addEventListener('input', e => {
  state.epochYear = parseInt(e.target.value);
  updateEpochDisplay();
  drawStarmap();
});

function formatEpochYear(yr) {
  return yr < 0 ? `${Math.abs(yr)} BC` : (yr === 0 ? '1 AD' : `${yr} AD`);
}

function updateEpochDisplay() {
  epochDisplay.textContent = formatEpochYear(state.epochYear);
}

/* ============================================================
   CIVILIZATION SWITCHER
   ============================================================ */
document.querySelectorAll('.civ-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.civ-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.activeCiv = btn.dataset.civ;
    loadCivilization(state.activeCiv);
  });
});

function loadCivilization(civKey) {
  const civ = CIVS[civKey];
  const timeline = CIV_TIMELINES[civKey] || { min: -10000, max: 2026 };

  // Snap epoch slider to civilization's boundaries and start at its beginning
  epochSlider.min = timeline.min;
  epochSlider.max = timeline.max;
  epochSlider.step = timeline.step || 1;
  state.epochYear = timeline.min;
  epochSlider.value = state.epochYear;
  state.epochYear = parseInt(epochSlider.value, 10);
  updateEpochDisplay();

  // Update visible slider range labels
  const minLabel = $('slider-min-label');
  const maxLabel = $('slider-max-label');
  const headerRange = $('epoch-range-label');
  if (minLabel) minLabel.textContent = formatEpochYear(timeline.min);
  if (maxLabel) maxLabel.textContent = formatEpochYear(timeline.max);
  if (headerRange) headerRange.textContent = `${formatEpochYear(timeline.min)} – ${formatEpochYear(timeline.max)}`;

  // Update slider label if element exists
  const sliderLabel = document.getElementById('timeline-label');
  if (sliderLabel) sliderLabel.textContent = timeline.label;

  // Theme swap
  body.className = civ.themeClass;

  // BG image
  if (civ.bgImage) {
    bgLayer.style.backgroundImage = `url('${civ.bgImage}')`;
    bgLayer.style.opacity = '0.18';
  } else {
    bgLayer.style.backgroundImage = '';
    bgLayer.style.opacity = '0';
  }

  // Footer
  footerCivName.textContent = civ.name;

  // Deity section title
  deityTitle.textContent = `${civ.name} — Divine Pantheon`;

  // Render deities
  renderDeities(civ);

  // Render calendar
  renderCalendar(civ);

  // Redraw starmap
  drawStarmap();

  // Animate sections
  document.querySelectorAll('.deity-section, .starmap-section, .calendar-section').forEach(el => {
    el.classList.remove('section-anim');
    void el.offsetWidth;
    el.classList.add('section-anim');
  });
}

/* ============================================================
   DEITY RENDERER
   ============================================================ */
function renderDeities(civ) {
  deityGrid.innerHTML = '';
  civ.deities.forEach(deity => {
    const card = document.createElement('div');
    card.className = 'deity-card';
    card.innerHTML = `
      <div class="deity-img-wrap">
        ${deity.img
          ? `<img src="${deity.img}" alt="${deity.name}" onerror="this.style.display='none';this.parentNode.querySelector('.deity-img-placeholder').style.display='flex'" />`
          : ''}
        <div class="deity-img-placeholder" style="${deity.img ? 'display:none' : 'display:flex'}">☽</div>
      </div>
      <div class="deity-info">
        <div class="deity-name">${deity.name}</div>
        <div class="deity-role">${deity.role}</div>
        <div class="deity-domain-tags">
          ${deity.domains.map(d => `<span class="deity-tag">${d}</span>`).join('')}
        </div>
      </div>
    `;
    card.addEventListener('click', () => openDeityModal(deity));
    deityGrid.appendChild(card);
  });
}

/* ============================================================
   CALENDAR RENDERER
   ============================================================ */
function renderCalendar(civ) {
  const cal = civ.calendar;

  // Calendar tab
  calendarContent.innerHTML = `
    <div class="cal-block">
      <div class="cal-block-title">${cal.title}</div>
      <div class="cal-block-body">${cal.system}</div>
    </div>
    <div class="cal-block">
      <div class="cal-block-title">Mathematical Framework</div>
      <div class="cal-math">${cal.math.join('\n')}</div>
    </div>
  `;

  // Cycles tab
  cyclesContent.innerHTML = `
    <div class="cal-block">
      <div class="cal-block-title">Time Cycle Registry</div>
      ${cal.cycles.map(c => `
        <div class="cycle-row">
          <span class="cycle-name">${c.name}</span>
          <span class="cycle-val">${c.val}</span>
        </div>
      `).join('')}
    </div>
  `;

  // Lore tab
  loreContent.innerHTML = `
    <div class="cal-block">
      <div class="cal-block-title">Cosmic Lore & Historical Context</div>
      <div class="cal-block-body" style="font-style:normal;line-height:1.8;">${cal.lore}</div>
    </div>
  `;
}

/* ============================================================
   TAB SWITCHING
   ============================================================ */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => { p.classList.remove('active'); p.classList.add('hidden'); });
    btn.classList.add('active');
    const panel = $(`tab-${btn.dataset.tab}`);
    panel.classList.remove('hidden');
    panel.classList.add('active');
    state.activeTab = btn.dataset.tab;
  });
});

/* ============================================================
   MODALS
   ============================================================ */
function openDeityModal(deity) {
  const statsRows = Object.entries(deity.stats).map(([k, v]) => `
    <div class="modal-stat-box">
      <div class="modal-stat-label">${k.replace(/_/g, ' ')}</div>
      <div class="modal-stat-value">${v}</div>
    </div>
  `).join('');

  modalContent.innerHTML = `
    ${deity.img ? `<img class="modal-img" src="${deity.img}" alt="${deity.name}" onerror="this.style.display='none'" />` : ''}
    <div class="modal-heading">${deity.name}</div>
    <div class="modal-sub">${deity.role}</div>
    <div class="deity-domain-tags" style="margin-bottom:1rem;">
      ${deity.domains.map(d => `<span class="deity-tag">${d}</span>`).join('')}
    </div>
    <div class="modal-section-title">Divine Profile</div>
    <div class="modal-stats">${statsRows}</div>
    <div class="modal-section-title">Sacred Mythology</div>
    <div class="modal-lore">${deity.myth}</div>
  `;
  modalOverlay.classList.remove('hidden');
}

function openStarModal(star) {
  // Use normalized underscore fields injected by drawStarmap, or fall back to raw fields
  const sName    = star._name    || star.name    || star.aztecName    || star.mayaName    || star.incaName    || star.tamilName    || star.chineseMansion || 'Unknown';
  const sModern  = star._modern  || star.modern  || star.modernName   || '—';
  const sMag     = star._mag     !== undefined ? star._mag     : (star.mag !== undefined ? star.mag : (star.magnitude !== undefined ? star.magnitude : '—'));
  const sColor   = star._color   || star.color   || '#FFE0C0';
  const sMyth    = star._myth    || star.myth    || star.mythology    || '—';
  const sMass    = star.mass     || '—';
  const sDist    = star.distance || '—';
  const sRadius  = star.radius   || '—';
  const sRa0     = star._ra0     !== undefined ? star._ra0 : (star.ra0 !== undefined ? star.ra0 : 0);
  const sDec0    = star._dec0    !== undefined ? star._dec0 : (star.dec0 !== undefined ? star.dec0 : 0);

  // Literal meaning if available
  const sLiteral = star.literalMeaning || '';

  const yearCE = state.epochYear;
  const p = precess(sRa0, sDec0, yearCE);
  const epochLabel = yearCE < 0 ? `${Math.abs(yearCE)} BC` : `${yearCE} AD`;
  const raHMS = decimalRaToHMS(p.ra);
  const decDMS = decimalDecToDMS(p.dec);

  modalContent.innerHTML = `
    <div style="text-align:center;margin-bottom:1rem;">
      <div style="font-size:3rem;color:${sColor};text-shadow:0 0 30px ${sColor}">★</div>
    </div>
    <div class="modal-heading">${sName}</div>
    ${sLiteral ? `<div class="modal-sub" style="font-style:italic;margin-bottom:0.3rem;">"${sLiteral}"</div>` : ''}
    <div class="modal-sub">${sModern}</div>
    <div class="modal-section-title">Stellar Data (Modern)</div>
    <div class="modal-stats">
      <div class="modal-stat-box">
        <div class="modal-stat-label">Stellar Mass</div>
        <div class="modal-stat-value">${sMass}</div>
      </div>
      <div class="modal-stat-box">
        <div class="modal-stat-label">Distance from Earth</div>
        <div class="modal-stat-value">${sDist}</div>
      </div>
      <div class="modal-stat-box">
        <div class="modal-stat-label">Stellar Radius</div>
        <div class="modal-stat-value">${sRadius}</div>
      </div>
      <div class="modal-stat-box">
        <div class="modal-stat-label">App. Magnitude</div>
        <div class="modal-stat-value">${sMag}</div>
      </div>
    </div>
    <div class="modal-section-title">Precessed Coordinates — Epoch: ${epochLabel}</div>
    <div class="modal-stats">
      <div class="modal-stat-box">
        <div class="modal-stat-label">Right Ascension (RA)</div>
        <div class="modal-stat-value">${raHMS}</div>
      </div>
      <div class="modal-stat-box">
        <div class="modal-stat-label">Declination (DEC)</div>
        <div class="modal-stat-value">${decDMS}</div>
      </div>
      <div class="modal-stat-box">
        <div class="modal-stat-label">RA (J2000 baseline)</div>
        <div class="modal-stat-value">${sRa0.toFixed(2)}°</div>
      </div>
      <div class="modal-stat-box">
        <div class="modal-stat-label">Spectral Color</div>
        <div class="modal-stat-value" style="color:${sColor}">${sColor}</div>
      </div>
    </div>
    <div class="modal-section-title">Cultural Mythology</div>
    <div class="modal-lore">${sMyth}</div>
    <div class="modal-section-title">Precession Note</div>
    <div class="modal-lore">At ${epochLabel}, this star's RA has shifted approximately ${Math.abs(p.ra - sRa0).toFixed(1)}° from its J2000 position due to axial precession (one full cycle ≈ 25,772 years). The star rose at a different horizon point, altering the sacred alignments of temples and observatories of this civilization.</div>
  `;
  modalOverlay.classList.remove('hidden');
}

function decimalRaToHMS(ra) {
  const h = Math.floor(ra / 15);
  const m = Math.floor((ra / 15 - h) * 60);
  const s = ((ra / 15 - h) * 60 - m) * 60;
  return `${h}h ${m}m ${s.toFixed(1)}s`;
}

function decimalDecToDMS(dec) {
  const sign = dec < 0 ? '-' : '+';
  const absDec = Math.abs(dec);
  const d = Math.floor(absDec);
  const m = Math.floor((absDec - d) * 60);
  const s = ((absDec - d) * 60 - m) * 60;
  return `${sign}${d}° ${m}' ${s.toFixed(0)}"`;
}

modalClose.addEventListener('click', () => {
  modalOverlay.classList.add('hidden');
});

modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) modalOverlay.classList.add('hidden');
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') modalOverlay.classList.add('hidden');
});

/* ============================================================
   INITIALIZATION
   ============================================================ */
function init() {
  initBgStars();
  drawBgStars();
  // Set initial slider range for vedic civilization
  const initTimeline = CIV_TIMELINES['vedic'];
  epochSlider.min = initTimeline.min;
  epochSlider.max = initTimeline.max;
  epochSlider.value = state.epochYear;
  updateEpochDisplay();
  loadCivilization('vedic');
}

init();
