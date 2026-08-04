import fs from 'fs';
import path from 'path';

export interface Program {
  id: string;
  slug: string;
  title: string;
  category: 'Computational Design' | 'Urbanism' | 'Sustainable Futures' | 'Architectural Theory';
  description: string;
  instructor_name: string;
  instructor_title: string;
  duration_weeks: number;
  price_usd: number;
  status: 'open' | 'waitlist' | 'closed';
  bg_image_url: string;
  credits: number;
  level: 'Advanced Studio' | 'Masterclass' | 'Research Fellowship';
  prerequisites: string;
  features: string[];
  syllabus: { week: number; title: string; description: string }[];
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  awards: string;
  bio: string;
  portrait_url: string;
  blueprint_overlay_url: string;
  specialization: string;
  publications: string[];
}

export interface StudentWork {
  id: string;
  student_name: string;
  project_title: string;
  program_slug: string;
  program_title: string;
  image_url: string;
  critique_notes: string;
  year: string;
  grade: string;
  location: string;
  software: string[];
}

export interface Enrollment {
  id: string;
  program_id: string;
  program_title: string;
  applicant_name: string;
  email: string;
  portfolio_url?: string;
  statement?: string;
  created_at: string;
  status: 'pending' | 'reviewed' | 'accepted';
}

// Initial Seed Data
const SEED_PROGRAMS: Program[] = [
  {
    id: 'prog-01',
    slug: 'parametric-urbanism',
    title: 'Parametric Urbanism & Algorithmic Zoned Densities',
    category: 'Computational Design',
    description: 'An advanced exploration of algorithmic modeling for mega-scale urban environments, computational micro-climate simulations, and adaptive structural meshes.',
    instructor_name: 'Dr. Evelyn Vance',
    instructor_title: 'Pritzker Fellow & Lead Computational Theorist',
    duration_weeks: 12,
    price_usd: 3800,
    status: 'open',
    bg_image_url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
    credits: 6,
    level: 'Advanced Studio',
    prerequisites: 'Rhinoceros 7, Grasshopper proficiency, B.Arch or M.Arch degree candidate.',
    features: [
      'Multi-agent urban density modeling',
      'Solar irradiance & wind corridor physics engine simulations',
      'Individual 1-on-1 desk critiques twice weekly',
      'Final presentation to jury of Zaha Hadid & Foster+Partners associates'
    ],
    syllabus: [
      { week: 1, title: 'Generative Field Conditions', description: 'Mathematical definition of urban boundary constraints and vector flow fields.' },
      { week: 4, title: 'Environmental Solar & Wind Synthesis', description: 'Integrating real-time thermal mass physics into parametric surface optimization.' },
      { week: 8, title: 'Structural Mesh Rationalization', description: 'Converting organic freeform surfaces into fabricate-able double-curved steel nodes.' },
      { week: 12, title: 'Public Defense & Exhibition', description: 'Presentation of 1:200 scale physical structural models and interactive WebGL code.' }
    ]
  },
  {
    id: 'prog-02',
    slug: 'radical-timber-structures',
    title: 'Radical Mass Timber & Tectonic Carbon Offsets',
    category: 'Sustainable Futures',
    description: 'Deconstructing modern skyscrapers through mass-timber joinery, cross-laminated timber (CLT) stress analysis, and carbon-negative building systems.',
    instructor_name: 'Prof. Henrik Lindqvist',
    instructor_title: 'Chair of Nordic Wood Innovation Studio',
    duration_weeks: 10,
    price_usd: 3200,
    status: 'open',
    bg_image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    credits: 5,
    level: 'Masterclass',
    prerequisites: 'Basic structural mechanics, Revit/Archicad, Material science foundations.',
    features: [
      'Robotic CNC timber fabrication techniques',
      'Life-cycle assessment (LCA) carbon footprint auditing',
      'Physical testing of 1:1 scale wood joinery nodes',
      'Exhibition monograph published in Forma Press'
    ],
    syllabus: [
      { week: 1, title: 'Anatomy of Engineered Timber', description: 'Cellular mechanics of Glulam, CLT, and LVL timber assemblies.' },
      { week: 3, title: 'Joint Tectonics & Interlocking Geometry', description: 'Japanese wood joinery reinvented for multi-axis robotic milling.' },
      { week: 7, title: 'Fire Resistance & Seismic Acoustic Isolation', description: 'Simulating charring layers and elastomeric dampening nodes.' },
      { week: 10, title: 'Prototype Assembly & Tensile Testing', description: 'Full-scale physical load test of timber grid-shell trusses.' }
    ]
  },
  {
    id: 'prog-03',
    slug: 'post-carbon-futures',
    title: 'Post-Carbon Futures & Bio-Integrated Architecture',
    category: 'Sustainable Futures',
    description: 'Designing hyper-adaptive living envelopes using mycelium composites, bio-luminescent algae facades, and closed-loop water regeneration networks.',
    instructor_name: 'Dr. Soraya Al-Mansoor',
    instructor_title: 'Director of Bio-Synthetics Lab',
    duration_weeks: 14,
    price_usd: 4200,
    status: 'waitlist',
    bg_image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    credits: 8,
    level: 'Research Fellowship',
    prerequisites: 'Portfolio submission demonstrating environmental systems research.',
    features: [
      'Living material bio-reactor synthesis',
      'Passive micro-climate building envelope prototyping',
      'Field study trips to bio-mimetic structures',
      'Direct sponsorship opportunities with green-tech venture funds'
    ],
    syllabus: [
      { week: 1, title: 'Bio-Material Synthesis & Mycelium Casting', description: 'Growth matrix control and structural rigidity benchmarking.' },
      { week: 5, title: 'Photobioreactor Facade Integration', description: 'Harvesting solar energy and biomass through fluidic glass capillary networks.' },
      { week: 10, title: 'Closed-Loop Hydrological Ecosystems', description: 'Greywater treatment membranes embedded directly into porous concrete wall assemblies.' },
      { week: 14, title: 'Living Prototype Showcase', description: 'Exhibition of bio-responsive facade panel mockups.' }
    ]
  },
  {
    id: 'prog-04',
    slug: 'tectonic-theory-monumentality',
    title: 'Tectonic Theory, Monoliths & Modern Brutalism',
    category: 'Architectural Theory',
    description: 'Re-examining heavy material expression, cast concrete formwork, shadow geometry, and political monumentality in 21st-century civic design.',
    instructor_name: 'Klaus Vanhagen',
    instructor_title: 'Senior Critic & Pritzker Laureate Nominee',
    duration_weeks: 8,
    price_usd: 2800,
    status: 'open',
    bg_image_url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
    credits: 4,
    level: 'Masterclass',
    prerequisites: 'Architectural history coursework or equivalent writing sample.',
    features: [
      'Philosophical analysis of brutalist civic monuments',
      'Tactile concrete aggregate and texture casting labs',
      'Publication of critical essays in Forma Quarterly',
      'Roundtable discussions with international architectural historians'
    ],
    syllabus: [
      { week: 1, title: 'The Sublime Heavy: Materiality & Weight', description: 'Examines the psychology of mass, cast aggregate textures, and structural honesty.' },
      { week: 3, title: 'Monolithic Formwork & Light Apertures', description: 'Sculpting light through deep reveals, lightwells, and coffered ceilings.' },
      { week: 6, title: 'Civic Memory & Political Tectonics', description: 'How monumentality influences public square assembly and democracy.' },
      { week: 8, title: 'Monograph Publication', description: 'Final essay and portfolio defense.' }
    ]
  }
];

