
-- 1. Unhae Scholarship (2026년 제13기 운해장학생)
INSERT INTO scholarships (
    name, foundation, category, benefit_type, payment_method, payment_period, extra_benefits, 
    target_hashtags, target_description, eligibility, selection_count, application_count, 
    application_period, application_end, application_method, required_documents, description, contact, link,
    amount, target_grade, min_gpa, max_income, target_gender, target_school_type, target_region, 
    target_major_category, min_prev_semester_credits, special_criteria, target_nationality, target_parents_region, 
    target_university_region, target_high_school_region, max_csat_grade, max_school_grade, target_enrollment_status, target_universities, group_name
) VALUES (
    '2026년 제13기 운해장학생', '운해장학재단', '민간장학', '학업장려금', 
    '2월 말과 8월 말에 학생계좌 직접 입금', '당해연도 2개학기', '없음', 
    '{"대학생"}', '2025년 12월 현재 기준 재학중인 대학교 1,2,3학년생', 
    '1) 이공계 전문 학생(2025년 1학기 평점평균 기준 이상)으로 자기 전문분야에서 탁월한 능력이 있다고 판단되는 학생으로 대학교 총장의 추천을 받은 학생 \n2) 학업성적이 우수(2025년 1학기 평점평균 기준 이상)하나 가정형편 때문에 학업에 곤란함을 겪는 학생으로 대학교 총장의 추천을 받은 학생 \n3) 평점평균 기준: 4.0/4.5 이상 (또는 3.82/4.3, 3.56/4.0 이상)', 
    '650명', '연 1회', 45987, '2025-12-26', 
    '우편 접수', '신청지원서, 성적증명서, 추천서 등', 
    '이공계 전공 학생 지원', '운해장학재단 (055-280-5145)', 'https://woonhaefoundation.org/kor/information/scholarship_notice.html?code=sub04_01&p=&subcode=&page=1&bbsData=bm89MTQyMTE=||&mode=view',
    '800만원', '1,2,3', 4.0, 10, 'any', 'university', '전국', 
    '공학계열,자연계열', 0, NULL, 'Korea', '전국', 
    '전국', '전국', 9, 9, 'enrolled', '무관', '2026년 제13기 운해장학생'
);

-- 2. Haedong Scholarship (2026 해동장학생)
INSERT INTO scholarships (
    name, foundation, category, benefit_type, payment_method, payment_period, extra_benefits, 
    target_hashtags, target_description, eligibility, selection_count, application_count, 
    application_period, application_end, application_method, required_documents, description, contact, link,
    amount, target_grade, min_gpa, max_income, target_gender, target_school_type, target_region, 
    target_major_category, min_prev_semester_credits, special_criteria, target_nationality, target_parents_region, 
    target_university_region, target_high_school_region, max_csat_grade, max_school_grade, target_enrollment_status, target_universities, group_name
) VALUES (
    '2026 해동장학생', '해동과학문화재단', '민간장학', '학업장려금', 
    '매월 100만원 분할 지급', '당해연도', '네트워킹 프로그램', 
    '{"대학생"}', '재단 지원 대학교 내 조건 만족 학생', 
    '1) 2026년 3월 기준, 2학년 1학기~3학년 1학기 진학 예정자\n2) 화학공학, 재료공학, 전자공학, 신소재공학, 반도체공학, 컴퓨터공학(인공지능) 관련 전공\n3) 소득분위 4분위 이내', 
    '00명', '연 1회', 45993, '2026-01-08', 
    '각 대학 장학 담당처', '학단 추천서 등', 
    '이공계 우수 인재 지원', '해동과학문화재단', 'https://www.yonsei.ac.kr/bbs/sc/58/942063/artclView.do',
    '1,200만원', '1,2', 0, 4, 'any', 'university', '전국', 
    '화공/고분자/섬유,소재/재료,전기/전자/제어,컴퓨터/통신/SW', 0, NULL, 'Korea', '전국', 
    '전국', '전국', 9, 9, 'enrolled', '경북대,광운대,고려대,국민대,부산대,성균관대,아주대,이화여대,인하대,연세대,서강대,서울대,서울과기대,전북대,한양대,홍익대', '2026 해동장학생'
);

-- 3. Somang Scholarship (2026학년도 소망장학생)
INSERT INTO scholarships (
    name, foundation, category, benefit_type, payment_method, payment_period, extra_benefits, 
    target_hashtags, target_description, eligibility, selection_count, application_count, 
    application_period, application_end, application_method, required_documents, description, contact, link,
    amount, target_grade, min_gpa, max_income, target_gender, target_school_type, target_region, 
    target_major_category, min_prev_semester_credits, special_criteria, target_nationality, target_parents_region, 
    target_university_region, target_high_school_region, max_csat_grade, max_school_grade, target_enrollment_status, target_universities, group_name
) VALUES (
    '2026학년도 소망장학생', '소망교회', '민간장학', '등록금', 
    '학기별 분할 지급', '당해연도', '수련회', 
    '{"대학생","대학원생"}', '기독교인 대학생/대학원생', 
    '1) 국내 4년제 대학 1,2,3학년 재학생 (학사)\n2) 신학대학생 등', 
    '00명', '연 1회', 46013, '2026-01-03', 
    '우편 접수', '추천서(담임목사) 등', 
    '기독교 인재 양성', '소망장학부', 'https://somang.net/community/notice/news?pageid=2&mod=document&uid=185559',
    '600만원', '1,2,3', 0, 10, 'any', 'university', '전국', 
    '무관', 0, '{"기독교"}', 'Korea', '전국', 
    '전국', '전국', 9, 9, 'enrolled', '무관', '2026학년도 소망장학생'
);

