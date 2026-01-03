'use server';

import { createClient } from '@/utils/supabase/client';
import { Scholarship, UserProfile, calculateMatchScore } from '@/utils/matching';

export type CalculatorFormState = {
    grade: number; // 1, 2, 3, 4
    gpa: number; // e.g. 3.5
    income: number; // 0-10
    residence: string; // e.g. '서울', '경기'
    majorCategory: string; // e.g. '공학계열'
};

export async function searchScholarships(criteria: CalculatorFormState) {
    const supabase = createClient();

    // Fetch all active scholarships
    // Optimization: In a real app with many rows, we would filter more on DB side.
    // For now, we fetch 'active' scholarships and do fine-grained matching in JS 
    // to reuse the complex logic in calculateMatchScore.
    // We can at least filter by some broad criteria if possible, but our matching logic is complex.
    // Let's fetch all providing strictly basic validity checks (e.g. application period?).
    // For this v1, fetching all active/open ones is acceptable if dataset is < 1000.
    const { data: scholarships, error } = await supabase
        .from('scholarships')
        .select('*');

    if (error) {
        console.error('Error fetching scholarships:', error);
        return { error: '장학금 정보를 불러오는데 실패했습니다.' };
    }

    if (!scholarships) {
        return { data: [], totalAmount: 0 };
    }

    // Create a temporary UserProfile object from the form data
    const tempProfile: UserProfile = {
        id: 'temp-calculator-user',
        current_grade: criteria.grade,
        gpa: criteria.gpa,
        income_bracket: criteria.income,
        address: criteria.residence, // Used for 'target_region' matching
        parents_address: criteria.residence, // Assume parents live same place for MVP or ask separately? Plan said simplify.
        major_large_category: criteria.majorCategory,
        major: criteria.majorCategory, // Fallback for simple matching
        school_type: 'university', // Default to university for now, or add to form if needed
        enrollment_status: 'enrolled', // Default assumption
        residence_type: 'same',
        special_criteria: [],
        nationality: 'Korea',
    };

    // Perform matching
    const matched = scholarships
        .map((s) => {
            const score = calculateMatchScore(tempProfile, s as Scholarship);
            return { ...s, score };
        })
        .filter((s) => s.score > 0) // Only keep valid matches
        .sort((a, b) => b.score - a.score); // Sort by relevance

    // Calculate potential total amount
    // This is tricky because "amount" is text (e.g. "200만원", "등록금 전액").
    // We will try to parse simple integers, otherwise ignore.
    let totalAmount = 0;
    matched.forEach((s) => {
        const amtStr = s.amount || '';
        // specific logic to extract numbers. e.g. "학기당 200만원" -> 2000000
        // "등록금 전액" -> maybe set a capped average like 3000000? 
        // Let's do a simple regex for "man-won".

        let parsed = 0;
        if (amtStr.includes('전액')) {
            parsed = 3000000; // Proxy for full tuition
        } else {
            const numbers = amtStr.match(/(\d+)(만|,000)/);
            if (numbers) {
                let num = parseInt(numbers[1].replace(/,/g, ''));
                if (numbers[2] === '만') num *= 10000;
                parsed = num;
            }
        }
        // Optimization: Don't just sum everything (unrealistic to get ALL).
        // Maybe sum the top 3? Or just sum them all for the "MAX Amount" capabilities ("You COULD get...").
        // The prompt says "Max 450 man-won", suggesting a sum of likely combinations.
        // Let's simply sum all matches for the "Wow" factor as "Potential Max".
        totalAmount += parsed;
    });

    return {
        data: matched,
        totalAmount
    };
}