const SEED_INSTRUCTORS: Instructor[] = [
  {
    id: 'inst-01',
    name: 'Dr. Evelyn Vance',
    title: 'Pritzker Fellow & Lead Computational Theorist',
    awards: 'RIBA International Gold Medal 2024, Venice Biennale Pavilion Winner',
    bio: 'Pioneer in algorithmic structural optimization and generative facade systems. Has designed iconic towers in Tokyo, Zurich, and London.',
    portrait_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
    blueprint_overlay_url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800&auto=format&fit=crop',
    specialization: 'Parametric Optimization & Spatial Graph Theory',
    publications: ['Algorithmic Formwork (Mit Press, 2022)', 'Tectonic Vectors in High-Rise Architecture']
  },
  {
    id: 'inst-02',
    name: 'Prof. Henrik Lindqvist',
    title: 'Chair of Nordic Wood Innovation Studio',
    awards: 'Nordic Timber Design Award 2023, EU Green Building Fellow',
    bio: 'Renowned structural engineer and architect specializing in high-rise mass timber constructability and carbon-sequestering joinery systems.',
    portrait_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop',
    blueprint_overlay_url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop',
    specialization: 'CLT Structural Dynamics & Robotic Timber Milling',
    publications: ['The Carbon-Negative Skyscraper (Routledge)', 'Joints of the North']
  },
  {
    id: 'inst-03',
    name: 'Dr. Soraya Al-Mansoor',
    title: 'Director of Bio-Synthetics Lab',
    awards: 'AIA Innovation in Design Award 2025, BioDesign Challenge Gold Medal',
    bio: 'Interdisciplinary bio-architect bridging synthetic biology and living building envelopes. Former visiting professor at MIT Media Lab.',
    portrait_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop',
    blueprint_overlay_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop',
    specialization: 'Mycelium Composites & Photobioreactors',
    publications: ['Architectural Biology (Harvard GSD Press)', 'Capillary Glass Facades']
  },
  {
    id: 'inst-04',
    name: 'Klaus Vanhagen',
    title: 'Senior Critic & Pritzker Laureate Nominee',
    awards: 'German Architecture Prize 2021, Mies van der Rohe Award Nominee',
    bio: 'Master of raw concrete tectonics and civic monumentality. Known for sculptural museum spaces across Berlin, Basel, and Kyoto.',
    portrait_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    blueprint_overlay_url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=800&auto=format&fit=crop',
    specialization: 'Monolithic Concrete & Spatial Phenomenological Theory',
    publications: ['Silence and Mass (Phaidon)', 'The Brutalist Civic Square']
  }
];