-- 4. Gangnam Scholarship (2026학년도 강남장학회)
INSERT INTO scholarships (
    name, foundation, category, benefit_type, payment_method, payment_period, extra_benefits, 
    target_hashtags, target_description, eligibility, selection_count, application_count, 
    application_period, application_end, application_method, required_documents, description, contact, link,
    amount, target_grade, min_gpa, max_income, target_gender, target_school_type, target_region, 
    target_major_category, min_prev_semester_credits, special_criteria, target_nationality, target_parents_region, 
    target_university_region, target_high_school_region, max_csat_grade, max_school_grade, target_enrollment_status, target_universities, group_name
) VALUES (
    '2026학년도 강남장학회 장학생', '강남장학회', '민간장학', '복합지원', 
    '학기별 지급', '당해연도', '마음공부 캠프', 
    '{"대학생"}', '서울, 경기 소재 대학생', 
    '서울/경기 소재 대학생 및 대학원생, 마음훈련 필참', 
    '12명', '연 1회', 45995, '2025-12-26', 
    '이메일 접수', '재학증명서 등', 
    '청년 마음공부 지원', '꿈밭작은도서관', 'http://wongangnam.com',
    '500만원', '1,2,3,4', 0, 10, 'any', 'university', '전국', 
    '무관', 0, NULL, 'Korea', '전국', 
    '서울,경기', '전국', 9, 9, 'enrolled', '무관', '2026학년도 강남장학회 장학생'
);

-- 5. Arko Fellowship (2026년 아르코문학작가펠로우십)
INSERT INTO scholarships (
    name, foundation, category, benefit_type, payment_method, payment_period, extra_benefits, 
    target_hashtags, target_description, eligibility, selection_count, application_count, 
    application_period, application_end, application_method, required_documents, description, contact, link,
    amount, target_grade, min_gpa, max_income, target_gender, target_school_type, target_region, 
    target_major_category, min_prev_semester_credits, special_criteria, target_nationality, target_parents_region, 
    target_university_region, target_high_school_region, max_csat_grade, max_school_grade, target_enrollment_status, target_universities, group_name
) VALUES (
    '2026년 아르코문학작가펠로우십', '한국문화예술위원회', '민간장학', '복합지원', 
    '분할 지급', '당해연도', '후속지원', 
    '{"작가"}', '문학작가', 
    '최근 10년 내 작품집 발간 또는 수상 이력 작가', 
    '30명', '연 1회', 45992, '2025-12-29', 
    '온라인 신청', '지원신청서', 
    '문학 작가 창작 지원', '문학지원팀', 'https://artnuri.or.kr',
    '2,000만원', '1,2,3,4', 0, 10, 'any', 'any', '전국', 
    '무관', 0, '{"작가"}', 'Korea', '전국', 
    '전국', '전국', 9, 9, 'any', '무관', '2026년 아르코문학작가펠로우십'
);

-- 6. KST Scholarship (대한교통학회)
INSERT INTO scholarships (
    name, foundation, category, benefit_type, payment_method, payment_period, extra_benefits, 
    target_hashtags, target_description, eligibility, selection_count, application_count, 
    application_period, application_end, application_method, required_documents, description, contact, link,
    amount, target_grade, min_gpa, max_income, target_gender, target_school_type, target_region, 
    target_major_category, min_prev_semester_credits, special_criteria, target_nationality, target_parents_region, 
    target_university_region, target_high_school_region, max_csat_grade, max_school_grade, target_enrollment_status, target_universities, group_name
) VALUES (
    '2026년 대한교통학회 제17회 장학생', '대한교통학회', '민간장학', '학업장려금', 
    '일시 지급', '당해연도', '학술대회 참가', 
    '{"대학생"}', '교통 관련 학과 3학년', 
    '교통 관련 학과/학부 3학년 (2025.12 기준)', 
    '6명', '연 1회', 45985, '2026-01-05', 
    '이메일 접수', '에세이, 성적증명서', 
    '교통 분야 인재 양성', '대한교통학회', 'https://kst.or.kr',
    '상금', '3', 0, 10, 'any', 'university', '전국', 
    '전국', '전국', 9, 9, 'enrolled', '무관', '2026년 대한교통학회 제17회 장학생'
);

