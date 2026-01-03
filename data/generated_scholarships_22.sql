-- Generated SQL for Scholarship Insertion (v3 - Extracted & Split)


INSERT INTO scholarships (
    group_name, name, foundation, category, benefit_type, payment_method, payment_period,
    extra_benefits, target_hashtags, target_description, eligibility, selection_count,
    application_count, application_period, application_start, application_end,
    application_method, required_documents, description, contact, link, amount,
    target_grade, min_gpa, max_income, target_gender, target_school_type,
    target_region, target_major_category, min_prev_semester_credits, special_criteria,
    target_nationality, target_parents_region, target_university_region, target_high_school_region,
    max_csat_grade, max_school_grade, target_enrollment_status, target_universities
) VALUES (
    '2025년 도전인재 장학금', '2025년 도전인재 장학금 (재학생/일반)', '익산사랑장학재단', '공공장학', '학업장려금', '2개 분야 중복 신청/수혜 가능', '당해연도',
    '없음', ARRAY['대학생', '전문대생'], '공고일 기준 6개월 이상 익산시에 연속하여 주소를 두고 있는 관내 4개 대학의 재학생 (*원광대학교, 원광보건대학교, 전북대학교 특성화캠퍼스, 한국폴리텍V대학교 익산캠퍼스 나노측정과/자동차융합기계과)', '1) 자격증 취득 및 공인 어학 성적 우수 분야: 국가기술자격증, 공인어학성적, 전공심화과정 취득자격증
2) 응시료 지원 분야: 국가공인자격증, 공인어학, 한국사능력검정시험', '700명 (자격증/어학 200 + 응시료 500)',
    '연 1회', '2025-11-20 ~ 2025-11-28', '2025-11-20', '2025-11-28',
    '익산시청 홈페이지 온라인 접수', '신청서, 개인정보 수집/이용 동의서, 학생 주민등록초본, 재학증명서, 통장사본 등 (유형별 상이)', '익산시 관내 대학 재학생 중 국가기술자격 등 자격증 취득자, 공인어학 성적 우수자에게 장학금 지급 및 자격증 응시료 지원', '익산사랑장학재단 (063-859-5820, 5159)', 'https://ilsaf.or.kr/selection/announceview.asp', '자격증&어학분야 50만원 / 응시료분야 10만원 이내',
    '1,2,3,4', 0, 10, 'any', 'university',
    '익산', '무관', 12, NULL,
    'Korea', '전국', '익산', '전국',
    9, 9, 'enrolled', '원광보건대학교,한국폴리텍V대학교,원광대학교,전북대학교'
);
