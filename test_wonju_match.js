
// Mocking the user and scholarship to test matching logic
const user = {
    school_name: '상지대학교',
    school_address: '강원특별자치도 원주시 상지대길 83', // Typical address
    major_large_category: '인문계열', // Matching "Any" major is fine, but ensuring other fields correspond
    special_criteria: [], // Empty as discussed
};

const scholarship = {
    name: "Type 2 Scholarship",
    target_university_region: "원주", // The strict constraint
    target_major_category: "무관",
    special_criteria: [],
};

function testMatch(user, scholarship) {
    // 2.0 University Region (Strict Filter) copied from matching.ts
    if (scholarship.target_university_region && scholarship.target_university_region !== '전국') {
        const targets = scholarship.target_university_region.split(',').map(r => r.trim());

        const fullSchoolAddr = user.school_address || '';

        console.log(`Checking address: "${fullSchoolAddr}" against targets:`, targets);

        const positives = targets.filter(t => !t.startsWith('!'));
        const negatives = targets.filter(t => t.startsWith('!')).map(t => t.slice(1));

        // 1. Positive Check
        if (positives.length > 0) {
            const hasMatch = positives.some(t => fullSchoolAddr.includes(t));
            console.log(`Positive Match result: ${hasMatch}`);
            if (!hasMatch) return 0;
        }

        // 2. Negative Check
        const hasNegative = negatives.some(t => fullSchoolAddr.includes(t));
        console.log(`Negative Match result: ${hasNegative}`);
        if (hasNegative) return 0;
    }
    return 100; // Pass
}

console.log("Match Score:", testMatch(user, scholarship));
