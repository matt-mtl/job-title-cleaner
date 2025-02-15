// Configuration object
const CONFIG = {
  HEADERS: ['Original Title', 'Standardized Title', 'Seniority Level', 'Seniority', 'Function', 'Validation Status'],
  FUNCTIONS: [
    'Engineering & Technology',
    'Product',
    'Sales',
    'HR',
    'Marketing',
    'Finance',
    'Operations',
    'Consulting',
    'Research',
    'Legal',
    'Education',
    'Healthcare',
    'Creative',
    'Executive',
    'Other'
  ],
  SENIORITY_LEVELS: [
    'Intern',
    'Entry',
    'IC',
    'Sr. IC',
    'Lead/Manager',
    'Director',
    'VP',
    'CXO'
  ],
  SENIORITY_COLORS: {
    'Intern': '#E6F3FF',
    'Entry': '#E1F5FE',
    'IC': '#B3E5FC',
    'Sr. IC': '#81D4FA',
    'Lead/Manager': '#4FC3F7',
    'Director': '#29B6F6',
    'VP': '#03A9F4',
    'CXO': '#0288D1'
  },
  VALIDATION_COLORS: {
    'Valid': '#C8E6C9',
    'Warning': '#FFF9C4',
    'Invalid': '#FFCDD2'
  },
  ABBREVIATIONS: {
    'Sr': 'Senior',
    'Sr.': 'Senior',
    'Jr': 'Junior',
    'Jr.': 'Junior',
    'VP': 'Vice President',
    'AVP': 'Associate Vice President',
    'EVP': 'Executive Vice President',
    'SVP': 'Senior Vice President',
    'CEO': 'Chief Executive Officer',
    'CFO': 'Chief Financial Officer',
    'CTO': 'Chief Technology Officer',
    'COO': 'Chief Operating Officer',
    'CRO': 'Chief Revenue Officer',
    'CMO': 'Chief Marketing Officer',
    'CPO': 'Chief Product Officer',
    'CHRO': 'Chief Human Resources Officer',
    'HR': 'Human Resources',
    'IT': 'Information Technology',
    'Mgr': 'Manager',
    'Dir': 'Director',
    'Tech': 'Technical',
    'Eng': 'Engineer',
    'Dev': 'Developer',
    'Ops': 'Operations',
    'Corp': 'Corporate',
    'Intl': 'International',
    'Mgmt': 'Management'
  }
};

/**
 * Validates and cleans input title
 */
function validateAndCleanTitle(title) {
  if (!title) return { clean: '', status: 'Invalid', message: 'Empty title' };
  
  const clean = title.toString()
    .replace(/\s+/g, ' ')        // Remove extra spaces
    .replace(/[^\w\s&/-]/g, ' ') // Remove special characters
    .replace(/\s+/g, ' ')        // Clean up any double spaces created
    .trim();
  
  // Validation checks
  if (clean.length < 2) {
    return { clean, status: 'Invalid', message: 'Title too short' };
  }
  
  if (clean.length > 100) {
    return { clean, status: 'Warning', message: 'Title unusually long' };
  }
  
  if (clean.includes('/') || clean.includes('&')) {
    return { clean, status: 'Warning', message: 'Contains special characters' };
  }
  
  return { clean, status: 'Valid', message: 'OK' };
}

/**
 * Standardizes a job title
 */
function STANDARDIZE_TITLE(title) {
  if (!title) return '';
  
  var standardized = title.toString().trim()
    .replace(/\([^)]*\)/g, '')
    .replace(/,.*$/, '')
    .replace(/\b(North|South|East|West|Regional|Global)\b.*?(?=\s|$)/g, '')
    .trim();
  
  // Replace abbreviations
  for (var abbr in CONFIG.ABBREVIATIONS) {
    var regex = new RegExp('\\b' + abbr + '\\b', 'g');
    standardized = standardized.replace(regex, CONFIG.ABBREVIATIONS[abbr]);
  }
  
  return standardized.trim();
}

/**
 * Determines seniority level
 */
