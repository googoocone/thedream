export interface UserProfile {
    id: string;
    nickname?: string;
    birth_date?: string;
    gender?: string; // 'male' | 'female'
    phone_number?: string;
    address?: string; // "서울 강남구..."
    parents_address?: string;
    high_school_address?: string; // Corrected to match DB column
    residence_type?: string; // 'same' | 'diff'

    // Education
    school_name?: string;
    school_type?: string; // 'university' | 'college' | 'grad_school' | 'cyber' | 'open'
    major?: string;
    major_large_category?: string; // '공학', '인문' etc. (If available)
    current_grade?: number;
    current_semester?: number;
    enrollment_status?: string; // 'enrolled', 'leave', 'graduated'
    gpa?: number; // 4.5 scale

    // Financial
    income_bracket?: number; // 1~10
    family_size?: number;

    // Additional
    special_criteria?: string[]; // ['multicultural', 'farmer', ...]
    nationality?: string; // 'Korea' | 'Other'

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export interface Scholarship {
    id: string;
    name: string;
    foundation: string;

    // Matching Criteria Columns
    target_grade?: string; // "1,2,3,4"
    min_gpa?: number;
    max_income?: number; // 10 means no limit
    target_gender?: string; // 'male', 'female', 'any'
    target_school_type?: string; // 'university,college,grad_school,cyber,open'
    target_major_category?: string; // '공학,인문' or '무관'
    min_prev_semester_credits?: number;
    special_criteria?: string[]; // Required tags
    target_nationality?: string; // 'Korea', 'Foreigner', 'Asian', 'Any'
    target_enrollment_status?: string; // 'enrolled,leave,graduated,expected'

    // Region Constraints
    target_region?: string; // Student residence
    target_parents_region?: string; // Parents residence
    target_university_region?: string; // University location
    target_high_school_region?: string; // High school location

    // Grades (High School) - Optional for now
    max_csat_grade?: number;
    max_school_grade?: number;

    // Legacy / Display fields
    target_hashtags?: string[];
    target_description?: string;
    eligibility?: string;
    tags?: string[];
    amount: string;
    application_end: string;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export function calculateMatchScore(user: UserProfile, scholarship: Scholarship): number {
    let score = 0;
    let isDisqualified = false;

    // --- 1. Hard Filters (Disqualification Logic) ---

    // 1.1 Gender
    if (scholarship.target_gender && scholarship.target_gender !== 'any') {
        if (user.gender && user.gender !== scholarship.target_gender) {
            return 0; // Disqualified
        }
    }

    // 1.2 School Type
    if (scholarship.target_school_type) {
        const targetTypes = scholarship.target_school_type.split(',').map(t => t.trim());
        if (user.school_type && !targetTypes.includes(user.school_type)) {
            return 0; // Disqualified
        }
    }

    // 1.3 Grade
    if (scholarship.target_grade) {
        const targetGrades = scholarship.target_grade.split(',').map(g => parseInt(g.trim()));
        if (user.current_grade && !targetGrades.includes(user.current_grade)) {
            return 0; // Disqualified
        }
    }

    // 1.4 GPA (Minimum)
    if (scholarship.min_gpa && scholarship.min_gpa > 0) {
        const userGpa = typeof user.gpa === 'string' ? parseFloat(user.gpa) : user.gpa;
        if (userGpa && userGpa < scholarship.min_gpa) {
            return 0; // Disqualified
        }
    }

    // 1.5 Income (Maximum)
    if (scholarship.max_income && scholarship.max_income < 10) {
        // If user income is UNKNOWN, we might give benefit of doubt or penalize. 
        // For now, if user has income, check it.
        if (user.income_bracket && user.income_bracket > scholarship.max_income) {
            return 0; // Disqualified
        }
    }

    // 1.5.5 Enrollment Status (New)
    if (scholarship.target_enrollment_status) {
        const targetStatuses = scholarship.target_enrollment_status.split(',').map(s => s.trim());

        // User requested to treat 'enrolled' as a broad "Undergraduate" category including 'leave' and 'expected'.
        const isUndergraduateTarget = targetStatuses.includes('enrolled');
        const isUndergraduateUser = ['enrolled', 'leave', 'expected'].includes(user.enrollment_status || '');

        if (isUndergraduateTarget && isUndergraduateUser) {
            // Pass: If scholarship targets 'enrolled', we allow 'leave' and 'expected' users too.
        } else if (user.enrollment_status && !targetStatuses.includes(user.enrollment_status)) {
            return 0; // Disqualified
        }
    }

    // 1.6 Nationality
    const targetNat = scholarship.target_nationality || 'Korea';
    const userNat = user.nationality || 'Korea';

    if (targetNat === 'Korea' && userNat !== 'Korea') return 0; // Korean-only
    if (targetNat === 'Foreigner' && userNat === 'Korea') return 0; // Foreigner-only
    if (targetNat === 'Asian') {
        // Asian-only: Definitely exclude Korea. 
        // For 'Other' (Foreigner), we assume they MIGHT be Asian (benefit of doubt) since we don't have continent info yet.
        if (userNat === 'Korea') return 0;
    }
    // If targetNat is 'Any', everyone passes.

    // 1.7 Special Criteria (The most important filter)
    if (scholarship.special_criteria && scholarship.special_criteria.length > 0) {
        let userCriteria: string[] = [];
        if (Array.isArray(user.special_criteria)) {
            userCriteria = user.special_criteria;
        } else if (typeof user.special_criteria === 'string') {
            try {
                // Try parsing if it's a JSON string
                userCriteria = JSON.parse(user.special_criteria);
                if (!Array.isArray(userCriteria)) userCriteria = [];
            } catch (e) {
                // If not JSON, maybe just treat as single string or empty
                userCriteria = [];
            }
        }

        const hasMatch = scholarship.special_criteria.some(criteria => userCriteria.includes(criteria));

        if (!hasMatch) {
            return 0; // Disqualified (User doesn't meet the special requirement)
        } else {
            score += 50; // Huge bonus for matching special criteria
        }
    }

    // --- 2. Region Matching (Complex) ---

    let regionScore = 0;
    let regionConstraintExists = false;
    let regionMatched = false;

    // Helper to extract region (Si/Do) from address
    const getRegion = (addr?: string) => {
        if (!addr) return '';
        return addr.split(' ')[0]; // e.g., "서울", "경기"
    };

    const userRegion = getRegion(user.address);
    const parentsRegion = getRegion(user.parents_address) || userRegion; // Fallback to user region if same
    // University region: We don't have it explicitly. 
    // TODO: We might need to map school_name to region or ask user. 
    // For now, we skip strict university region check unless we can infer it.

    // 2.1 Student Region
    if (scholarship.target_region && scholarship.target_region !== '전국') {
        regionConstraintExists = true;
        const targets = scholarship.target_region.split(',').map(r => r.trim());
        if (targets.some(t => userRegion.includes(t))) {
            regionMatched = true;
            regionScore += 20;
        }
    }

    // 2.2 Parents Region
    if (scholarship.target_parents_region && scholarship.target_parents_region !== '전국') {
        regionConstraintExists = true;
        const targets = scholarship.target_parents_region.split(',').map(r => r.trim());
        if (targets.some(t => parentsRegion.includes(t))) {
            regionMatched = true;
            regionScore += 20;
        }
    }

    // 2.3 High School Region
    if (scholarship.target_high_school_region && scholarship.target_high_school_region !== '전국') {
        regionConstraintExists = true;
        const targets = scholarship.target_high_school_region.split(',').map(r => r.trim());

        // Check against user.high_school_address
        const hsRegion = getRegion(user.high_school_address);
        if (hsRegion && targets.some(t => hsRegion.includes(t))) {
            regionMatched = true;
            regionScore += 20;
        }
    }

    // If there was a region constraint but NO match at all, disqualify
    if (regionConstraintExists && !regionMatched) {
        return 0;
    }

    // --- 3. Scoring (Soft Matching) ---

    // Base score
    score += 30;
    score += regionScore; // Added region score to total

    // Income Bonus (Lower income = higher need)
    if (user.income_bracket && scholarship.max_income) {
        const incomeDiff = scholarship.max_income - user.income_bracket;
        if (incomeDiff >= 0) {
            score += incomeDiff * 2; // Up to 20 points
        }
    }

    // GPA Bonus (Higher GPA = better chance)
    if (user.gpa && scholarship.min_gpa) {
        const userGpa = typeof user.gpa === 'string' ? parseFloat(user.gpa) : user.gpa;
        const gpaDiff = userGpa - scholarship.min_gpa;
        if (gpaDiff >= 0) {
            score += gpaDiff * 10; // e.g., 0.5 diff -> 5 points
        }
    }

    return Math.min(Math.round(score), 100);
}

// Helper for legacy support or text-based fallback (optional)
export function extractUserKeywords(user: UserProfile): string[] {
    // ... (Keep existing logic if needed, or remove if fully deprecated)
    return [];
}

export function detectScholarshipRegions(scholarship: Scholarship): string[] {
    const regions = new Set<string>();
    if (scholarship.target_region) regions.add(`거주지: ${scholarship.target_region}`);
    if (scholarship.target_parents_region) regions.add(`부모거주지: ${scholarship.target_parents_region}`);
    if (scholarship.target_university_region) regions.add(`대학: ${scholarship.target_university_region}`);
    if (scholarship.target_high_school_region) regions.add(`고교: ${scholarship.target_high_school_region}`);
    return Array.from(regions);
}
