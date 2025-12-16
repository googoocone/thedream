'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { calculateMatchScore, UserProfile, Scholarship as MatchingScholarship } from '@/utils/matching'

// Mock User Profiles for Automated Diagnostics
const MOCK_PROFILES: { name: string; description: string; profile: UserProfile }[] = [
    {
        name: '표준 대학생 (공대)',
        description: '서울 거주, 공학계열, 소득 5분위, 학점 3.5',
        profile: {
            id: 'mock_1',
            nickname: 'Standard Eng',
            school_type: 'university',
            major_large_category: '공학',
            current_grade: 2,
            gpa: 3.5,
            income_bracket: 5,
            address: '서울 강남구',
            parents_address: '서울 강남구',
            nationality: 'Korea',
            gender: 'male',
            enrollment_status: 'enrolled'
        }
    },
    {
        name: '저소득층 우수학생',
        description: '지방 거주, 인문계열, 소득 1분위, 학점 4.2',
        profile: {
            id: 'mock_2',
            nickname: 'Low Income High GPA',
            school_type: 'university',
            major_large_category: '인문',
            current_grade: 3,
            gpa: 4.2,
            income_bracket: 1,
            address: '부산 해운대구',
            parents_address: '부산 해운대구',
            nationality: 'Korea',
            gender: 'female',
            enrollment_status: 'enrolled'
        }
    },
    {
        name: '고등학생 (예체능)',
        description: '경기 거주, 고등학생, 예체능',
        profile: {
            id: 'mock_3',
            nickname: 'High School Arts',
            school_type: 'high_school',
            major_large_category: '예체능',
            current_grade: 2,
            address: '경기 수원시',
            nationality: 'Korea',
            gender: 'female'
        }
    },
    {
        name: '다문화 가정 학생',
        description: '다문화 가정 태그 보유, 소득 4분위',
        profile: {
            id: 'mock_4',
            nickname: 'Multicultural',
            school_type: 'university',
            income_bracket: 4,
            address: '서울',
            special_criteria: ['multicultural'],
            nationality: 'Korea'
        }
    }
]

// Extended Scholarship interface for UI (compatible with MatchingScholarship)
interface Scholarship extends MatchingScholarship {
    tags: string[];
}