-- 7-1-A. Regional Talent (Freshmen - University) (지역인재 장학금 - 신입생/일반대)
INSERT INTO scholarships (
    name, foundation, category, benefit_type, payment_method, payment_period, extra_benefits, 
    target_hashtags, target_description, eligibility, selection_count, application_count, 
    application_period, application_end, application_method, required_documents, description, contact, link,
    amount, target_grade, min_gpa, max_income, target_gender, target_school_type, target_region, 
    target_major_category, min_prev_semester_credits, special_criteria, target_nationality, target_parents_region, 
    target_university_region, target_high_school_region, max_csat_grade, max_school_grade, target_enrollment_status, target_universities, group_name
) VALUES (
    '2026년 지역인재 장학금 (신입생-일반대)', '한국장학재단', '공공장학', '등록금', 
    '등록금 대납', '1년 이상 (최대 2년)', '없음', 
    '{"대학생","신입생"}', '비수도권 일반대 신입생', 
    '1) 비수도권 일반대 입학 예정자 또는 신입생\n2) 성적우수: 내신 또는 수능 3등급 이내', 
    '해당자 중 선발', '연 1회', 45981, '2025-12-25', 
    '대학 신청 후 재단 심사', '가족관계증명서, 수능/내신 성적표 등', 
    '지역대 우수 인재 유치 (신입생-일반대)', '한국장학재단', 'https://www.kosaf.go.kr',
    '등록금 전액', '1', 0, 9, 'any', 'university', '전국', 
    '무관', 0, NULL, 'Korea', '전국', 
    '부산,대구,광주,대전,울산,세종,강원,충북,충남,전북,전남,경북,경남,제주', '부산,대구,광주,대전,울산,세종,강원,충북,충남,전북,전남,경북,경남,제주', 3, 3, 'enrolled,expected', '무관', '2026년 지역인재 장학금'
);

-- 7-1-B. Regional Talent (Freshmen - College) (지역인재 장학금 - 신입생/전문대)
INSERT INTO scholarships (
    name, foundation, category, benefit_type, payment_method, payment_period, extra_benefits, 
    target_hashtags, target_description, eligibility, selection_count, application_count, 
    application_period, application_end, application_method, required_documents, description, contact, link,
    amount, target_grade, min_gpa, max_income, target_gender, target_school_type, target_region, 
    target_major_category, min_prev_semester_credits, special_criteria, target_nationality, target_parents_region, 
    target_university_region, target_high_school_region, max_csat_grade, max_school_grade, target_enrollment_status, target_universities, group_name
) VALUES (
    '2026년 지역인재 장학금 (신입생-전문대)', '한국장학재단', '공공장학', '등록금', 
    '등록금 대납', '1년 이상 (최대 2년)', '없음', 
    '{"대학생","신입생","전문대"}', '비수도권 전문대 신입생', 
    '1) 비수도권 전문대 입학 예정자 또는 신입생\n2) 성적우수: 내신 또는 수능 4등급 이내', 
    '해당자 중 선발', '연 1회', 45981, '2025-12-25', 
    '대학 신청 후 재단 심사', '가족관계증명서, 수능/내신 성적표 등', 
    '지역대 우수 인재 유치 (신입생-전문대)', '한국장학재단', 'https://www.kosaf.go.kr',
    '등록금 전액', '1', 0, 9, 'any', 'college', '전국', 
    '무관', 0, NULL, 'Korea', '전국', 
    '부산,대구,광주,대전,울산,세종,강원,충북,충남,전북,전남,경북,경남,제주', '부산,대구,광주,대전,울산,세종,강원,충북,충남,전북,전남,경북,경남,제주', 4, 4, 'enrolled,expected', '무관', '2026년 지역인재 장학금'
);

-- 7-2. Regional Talent (Enrolled) (지역인재 장학금 - 재학생)
INSERT INTO scholarships (
    name, foundation, category, benefit_type, payment_method, payment_period, extra_benefits, 
    target_hashtags, target_description, eligibility, selection_count, application_count, 
    application_period, application_end, application_method, required_documents, description, contact, link,
    amount, target_grade, min_gpa, max_income, target_gender, target_school_type, target_region, 
    target_major_category, min_prev_semester_credits, special_criteria, target_nationality, target_parents_region, 
    target_university_region, target_high_school_region, max_csat_grade, max_school_grade, target_enrollment_status, target_universities, group_name
) VALUES (
    '2026년 지역인재 장학금 (재학생)', '한국장학재단', '공공장학', '등록금', 
    '등록금 대납', '학기별 심사 계속지원', '없음', 
    '{"대학생","재학생"}', '비수도권 대학 재학생', 
    '1) 15~25년도 선발된 계속지원 확정자 또는 신규 선발 재학생\n2) 직전학기 12학점 이상 이수, 80점(3.0) 이상', 
    '계속지원 충족자', '연 2회', 45981, '2025-12-25', 
    '재단 심사', '가족관계증명서 등', 
    '지역대 인재 양성 (재학생 계속지원)', '한국장학재단', 'https://www.kosaf.go.kr',
    '등록금 전액', '2,3,4', 3.0, 9, 'any', 'university,college', '전국', 
    '무관', 12, NULL, 'Korea', '전국', 
    '부산,대구,광주,대전,울산,세종,강원,충북,충남,전북,전남,경북,경남,제주', '무관', 9, 9, 'enrolled', '무관', '2026년 지역인재 장학금'
);

