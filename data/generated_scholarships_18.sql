-- 1. 감독회장 장학금 (대학생, 신학과)
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
    '2026년도 전반기 감리회 감독회장 장학금', '2026년도 전반기 감리회 감독회장 장학금', '기독교대한감리회장학재단', '민간장학', '학업장려금', '2월 말 발표 후 지급', '해당학기',
    '없음', ARRAY['대학생'], '감리교신학대학교, 목원대학교, 협성대학교', '각 선발 대상 대학교 신학과(신학전공) 1명', '3명',
    '연 2회', '2025-11-26 ~ 2026-01-30', '2025-11-26', '2026-01-30',
    '등기 우편 (신청 마감일 우체국 소인까지)', '학교 공문(학교 직인 날인), 장학금신청서, 담임목사 추천서, 교목 추천서, 총장 추천서, 성적증명서(현 과정 전 학년, 25년 2학기 포함), 재학증명서, 신앙에세이 A4 2장 (주제: 감리교회를 위해 어떻게 헌신할 것인가?), 선발회의록 사본, 학교 통장 사본, 개인정보 수집/이용/제공/조회 동의서', '재단법인 기독교대한감리회 장학재단은 감리교회와 한국사회 미래에 희망이 되는 인재 육성을 위해 장학생을 모집', '기독교대한감리회 장학재단 (02-399-4373, 4367)', 'https://kmc.or.kr/head-quater-kmc/notice?keyword=%EC%9E%A5%ED%95%99&mode=detail&pid=193249', '200만원',
    '1,2,3,4', 0, 10, 'any', 'university',
    '전국', '기독교신학', 0, NULL,
    'Korea', '전국', '전국', '전국',
    9, 9, 'enrolled', '감리교신학대학교,목원대학교,협성대학교'
);

-- 2. 교역자양성 장학금 (대학원생, 신학대학원)
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
    '2026년도 전반기 감리회 교역자양성 장학금', '2026년도 전반기 감리회 교역자양성 장학금', '기독교대한감리회장학재단', '민간장학', '학업장려금', '2월 말 발표 후 지급', '해당학기',
    '없음', ARRAY['대학원생'], '감리교신학대학교, 목원대학교, 협성대학교, 연세대학교연합신학대학원', '각 선발 대상 신학대학원생 1명', '4명',
    '연 2회', '2025-11-26 ~ 2026-01-30', '2025-11-26', '2026-01-30',
    '등기 우편 (신청 마감일 우체국 소인까지)', '학교 공문(학교 직인 날인), 장학금신청서, 담임목사 추천서, 교목 추천서, 총장 추천서, 성적증명서(현 과정 전 학년, 25년 2학기 포함), 재학증명서, 신앙에세이 A4 2장 (주제: 감리교회를 위해 어떻게 헌신할 것인가?), 선발회의록 사본, 학교 통장 사본, 개인정보 수집/이용/제공/조회 동의서', '재단법인 기독교대한감리회 장학재단은 감리교회와 한국사회 미래에 희망이 되는 인재 육성을 위해 장학생을 모집', '기독교대한감리회 장학재단 (02-399-4373, 4367)', 'https://kmc.or.kr/head-quater-kmc/notice?keyword=%EC%9E%A5%ED%95%99&mode=detail&pid=193249', '200만원',
    '1,2,3,4', 0, 10, 'any', 'grad_school',
    '전국', '기독교신학', 0, NULL,
    'Korea', '전국', '전국', '전국',
    9, 9, 'enrolled', '감리교신학대학교,목원대학교,협성대학교,연세대학교연합신학대학원'
);

-- 3. 계통대학교 장학금 (대학생, 성적 3.3/4.0 이상)
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
    '2026년도 전반기 감리회 계통대학교 장학금', '2026년도 전반기 감리회 계통대학교 장학금', '기독교대한감리회장학재단', '민간장학', '학업장려금', '2월 말 발표 후 지급', '해당학기',
    '없음', ARRAY['대학생'], '감신대학교, 목원대학교, 협성대학교, 연세대학교, 이화여자대학교, 배재대학교, 배화여자대학교, 인덕대학교, 안산대학교, 남서울대학교, 한양대학교, 호서대학교', '아래 조건을 모두 만족하는 각 선발 대상 대학교 1명
