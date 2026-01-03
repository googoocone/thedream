
import { calculateMatchScore, UserProfile, Scholarship } from './utils/matching';

// Mock Scholarships
const scholarships: Scholarship[] = [
    {
        id: '1',
        name: '서울 거주 저소득 장학금',
        foundation: '서울장학재단',
        target_region: '서울',
        max_income: 3,
        amount: '100만원'
    },
    {
        id: '2',
        name: '성적 우수 장학금',
        foundation: '우수재단',
        min_gpa: 4.0,
        amount: '200만원'
    },
    {
        id: '3',
        name: '경기도민 장학금',
        foundation: '경기재단',
        target_region: '경기',
        amount: '150만원'
    },
    {
        id: '4',
        name: '공학계열 지원금',
        foundation: '미래재단',
        target_major_category: '공학계열',
        amount: '50만원'
    }
];

// Test Case 1: Seoul, Low Income, Eng Major
const user1: UserProfile = {
    id: 'user1',
    address: '서울',
    income_bracket: 2,
    major_large_category: '공학계열',
    gpa: 3.5,
    current_grade: 2
};

console.log('--- User 1: Seoul, Income 2, Eng, GPA 3.5 ---');
scholarships.forEach(s => {
    const score = calculateMatchScore(user1, s);
    console.log(`[${s.name}] Score: ${score} (Expected: >0 for Seoul & Eng, 0 for Grade/GPA mismatch if any)`);
});

// Test Case 2: Gyeonggi, High GPA, Art Major
const user2: UserProfile = {
    id: 'user2',
    address: '경기',
    income_bracket: 9,
    major_large_category: '예체능계열',
    gpa: 4.2,
    current_grade: 3
};

console.log('\n--- User 2: Gyeonggi, Income 9, Art, GPA 4.2 ---');
scholarships.forEach(s => {
    const score = calculateMatchScore(user2, s);
    console.log(`[${s.name}] Score: ${score}`);
});
