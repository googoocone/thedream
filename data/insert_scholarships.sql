-- Auto-generated Insert SQL for Scholarships
-- Source: scholarship2.xlsx
-- Generated at: 2025-12-16T08:17:20.405Z

-- 0. Schema Migration (Safe to run multiple times)
ALTER TABLE public.scholarships ADD COLUMN IF NOT EXISTS category text;
ALTER TABLE public.scholarships ADD COLUMN IF NOT EXISTS benefit_type text;
ALTER TABLE public.scholarships ADD COLUMN IF NOT EXISTS amount_detail text;
ALTER TABLE public.scholarships ADD COLUMN IF NOT EXISTS payment_method text;
ALTER TABLE public.scholarships ADD COLUMN IF NOT EXISTS payment_period text;
ALTER TABLE public.scholarships ADD COLUMN IF NOT EXISTS extra_benefits text;
ALTER TABLE public.scholarships ADD COLUMN IF NOT EXISTS target_hashtags text;
ALTER TABLE public.scholarships ADD COLUMN IF NOT EXISTS eligibility text;
ALTER TABLE public.scholarships ADD COLUMN IF NOT EXISTS section_count text;
ALTER TABLE public.scholarships ADD COLUMN IF NOT EXISTS application_count text;
ALTER TABLE public.scholarships ADD COLUMN IF NOT EXISTS application_period text;
ALTER TABLE public.scholarships ADD COLUMN IF NOT EXISTS application_method text;
ALTER TABLE public.scholarships ADD COLUMN IF NOT EXISTS required_documents text;
ALTER TABLE public.scholarships ADD COLUMN IF NOT EXISTS contact text;

INSERT INTO public.scholarships (
            name, foundation, amount, application_end,
            category, benefit_type, amount_detail, payment_method, payment_period,
            extra_benefits, target_hashtags, eligibility, section_count, application_count,
            application_period, application_method, required_documents, contact,
            target_grade, min_gpa, max_income, target_gender,
            target_school_type, target_region, target_major_category,
            special_criteria, target_nationality,
            min_prev_semester_credits, target_parents_region, target_university_region, target_high_school_region, 
            max_csat_grade, max_school_grade, target_enrollment_status,
            tags, target_description, link
        ) VALUES (
            '2026년 제5기 인재림 장학생 선발', '한국고등교육재단', '최대 1,200만원', '2025-11-25',
            '민간장학', '복합지원', '- 교육비 전액 
- 장학금 800만원 
- 팀 프로젝트 활동비 200만원 
- 우수 프로젝트 상금 200만원', '별도 안내', '1년 (''26.02~''27.02)',
            '프로그램 참여 기회 (팀 프로젝트·강의·워크숍)', ARRAY['대학생'], '[기본 요건]
➀ 대한민국 국적 보유자(복수국적자 포함) 지원 가능
➁ ‘26년 2월~’27년 2월 중 학부생 자격 유지 필수
➂ 어학연수, 교환학생, 취업 및 군 복무 등으로 프로그램 중단 불가
➃ 소속 대학, 한국장학재단 등 타 기관의 장학금 및 장학 프로그램과 중복수혜 가능
[학적 요건]
➀ 전국 4 년제 대학 2~3 학년(학년 수료기준은 재학 중인 학교 규정에 따름) 지원 가능
(지원 가능) ‘26년 2월~’27년 2월 중 학부생 자격 유지 필수
(지원 가능) 1학년 2학기 이수 후 ~ 3학년 2학기 이수 후 휴학 중인 학생
(지원 불가능) 지원 시점 기준, 4학년 재학생 및 초과 학기 이수 예정자 지원 불가
➁ 편입생의 경우 이전 학교 성적 증명서 제출 필수
➂ 학제 5~6 년인 전공에 한하여, 각 2~4 학년과 2~5 학년에 재학 중인 학생 지원 가능', '20여명', '연 1회',
            '2025-10-28
4월 & 10월', '온라인 접수 (apply.kfas.or.kr)', '지원서 및 에세이, 성적표, 고내외활동 증빙자료, 공인어학성적 등', '한국고등교육재단 (kfas.education@kfas.or.kr / 02-6310-7882, 7884)',
            '2,3', 0, 10, 'any',
            'university', '전국', '무관',
            NULL, 'Korea',
            0, '전국', '전국', '전국',
            9, 9, 'enrolled',
            ARRAY['민간장학금'], '국내 4년제 대학 학부 2~3학년 재학생 및 휴학생', 'https://apply.kfas.or.kr/cvt_program/list.php?service_type=1&kind_seq=2'
        );
