export interface UserProfile {
    address?: string;
    school_type?: string; // 'univ' | 'high' | etc.
    major?: string;
    income_bracket?: number;
}

export interface Scholarship {
    id: string;
    name: string;
    foundation: string;
    target_hashtags?: string[];
    target_description?: string;
    eligibility?: string;
    tags?: string[];
    amount: string;
    application_end: string;
}

export function extractUserKeywords(user: UserProfile): string[] {
    const keywords: string[] = [];

    // 1. Region (Address)
    if (user.address) {
        const region = user.address.split(' ')[0]; // e.g., "서울", "경기"
        if (region) keywords.push(region);
    }

    // 2. School Type
    if (user.school_type) {
        if (user.school_type === 'univ') keywords.push('대학생', '대학', '학부');
        if (user.school_type === 'high') keywords.push('고등학생', '고교');
    }

    // 3. Major (Simple keyword extraction)
    if (user.major) {
        keywords.push(user.major);
        // Add broader categories if possible (e.g., if "Computer Science" -> "Engineering")
        // For now, just use the raw major string
    }

    return keywords;
}

export function calculateMatchScore(user: UserProfile, scholarship: Scholarship): number {
    let score = 0;
    const userKeywords = extractUserKeywords(user);

    // Combine all scholarship text fields for searching
    const scholarshipText = [
        scholarship.name,
        scholarship.target_description,
        scholarship.eligibility,
        ...(scholarship.target_hashtags || []),
        ...(scholarship.tags || [])
    ].join(' ').toLowerCase();

    // 1. Keyword Matching
    let matchedKeywords = 0;
    for (const keyword of userKeywords) {
        if (scholarshipText.includes(keyword.toLowerCase())) {
            matchedKeywords++;
        }
    }

    // Base score based on keyword matches (up to 50 points)
    if (userKeywords.length > 0) {
        score += (matchedKeywords / userKeywords.length) * 50;
    }

    // 2. Universal Scholarships (Bonus)
    // If scholarship seems to be for everyone (e.g., "누구나", "전국"), give a base score
    if (scholarshipText.includes('누구나') || scholarshipText.includes('제한없음')) {
        score += 20;
    }

    // 3. Income Bracket (Placeholder logic)
    // If we had structured income data in scholarship, we could match strictly.
    // For now, if user has low income and scholarship mentions "저소득", give bonus.
    if (user.income_bracket && user.income_bracket <= 3) {
        if (scholarshipText.includes('저소득') || scholarshipText.includes('기초생활')) {
            score += 30;
        }
    }

    return Math.min(Math.round(score), 100);
}
