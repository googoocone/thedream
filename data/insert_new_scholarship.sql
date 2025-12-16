-- Generated SQL for Scholarship Insertion

-- Grouping Strategy: 'group_name' derived from 'name' for UI grouping


INSERT INTO scholarships (
    group_name, name, foundation, category, benefit_type, payment_method, payment_period,
    extra_benefits, target_hashtags, target_description, eligibility, selection_count,
    application_count, application_period, application_start, application_end,
    application_method, required_documents, description, contact, link, amount,
    target_grade, min_gpa, max_income, target_gender, target_school_type,
    target_region, target_major_category, min_prev_semester_credits, special_criteria,
    target_nationality, target_parents_region, target_university_region, target_high_school_region,
    max_csat_grade, max_school_grade, target_enrollment_status
) VALUES (
    '다자녀 국가장학금', '다자녀 국가장학금 (신입/편입)', '한국장학재단', '공공장학', '등록금', NULL, NULL,
    '없음', ARRAY['대학생'], '대한민국 국적을 소지한 국내대학의 학자금 지원 9구간 이하, 다자녀 가정의 가구원인 대학생(미혼에 한함)', '1) 신입생, 편입생, 재입학생 : 첫 학기에 한해 성적기준 미적용
2) 재학생 : 직전학기 12학점 이수하여 80/100점 이상 취득
- 기초/차상위: 직전학기 12학점 이수하여 70/100점 이상 취득
- 장애인: 성적기준(이수학점 및 백분위점수) 미적용
- 자립준비청년(보호아동 포함): 백분위점수 기준 미적용(단, 이수학점 기준은 적용)
- C학점 경고제: 1~3구간은 직전학기 70점 이상 ~ 80점 미만이라도 2회에 한해 경고 후 수혜 가능
- 졸업 또는 초과학기 학생은 이수학점 기준 적용 제외', '해당자 중 선발',
    NULL, '2025-11-20 ~ 2025-12-26', '2025-11-20', '2025-12-26',
    '학생 신청 → 재단 심사/선발/지급', '가족관계증명서, 주민등록등본 등
※ 신청 후 1일~3일(휴일 제외) 뒤에 [장학금] > [장학금신청] > [서류제출현황]에서 제출대상여부 확인 가능', '다자녀 가구의 등록금 부담 경감을 위해 지원되는 장학금.
서류 미제출 등으로 다자녀 여부가 확인되지 않을 경우 국가장학금 Ⅰ유형(학생직접지원형)으로 심사 및 지급.', '한국장학재단 (1599-2000)', 'https://www.kosaf.go.kr/ko/scholar.do?pg=scholarship05_12_10&ttab1=0', '등록금 전액 또는 일부',
    '1,2,3,4', 0, 9, 'any', 'university,college,cyber,open',
    '전국', '무관', 0, ARRAY['multi_child'],
    'Korea', '전국', '전국', '전국',
    9, 9, 'enrolled'
);

INSERT INTO scholarships (
    group_name, name, foundation, category, benefit_type, payment_method, payment_period,
    extra_benefits, target_hashtags, target_description, eligibility, selection_count,
    application_count, application_period, application_start, application_end,
    application_method, required_documents, description, contact, link, amount,
    target_grade, min_gpa, max_income, target_gender, target_school_type,
    target_region, target_major_category, min_prev_semester_credits, special_criteria,
    target_nationality, target_parents_region, target_university_region, target_high_school_region,
    max_csat_grade, max_school_grade, target_enrollment_status
) VALUES (
    '다자녀 국가장학금', '다자녀 국가장학금 (재학생/일반)', '한국장학재단', '공공장학', '등록금', NULL, NULL,
    '없음', ARRAY['대학생'], '대한민국 국적을 소지한 국내대학의 학자금 지원 9구간 이하, 다자녀 가정의 가구원인 대학생(미혼에 한함)', '1) 신입생, 편입생, 재입학생 : 첫 학기에 한해 성적기준 미적용
2) 재학생 : 직전학기 12학점 이수하여 80/100점 이상 취득
- 기초/차상위: 직전학기 12학점 이수하여 70/100점 이상 취득
- 장애인: 성적기준(이수학점 및 백분위점수) 미적용
- 자립준비청년(보호아동 포함): 백분위점수 기준 미적용(단, 이수학점 기준은 적용)
- C학점 경고제: 1~3구간은 직전학기 70점 이상 ~ 80점 미만이라도 2회에 한해 경고 후 수혜 가능
- 졸업 또는 초과학기 학생은 이수학점 기준 적용 제외', '해당자 중 선발',
    NULL, '2025-11-20 ~ 2025-12-26', '2025-11-20', '2025-12-26',
    '학생 신청 → 재단 심사/선발/지급', '가족관계증명서, 주민등록등본 등
※ 신청 후 1일~3일(휴일 제외) 뒤에 [장학금] > [장학금신청] > [서류제출현황]에서 제출대상여부 확인 가능', '다자녀 가구의 등록금 부담 경감을 위해 지원되는 장학금.
서류 미제출 등으로 다자녀 여부가 확인되지 않을 경우 국가장학금 Ⅰ유형(학생직접지원형)으로 심사 및 지급.', '한국장학재단 (1599-2000)', 'https://www.kosaf.go.kr/ko/scholar.do?pg=scholarship05_12_10&ttab1=0', '등록금 전액 또는 일부',
    '1,2,3,4', 3, 9, 'any', 'university,college,cyber,open',
    '전국', '무관', 12, ARRAY['multi_child'],
    'Korea', '전국', '전국', '전국',
    9, 9, 'enrolled'
);

