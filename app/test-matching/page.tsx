'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { calculateMatchScore, extractUserKeywords, detectScholarshipRegions, Scholarship, UserProfile } from '@/utils/matching'
import Link from 'next/link'

export default function TestMatchingPage() {
    const [user, setUser] = useState<UserProfile | null>(null)
    const [scholarships, setScholarships] = useState<Scholarship[]>([])
    const [matches, setMatches] = useState<{ scholarship: Scholarship, score: number, keywords: string[] }[]>([])
    const [loading, setLoading] = useState(true)
    const [useMockUser, setUseMockUser] = useState(false)
    const supabase = createClient()

    const mockUser: UserProfile = {
        id: "44c37da9-f9dc-4422-a9f5-50c632da891e",
        email: "snu910501@naver.com",
        nickname: "snu910501",
        birth_date: "1991-05-01",
        gender: "male",
        phone_number: "010-8285-5136",
        address: "경기 안산시 단원구 반달섬1로 4 (성곡동, 웅신 미켈란의 아침)",
        nationality: "Korea",
        parents_address: "전북특별자치도 김제시 갈공길 14 (서암동)",
        residence_type: "diff",
        religion: "christianity",
        enrollment_status: "enrolled",
        school_name: "부산대학교",
        school_type: "university",
        current_grade: 2,
        current_semester: 2,
        major: "경제학과",
        income_bracket: 9,
        family_size: 1,
        high_school_type: "general",
        additional_info: "택배업 종사자의 자녀입니다."
    }

    useEffect(() => {
        const fetchData = async () => {
            // 1. Get User
            const { data: { user: authUser } } = await supabase.auth.getUser()

            if (authUser) {
                const { data: userData } = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', authUser.id)
                    .single()

                if (userData) {
                    setUser(userData)
                }
            }

            // 2. Get Scholarships
            const { data: scholarshipData } = await supabase
                .from('scholarships')
                .select('*')

            if (scholarshipData) {
                setScholarships(scholarshipData)
            }

            setLoading(false)
        }

        fetchData()
    }, [supabase])

    const activeUser = useMockUser ? mockUser : user;

    useEffect(() => {
        if (activeUser && scholarships.length > 0) {
            const results = scholarships.map(scholarship => {
                const score = calculateMatchScore(activeUser, scholarship)
                return {
                    scholarship,
                    score,
                    keywords: extractUserKeywords(activeUser)
                }
            })

            // Sort by score desc
            results.sort((a, b) => b.score - a.score)

            setMatches(results)
        }
    }, [activeUser, scholarships])

    if (loading) return <div className="p-8">Loading...</div>

    return (
        <div className="max-w-5xl mx-auto p-8 pb-20">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">장학금 매칭 테스트</h1>
                <button
                    onClick={() => setUseMockUser(!useMockUser)}
                    className={`px-4 py-2 rounded-lg font-bold transition-colors ${useMockUser ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    {useMockUser ? '테스트 유저 사용 중' : '실제 유저 사용 중'} (전환하기)
                </button>
            </div>

            {!activeUser && !useMockUser && (
                <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg mb-6">
                    로그인이 필요합니다. 또는 '테스트 유저'를 사용하여 기능을 확인해보세요.
                </div>
            )}

            {activeUser && (
                <div className="bg-gray-50 p-6 rounded-xl mb-8 border">
                    <h2 className="font-bold mb-4">
                        {useMockUser ? '테스트 프로필 (Mock)' : '내 프로필'} 키워드
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {extractUserKeywords(activeUser).map((k, i) => (
                            <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                {k}
                            </span>
                        ))}
                    </div>
                    <div className="mt-4 text-sm text-gray-600">
                        <p><strong>이름:</strong> {activeUser.nickname}</p>
                        <p><strong>주소:</strong> {activeUser.address}</p>
                        {activeUser.parents_address && <p><strong>부모님 주소:</strong> {activeUser.parents_address}</p>}
                        <p><strong>학교:</strong> {activeUser.school_name} ({activeUser.school_type})</p>
                        <p><strong>학과:</strong> {activeUser.major}</p>
                        <p><strong>소득:</strong> {activeUser.income_bracket}분위</p>
                        <p><strong>추가정보:</strong> {activeUser.additional_info}</p>
                    </div>
                </div>
            )}

            <h2 className="font-bold mb-4">매칭 결과 ({matches.length}개)</h2>
            <div className="space-y-4">
                {matches.map((match, index) => (
                    <div key={match.scholarship.id} className="border rounded-xl p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`text-lg font-bold ${match.score >= 50 ? 'text-green-600' : 'text-gray-600'}`}>
                                        {match.score}점
                                    </span>
                                    <h3 className="font-bold text-lg">{match.scholarship.name}</h3>
                                </div>
                                <p className="text-sm text-gray-500 mb-2">{match.scholarship.foundation}</p>
                                <div className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                                    <p><strong>지역:</strong> {match.scholarship.target_region || '제한없음'}
                                        {detectScholarshipRegions(match.scholarship).length > 0 && (
                                            <span className="text-xs text-red-500 ml-2">
                                                (감지됨: {detectScholarshipRegions(match.scholarship).join(', ')})
                                            </span>
                                        )}
                                    </p>
                                    <p><strong>대상:</strong> {match.scholarship.target_description}</p>
                                    <p><strong>자격:</strong> {match.scholarship.eligibility}</p>
                                    <p><strong>해시태그:</strong> {match.scholarship.target_hashtags?.join(', ')}</p>
                                </div>
                            </div>
                            <Link href={`/scholarships/${match.scholarship.id}`} className="text-blue-500 text-sm hover:underline shrink-0">
                                상세보기
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
