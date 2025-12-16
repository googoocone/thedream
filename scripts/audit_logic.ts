
import { calculateMatchScore, UserProfile, Scholarship } from '../utils/matching';

// Helper to run assertions
function assert(condition: boolean, message: string) {
    if (!condition) {
        console.error(`❌ FAIL: ${message}`);
        process.exitCode = 1;
    } else {
        console.log(`✅ PASS: ${message}`);
    }
}

console.log("🔍 Starting Logic Audit for Scholarship Matching Engine...\n");

// --- TEST CASE 1: School Type Mismatch ---
{
    const user: UserProfile = { id: 'u1', school_type: 'high_school' };
    const scholarship: Scholarship = {
        id: 's1', name: 'Univ Only', foundation: 'F', amount: '100', application_end: '2025-12-31',
        target_school_type: 'university'
    };
    const score = calculateMatchScore(user, scholarship);
    assert(score === 0, "High School student should NOT match University scholarship");
}

// --- TEST CASE 2: Gender Mismatch ---
{
    const user: UserProfile = { id: 'u2', gender: 'male' };
    const scholarship: Scholarship = {
        id: 's2', name: 'Women Only', foundation: 'F', amount: '100', application_end: '2025-12-31',
        target_gender: 'female'
    };
    const score = calculateMatchScore(user, scholarship);
    assert(score === 0, "Male student should NOT match Female-only scholarship");
}

// --- TEST CASE 3: Income Bracket (Hard Limit) ---
{
    const user: UserProfile = { id: 'u3', income_bracket: 8 };
    const scholarship: Scholarship = {
        id: 's3', name: 'Low Income Support', foundation: 'F', amount: '100', application_end: '2025-12-31',
        max_income: 3
    };
    const score = calculateMatchScore(user, scholarship);
    assert(score === 0, "Income 8 should NOT match Max Income 3 scholarship");
}

// --- TEST CASE 4: GPA Requirement ---
{
    const user: UserProfile = { id: 'u4', gpa: 3.0 };
    const scholarship: Scholarship = {
        id: 's4', name: 'Excellence Award', foundation: 'F', amount: '100', application_end: '2025-12-31',
        min_gpa: 3.5
    };
    const score = calculateMatchScore(user, scholarship);
    assert(score === 0, "GPA 3.0 should NOT match Min GPA 3.5 scholarship");
}

// --- TEST CASE 5: Region Match (Success) ---
{
    const user: UserProfile = { id: 'u5', address: '서울 강남구' };
    const scholarship: Scholarship = {
        id: 's5', name: 'Seoul Scholarship', foundation: 'F', amount: '100', application_end: '2025-12-31',
        target_region: '서울'
    };
    const score = calculateMatchScore(user, scholarship);
    assert(score > 0, "Seoul resident SHOULD match Seoul scholarship");
}

// --- TEST CASE 6: Region Mismatch ---
{
    const user: UserProfile = { id: 'u6', address: '부산 해운대구' };
    const scholarship: Scholarship = {
        id: 's6', name: 'Seoul Scholarship', foundation: 'F', amount: '100', application_end: '2025-12-31',
        target_region: '서울'
    };
    const score = calculateMatchScore(user, scholarship);
    assert(score === 0, "Busan resident should NOT match Seoul scholarship");
}

// --- TEST CASE 7: Complex Success (Low Income + High GPA) ---
{
    const user: UserProfile = {
        id: 'u7',
        income_bracket: 1,
        gpa: 4.2,
        school_type: 'university'
    };
    const scholarship: Scholarship = {
        id: 's7', name: 'Dream Scholarship', foundation: 'F', amount: '100', application_end: '2025-12-31',
        max_income: 3,
        min_gpa: 3.5,
        target_school_type: 'university'
    };
    const score = calculateMatchScore(user, scholarship);
    // Score calculation:
    // Base: 30
    // Income Bonus: (3 - 1) * 2 = 4
    // GPA Bonus: (4.2 - 3.5) * 10 = 7
    // Total should be > 0
    assert(score > 0, "Low Income (1/3) + High GPA (4.2/3.5) should MATCH");
    console.log(`   -> Score: ${score} (Expected > 30)`);
}

console.log("\n___________________________________________________");
if (process.exitCode === 1) {
    console.log("❌ Audit FAILED. Logic errors found.");
} else {
    console.log("✅ Audit PASSED. All logic checks verified successfully.");
}