INSERT INTO scholarships (
    group_name, name, foundation, category, benefit_type, payment_method, payment_period,
    extra_benefits, target_hashtags, target_description, eligibility, selection_count,
    application_count, application_period, application_start, application_end,
    application_method, required_documents, description, contact, link, amount,
    target_grade, min_gpa, max_income, target_gender, target_school_type,
    target_region, target_major_category, min_prev_semester_credits, special_criteria,
    target_nationality, target_parents_region, target_university_region, target_high_school_region,
    max_csat_grade, max_school_grade, target_enrollment_status
) VALUES (
    '다자녀 국가장학금', '다자녀 국가장학금 (기초/차상위)', '한국장학재단', '공공장학', '등록금', NULL, NULL,
    '없음', ARRAY['대학생'], '대한민국 국적을 소지한 국내대학의 학자금 지원 9구간 이하, 다자녀 가정의 가구원인 대학생(미혼에 한함)', '1) 신입생, 편입생, 재입학생 : 첫 학기에 한해 성적기준 미적용
2) 재학생 : 직전학기 12학점 이수하여 80/100점 이상 취득
- 기초/차상위: 직전학기 12학점 이수하여 70/100점 이상 취득
- 장애인: 성적기준(이수학점 및 백분위점수) 미적용
- 자립준비청년(보호아동 포함): 백분위점수 기준 미적용(단, 이수학점 기준은 적용)
- C학점 경고제: 1~3구간은 직전학기 70점 이상 ~ 80점 미만이라도 2회에 한해 경고 후 수혜 가능
- 졸업 또는 초과학기 학생은 이수학점 기준 적용 제외', '해당자 중 선발',
    NULL, '2025-11-20 ~ 2025-12-26', '2025-11-20', '2025-12-26',
    '학생 신청 → 재단 심사/선발/지급', '가족관계증명서, 주민등록등본 등
※ 신청 후 1일~3일(휴일 제외) 뒤에 [장학금] > [장학금신청] > [서류제출현황]에서 제출대상여부 확인 가능', '다자녀 가구의 등록금 부담 경감을 위해 지원되는 장학금.
서류 미제출 등으로 다자녀 여부가 확인되지 않을 경우 국가장학금 Ⅰ유형(학생직접지원형)으로 심사 및 지급.', '한국장학재단 (1599-2000)', 'https://www.kosaf.go.kr/ko/scholar.do?pg=scholarship05_12_10&ttab1=0', '등록금 전액 또는 일부',
    '1,2,3,4', 2, 9, 'any', 'university,college,cyber,open',
    '전국', '무관', 12, ARRAY['basic_livelihood', 'second_lowest', 'multi_child'],
    'Korea', '전국', '전국', '전국',
    9, 9, 'enrolled'
);

INSERT INTO scholarships (
    group_name, name, foundation, category, benefit_type, payment_method, payment_period,
    extra_benefits, target_hashtags, target_description, eligibility, selection_count,
    application_count, application_period, application_start, application_end,
    application_method, required_documents, description, contact, link, amount,
    target_grade, min_gpa, max_income, target_gender, target_school_type,
    target_region, target_major_category, min_prev_semester_credits, special_criteria,
    target_nationality, target_parents_region, target_university_region, target_high_school_region,
    max_csat_grade, max_school_grade, target_enrollment_status
) VALUES (
    '다자녀 국가장학금', '다자녀 국가장학금 (장애인)', '한국장학재단', '공공장학', '등록금', NULL, NULL,
    '없음', ARRAY['대학생'], '대한민국 국적을 소지한 국내대학의 학자금 지원 9구간 이하, 다자녀 가정의 가구원인 대학생(미혼에 한함)', '1) 신입생, 편입생, 재입학생 : 첫 학기에 한해 성적기준 미적용
2) 재학생 : 직전학기 12학점 이수하여 80/100점 이상 취득
- 기초/차상위: 직전학기 12학점 이수하여 70/100점 이상 취득
- 장애인: 성적기준(이수학점 및 백분위점수) 미적용
- 자립준비청년(보호아동 포함): 백분위점수 기준 미적용(단, 이수학점 기준은 적용)
- C학점 경고제: 1~3구간은 직전학기 70점 이상 ~ 80점 미만이라도 2회에 한해 경고 후 수혜 가능
- 졸업 또는 초과학기 학생은 이수학점 기준 적용 제외', '해당자 중 선발',
    NULL, '2025-11-20 ~ 2025-12-26', '2025-11-20', '2025-12-26',
    '학생 신청 → 재단 심사/선발/지급', '가족관계증명서, 주민등록등본 등
※ 신청 후 1일~3일(휴일 제외) 뒤에 [장학금] > [장학금신청] > [서류제출현황]에서 제출대상여부 확인 가능', '다자녀 가구의 등록금 부담 경감을 위해 지원되는 장학금.
서류 미제출 등으로 다자녀 여부가 확인되지 않을 경우 국가장학금 Ⅰ유형(학생직접지원형)으로 심사 및 지급.', '한국장학재단 (1599-2000)', 'https://www.kosaf.go.kr/ko/scholar.do?pg=scholarship05_12_10&ttab1=0', '등록금 전액 또는 일부',
    '1,2,3,4', 0, 9, 'any', 'university,college,cyber,open',
    '전국', '무관', 0, ARRAY['disabled', 'multi_child'],
    'Korea', '전국', '전국', '전국',
    9, 9, 'enrolled'
);