-- 8. National Work-Study (국가근로 장학금)
INSERT INTO scholarships (
    name, foundation, category, benefit_type, payment_method, payment_period, extra_benefits, 
    target_hashtags, target_description, eligibility, selection_count, application_count, 
    application_period, application_end, application_method, required_documents, description, contact, link,
    amount, target_grade, min_gpa, max_income, target_gender, target_school_type, target_region, 
    target_major_category, min_prev_semester_credits, special_criteria, target_nationality, target_parents_region, 
    target_university_region, target_high_school_region, max_csat_grade, max_school_grade, target_enrollment_status, target_universities, group_name
) VALUES (
    '2026년 국가근로 장학금', '한국장학재단', '공공장학', '학업장려금', 
    '현금 지급', '학기중', '방학 집중근로', 
    '{"대학생"}', '대학생', 
    '1) 학자금 지원 9구간 이하\n2) 직전학기 70점(C0) 이상\n3) 우선선발 대상 있음 (장애인, 다자녀 등)', 
    '대학별 선발', '연 2회', 45981, '2025-12-25', 
    '학생 신청 -> 대학 심사', '가족관계증명서 등', 
    '근로 경험 제공 및 장학금 지원', '한국장학재단', 'https://www.kosaf.go.kr',
    '근로시간 비례', '1,2,3,4', 2.0, 9, 'any', 'any', '전국', 
    '무관', 0, '{"저소득","장애인","다자녀","다문화"}', 'Korea', '전국', 
    '전국', '전국', 9, 9, 'enrolled', '무관', '2026년 국가근로 장학금'
);

-- 9-A. Hope Ladder Type I (University) (희망사다리 I유형 - 일반대)
INSERT INTO scholarships (
    name, foundation, category, benefit_type, payment_method, payment_period, extra_benefits, 
    target_hashtags, target_description, eligibility, selection_count, application_count, 
    application_period, application_end, application_method, required_documents, description, contact, link,
    amount, target_grade, min_gpa, max_income, target_gender, target_school_type, target_region, 
    target_major_category, min_prev_semester_credits, special_criteria, target_nationality, target_parents_region, 
    target_university_region, target_high_school_region, max_csat_grade, max_school_grade, target_enrollment_status, target_universities, group_name
) VALUES (
    '2026년 희망사다리 I유형 (일반대)', '한국장학재단', '공공장학', '등록금+생활비', 
    '등록금 전액 + 취창업지원금 200만원', '매 학기', '없음', 
    '{"대학생","취업연계"}', '중소·중견기업 취업 희망 일반대 3학년 이상', 
    '1) 일반대 3학년 이상 재학생\n2) 직전학기 70점(C0) 이상\n3) 중소·중견기업 취업/창업 희망자 (의무종사 필수)', 
    '해당자 중 선발', '연 2회', 45903, '2025-10-01', 
    '대학 추천 후 재단 심사', '취창업지원금 사용계획서 등', 
    '중소·중견기업 취업/창업 희망 대학생 지원 (일반대)', '희망사다리 센터', 'https://www.kosaf.go.kr',
    '등록금 전액 + 200만원', '3,4', 1.6, 10, 'any', 'university', '전국', 
    '무관', 12, '{"취업희망"}', 'Korea', '전국', 
    '전국', '전국', 9, 9, 'enrolled', '무관', '2026년 희망사다리 I유형'
);

-- 9-B. Hope Ladder Type I (College) (희망사다리 I유형 - 전문대)
INSERT INTO scholarships (
    name, foundation, category, benefit_type, payment_method, payment_period, extra_benefits, 
    target_hashtags, target_description, eligibility, selection_count, application_count, 
    application_period, application_end, application_method, required_documents, description, contact, link,
    amount, target_grade, min_gpa, max_income, target_gender, target_school_type, target_region, 
    target_major_category, min_prev_semester_credits, special_criteria, target_nationality, target_parents_region, 
    target_university_region, target_high_school_region, max_csat_grade, max_school_grade, target_enrollment_status, target_universities, group_name
) VALUES (
    '2026년 희망사다리 I유형 (전문대)', '한국장학재단', '공공장학', '등록금+생활비', 
    '등록금 전액 + 취창업지원금 200만원', '매 학기', '없음', 
    '{"대학생","전문대","취업연계"}', '중소·중견기업 취업 희망 전문대 2학년 이상', 
    '1) 전문대 2학년 이상 재학생\n2) 직전학기 70점(C0) 이상\n3) 중소·중견기업 취업/창업 희망자 (의무종사 필수)', 
    '해당자 중 선발', '연 2회', 45903, '2025-10-01', 
    '대학 추천 후 재단 심사', '취창업지원금 사용계획서 등', 
    '중소·중견기업 취업/창업 희망 대학생 지원 (전문대)', '희망사다리 센터', 'https://www.kosaf.go.kr',
    '등록금 전액 + 200만원', '2,3,4', 1.6, 10, 'any', 'college', '전국', 
    '무관', 12, '{"취업희망"}', 'Korea', '전국', 
    '전국', '전국', 9, 9, 'enrolled', '무관', '2026년 희망사다리 I유형'
);