INSERT INTO public.scholarships (
            name, foundation, amount, application_end,
            category, benefit_type, amount_detail, payment_method, payment_period,
            extra_benefits, target_hashtags, eligibility, section_count, application_count,
            application_period, application_method, required_documents, contact,
            target_grade, min_gpa, max_income, target_gender,
            target_school_type, target_region, target_major_category,
            special_criteria, target_nationality,
            min_prev_semester_credits, target_parents_region, target_university_region, target_high_school_region, 
            max_csat_grade, max_school_grade, target_enrollment_status,
            tags, target_description, link
        ) VALUES (
            '2026년 제5기 문우림 장학생 선발', '한국고등교육재단', '2년간 1,600만원', '2025-11-10',
            '민간장학', '복합지원', '- 교육비 전액
- 장학금 1,600만원 (2년 합계)', '별도 안내', '2년 (''26.03~''28.02)',
            '프로그램 참여 기회 (학술답사 및 탐방)', ARRAY['대학생'], '➀ 대한민국 국적 보유자(복수국적자 지원 가능)
➁ 학부 2, 3학년이며 2개 학기 이상 이수자 (학년 수료기준은 재학 중인 학교 기준을 따름)
➂ 평균 학점 3.5 이상(4.5 만점 기준)
➃ 2년간 재단 연수 프로그램에 참여할 수 있는 자
※ 도중 교환학생 및 군 복무 등의 사유로 프로그램의 중단불가
※ 타 기관의 장학금 및 장학 프로그램과 중복수혜 가능', '10여명', '연 1회',
            45931, '온라인 접수 (apply.kfas.or.kr)', '자기소개서, 성적증명서, 추천서, 공인어학성적 등', '한국고등교육재단 (kfas.education@kfas.or.kr / 02-6310-7882, 7884)',
            '2,3', 3.5, 10, 'any',
            'university', '전국', '무관',
            NULL, 'Korea',
            0, '전국', '전국', '전국',
            9, 9, 'enrolled',
            ARRAY['민간장학금'], '국내 4년제 대학 학부 2~3학년 (전공 제한 없음)', 'https://apply.kfas.or.kr/cvt_program/list.php?service_type=1&kind_seq=1'
        );
INSERT INTO public.scholarships (
            name, foundation, amount, application_end,
            category, benefit_type, amount_detail, payment_method, payment_period,
            extra_benefits, target_hashtags, eligibility, section_count, application_count,
            application_period, application_method, required_documents, contact,
            target_grade, min_gpa, max_income, target_gender,
            target_school_type, target_region, target_major_category,
            special_criteria, target_nationality,
            min_prev_semester_credits, target_parents_region, target_university_region, target_high_school_region, 
            max_csat_grade, max_school_grade, target_enrollment_status,
            tags, target_description, link
        ) VALUES (
            '2025년 제51기 정보통신 해외유학 장학생 선발', '한국고등교육재단', '450만원+연수비', '2025-07-18',
            '민간장학', '복합지원', '- 장학금 (2회, 최대 450만원)
- 재단 연수 프로그램 교육비 전액
- 해외유학장학생 전환 시 박사 졸업까지 최대 5년 연구지원금 (연 USD 13,000)', '별도 안내', '연수 기간 (박사과정 입학 시 최대 5년)',
            '- 해외 박사과정 지원 시 재정보증서 발급
- 해외유학장학생 전환 기회 부여', ARRAY['대학원생'], '※ 해당전공: EE, CS
1) 대한민국 국적 보유자 (해외 영주권자, 이중국적자도 지원 가능)
2) 2026년 9월에 해외 박사학위 과정에 진학이 가능한 자
3) 아래 학력 요건 중 하나 이상 해당하는 자
가) 국내ㆍ외 3~4년제 학사 과정 재학자 또는 졸업자
나) 국내ㆍ외 대학원(석사/박사 과정) 재학생 또는 졸업자
4) 공인 영어 성적 TOEFL iBT 95점 이상 또는 IELTS 7.0 이상
5) 재단 선발 전형(필기, 면접, OT 등) 전 일정에 대면 참석 가능한 자
6) 선발 이후 1년간 재단 연수 프로그램에 대면 참석 가능한 자', NULL, '연 1회',
            45831, '온라인 접수 (apply.kfas.or.kr)', '지원서, 대학(원) 전 과정 성적증명서, 추천서(2부), 공인 영어 성적표, 학업계획서, 영문 CV 등', '한국고등교육재단 (apply@kfas.or.kr / 02-6310-7882, 7884)',
            '3,4', 0, 10, 'any',
            'university,grad_school', '전국', '공학',
            NULL, 'Korea',
            0, '전국', '전국', '전국',
            9, 9, 'enrolled,graduated',
            ARRAY['민간장학금'], '대한민국 국적의 해외 박사학위 과정 취득 희망자 중 다음의 자격요건을 모두 만족하는 자', 'https://apply.kfas.or.kr/program/list.php?service_type=2'
        );
