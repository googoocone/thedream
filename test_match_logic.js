
const calculateMatchScore = (user, scholarship) => {
    // 1.5.6 Major Category Matching Logic (from utils/matching.ts)
    if (scholarship.target_major_category && scholarship.target_major_category !== '무관') {
        const targetMajors = scholarship.target_major_category.split(',').map(m => m.trim());
        const userLargeCat = user.major_large_category;
        const userMiddleCat = user.major_middle_category;
        const userMajorName = user.major || '';

        let isMajorMatch = false;

        for (const target of targetMajors) {
            // Case A: Target is a Broad Category (e.g. "공학계열")
            if (userLargeCat && userLargeCat.includes(target)) { isMajorMatch = true; break; }

            // Case B: Target is Middle Category
            if (userMiddleCat && userMiddleCat === target) { isMajorMatch = true; break; }

            // Case C: Target is a Subcategory or keyword -> Check keywords in userMajorName
            // This is the Key part for user's question!
            const keywords = target.split('/');
            if (keywords.some(k => userMajorName.includes(k))) {
                isMajorMatch = true;
                break;
            }
        }

        if (!isMajorMatch) {
            return { matched: false, reason: `Major mismatch. User: ${userMajorName}, Target: ${scholarship.target_major_category}` };
        }
    }
    return { matched: true, reason: 'Matched' };
};

// Represents the "Haedong Scholarship" requirements in the DB
const scholarship = {
    // User wants to put this long string into target_major_category
    target_major_category: "화학공학,재료공학,전자공학,신소재공학,반도체공학,컴퓨터공학,인공지능"
};

// Test Cases
const users = [
    { major: "컴퓨터공학", major_large_category: "공학" },      // Exact match
    { major: "컴퓨터공학과", major_large_category: "공학" },    // Includes match
    { major: "기계공학과", major_large_category: "공학" },      // Mismatch (Engineering but not in list)
    { major: "인공지능학과", major_large_category: "공학" },    // Includes match
    { major: "국어국문학과", major_large_category: "인문" }     // Mismatch
];

console.log("Testing detailed major list matching:");
users.forEach(u => {
    console.log(`User Major: ${u.major} ->`, calculateMatchScore(u, scholarship));
});