-- 10. Hope Ladder Type II (희망사다리 II유형 - 고졸 후학습자)
INSERT INTO scholarships (
    name, foundation, category, benefit_type, payment_method, payment_period, extra_benefits, 
    target_hashtags, target_description, eligibility, selection_count, application_count, 
    application_period, application_end, application_method, required_documents, description, contact, link,
    amount, target_grade, min_gpa, max_income, target_gender, target_school_type, target_region, 
    target_major_category, min_prev_semester_credits, special_criteria, target_nationality, target_parents_region, 
    target_university_region, target_high_school_region, max_csat_grade, max_school_grade, target_enrollment_status, target_universities, group_name
) VALUES (
    '2026년 희망사다리 II유형', '한국장학재단', '공공장학', '등록금', 
    '등록금 차등 지원', '계속지원 가능', '없음', 
    '{"대학생","재직자"}', '고졸 후 산업체 재직 중인 대학생', 
    '1) 고졸 학력자로서 산업체 재직 기간 2년 이상\n2) 직전학기 70점(C0) 이상\n3) 현재 중소/중견/대기업 재직 중', 
    '해당자 중 선발', '연 2회', 45903, '2025-10-01', 
    '학생 신청 -> 재단 심사', '재직증명서, 고교졸업증명서 등', 
    '고졸 후학습자(재직자) 지원 장학금', '희망사다리 센터', 'https://www.kosaf.go.kr',
    '등록금 50%~100%', '1,2,3,4', 1.6, 10, 'any', 'any', '전국', 
    '무관', 0, '{"재직자"}', 'Korea', '전국', 
    '전국', '전국', 9, 9, 'enrolled', '무관', '2026년 희망사다리 II유형'
);