INSERT INTO public.scholarships (
            name, foundation, amount, application_end,
            category, benefit_type, amount_detail, payment_method, payment_period,
            extra_benefits, target_hashtags, eligibility, section_count, application_count,
            application_period, application_method, required_documents, contact,
            target_grade, min_gpa, max_income, target_gender,
            target_school_type, target_region, target_major_category,
            special_criteria, target_nationality,
            min_prev_semester_credits, target_parents_region, target_university_region, target_high_school_region, 
            max_csat_grade, max_school_grade, target_enrollment_status,
            tags, target_description, link
        ) VALUES (
            '2025년 제51기 자연과학 해외유학 장학생 선발', '한국고등교육재단', '450만원+연수비', '2025-07-18',
            '민간장학', '복합지원', '- 장학금 (2회, 최대 450만원)
- 재단 연수 프로그램 교육비 전액
- 해외유학장학생 전환 시 박사 졸업까지 최대 5년 연구지원금 (연 USD 13,000)', '별도 안내', '연수 기간 (박사과정 입학 시 최대 5년)',
            '- 해외 박사과정 지원 시 재정보증서 발급
- 해외유학장학생 전환 기회 부여', ARRAY['대학원생'], '※ 해당전공: 물리학, 생명과학, 수학, 통계학, 화학
1) 대한민국 국적 보유자 (해외 영주권자, 이중국적자도 지원 가능)
2) 2026년 9월에 해외 박사학위 과정에 진학이 가능한 자
3) 아래 학력 요건 중 하나 이상 해당하는 자
가) 국내ㆍ외 3~4년제 학사 과정 재학자 또는 졸업자
나) 국내ㆍ외 대학원(석사/박사 과정) 재학생 또는 졸업자
4) 공인 영어 성적 TOEFL iBT 95점 이상 또는 IELTS 7.0 이상
5) 재단 선발 전형(필기, 면접, OT 등) 전 일정에 대면 참석 가능한 자
6) 선발 이후 1년간 재단 연수 프로그램에 대면 참석 가능한 자', NULL, '연 1회',
            45831, '온라인 접수 (apply.kfas.or.kr)', '지원서, 대학(원) 전 과정 성적증명서, 추천서(2부), 공인 영어 성적표, 학업계획서, 영문 CV 등', '한국고등교육재단 (apply@kfas.or.kr / 02-6310-7882, 7884)',
            '3,4', 0, 10, 'any',
            'university,grad_school', '전국', '자연',
            NULL, 'Korea',
            0, '전국', '전국', '전국',
            9, 9, 'enrolled,graduated',
            ARRAY['민간장학금'], '대한민국 국적의 해외 박사학위 과정 취득 희망자 중 다음의 자격요건을 모두 만족하는 자', 'https://apply.kfas.or.kr/program/list.php?service_type=2'
        );
INSERT INTO public.scholarships (
            name, foundation, amount, application_end,
            category, benefit_type, amount_detail, payment_method, payment_period,
            extra_benefits, target_hashtags, eligibility, section_count, application_count,
            application_period, application_method, required_documents, contact,
            target_grade, min_gpa, max_income, target_gender,
            target_school_type, target_region, target_major_category,
            special_criteria, target_nationality,
            min_prev_semester_credits, target_parents_region, target_university_region, target_high_school_region, 
            max_csat_grade, max_school_grade, target_enrollment_status,
            tags, target_description, link
        ) VALUES (
            '2025년 제51기 인문사회과학 해외유학 장학생 선발', '한국고등교육재단', '450만원+연수비', '2025-07-18',
            '공공장학', '복합지원', '- 장학금 (2회, 최대 450만원)
- 재단 연수 프로그램 교육비 전액
- 해외유학장학생 전환 시 박사 졸업까지 최대 5년 연구지원금 (연 USD 13,000)', '별도 안내', '연수 기간 (박사과정 입학 시 최대 5년)',
            '- 해외 박사과정 지원 시 재정보증서 발급
- 해외유학장학생 전환 기회 부여', ARRAY['대학원생'], '※ 해당전공: 경영학, 경제학, 교육학, 사학, 사회복지학, 사회학, 심리학, 언론정보학, 인류학, 정치외교학, 지리학, 철학, 행정학/정책학
1) 대한민국 국적 보유자 (해외 영주권자, 이중국적자도 지원 가능)
2) 2026년 9월에 해외 박사학위 과정에 진학이 가능한 자
3) 아래 학력 요건 중 하나 이상 해당하는 자
가) 국내ㆍ외 3~4년제 학사 과정 재학자 또는 졸업자
나) 국내ㆍ외 대학원(석사/박사 과정) 재학생 또는 졸업자
4) 공인 영어 성적 TOEFL iBT 100점 이상 또는 IELTS 7.5 이상
5) 재단 선발 전형(필기, 면접, OT 등) 전 일정에 대면 참석 가능한 자
6) 선발 이후 1년간 재단 연수 프로그램에 대면 참석 가능한 자', NULL, '연 1회',
            45831, '온라인 접수 (apply.kfas.or.kr)', '지원서, 대학(원) 전 과정 성적증명서, 추천서(2부), 공인 영어 성적표, 학업계획서, 영문 CV, Writing Sample 등', '한국고등교육재단 (apply@kfas.or.kr / 02-6310-7882, 7884)',
            '3,4', 0, 10, 'any',
            'university,grad_school', '전국', '인문,사회',
            NULL, 'Korea',
            0, '전국', '전국', '전국',
            9, 9, 'enrolled,graduated',
            ARRAY['민간장학금'], '대한민국 국적의 해외 박사학위 과정 취득 희망자 중 다음의 자격요건을 모두 만족하는 자', 'https://apply.kfas.or.kr/program/list.php?service_type=2'
        );