const SEED_STUDENT_WORK: StudentWork[] = [
  {
    id: 'work-01',
    student_name: 'Marcus Thorne',
    project_title: 'Hyper-Density Vertical Forest Canopy',
    program_slug: 'parametric-urbanism',
    program_title: 'Parametric Urbanism & Algorithmic Zoned Densities',
    image_url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop',
    critique_notes: 'Exceptional solar vector resolution. The diagrid structural nodes demonstrate high constructability with minimal cantilever strain.',
    year: '2025 Studio Sprint',
    grade: 'High Distinction (98/100)',
    location: 'Singapore River Basin site',
    software: ['Rhinoceros', 'Grasshopper', 'Karamba3D', 'V-Ray']
  },
  {
    id: 'work-02',
    student_name: 'Aria Chen',
    project_title: 'Interlocking Glulam Sky-Bridge Complex',
    program_slug: 'radical-timber-structures',
    program_title: 'Radical Mass Timber & Tectonic Carbon Offsets',
    image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop',
    critique_notes: 'Masterful joinery detail. The tension cables integrated into the timber nodes allow a 60m clear span without internal columns.',
    year: '2025 Studio Sprint',
    grade: 'High Distinction (96/100)',
    location: 'Oslo Fjord Waterfront',
    software: ['Revit', 'Robot Structural Analysis', 'Enscape']
  },
  {
    id: 'work-03',
    student_name: 'Elena Rostova',
    project_title: 'Living Algae Bioreactor Pavilion',
    program_slug: 'post-carbon-futures',
    program_title: 'Post-Carbon Futures & Bio-Integrated Architecture',
    image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
    critique_notes: 'Pioneering work in fluid dynamics within double-skin glazed facades. Produces 40kWh of clean energy daily.',
    year: '2024 Winter Defense',
    grade: 'Distinction (94/100)',
    location: 'Rotterdam Harbor',
    software: ['Houdini', 'Blender', 'BioSim Studio']
  },
  {
    id: 'work-04',
    student_name: 'Julian Vance',
    project_title: 'The Monolithic Archive of Memory',
    program_slug: 'tectonic-theory-monumentality',
    program_title: 'Tectonic Theory, Monoliths & Modern Brutalism',
    image_url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1000&auto=format&fit=crop',
    critique_notes: 'Deeply moving control of shadow, lightwells, and textured cast concrete board marks.',
    year: '2024 Winter Defense',
    grade: 'High Distinction (97/100)',
    location: 'Berlin Tempelhof Field',
    software: ['Rhino', 'Maxwell Render', 'Hand Drafting']
  }
];

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'forma_db.json');

interface DbSchema {
  programs: Program[];
  instructors: Instructor[];
  studentWork: StudentWork[];
  enrollments: Enrollment[];
}

function ensureDbFile(): DbSchema {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const initialData: DbSchema = {
      programs: SEED_PROGRAMS,
      instructors: SEED_INSTRUCTORS,
      studentWork: SEED_STUDENT_WORK,
      enrollments: []
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw) as DbSchema;
  } catch (err) {
    const initialData: DbSchema = {
      programs: SEED_PROGRAMS,
      instructors: SEED_INSTRUCTORS,
      studentWork: SEED_STUDENT_WORK,
      enrollments: []
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }
}

function saveDb(data: DbSchema) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export async function getPrograms(category?: string, status?: string, query?: string): Promise<Program[]> {
  const db = ensureDbFile();
  let result = db.programs;

  if (category && category !== 'All') {
    result = result.filter(p => p.category === category);
  }

  if (status && status !== 'All') {
    result = result.filter(p => p.status === status);
  }

  if (query && query.trim() !== '') {
    const q = query.toLowerCase();
    result = result.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.instructor_name.toLowerCase().includes(q)
    );
  }

  return result;
}

export async function getProgramBySlug(slug: string): Promise<Program | undefined> {
  const db = ensureDbFile();
  return db.programs.find(p => p.slug === slug);
}

export async function getInstructors(): Promise<Instructor[]> {
  const db = ensureDbFile();
  return db.instructors;
}

export async function getStudentWork(): Promise<StudentWork[]> {
  const db = ensureDbFile();
  return db.studentWork;
}

export async function addEnrollment(data: {
  program_id: string;
  applicant_name: string;
  email: string;
  portfolio_url?: string;
  statement?: string;
}): Promise<Enrollment> {
  const db = ensureDbFile();
  const prog = db.programs.find(p => p.id === data.program_id) || db.programs[0];

  const newEnrollment: Enrollment = {
    id: 'enr-' + Math.random().toString(36).substring(2, 9),
    program_id: data.program_id,
    program_title: prog.title,
    applicant_name: data.applicant_name,
    email: data.email,
    portfolio_url: data.portfolio_url,
    statement: data.statement,
    created_at: new Date().toISOString(),
    status: 'pending'
  };

  db.enrollments.push(newEnrollment);
  saveDb(db);

  return newEnrollment;
}

export async function getEnrollments(): Promise<Enrollment[]> {
  const db = ensureDbFile();
  return db.enrollments;
}