-- 11-A. Presidential Science Scholarship (Master's) (대통령과학 장학금 - 석사)
INSERT INTO scholarships (
    name, foundation, category, benefit_type, payment_method, payment_period, extra_benefits, 
    target_hashtags, target_description, eligibility, selection_count, application_count, 
    application_period, application_end, application_method, required_documents, description, contact, link,
    amount, target_grade, min_gpa, max_income, target_gender, target_school_type, target_region, 
    target_major_category, min_prev_semester_credits, special_criteria, target_nationality, target_parents_region, 
    target_university_region, target_high_school_region, max_csat_grade, max_school_grade, target_enrollment_status, target_universities, group_name
) VALUES (
    '2026년 대통령과학 장학금 (석사)', '한국장학재단', '공공장학', '학업장려금', 
    '월 150만원', '최대 4학기', '없음', 
    '{"대학원생","이공계","석사"}', '자연/공학계열 석사 과정생', 
    '1) 일반/전문대학원 자연과학 및 공학계열 석사 과정생\n2) 학사 졸업 성적 4.0/4.5 (92점) 이상', 
    '50명', '연 1회', 45737, '2025-02-03', 
    '재단 심사/면접', '연구계획서, 학사성적증명서 등', 
    '이공계 핵심 석사 인재 양성', '한국장학재단', 'https://www.kosaf.go.kr',
    '월 150만원', '1,2,3,4', 4.0, 10, 'any', 'grad_school', '전국', 
    '자연계열,공학계열', 0, NULL, 'Korea', '전국', 
    '전국', '전국', 9, 9, 'enrolled,expected', '무관', '2026년 대통령과학 장학금(석박사)'
);

-- 11-B. Presidential Science Scholarship (PhD) (대통령과학 장학금 - 박사)
INSERT INTO scholarships (
    name, foundation, category, benefit_type, payment_method, payment_period, extra_benefits, 
    target_hashtags, target_description, eligibility, selection_count, application_count, 
    application_period, application_end, application_method, required_documents, description, contact, link,
    amount, target_grade, min_gpa, max_income, target_gender, target_school_type, target_region, 
    target_major_category, min_prev_semester_credits, special_criteria, target_nationality, target_parents_region, 
    target_university_region, target_high_school_region, max_csat_grade, max_school_grade, target_enrollment_status, target_universities, group_name
) VALUES (
    '2026년 대통령과학 장학금 (박사)', '한국장학재단', '공공장학', '학업장려금', 
    '월 200만원', '최대 8학기', '없음', 
    '{"대학원생","이공계","박사"}', '자연/공학계열 박사 과정생', 
    '1) 일반/전문대학원 자연과학 및 공학계열 박사 과정생\n2) 석사 졸업 성적 4.0/4.5 (92점) 이상', 
    '70명', '연 1회', 45737, '2025-02-03', 
    '재단 심사/면접', '연구계획서, 석사성적증명서 등', 
    '이공계 핵심 박사 인재 양성', '한국장학재단', 'https://www.kosaf.go.kr',
    '월 200만원', '1,2,3,4,5', 4.0, 10, 'any', 'grad_school', '전국', 
    '자연계열,공학계열', 0, NULL, 'Korea', '전국', 
    '전국', '전국', 9, 9, 'enrolled,expected', '무관', '2026년 대통령과학 장학금(석박사)'
);

-- 12-A. Presidential Science Scholarship (Undergrad - Freshman) (대통령과학 장학금 - 학부 1학년)
INSERT INTO scholarships (
    name, foundation, category, benefit_type, payment_method, payment_period, extra_benefits, 
    target_hashtags, target_description, eligibility, selection_count, application_count, 
    application_period, application_end, application_method, required_documents, description, contact, link,
    amount, target_grade, min_gpa, max_income, target_gender, target_school_type, target_region, 
    target_major_category, min_prev_semester_credits, special_criteria, target_nationality, target_parents_region, 
    target_university_region, target_high_school_region, max_csat_grade, max_school_grade, target_enrollment_status, target_universities, group_name
) VALUES (
    '2026년 대통령과학 장학금 (학부 1학년)', '한국장학재단', '공공장학', '복합지원', 
    '등록금 전액 + 학업장려비', '졸업 시까지', '해외장학생 체제비 등', 
    '{"대학생","이공계","신입생"}', '이공계 우수 신입생', 
    '1) 국내/해외 4년제 이공계학과 입학 예정자 또는 신입생\n2) 고교 수학/과학 이수단위 충족자 또는 지역 추천자', 
    '77명', '연 1회', 45737, '2025-03-31', 
    '재단 심사/면접', '과학활동내역서 등', 
    '이공계 최우수 인재 (신입생) 지원', '한국장학재단', 'https://www.kosaf.go.kr',
    '등록금 전액 + α', '1', 0, 10, 'any', 'university', '전국', 
    '자연계열,공학계열', 0, NULL, 'Korea', '전국', 
    '전국', '전국', 9, 9, 'enrolled', '무관', '2026년 대통령과학 장학금(학부)'
);

-- 13-A. Humanities 100 Scholarship (Exploration) (인문100년 장학금 - 전공탐색/1학년)
INSERT INTO scholarships (
    name, foundation, category, benefit_type, payment_method, payment_period, extra_benefits, 
    target_hashtags, target_description, eligibility, selection_count, application_count, 
    application_period, application_end, application_method, required_documents, description, contact, link,
    amount, target_grade, min_gpa, max_income, target_gender, target_school_type, target_region, 
    target_major_category, min_prev_semester_credits, special_criteria, target_nationality, target_parents_region, 
    target_university_region, target_high_school_region, max_csat_grade, max_school_grade, target_enrollment_status, target_universities, group_name
) VALUES (
    '2026년 인문100년 장학금 (전공탐색)', '한국장학재단', '공공장학', '등록금+생활비', 
    '등록금 전액 + 생활비 250만원', '최대 4년', '기초생활수급자 추가지원', 
    '{"대학생","인문사회","신입생"}', '인문사회계열 1학년 신입생', 
    '1) 대한민국 국적의 4년제 인문/사회계열 1학년 신입생\n2) 성적 및 전공 탐색 우수자', 
    '해당자 중 선발', '연 1회', '2025-03-26', '2025-04-16', 
    '대학 추천 후 재단 심사', '학업계획서, 기초생활수급자 증명서 등', 
    '인문사회계열 우수 신입생 양성', '한국장학재단', 'https://www.kosaf.go.kr',
    '등록금 전액 + α', '1', 0, 10, 'any', 'university', '전국', 
    '인문계열,사회계열', 0, NULL, 'Korea', '전국', 
    '전국', '전국', 9, 9, 'enrolled,expected', '무관', '2026년 인문100년 장학금'
);

-- 13-B. Humanities 100 Scholarship (Establishment) (인문100년 장학금 - 전공확립/3학년)
INSERT INTO scholarships (
    name, foundation, category, benefit_type, payment_method, payment_period, extra_benefits, 
    target_hashtags, target_description, eligibility, selection_count, application_count, 
    application_period, application_end, application_method, required_documents, description, contact, link,
    amount, target_grade, min_gpa, max_income, target_gender, target_school_type, target_region, 
    target_major_category, min_prev_semester_credits, special_criteria, target_nationality, target_parents_region, 
    target_university_region, target_high_school_region, max_csat_grade, max_school_grade, target_enrollment_status, target_universities, group_name
) VALUES (
    '2026년 인문100년 장학금 (전공확립)', '한국장학재단', '공공장학', '등록금+생활비', 
    '등록금 전액 + 생활비 250만원', '최대 2년', '기초생활수급자 추가지원', 
    '{"대학생","인문사회","3학년"}', '인문사회계열 3학년 재학생', 
    '1) 대한민국 국적의 4년제 인문/사회계열 3학년 재학생\n2) 직전학기 평점 3.6(90점) 이상\n3) 소속대학 졸업이수학점의 40% 이상 취득', 
    '해당자 중 선발', '연 1회', '2025-03-26', '2025-04-16', 
    '대학 추천 후 재단 심사', '학업계획서, 전인적 인재성장 결과보고서 등', 
    '인문사회계열 우수 3학년생 양성', '한국장학재단', 'https://www.kosaf.go.kr',
    '등록금 전액 + α', '3', 3.6, 10, 'any', 'university', '전국', 
    '인문계열,사회계열', 0, NULL, 'Korea', '전국', 
    '전국', '전국', 9, 9, 'enrolled', '무관', '2026년 인문100년 장학금'
);

-- 14-A. Arts & Sports Vision Scholarship (Exploration) (예술체육비전 장학금 - 전공탐색/1학년)
INSERT INTO scholarships (
    name, foundation, category, benefit_type, payment_method, payment_period, extra_benefits, 
    target_hashtags, target_description, eligibility, selection_count, application_count, 
    application_period, application_end, application_method, required_documents, description, contact, link,
    amount, target_grade, min_gpa, max_income, target_gender, target_school_type, target_region, 
    target_major_category, min_prev_semester_credits, special_criteria, target_nationality, target_parents_region, 
    target_university_region, target_high_school_region, max_csat_grade, max_school_grade, target_enrollment_status, target_universities, group_name
) VALUES (
    '2026년 예술체육비전 장학금 (전공탐색)', '한국장학재단', '공공장학', '등록금+생활비', 
    '등록금 전액 + 생활비 250만원', '최대 4년', '기초생활수급자 추가지원', 
    '{"대학생","예체능","신입생"}', '예술체육계열 1학년 신입생', 
    '1) 대한민국 국적의 4년제 예술/체육계열 1학년 신입생\n2) 재능과 소질을 보유한 자', 
    '해당자 중 선발', '연 1회', '2025-03-26', '2025-04-16', 
    '대학 추천 후 재단 심사', '학업계획서, 기초생활수급자 증명서 등', 
    '예술체육 분야 선도 인재 육성 (신입생)', '한국장학재단', 'https://www.kosaf.go.kr',
    '등록금 전액 + α', '1', 0, 10, 'any', 'university', '전국', 
    '예체능계열', 0, NULL, 'Korea', '전국', 
    '전국', '전국', 9, 9, 'enrolled,expected', '무관', '2026년 예술체육비전 장학금'
);

-- 14-B. Arts & Sports Vision Scholarship (Establishment) (예술체육비전 장학금 - 전공확립/3학년)
INSERT INTO scholarships (
    name, foundation, category, benefit_type, payment_method, payment_period, extra_benefits, 
    target_hashtags, target_description, eligibility, selection_count, application_count, 
    application_period, application_end, application_method, required_documents, description, contact, link,
    amount, target_grade, min_gpa, max_income, target_gender, target_school_type, target_region, 
    target_major_category, min_prev_semester_credits, special_criteria, target_nationality, target_parents_region, 
    target_university_region, target_high_school_region, max_csat_grade, max_school_grade, target_enrollment_status, target_universities, group_name
) VALUES (
    '2026년 예술체육비전 장학금 (전공확립)', '한국장학재단', '공공장학', '등록금+생활비', 
    '등록금 전액 + 생활비 250만원', '최대 2년', '기초생활수급자 추가지원', 
    '{"대학생","예체능","3학년"}', '예술체육계열 3학년 재학생', 
    '1) 대한민국 국적의 4년제 예술/체육계열 3학년 재학생\n2) 직전학기 평점 3.6(90점) 이상\n3) 졸업이수학점 40% 이상 취득', 
    '해당자 중 선발', '연 1회', '2025-03-26', '2025-04-16', 
    '대학 추천 후 재단 심사', '학업계획서, 전인적 인재성장 결과보고서 등', 
    '예술체육 분야 선도 인재 육성 (3학년)', '한국장학재단', 'https://www.kosaf.go.kr',
    '등록금 전액 + α', '3', 3.6, 10, 'any', 'university', '전국', 
    '예체능계열', 0, NULL, 'Korea', '전국', 
    '전국', '전국', 9, 9, 'enrolled', '무관', '2026년 예술체육비전 장학금'
);

-- 15-A. National Excellence Scholarship (Science - Freshman) (국가우수장학금(이공계) - 성적우수/1학년)
INSERT INTO scholarships (
    name, foundation, category, benefit_type, payment_method, payment_period, extra_benefits, 
    target_hashtags, target_description, eligibility, selection_count, application_count, 
    application_period, application_end, application_method, required_documents, description, contact, link,
    amount, target_grade, min_gpa, max_income, target_gender, target_school_type, target_region, 
    target_major_category, min_prev_semester_credits, special_criteria, target_nationality, target_parents_region, 
    target_university_region, target_high_school_region, max_csat_grade, max_school_grade, target_enrollment_status, target_universities, group_name
) VALUES (
    '2026년 국가우수장학금 (이공계/1학년)', '한국장학재단', '공공장학', '등록금+생활비', 
    '등록금 전액 + 생활비(기초수급)', '최대 4년(8학기)', '기초생활수급자 생활비 250만원', 
    '{"대학생","이공계","신입생"}', '이공계열 우수 신입생', 
    '1) 국내 4년제 자연과학/공학계열 신입생\n2) 대학 추천을 받은 자 (수시/정시 우수자)', 
    '해당자 중 선발', '지속', '수시접수', '2025-11-23', 
    '대학 추천 후 학생 신청', '포기확인서, 활동내역서 등', 
    '국가 핵심 이공계 인재 육성 (성적우수)', '한국장학재단', 'https://www.kosaf.go.kr',
    '등록금 전액 + α', '1', 0, 10, 'any', 'university', '전국', 
    '자연계열,공학계열', 0, NULL, 'Korea', '전국', 
    '전국', '전국', 9, 9, 'enrolled,expected', '무관', '2026년 국가우수장학금'
);

-- 15-B. National Excellence Scholarship (Science - Junior) (국가우수장학금(이공계) - 2년지원/3학년)
INSERT INTO scholarships (
    name, foundation, category, benefit_type, payment_method, payment_period, extra_benefits, 
    target_hashtags, target_description, eligibility, selection_count, application_count, 
    application_period, application_end, application_method, required_documents, description, contact, link,
    amount, target_grade, min_gpa, max_income, target_gender, target_school_type, target_region, 
    target_major_category, min_prev_semester_credits, special_criteria, target_nationality, target_parents_region, 
    target_university_region, target_high_school_region, max_csat_grade, max_school_grade, target_enrollment_status, target_universities, group_name
) VALUES (
    '2026년 국가우수장학금 (이공계/3학년)', '한국장학재단', '공공장학', '등록금+생활비', 
    '등록금 전액 + 생활비(기초수급)', '최대 2년(4학기)', '기초생활수급자 생활비 250만원', 
    '{"대학생","이공계","3학년"}', '이공계열 우수 3학년 재학생', 
    '1) 국내 4년제 자연과학/공학계열 3학년 재학생\n2) 직전 2년(4학기) 평점 3.5(87점) 이상\n3) 이수학점 40% 이상 취득', 
    '해당자 중 선발', '지속', '수시접수', '2025-11-23', 
    '대학 추천 후 학생 신청', '활동내역서 등', 
    '국가 핵심 이공계 인재 육성 (2년지원)', '한국장학재단', 'https://www.kosaf.go.kr',
    '등록금 전액 + α', '3', 3.5, 10, 'any', 'university', '전국', 
    '자연계열,공학계열', 0, NULL, 'Korea', '전국', 
    '전국', '전국', 9, 9, 'enrolled', '무관', '2026년 국가우수장학금'
);

-- 16. Master''s Excellence Scholarship (Science) (석사우수 장학금 - 이공계)
INSERT INTO scholarships (
    name, foundation, category, benefit_type, payment_method, payment_period, extra_benefits, 
    target_hashtags, target_description, eligibility, selection_count, application_count, 
    application_period, application_end, application_method, required_documents, description, contact, link,
    amount, target_grade, min_gpa, max_income, target_gender, target_school_type, target_region, 
    target_major_category, min_prev_semester_credits, special_criteria, target_nationality, target_parents_region, 
    target_university_region, target_high_school_region, max_csat_grade, max_school_grade, target_enrollment_status, target_universities, group_name
) VALUES (
    '2026년 석사우수장학금 (이공계)', '한국장학재단', '공공장학', '학업장려금', 
    '학기당 250만원 (연구장려금)', '최대 4학기', '없음', 
    '{"대학원생","이공계","석사"}', '이공계열 석사 과정생', 
    '1) 국내 일반/전문대학원 자연과학/공학계열 석사생\n2) 학사 졸업 성적 3.5(87점) 이상', 
    '1,025명', '연 1회', '2025-09-01', '2025-11-28', 
    '대학 추천 후 재단 심사', '해당 시 제출', 
    '이공계 석사 우수 인재 양성 및 성장 지원', '한국장학재단', 'https://www.kosaf.go.kr',
    '학기당 250만원', '1,2,3,4', 3.5, 10, 'any', 'grad_school', '전국', 
    '자연계열,공학계열', 0, NULL, 'Korea', '전국', 
    '전국', '전국', 9, 9, 'enrolled,expected', '무관', '2026년 석사우수장학금'
);

-- 12-B. Presidential Science Scholarship (Undergrad - Junior) (대통령과학 장학금 - 학부 3학년)
INSERT INTO scholarships (
    name, foundation, category, benefit_type, payment_method, payment_period, extra_benefits, 
    target_hashtags, target_description, eligibility, selection_count, application_count, 
    application_period, application_end, application_method, required_documents, description, contact, link,
    amount, target_grade, min_gpa, max_income, target_gender, target_school_type, target_region, 
    target_major_category, min_prev_semester_credits, special_criteria, target_nationality, target_parents_region, 
    target_university_region, target_high_school_region, max_csat_grade, max_school_grade, target_enrollment_status, target_universities, group_name
) VALUES (
    '2026년 대통령과학 장학금 (학부 3학년)', '한국장학재단', '공공장학', '복합지원', 
    '등록금 전액 + 학업장려비', '최대 4학기', '없음', 
    '{"대학생","이공계","3학년"}', '이공계 우수 3학년 재학생', 
    '1) 국내 4년제 대학 이공계학과 3학년 재학생\n2) 직전학기까지 총 평점평균 87점(3.2~3.3) 이상', 
    '60명', '연 1회', 45737, '2025-03-31', 
    '재단 심사/면접', '성적증명서, 인재성장계획서 등', 
    '이공계 최우수 인재 (3학년) 지원', '한국장학재단', 'https://www.kosaf.go.kr',
    '등록금 전액 + α', '3', 3.3, 10, 'any', 'university', '전국', 
    '자연계열,공학계열', 0, NULL, 'Korea', '전국', 
    '전국', '전국', 9, 9, 'enrolled', '무관', '2026년 대통령과학 장학금(학부)'
);