export default function VerifyPage() {
    const [scholarships, setScholarships] = useState<Scholarship[]>([])
    const [loading, setLoading] = useState(true)
    const [expandedId, setExpandedId] = useState<string | null>(null)
    const supabase = createClient()

    // Diagnostic State
    const [diagnosticResults, setDiagnosticResults] = useState<{ [key: string]: Scholarship[] }>({})
    const [runDiagnostics, setRunDiagnostics] = useState(false)

    // Interactive Tester State - Expanded
    const [testEdu, setTestEdu] = useState('')
    const [testMajorCategory, setTestMajorCategory] = useState('')
    const [testSearch, setTestSearch] = useState('')

    // Detailed Filters
    const [showDetailedFilters, setShowDetailedFilters] = useState(false)
    const [testGrade, setTestGrade] = useState('') // 학년
    const [testGpa, setTestGpa] = useState('') // 학점 (최소)
    const [testIncome, setTestIncome] = useState('') // 소득 (최대)
    const [testGender, setTestGender] = useState('')
    const [testRegion, setTestRegion] = useState('') // 거주지
    const [testParentsRegion, setTestParentsRegion] = useState('')
    const [testUnivRegion, setTestUnivRegion] = useState('')
    const [testHighSchoolRegion, setTestHighSchoolRegion] = useState('')
    const [testMajor, setTestMajor] = useState('') // 전공명
    const [testPrevCredit, setTestPrevCredit] = useState('') // 이수학점
    const [testSpecific, setTestSpecific] = useState('') // 특화자격
    const [testNationality, setTestNationality] = useState('')
    const [testEnrollment, setTestEnrollment] = useState('')
    const [testCsat, setTestCsat] = useState('') // 수능
    const [testSchoolGrade, setTestSchoolGrade] = useState('') // 내신

    useEffect(() => {
        const fetchAll = async () => {
            const { data, error } = await supabase
                .from('scholarships')
                .select(`
                    id, name, foundation, tags, amount, application_end,
                    target_grade, min_gpa, max_income, target_gender,
                    target_school_type, target_region, target_major, target_major_category,
                    min_prev_semester_credits, special_criteria, target_nationality,
                    target_parents_region, target_university_region, target_high_school_region,
                    max_csat_grade, max_school_grade, target_enrollment_status
                `)

            if (data) {
                setScholarships(data)
                // Auto-run diagnostics on load
                runAutomatedDiagnostics(data)
            }
            setLoading(false)
        }
        fetchAll()
    }, [supabase])

    const runAutomatedDiagnostics = (data: Scholarship[]) => {
        const results: { [key: string]: Scholarship[] } = {};

        MOCK_PROFILES.forEach(scenario => {
            // Use the ACTUAL matching engine
            const matches = data.filter(scholarship => {
                const score = calculateMatchScore(scenario.profile, scholarship);
                return score > 0; // If score > 0, it's a match
            });
            results[scenario.name] = matches;
        });

        setDiagnosticResults(results);
    }

    // Filter Logic Simulation
    const filterData = (data: Scholarship[], filters: any) => {
        return data.filter(item => {
            let match = true;

            // 1. Search
            if (filters.search && !item.name.toLowerCase().includes(filters.search.toLowerCase())) {
                match = false;
            }

            // 2. Edu Filter
            if (filters.edu) {
                if (filters.edu === 'university') {
                    const types = (item.target_school_type || '').split(',').map(s => s.trim());
                    if (!types.includes('university') && !types.includes('college')) match = false;
                } else if (filters.edu === 'high_school') {
                    if (item.target_school_type !== 'high_school') match = false;
                } else {
                    if (item.target_school_type !== filters.edu) match = false;
                }
            }

            // 3. Major Category
            if (filters.majorCategory && !item.target_major_category?.includes(filters.majorCategory)) {
                match = false;
            }

            // 4. Grade
            if (filters.grade) {
                const grades = (item.target_grade || '').split(',').map(g => g.trim());
                if (!grades.includes(filters.grade)) match = false;
            }

            // --- Detailed Filters ---

            // 5. GPA (item.min_gpa <= user.gpa)
            // Here we verify if the scholarship requires a HIGHER GPA than the user has.
            // If user inputs 3.5, and scholarship requires 4.0, it should NOT show up (technically).
            // BUT usually "Verify" tools show matches.
            // Let's assume the user inputs THEIR profile.
            // Match = (User GPA >= Scholarship Min GPA)
            if (filters.gpa && item.min_gpa) {
                if (parseFloat(filters.gpa) < item.min_gpa) match = false;
            }

            // 6. Income (item.max_income >= user.income)
            // Match = (User Income <= Scholarship Max Income)
            if (filters.income && item.max_income) {
                if (parseInt(filters.income) > item.max_income) match = false;
            }

            // 7. Gender
            if (filters.gender && item.target_gender && item.target_gender !== 'any') {
                if (item.target_gender !== filters.gender) match = false;
            }

            // 8. Regions (User region includes target region OR target is全国)
            // For verification, let's do a simple includes check:
            // If scholarship targets "Seoul", user must input "Seoul" to match.
            // If scholarship targets "Any", it matches everything.
            if (filters.region && item.target_region && item.target_region !== '전국') {
                if (!filters.region.includes(item.target_region)) match = false;
            }
            if (filters.parentsRegion && item.target_parents_region && item.target_parents_region !== '전국') {
                if (!filters.parentsRegion.includes(item.target_parents_region)) match = false;
            }
            // ... similar for other regions if strict matching needed.
            // For University/HighSchool region, currently simplified logic in matching.ts, so skipping strict check here for simplicity unless requested.

            // 9. Specific Qualification (Search text)
            if (filters.specific && item.special_criteria) {
                if (!item.special_criteria.some((c: string) => c.includes(filters.specific))) match = false;
            }

            // 10. Nationality
            if (filters.nationality) {
                // If scholarship targets Korea, user must be Korea.
                // If scholarship targets Foreigner, user must be Foreigner.
                if (item.target_nationality === 'Korea' && filters.nationality !== 'Korea') match = false;
                if (item.target_nationality === 'Foreigner' && filters.nationality === 'Korea') match = false;
            }

            return match;
        })
    }

    if (loading) return <div className="p-10 text-center">데이터 로딩 중...</div>

    const testResults = filterData(scholarships, {
        edu: testEdu,
        majorCategory: testMajorCategory,
        search: testSearch,
        grade: testGrade,
        gpa: testGpa,
        income: testIncome,
        gender: testGender,
        region: testRegion,
        parentsRegion: testParentsRegion,
        specific: testSpecific,
        nationality: testNationality,
        // Add others as needed for filterData logic
    });

    return (
        <div className="max-w-6xl mx-auto p-8 pb-32">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">🔍 장학금 필터 검증 대시보드</h1>
                <Link href="/admin/scholarships" className="text-gray-500 hover:text-gray-900">
                    ← 관리자 메인으로
                </Link>
            </div>

            {/* Section 1: Health Check (Automated Diagnostics) */}
            <section className="mb-12">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <span className="text-2xl">🩺</span> 로직 정밀 진단 (Powered by Matching Engine)
                    </h2>
                    <button
                        onClick={() => runAutomatedDiagnostics(scholarships)}
                        className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg text-gray-700 font-medium transition-colors"
                    >
                        🔄 재검사
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {MOCK_PROFILES.map((scenario, idx) => {
                        const results = diagnosticResults[scenario.name] || [];
                        const matchCount = results.length;

                        // Pass/Fail Logic (Heuristic for demo)
                        // Ideally, we want >0 matches for standard profiles.
                        const isWarning = matchCount === 0;

                        return (
                            <div key={idx} className={`p-5 rounded-xl border shadow-sm transition-all hover:shadow-md ${isWarning ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'}`}>
                                <div className="text-gray-500 text-xs mb-1 font-mono">{scenario.description}</div>
                                <h3 className="font-bold text-lg mb-2">{scenario.name}</h3>

                                <div className={`text-3xl font-bold mb-2 ${isWarning ? 'text-red-500' : 'text-[#0984E3]'}`}>
                                    {matchCount}건
                                </div>

                                <div className="text-xs text-gray-400 border-t pt-2 mt-2">
                                    {matchCount > 0 ? (
                                        <>
                                            <div className="mb-1 text-gray-500 font-semibold">Matching:</div>
                                            <ul className="list-disc pl-4 space-y-1">
                                                {results.slice(0, 3).map(r => (
                                                    <li key={r.id} className="truncate" title={r.name}>{r.name}</li>
                                                ))}
                                                {matchCount > 3 && <li>...외 {matchCount - 3}건</li>}
                                            </ul>
                                        </>
                                    ) : (
                                        <span className="text-red-400 font-medium">매칭된 장학금이 없습니다.</span>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>

            {/* Section 2: Interactive Tester */}
            <section>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <span className="text-2xl">🧪</span> 필터 테스터 (수동)
                    </h2>
                    <button
                        onClick={() => setShowDetailedFilters(!showDetailedFilters)}
                        className="text-sm text-[#0984E3] hover:underline font-medium"
                    >
                        {showDetailedFilters ? '간편 필터만 보기' : '상세 필터(16개) 모두 보기'}
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                    {/* Controls */}
                    <div className="p-6 bg-gray-50 border-b border-gray-200 space-y-4">
                        {/* Basic Row */}
                        <div className="flex flex-wrap gap-4">
                            <select
                                value={testEdu}
                                onChange={(e) => setTestEdu(e.target.value)}
                                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-40"
                            >
                                <option value="">학력 (전체)</option>
                                <option value="high_school">고등학교</option>
                                <option value="university">대학교/전문대</option>
                                <option value="grad_school">대학원</option>
                            </select>
                            <select
                                value={testMajorCategory}
                                onChange={(e) => setTestMajorCategory(e.target.value)}
                                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-40"
                            >
                                <option value="">전공계열 (전체)</option>
                                <option value="공학">공학계열</option>
                                <option value="인문">인문계열</option>
                                <option value="사회">사회계열</option>
                                <option value="예체능">예체능계열</option>
                                <option value="의약">의약계열</option>
                                <option value="자연">자연계열</option>
                            </select>
                            <input
                                type="text"
                                placeholder="이름 검색..."
                                value={testSearch}
                                onChange={(e) => setTestSearch(e.target.value)}
                                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none flex-grow"
                            />
                        </div>

                        {/* Detailed Row (Toggleable) */}
                        {showDetailedFilters && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-200 animate-in fade-in slide-in-from-top-2">
                                <FilterInput label="학년 (예: 1)" value={testGrade} onChange={setTestGrade} placeholder="1, 2, 3..." />
                                <FilterInput label="최소 학점 (GPA)" value={testGpa} onChange={setTestGpa} placeholder="3.5" />
                                <FilterInput label="소득분위 (최대)" value={testIncome} onChange={setTestIncome} placeholder="8" />
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500">성별</label>
                                    <select
                                        value={testGender}
                                        onChange={(e) => setTestGender(e.target.value)}
                                        className="w-full px-3 py-2 border rounded text-sm outline-none focus:border-blue-500"
                                    >
                                        <option value="">무관</option>
                                        <option value="male">남성</option>
                                        <option value="female">여성</option>
                                    </select>
                                </div>
                                <FilterInput label="거주지 (지역명)" value={testRegion} onChange={setTestRegion} placeholder="서울, 경기..." />
                                <FilterInput label="부모님 거주지" value={testParentsRegion} onChange={setTestParentsRegion} placeholder="지역명" />
                                <FilterInput label="대학교 지역" value={testUnivRegion} onChange={setTestUnivRegion} placeholder="지역명" />
                                <FilterInput label="고등학교 지역" value={testHighSchoolRegion} onChange={setTestHighSchoolRegion} placeholder="지역명" />

                                <FilterInput label="특화 자격" value={testSpecific} onChange={setTestSpecific} placeholder="농어촌, 다문화..." />
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500">국적</label>
                                    <select
                                        value={testNationality}
                                        onChange={(e) => setTestNationality(e.target.value)}
                                        className="w-full px-3 py-2 border rounded text-sm outline-none focus:border-blue-500"
                                    >
                                        <option value="">전체</option>
                                        <option value="Korea">대한민국</option>
                                        <option value="Foreigner">외국인</option>
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Results Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-100 text-gray-600 uppercase">
                                <tr>
                                    <th className="px-6 py-3">장학금명</th>
                                    <th className="px-6 py-3">학력 (School)</th>
                                    <th className="px-6 py-3">전공 (Major)</th>
                                    <th className="px-6 py-3">학년 (Grade)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {testResults.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                            매칭되는 결과가 없습니다.
                                        </td>
                                    </tr>
                                ) : (
                                    testResults.map((item) => (
                                        <>
                                            <tr
                                                key={item.id}
                                                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                                                className={`cursor-pointer transition-colors ${expandedId === item.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                                            >
                                                <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-2">
                                                    <span className={`transform transition-transform ${expandedId === item.id ? 'rotate-90' : ''}`}>▶</span>
                                                    {item.name}
                                                </td>
                                                <td className="px-6 py-4 text-gray-600 font-mono text-xs">{item.target_school_type || '-'}</td>
                                                <td className="px-6 py-4 text-gray-600 font-mono text-xs">{item.target_major_category || '-'}</td>
                                                <td className="px-6 py-4 text-gray-600 font-mono text-xs">{item.target_grade || '-'}</td>
                                            </tr>
                                            {expandedId === item.id && (
                                                <tr className="bg-gray-50">
                                                    <td colSpan={5} className="px-6 py-6">
                                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                                            <DetailItem label="대상 학년" value={item.target_grade} />
                                                            <DetailItem label="최소 학점" value={item.min_gpa} />
                                                            <DetailItem label="최대 소득 (분위)" value={item.max_income} />
                                                            <DetailItem label="성별" value={item.target_gender} />
                                                            <DetailItem label="대학 종류" value={item.target_school_type} />
                                                            <DetailItem label="학생 거주지역" value={item.target_region} />
                                                            <DetailItem label="전공 계열" value={item.target_major_category} />
                                                            <DetailItem label="전공 상세" value={item.target_major} />
                                                            <DetailItem label="직전 이수학점" value={item.min_prev_semester_credits} />
                                                            <DetailItem label="특화 자격" value={item.special_criteria?.join(', ')} />
                                                            <DetailItem label="국적" value={item.target_nationality} />
                                                            <DetailItem label="부모 거주지역" value={item.target_parents_region} />
                                                            <DetailItem label="대학교 지역" value={item.target_university_region} />
                                                            <DetailItem label="고등학교 지역" value={item.target_high_school_region} />
                                                            <DetailItem label="수능 성적" value={item.max_csat_grade} />
                                                            <DetailItem label="내신 성적" value={item.max_school_grade} />
                                                            <DetailItem label="재학 상태" value={item.target_enrollment_status} />
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    )
}

function FilterInput({ label, value, onChange, placeholder }: { label: string, value: string, onChange: (v: string) => void, placeholder?: string }) {
    return (
        <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500">{label}</label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full px-3 py-2 border rounded text-sm outline-none focus:border-blue-500 transition-colors"
            />
        </div>
    )
}

function DetailItem({ label, value }: { label: string, value: any }) {
    if (value === null || value === undefined || value === '') return null;
    return (
        <div className="bg-white p-3 rounded border border-gray-100">
            <div className="text-xs text-gray-400 mb-1">{label}</div>
            <div className="font-semibold text-gray-800 break-words">{String(value)}</div>
        </div>
    )
}
