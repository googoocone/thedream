-- 국가장학금 1유형 4가지 조건 분리 Insert SQL
-- Grouping Strategy: 'group_name'으로 리스트에서 묶어 보여주고, 'name'은 관리/매칭용으로 상세 구분

-- 0. 그룹핑 컬럼 추가 (없으면 생성)
ALTER TABLE public.scholarships ADD COLUMN IF NOT EXISTS group_name text;

-- 1. 신입생/편입생/재입학생 (성적 기준 미적용)
INSERT INTO scholarships (
    group_name, -- 리스트에 보여질 대표 이름
    name, -- 상세 구분을 위한 이름
    foundation, category, benefit_type, support_details, payment_method, payment_period, 
    extra_benefits, target_hashtags, target_description, eligibility, section_count, application_count, 
    application_period, application_end, application_method, required_documents, description, 
    contact, link, amount, target_grade, 
    min_gpa, max_income, target_gender, target_school_type, target_region, target_major_category, 
    min_prev_semester_credits, special_criteria, target_nationality, target_parents_region, target_university_region, target_high_school_region, max_csat_grade, max_school_grade, target_enrollment_status
) VALUES (
    '국가장학금 Ⅰ유형 (학생직접지원형)', -- [그룹명] 4개 모두 동일하게 설정
    '국가장학금 Ⅰ유형 (신입/편입)',      -- [상세명] 내부 관리 및 매칭 결과용
    '한국장학재단', '공공장학', '등록금', '등록금 전액 또는 일부 (학자금 지원구간별로 차등지원)', 
    E'재단에서 대학에 \n지급한 날부터 \n약 3주 이내 학생에게 \n지급', 
    E'[1학기] 3월 중순부터\n[2학기] 9월 중순부터\n격주로 대학에 지급', 
    '없음', ARRAY['대학생'],
    '대한민국 국적으로 국내 대학에 재학 중인 학자금 지원 9구간 이하 대학생', 
    E'1) 신입생, 편입생, 재입학생 : 첫 학기에 한해 성적기준 미적용', 
    '해당자 중 선발', NULL, '2025-11-20', '2025-12-26', '학생 신청 → 재단 심사/선발/지급', 
    E'가족관계증명서, 주민등록등본 등\n※ 신청 후 1일~3일(휴일 제외) 뒤에 [장학금] > [장학금신청] > [서류제출현황]에서 제출대상여부 확인 가능', 
    '소득수준에 연계하여 경제적으로 어려운 학생들에게 보다 많은 혜택이 주어지도록 설계된 장학금', '한국장학재단 (1599-2000)', 
    'https://www.kosaf.go.kr/ko/scholar.do?pg=scholarship05_12_01_01&ttab1=0', '등록금 전액/일부 차등', '1', 
    0.0, 9, 'any', 'university,college,cyber,open', '전국', '무관', 
    0, NULL, 'Korea', '전국', '전국', '전국', 9, 9, 'enrolled'
);

-- 2. 재학생 (일반)
INSERT INTO scholarships (
    group_name, name, foundation, category, benefit_type, support_details, payment_method, payment_period, 
    extra_benefits, target_hashtags, target_description, eligibility, section_count, application_count, 
    application_period, application_end, application_method, required_documents, description, 
    contact, link, amount, target_grade, 
    min_gpa, max_income, target_gender, target_school_type, target_region, target_major_category, 
    min_prev_semester_credits, special_criteria, target_nationality, target_parents_region, target_university_region, target_high_school_region, max_csat_grade, max_school_grade, target_enrollment_status
) VALUES (
    '국가장학금 Ⅰ유형 (학생직접지원형)', -- [그룹명] 동일
    '국가장학금 Ⅰ유형 (재학생/일반)', 
    '한국장학재단', '공공장학', '등록금', '등록금 전액 또는 일부 (학자금 지원구간별로 차등지원)', 
    E'재단에서 대학에 \n지급한 날부터 \n약 3주 이내 학생에게 \n지급', 
    E'[1학기] 3월 중순부터\n[2학기] 9월 중순부터\n격주로 대학에 지급', 
    '없음', ARRAY['대학생'], 
    '대한민국 국적으로 국내 대학에 재학 중인 학자금 지원 9구간 이하 대학생', 
    E'2) 재학생 : 직전학기 12학점 이수하여 80/100점(2.6/4.5) 이상 취득', 
    '해당자 중 선발', NULL, '2025-11-20', '2025-12-26', '학생 신청 → 재단 심사/선발/지급', 
    E'가족관계증명서, 주민등록등본 등', 
    '소득수준에 연계하여 경제적으로 어려운 학생들에게 보다 많은 혜택이 주어지도록 설계된 장학금', '한국장학재단 (1599-2000)', 
    'https://www.kosaf.go.kr/ko/scholar.do?pg=scholarship05_12_01_01&ttab1=0', '등록금 전액/일부 차등', '2,3,4', 
    2.6, 9, 'any', 'university,college,cyber,open', '전국', '무관', 
    12, NULL, 'Korea', '전국', '전국', '전국', 9, 9, 'enrolled'
);