function GET_SENIORITY(title) {
  if (!title) return 0;
  
  var title_lower = title.toString().toLowerCase();
  
  // Founder logic
  if (title_lower.includes('founder')) {
    if (title_lower.match(/ceo|cto|cfo|chief/)) return 8;
    if (title_lower.match(/technical|engineer/)) return 6;
    return 6;
  }
  
  // C-Suite (Level 8)
  if (title_lower.match(/^chief|^c[eftopm]o\b/)) return 8;
  
  // VP Level (Level 7)
  if (title_lower.match(/^(vice president|vp)|^associate vice president|^avp/)) return 7;
  
  // Director Level (Level 6)
  if (title_lower.match(/^(executive )?director|^head of/)) return 6;
  
  // Lead/Manager Level (Level 5)
  if (title_lower.match(/^(lead|manager|head|principal|supervisor)/)) return 5;
  
  // Senior IC (Level 4)
  if (title_lower.match(/^senior|^sr\.?|^staff |^principal|^lead |specialist|architect/)) return 4;
  
  // Entry Level (Level 2)
  if (title_lower.match(/^(junior|associate|jr\.?|trainee|assistant)/)) return 2;
  
  // Intern Level (Level 1)
  if (title_lower.includes('intern') || title_lower.includes('trainee')) return 1;
  
  // Default IC Level (Level 3)
  return 3;
}

/**
 * Converts seniority level to text
 */
function GET_SENIORITY_TEXT(title) {
  var level = GET_SENIORITY(title);
  var levels = {
    0: 'Unknown',
    1: 'Intern',
    2: 'Entry',
    3: 'IC',
    4: 'Sr. IC',
    5: 'Lead/Manager',
    6: 'Director',
    7: 'VP',
    8: 'CXO'
  };
  return levels[level] || 'Unknown';
}

/**
 * Determines job function
 */
function GET_FUNCTION(title) {
  if (!title) return 'Other';
  
  var title_lower = title.toString().toLowerCase();
  
  // Engineering & Technology
  if (title_lower.match(/engineer|technical|developer|architect|infrastructure|software|systems|devops|it |information technology|network|support|helpdesk|security|cloud|data/)) {
    return 'Engineering & Technology';
  }
  
  // Product
  if (title_lower.match(/product(\s|$)|program manager|scrum master|agile/)) {
    return 'Product';
  }
  
  // Sales
  if (title_lower.match(/sales|account|business development|revenue|client|customer success|relationship|partner|growth|commercial|business manager/)) {
    return 'Sales';
  }
  
  // HR/People
  if (title_lower.match(/people|culture|hr|human resource|talent|recruiting|training|learning|development|organizational/)) {
    return 'HR';
  }
  
  // Marketing
  if (title_lower.match(/marketing|brand|communications|growth|content|social media|digital|seo|advertising/)) {
    return 'Marketing';
  }
  
  // Finance
  if (title_lower.match(/finance|treasury|controller|audit|tax|investment|financial|budget/)) {
    return 'Finance';
  }
  
  // Operations
  if (title_lower.match(/operations|ops|logistics|supply chain|warehouse|inventory|procurement|facility|production/)) {
    return 'Operations';
  }
  
  // Consulting
  if (title_lower.match(/consultant|advisor|specialist|consulting|strategist|strategy/)) {
    return 'Consulting';
  }
  
  // Research
  if (title_lower.match(/research|scientist|analyst|analytics|intelligence|insight/)) {
    return 'Research';
  }
  
  // Legal
  if (title_lower.match(/lawyer|legal|attorney|counsel|compliance|regulatory|governance/)) {
    return 'Legal';
  }
  
  // Education
  if (title_lower.match(/teacher|tutor|instructor|educator|professor|faculty|lecturer|trainer|teaching|academic/)) {
    return 'Education';
  }
  
  // Healthcare
  if (title_lower.match(/medical|health|clinical|nurse|doctor|physician|therapist|practitioner|dental|healthcare/)) {
    return 'Healthcare';
  }
  
  // Creative
  if (title_lower.match(/designer|artist|creative|writer|content|ux|ui|graphic|design/)) {
    return 'Creative';
  }
  
  // Executive
  if (title_lower.match(/chief|ceo|founder|president|chairman|owner|partner/)) {
    return 'Executive';
  }
  
  return 'Other';
}