1) 감리교인
2) 성적우수자 (직전학기 성적 B+ 또는 3.3/4.0점 이상)
3) 가정 형편이 어려운 학생', '12명',
    '연 2회', '2025-11-26 ~ 2026-01-30', '2025-11-26', '2026-01-30',
    '등기 우편 (신청 마감일 우체국 소인까지)', '학교 공문(학교 직인 날인), 장학금신청서, 담임목사 추천서, 교목 추천서, 총장 추천서, 성적증명서(현 과정 전 학년, 25년 2학기 포함), 재학증명서, 신앙에세이 A4 2장 (주제: 감리교회를 위해 어떻게 헌신할 것인가?), 학교 통장 사본, 개인정보 수집/이용/제공/조회 동의서', '재단법인 기독교대한감리회 장학재단은 감리교회와 한국사회 미래에 희망이 되는 인재 육성을 위해 장학생을 모집', '기독교대한감리회 장학재단 (02-399-4373, 4367)', 'https://kmc.or.kr/head-quater-kmc/notice?keyword=%EC%9E%A5%ED%95%99&mode=detail&pid=193249', '200만원',
    '1,2,3,4', 3.7, 10, 'any', 'university',
    '전국', '무관', 0, NULL,
    'Korea', '전국', '전국', '전국',
    9, 9, 'enrolled', '감리교신학대학교,목원대학교,협성대학교,연세대학교,이화여자대학교,배재대학교,배화여자대학교,인덕대학교,안산대학교,남서울대학교,한양대학교,호서대학교'
);

-- 4. 연회별 교역자 자녀 장학금 (대학생)
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
    '2026년도 전반기 감리회 연회별 교역자 자녀 장학금', '2026년도 전반기 감리회 연회별 교역자 자녀 장학금', '기독교대한감리회장학재단', '민간장학', '학업장려금', '2월 말 발표 후 지급', '해당학기',
    '없음', ARRAY['대학생'], '감리교회 교역자 자녀', '연결산 9,000만원 미만 교회의 교역자 자녀 중 정규 대학에 재학 중인 성적우수자 (각 연회별 대학생 1명)', NULL,
    '연 2회', '2025-11-26 ~ 2026-01-30', '2025-11-26', '2026-01-30',
    '등기 우편 (신청 마감일 우체국 소인까지)', '장학금신청서, 감리사 추천서, 가족관계증명서, 성적증명서(현 과정 전 학년, 25년 2학기 포함), 재학증명서, 신앙에세이 A4 2장 (주제: 감리교회를 위해 어떻게 헌신할 것인가?), 2025년도 교회통계표 사본, 2025년도 건강보험 납부확인서 (합산-부모기준), 건강보험 자격확인서, 신청자 통장 사본, 개인정보 수집/이용/제공/조회 동의서', '재단법인 기독교대한감리회 장학재단은 감리교회와 한국사회 미래에 희망이 되는 인재 육성을 위해 장학생을 모집', '기독교대한감리회 장학재단 (02-399-4373, 4367)', 'https://kmc.or.kr/head-quater-kmc/notice?keyword=%EC%9E%A5%ED%95%99&mode=detail&pid=193249', '200만원',
    '1,2,3,4', 0, 10, 'any', 'university',
    '전국', '무관', 0, NULL,
    'Korea', '전국', '전국', '전국',
    9, 9, 'enrolled', '무관'
);

-- 5. 연회별 평신도 자녀 장학금 (대학생)
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
    '22026년도 전반기 감리회 연회별 평신도 자녀 장학금', '2026년도 전반기 감리회 연회별 평신도 자녀 장학금', '기독교대한감리회장학재단', '민간장학', '학업장려금', '2월 말 발표 후 지급', '해당학기',
    '없음', ARRAY['대학생'], '감리교회 출석 평신도 자녀 및 출석 학생', '정규 대학에 재학 중인 가정형편이 어려운 성적우수자 (각 연회별 대학생 1명)', NULL,
    '연 2회', '2025-11-26 ~ 2026-01-30', '2025-11-26', '2026-01-30',
    '등기 우편 (신청 마감일 우체국 소인까지)', '장학금신청서, 담임목사 추천서, 가족관계증명서, 성적증명서(현 과정 전 학년, 25년 2학기 포함), 재학증명서, 신앙에세이 A4 2장 (주제: 감리교회를 위해 어떻게 헌신할 것인가?), 2025년도 건강보험 납부확인서 (합산-부모기준), 건강보험 자격확인서, 신청자 통장 사본, 개인정보 수집/이용/제공/조회 동의서', '재단법인 기독교대한감리회 장학재단은 감리교회와 한국사회 미래에 희망이 되는 인재 육성을 위해 장학생을 모집', '기독교대한감리회 장학재단 (02-399-4373, 4367)', 'https://kmc.or.kr/head-quater-kmc/notice?keyword=%EC%9E%A5%ED%95%99&mode=detail&pid=193249', '200만원',
    '1,2,3,4', 0, 10, 'any', 'university',
    '전국', '무관', 0, NULL,
    'Korea', '전국', '전국', '전국',
    9, 9, 'enrolled', '무관'
);