-- 3. 기초/차상위
INSERT INTO scholarships (
    group_name, name, foundation, category, benefit_type, support_details, payment_method, payment_period, 
    extra_benefits, target_hashtags, target_description, eligibility, section_count, application_count, 
    application_period, application_end, application_method, required_documents, description, 
    contact, link, amount, target_grade, 
    min_gpa, max_income, target_gender, target_school_type, target_region, target_major_category, 
    min_prev_semester_credits, special_criteria, target_nationality, target_parents_region, target_university_region, target_high_school_region, max_csat_grade, max_school_grade, target_enrollment_status
) VALUES (
    '국가장학금 Ⅰ유형 (학생직접지원형)', -- [그룹명] 동일
    '국가장학금 Ⅰ유형 (기초/차상위)', 
    '한국장학재단', '공공장학', '등록금', '등록금 전액 또는 일부 (학자금 지원구간별로 차등지원)', 
    E'재단에서 대학에 \n지급한 날부터 \n약 3주 이내 학생에게 \n지급', 
    E'[1학기] 3월 중순부터\n[2학기] 9월 중순부터\n격주로 대학에 지급', 
    '없음', ARRAY['대학생', '저소득층'], 
    '기초생활수급자 및 차상위계층 대학생', 
    E'- 기초/차상위: 직전학기 12학점 이수하여 70/100점(1.6/4.5) 이상 취득\n- C학점 경고제 적용 가능', 
    '해당자 중 선발', NULL, '2025-11-20', '2025-12-26', '학생 신청 → 재단 심사/선발/지급', 
    E'가족관계증명서, 주민등록등본 등', 
    '소득수준에 연계하여 경제적으로 어려운 학생들에게 보다 많은 혜택이 주어지도록 설계된 장학금', '한국장학재단 (1599-2000)', 
    'https://www.kosaf.go.kr/ko/scholar.do?pg=scholarship05_12_01_01&ttab1=0', '등록금 전액/일부 차등', '1,2,3,4', 
    1.6, 9, 'any', 'university,college,cyber,open', '전국', '무관', 
    12, ARRAY['basic_livelihood', 'second_lowest'], 
    'Korea', '전국', '전국', '전국', 9, 9, 'enrolled'
);

-- 4. 장애인
INSERT INTO scholarships (
    group_name, name, foundation, category, benefit_type, support_details, payment_method, payment_period, 
    extra_benefits, target_hashtags, target_description, eligibility, section_count, application_count, 
    application_period, application_end, application_method, required_documents, description, 
    contact, link, amount, target_grade, 
    min_gpa, max_income, target_gender, target_school_type, target_region, target_major_category, 
    min_prev_semester_credits, special_criteria, target_nationality, target_parents_region, target_university_region, target_high_school_region, max_csat_grade, max_school_grade, target_enrollment_status
) VALUES (
    '국가장학금 Ⅰ유형 (학생직접지원형)', -- [그룹명] 동일
    '국가장학금 Ⅰ유형 (장애인)', 
    '한국장학재단', '공공장학', '등록금', '등록금 전액 또는 일부 (학자금 지원구간별로 차등지원)', 
    E'재단에서 대학에 \n지급한 날부터 \n약 3주 이내 학생에게 \n지급', 
    E'[1학기] 3월 중순부터\n[2학기] 9월 중순부터\n격주로 대학에 지급', 
    '없음', ARRAY['대학생', '장애인'], 
    '장애인 대학생 (성적기준 미적용)', 
    E'- 장애인: 성적기준(이수학점 및 백분위점수) 미적용', 
    '해당자 중 선발', NULL, '2025-11-20', '2025-12-26', '학생 신청 → 재단 심사/선발/지급', 
    E'가족관계증명서, 주민등록등본, 장애인증명서 등', 
    '소득수준에 연계하여 경제적으로 어려운 학생들에게 보다 많은 혜택이 주어지도록 설계된 장학금', '한국장학재단 (1599-2000)', 
    'https://www.kosaf.go.kr/ko/scholar.do?pg=scholarship05_12_01_01&ttab1=0', '등록금 전액/일부 차등', '1,2,3,4', 
    0.0, 9, 'any', 'university,college,cyber,open', '전국', '무관', 
    0, ARRAY['disabled'], 
    'Korea', '전국', '전국', '전국', 9, 9, 'enrolled'
);
