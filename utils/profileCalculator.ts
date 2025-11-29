interface UserProfile {
    nickname?: string;
    birth_date?: string;
    gender?: string;
    phone_number?: string;
    school_name?: string;
    major?: string;
    current_grade?: number;
    enrollment_status?: string;
    income_bracket?: number;
    family_size?: number;
    special_criteria?: string[];
    [key: string]: unknown; // Allow other properties
}

export function calculateCompletion(user: UserProfile | null): number {
    if (!user) return 0;

    const fields = [
        'nickname', 'birth_date', 'gender', 'phone_number', // Personal (4)
        'school_name', 'major', 'current_grade', 'enrollment_status', // Education (4)
        'income_bracket', 'family_size', // Financial (2)
        'special_criteria', // Additional (1)
    ];

    let filledCount = 0;
    fields.forEach(field => {
        if (user[field]) filledCount++;
    });

    return Math.round((filledCount / fields.length) * 100);
}

export function calculatePotentialScholarships(completionPercentage: number): number {
    // Base: 23 scholarships
    // Max: 87 scholarships
    // Formula: 23 + (percentage * 0.64)
    return Math.round(23 + (completionPercentage * 0.64));
}
