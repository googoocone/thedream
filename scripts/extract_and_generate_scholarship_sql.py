import pandas as pd
import re
import math

def clean_val(val):
    if pd.isna(val):
        return "NULL"
    if isinstance(val, str):
        val = val.replace("'", "''")
        return f"'{val}'"
    return str(val)

def clean_date(val):
    if pd.isna(val):
        return "NULL"
    try:
        dt = pd.to_datetime(val)
        return f"'{dt.strftime('%Y-%m-%d')}'"
    except:
        return "NULL"

def clean_array(val, default=None):
    if pd.isna(val):
        if default:
            val = default
        else:
            return "NULL"
    
    if isinstance(val, str):
        if val.lower() == 'nan':
             return "NULL"
        items = [x.strip() for x in val.split(',')]
        quoted_items = [f"'{x}'" for x in items if x]
        if not quoted_items:
            return "NULL"
        return f"ARRAY[{', '.join(quoted_items)}]"
    return "NULL"

# --- Extraction Logic ---

def extract_gpa(text):
    if not isinstance(text, str):
        return 0
    
    # 1. Try to find explicit GPA (x.x)
    # Matches "3.5 이상", "평점 3.0", "3.5/4.5"
    gpa_matches = re.findall(r'(\d\.\d)\s*(?:이상|점|/|\s)', text)
    valid_gpas = []
    if gpa_matches:
        for x in gpa_matches:
            try:
                val = float(x)
                if val <= 4.5:
                    valid_gpas.append(val)
            except:
                pass
    
    if valid_gpas:
        return min(valid_gpas)

    # Debug
    # print(f"DEBUG extract_gpa text: {text}")
    # Matches "백분위 80점", "백분위 87", "백분율 80%" etc.
    percentile_matches = re.findall(r'(?:백분위|백분율|환산\s*점수)\s*:?\s*(\d{2,3})', text)
    if percentile_matches:
         # Use the explicit percentile found
         # Usually valid percentiles are 70-100, but some use 60
         valid_p = [int(x) for x in percentile_matches if 60 <= int(x) <= 100]
         if valid_p:
             min_score = min(valid_p)
             if min_score >= 90: return 3.6
             if min_score >= 87: return 3.0 # Adjusted conservative mapping 87->3.0? No, 87 often 3.5ish. Stick to 87->3.5 or user request.
             # User implied 80점 -> 3.0.
             if min_score >= 85: return 3.5
             if min_score >= 80: return 3.0
             if min_score >= 70: return 1.6
             if min_score >= 60: return 1.0
             return 0
    else:
         # Debug
         # print("DEBUG: No percentile match")
         pass

    # 3. If "백분위" keyword is missing, look for "XX점" but avoid evaluation weights like (50점)
    # Exclude matches in parentheses? simpler to just find all and filtering?
    # Evaluation scores are often (50점), (30점).
    # Grades are usually just "80점 이상"
    
    # Remove things like "(50점)", "(30점)" from text first?
    cleaned_text = re.sub(r'\(\d+점\)', '', text) 
    
    score_matches = re.findall(r'(\d{2,3})점', cleaned_text)
    if score_matches:
        scores = [int(x) for x in score_matches if 60 <= int(x) <= 100]
        if scores:
            min_score = min(scores)
            if min_score >= 90: return 3.6
            if min_score >= 87: return 3.5
            if min_score >= 80: return 3.0
            if min_score >= 70: return 1.6 
            if min_score >= 60: return 1.0 
            
    return 0

def extract_grades(text):
    if not isinstance(text, str):
        return "1,2,3,4"
        
    # Pre-process: ignore "4학년은"
    original_text = text
    if '4학년은' in text:
        text = text.replace('4학년은', '')
        
    grades = set()
    matches = re.findall(r'([1-4])(?:학년|,)', text)
    for m in matches:
        grades.add(m)
    
    if "신입" in text:
        grades.add('1')

    # If '재학생' is detected and grades set is limited (e.g. only '1' from 신입 or empty),
    # Expand to all grades because 'Enrolled' usually implies all years.
    # Exception: if explicit "2학년" etc are found, we respect that.
    # But if only '1' was found (from '신입') AND '재학생' exists, it implies 'Freshman AND Enrolled', so likely '1,2,3,4'.
    if '재학생' in original_text or '대학생' in original_text:
         if not grades or (len(grades) == 1 and '1' in grades):
             return "1,2,3,4"
        
    if not grades:
        return "1,2,3,4"
    
    return ",".join(sorted(list(grades)))

# ... (omitted code) ...

    target_region = "'전국'"
    
    # Extract Minimum Credits
    min_prev_semester_credits = 12 # Default
    credit_match = re.search(r'(\d+)\s*학점', combined_text)
    if credit_match:
        try:
            val = int(credit_match.group(1))
            # Basic sanity check (credits usually 6~20)
            if 6 <= val <= 24:
                min_prev_semester_credits = val
        except:
            pass
            

def extract_income(text):
    if not isinstance(text, str):
        return 10
    matches = re.findall(r'(\d+)(?:구간|분위)', text)
    if matches:
        return min([int(x) for x in matches])
    return 10

def extract_major_category(text):
    if not isinstance(text, str):
        return "무관"
    
    # Clean text for easier matching but keep specific terms
    # Using specific keywords to avoid false positives like "지역사회" -> "Social Sciences"
    categories = []
    
    # Engineering / Science
    if re.search(r'이공|공학|자연|과학|정보통신|SW|소프트웨어|원자력', text):
        categories.append("공학계열")
        categories.append("자연계열")
        
    # Humanities / Social
    if re.search(r'인문|어문|법학|상경|경영|경제|사회복지|사회과학|사회계열|신학', text):
         categories.append("인문계열")
         categories.append("사회계열")
         
    # Arts / Sports
    if re.search(r'예체능|예술|체육|미술|음악', text):
        categories.append("예체능계열")

    # Education (New)
    # Avoid generic "교육" (Education) which appears in "Education Foundation" or "Education Environment"
    if re.search(r'사범|교육대|교원|교육학|교육계열', text):
        categories.append("교육계열")

    # Broadcasting / Media (New)
    if re.search(r'방송|미디어', text):
        categories.append("방송/미디어")
        
    if not categories:
        return "무관"
    return ",".join(list(set(categories)))

def extract_amount(text):
    if not isinstance(text, str):
        return "NULL"
    lines = text.split('\n')
    return clean_val(lines[0][:100])

# --- Splitting Logic ---

def parse_sub_tracks(row):
    """
    Returns a LIST of dicts. Each dict represents a split scholarship entry.
    If no split is detected, returns list with single dict.
    """
    eligibility_text = str(row.get('eligibility', ''))
    
    # Custom Splitting for Scholarship 14 Special Cases
    # MOVED TO TOP to avoid early return from generic logic
    group_name = str(row.get('name', '')).strip()
    
    if '호국장학금' in group_name or '부천장학재단' in group_name or '광주광역시 서구' in group_name or '김제' in group_name:
        tracks = []
        lines = eligibility_text.split('\n')
        
        # Kimje Splitting (File 15)
        if '김제' in group_name:
            if '일반' in group_name: # Kimje General
                fresh_lines = []
                enrolled_lines = []
                
                # row['eligibility'] in Kimje 0 has 1) ... 2) ...
                # Simple check: 1) contains Freshman, 2) contains Enrolled
                # Wait, generic text might be messy.
                # Let's check splitting by '1)' and '2)' if generic keywords fail.
                
                # Accumulate lines
                preamble_lines = []
                fresh_lines = []
                enrolled_lines = []
                
                current_mode = 'none'
                for l in lines:
                    if '1)' in l and '신입' in l: current_mode = 'fresh'
                    elif '2)' in l and '재학' in l: current_mode = 'enrolled'
                    elif '1)' in l and '신입' not in l and '성적' not in l: current_mode = 'fresh' # Fallback
                    
                    if current_mode == 'fresh': fresh_lines.append(l)
                    elif current_mode == 'enrolled': enrolled_lines.append(l)
                    else:
                        # If not in specific mode yet, it's preamble (common)
                        # But ignore empty lines or weird noise if needed.
                        if l.strip():
                             preamble_lines.append(l)
                
                # Prepend preamble to both
                common_text = "\n".join(preamble_lines)
                
                # If splitting worked adequately
                if len(fresh_lines) > 0:
                    row_f = row.copy()
                    row_f['target_grade'] = '1'
                    final_text_f = common_text + "\n" + "\n".join(fresh_lines)
                    tracks.append(create_entry_data(row_f, '일반 (신입생)', final_text_f))
                
                if len(enrolled_lines) > 0:
                    row_e = row.copy()
                    row_e['target_grade'] = '2,3,4'
                    final_text_e = common_text + "\n" + "\n".join(enrolled_lines)
                    tracks.append(create_entry_data(row_e, '일반 (재학생)', final_text_e))
                
                if not tracks:
                    # Fallback if split failed
                    tracks.append(create_entry_data(row, '일반', eligibility_text))
                return tracks
            else:
                # Other Kimje scholarships (Single track)
                # Just return one entry
                tracks.append(create_entry_data(row, None, eligibility_text))
                return tracks

        if '호국장학금' in group_name:
             # Track 1: 성적우수자
             merit_text = [l for l in lines if '성적우수' in l or '공통' in l]
             care_text = [l for l in lines if '배려' in l or '공통' in l or '장애' in l or '다자녀' in l or '한부모' in l]
             
             tracks.append(create_entry_data(row, '성적우수자', "\n".join(merit_text)))
             tracks.append(create_entry_data(row, '배려대상자', "\n".join(care_text)))
             return tracks

        elif '부천장학재단' in group_name:
             # 1) 성적우수 (Split into Freshman vs Enrolled)
             # Freshman Keywords: 신입생, 고등학교
             # Enrolled Keywords: 재학생, 학기, 평점, 총(학)장
             
             merit_fresh_lines = [l for l in lines if ('성적' in l) or ('신입' in l) or ('고등학교' in l) or ('1-1' in l)]
             # Exclude enrolled keywords from Freshman
             final_fresh = [l for l in merit_fresh_lines if '재학생' not in l and '1-2' not in l and '총' not in l]
             
             merit_enrolled_lines = [l for l in lines if ('성적' in l) or ('재학생' in l) or ('1-2' in l) or ('총' in l) or ('평점' in l)]
             # Exclude freshman keywords from Enrolled
             final_enrolled = [l for l in merit_enrolled_lines if '신입생' not in l and '1-1' not in l and '고등학교' not in l]
             
             # Force Target Grades
             row_fresh = row.copy()
             row_fresh['target_grade'] = '1' # Freshman
             tracks.append(create_entry_data(row_fresh, '성적우수 (신입생)', "\n".join(final_fresh)))
             
             row_enrolled = row.copy()
             row_enrolled['target_grade'] = '2,3,4' # Enrolled (Year 2+)
             tracks.append(create_entry_data(row_enrolled, '성적우수 (재학생)', "\n".join(final_enrolled)))

             income_text = [l for l in lines if '가정' in l or '소득' in l or '건강보험' in l]
             arts_text = [l for l in lines if '예체능' in l or '대회' in l]
             multi_text = [l for l in lines if '다자녀' in l]
             
             tracks.append(create_entry_data(row, '가정환경', "\n".join(income_text)))
             
             # Force major to '무관' for Arts track as per user request
             row_arts = row.copy()
             row_arts['target_major_category'] = '무관'
             tracks.append(create_entry_data(row_arts, '예체능', "\n".join(arts_text)))
             
             tracks.append(create_entry_data(row, '다자녀', "\n".join(multi_text)))
             return tracks

        elif '광주광역시 서구' in group_name:
             # 1) 성적우수 2) 행복 3) 다자녀 4) 장애인 5) 꿈지원
             merit_text = [l for l in lines if '성적' in l]
             happy_text = [l for l in lines if '행복' in l] # Mid GPA
             general_text = [l for l in lines if '일반' in l or '생활비' in l] # Income
             multi_text = [l for l in lines if '다자녀' in l]
             disabled_text = [l for l in lines if '장애' in l]
             
             tracks.append(create_entry_data(row, '성적우수', "\n".join(merit_text)))
             tracks.append(create_entry_data(row, '행복', "\n".join(happy_text)))
             tracks.append(create_entry_data(row, '일반/생활비', "\n".join(general_text)))
             tracks.append(create_entry_data(row, '다자녀', "\n".join(multi_text)))
             tracks.append(create_entry_data(row, '장애인', "\n".join(disabled_text)))
             return tracks

    
    # Generic [Tag] Splitting
    # Check for [Tag] patterns (e.g., [신규장학생], [계속장학생], [유학준비생])
    # Regex to find blocks:  \[(.*?)\]
    matches = list(re.finditer(r'\[(.*?)\]', eligibility_text))
    
    if len(matches) < 2:
        # 0 or 1 match doesn't imply distinct parallel tracks generally, or just one track labeled.
        return [create_entry_data(row, None, eligibility_text)]

    # If multiple markers found, we try to split the text.
    tracks = []
    
    # Custom Splitting for Scholarship 14 Special Cases (REMOVED from here, handled above)
    


    # Default Generic [Tag] Splitting
    # ...
    
    # We interpret the text *between* markers as belonging to the previous marker using indices.
    # Start -> Match1_Start ... Match2_Start ... End
    
    for i in range(len(matches)):
        current_match = matches[i]
        tag_name = current_match.group(1) # e.g. "신규장학생"
        
        start_idx = current_match.end() # Start of content
        
        if i + 1 < len(matches):
            end_idx = matches[i+1].start()
        else:
            end_idx = len(eligibility_text)
            
        content_text = eligibility_text[start_idx:end_idx].strip()
        
        tracks.append(create_entry_data(row, tag_name, content_text))
        
    return tracks

def create_entry_data(row, track_tag, specific_eligibility_text):
    """
    Creates the data dict for a single entry, extracting data from specific text + global row data.
    """
    original_name = str(row.get('name', 'Unknown'))
    group_name = clean_val(original_name)
    
    # Global texts
    target_desc_text = str(row.get('target_description', ''))
    desc_text = str(row.get('description', ''))
    support_text = str(row.get('support_detail', ''))
    
    # Combined text for THIS track
    # We prioritize specific_eligibility_text for GPA/Grade
    combined_text = f"{specific_eligibility_text} {target_desc_text} {desc_text} {support_text}"
    
    # Extraction
    min_gpa = extract_gpa(specific_eligibility_text)
    
    # Check for manual override in row (e.g. for split tracks)
    if row.get('target_grade'):
        target_grade = row.get('target_grade')
    else:
        target_grade = extract_grades(f"{specific_eligibility_text} {target_desc_text}")
    max_income = extract_income(f"{specific_eligibility_text} {target_desc_text}") # Income often in eligibility
    
    if row.get('target_major_category'):
        target_major_category_val = row.get('target_major_category')
        # Normalize specific inputs
        if '신학' in str(target_major_category_val):
             target_major_category_val = '인문계열'
    else:
        target_major_category_val = extract_major_category(combined_text)
        
    amount_val = extract_amount(support_text)
    
    # Suffix & Name
    # If track_tag exists, use it. Else infer.
    suffix = ""
    if track_tag:
        suffix = f"({track_tag})"
        
        # Refine suffix description for specific splits if needed?
        # No, just use the tag.
    else:
        # Fallback to inference
        if '장애' in combined_text:
            suffix = "(장애인)"
        elif max_income < 9 or '기초' in combined_text or '차상위' in combined_text:
            suffix = "(기초/차상위)"
        elif min_gpa == 0 and '신입' in combined_text:
            suffix = "(신입/편입)" 
        else:
            suffix = "(재학생/일반)"
            
    combined_name = f"{original_name} {suffix}"
    name = clean_val(combined_name)
    
    # Special Criteria
    # If track tag is e.g. "Disabled", we should probably add it to criteria too?
    sc_list = []
    
    # Updated mapping as per user request & frontend check
    # Updated mapping to match Frontend IDs (StepAdditional.tsx)
    
    # 1. Family Background
    if '기초' in combined_text or '기초생활수급자' in combined_text:
        sc_list.append('basic_livelihood')
    if '차상위' in combined_text or '차상위계층' in combined_text:
        sc_list.append('second_lowest')
    if '다문화' in combined_text:
        sc_list.append('multicultural')
    if '한부모' in combined_text:
        sc_list.append('single_parent')
    if '조손' in combined_text:
        sc_list.append('grandparent_raised')
    if '북한' in combined_text or '이탈' in combined_text:
        sc_list.append('north_korean')
    if '장애인 가정' in combined_text or '장애인가정' in combined_text: # Distinguish from personal disability if possible, but often conflated text
        sc_list.append('disabled_family')
    if '다자녀' in combined_text:
        sc_list.append('multi_child')
    # Check for "N자녀" (e.g. 5자녀, 3자녀)
    if re.search(r'\d+자녀', combined_text):
        if 'multi_child' not in sc_list:
            sc_list.append('multi_child')
        
    if '국가유공자' in combined_text or '보훈' in combined_text:
        sc_list.append('veteran') # Maps to general veteran/national merit
        sc_list.append('national_merit_family') # Add both if ambiguous or specific logic needed. For now add both to be safe or just veteran? Frontend has distinct IDs.
    
    # 2. Parents' Job
    if '농업' in combined_text or '어업' in combined_text or '축산' in combined_text or '농어촌' in combined_text:
        sc_list.append('farmer_fisherman_family') # Frontend item
    if '소상공인' in combined_text:
        sc_list.append('small_business')
    if '경찰' in combined_text or '소방' in combined_text:
        sc_list.append('police_fire')

    # Military & Civilian Employee Separation
    if '군인' in combined_text or '직업군인' in combined_text or '장교' in combined_text or '부사관' in combined_text or '준사관' in combined_text:
        sc_list.append('soldier_family')
    
    if '군무원' in combined_text:
        sc_list.append('civilian_military_employee_family')
        
    if '공상' in combined_text or '순직' in combined_text or '전공상' in combined_text:
        # Check context for Military vs Others
        if '군인' in combined_text or '군무원' in combined_text or '장교' in combined_text or '부사관' in combined_text or '호국' in group_name or '군' in foundation:
             sc_list.append('injured_soldier_family')
        elif '경찰' in combined_text or '소방' in combined_text or '공무원' in combined_text:
             sc_list.append('injured_official_family')
        else:
             # Default fallback if context is unclear? Or both?
             # If "National Merit" is also there, maybe it covers it? 
             # Let's assume Soldier if "Hoguk" or "Military" keywords found above. 
             # If completely generic "Injured", maybe add both or a generic tag?
             # For now, let's play safe and check if '보훈' implies official?
             # Let's add 'injured_official_family' as a catch-all if not Military? 
             # Actually, Lotte is strict. 
             # If strictly "Patriot" (National Merit), that's separate.
             # Let's default to injured_official_family if no military keyword.
             sc_list.append('injured_official_family') 
             pass

    # 3. Personal Status
    if '장애' in combined_text and '가정' not in combined_text: # Simple heuristic
        sc_list.append('disabled')
    elif '장애' in combined_text:
        # If '장애' exists but might be family, we handled 'disabled_family' above. 
        # But safeguards:
        sc_list.append('disabled') 

    if '자립' in combined_text or '보호종료' in combined_text:
        sc_list.append('foster_care')
    if '예체능' in combined_text or '예술' in combined_text or '체육' in combined_text:
        sc_list.append('arts_sports')
    if '창업' in combined_text:
        sc_list.append('entrepreneur')
    if '중소기업' in combined_text:
        sc_list.append('sme_employee')
    if '재직자' in combined_text: # Added based on instruction's implied intent for '재직자'
        sc_list.append('sme_employee')
    if '건설' in combined_text:
        sc_list.append('construction') # Frontend ID: construction
        
    # Seoul Learn Mentor (New)
    if '서울런' in combined_text and '멘토' in combined_text:
        sc_list.append('seoul_learn_mentor')
        
    # Housing Support (New)
    if 'LH' in combined_text or '임대주택' in combined_text or '토지주택공사' in combined_text:
        sc_list.append('lh_housing')

    # Specific Jobs (New)
    if '택배' in combined_text:
        sc_list.append('delivery_driver')
    if '환경미화원' in combined_text:
        sc_list.append('sanitation_worker')

    # Patriot Descendants (New)
    if '독립유공자' in combined_text:
         sc_list.append('descendant_patriot')

    # Graduate School Handling
    # If "graduate school" is explicitly mentioned for target
    if '대학원' in combined_text and ('석사' in combined_text or '박사' in combined_text):
        # We can append 'grad_school' to school type if needed, or handle in overrides
        pass # Handle in specific naming override or below logic

    # Military (New)
    if '군필' in combined_text or '면제자' in combined_text:
        # If scholarship requires "Resolved" (Completed OR Exempt), we add BOTH tags.
        # This way, a user who checks 'military_completed' matches, and a user who checks 'military_exempt' also matches.
        sc_list.append('military_completed')
        sc_list.append('military_exempt')

    # Major Specific (New)
    if '중국어' in combined_text or '중어중문' in combined_text:
         sc_list.append('major_chinese') # Special criteria for Chinese language majors

    # Seoul Scholarship Foundation Overrides (Reading-based Inference)
    # Access raw values early since clean_val variables are defined later
    raw_foundation = str(row.get('foundation', ''))
    
    if '서울' in raw_foundation or '서울' in group_name:
        if '공익' in group_name:
             sc_list.append('public_benefit') # Requires public benefit experience
        
        # Region Logic: If "Seoul based university" is required AND no "OR citizen" clause
        if '서울 소재' in specific_eligibility_text and '서울 시민' not in specific_eligibility_text and '서울시민' not in specific_eligibility_text:
             target_university_region = "'서울'"

    # Fix for "Seoul Hope College Career" (서울희망 대학진로)
    # It allows Income Decile 4 OR Basic Livelihood.
    # If we keep 'basic_livelihood' in sc_list, it becomes a HARD requirement in matching.ts.
    # We must remove strictly restrictive tags if income is sufficient.
    if '서울희망 대학진로' in group_name:
        # Remove tags that would block income-eligible students
        if 'basic_livelihood' in sc_list: sc_list.remove('basic_livelihood')
        if 'second_lowest' in sc_list: sc_list.remove('second_lowest')


    # Other / Track Specific
    if track_tag and '유학' in track_tag:
        # '유학' is not in the main selectable list but might be a hidden criteria or custom. 
        # Keep it as is or remove? User asked about the "Image attached criteria".
        # Let's keep it as a custom tag if needed, but for matching, it won't hit frontend IDs.
        # However, backend matching allows extra tags.
        sc_list.append('study_abroad') # English key for consistency

        
    special_criteria = "NULL"
    if sc_list:
        quoted = [f"'{x}'" for x in sc_list]
        special_criteria = f"ARRAY[{', '.join(quoted)}]"
        
        
    # Other fields
    foundation = clean_val(row.get('foundation'))
    category = clean_val(row.get('category'))
    benefit_type = clean_val(row.get('benefit_type'))
    payment_method = clean_val(row.get('payment_method'))
    payment_period = clean_val(row.get('payment_period'))
    extra_benefits = clean_val(row.get('extra_benefits'))
    target_hashtags = clean_array(row.get('target_hashtags'))
    
    target_description = clean_val(row.get('target_description'))
    # Eligibility text for DB is the specific text + any header? 
    # Or just the full original? 
    # Let's use the specific text to be helpful in the UI.
    eligibility_db = clean_val(specific_eligibility_text) 
    
    selection_count = clean_val(row.get('section_count'))
    application_count = clean_val(row.get('application_count'))
    
    start_date_raw = row.get('application_period')
    end_date_raw = row.get('application_end')
    app_start_val = clean_date(start_date_raw)
    app_end_val = clean_date(end_date_raw)
    
    app_period_str = "NULL"
    if app_start_val != "NULL" and app_end_val != "NULL":
       s = app_start_val.replace("'","")
       e = app_end_val.replace("'","")
       app_period_str = f"'{s} ~ {e}'"
       
    application_method = clean_val(row.get('application_method'))
    required_documents = clean_val(row.get('required_documents'))
    description = clean_val(row.get('description'))
    contact = clean_val(row.get('contact'))
    link = clean_val(row.get('link'))
    
    target_grade_str = f"'{target_grade}'"
    target_major_category = f"'{target_major_category_val}'"
    
    # Defaults
    target_gender = "'any'"
    target_school_type = "'university,college'" # Broaden default to include colleges
    
    # Refine School Type based on text
    # Default is 'university,college'
    
    # Use Regex to find '대학' that is NOT '전문대학' to confirm University intent
    # Matches '대학' not preceded by '전문'
    has_uni_keyword = re.search(r'(?<!전문)대학', combined_text) is not None
    
    is_uni = '4년제' in combined_text or '대학교' in combined_text or '대학생' in combined_text or has_uni_keyword
    is_college = '전문대' in combined_text
    
    # If both defined clearly, keeping default is fine.
    # We only restrict if one is present distinctively WITHOUT the other.
    
    if is_uni and not is_college:
        target_school_type = "'university'"
    elif is_college and not is_uni:
        # Check if "대학" is used generically? "대학" often implies Uni. 
        # But if ONLY "전문대" is mentioned explicitly and NO "4년제"/"대학교", safe to assume College.
        # However, "대학생" matches is_uni. "전문대학생" matches is_college.
        # "대학/전문대학" matches both.
        target_school_type = "'college'"
    elif '대학원' in combined_text:
        # If it's a graduate scholarship, maybe we need 'graduate'? 
        # But looking at options, usually 'university,college' are undergraduate.
        # If it is strictly for graduate, maybe we should leave it or add 'graduate' if schema supports.
        # For now, let's just respect the undergraduate splits.
        # GKS Graduate has '대학원'.
        pass
    target_region = "'전국'"
    min_prev_semester_credits = 12
    target_nationality = "'Korea'"
    # Only set to foreigner if '외국인' is explicit, or 'GKS' implies it WITHOUT Korean requirement.
    # We remove '초청' because '정부초청' can be for Koreans going abroad (e.g. Swiss Govt).
    if '외국인' in combined_text:
         target_nationality = "'foreigner'"
    elif 'GKS' in group_name and '대한민국' not in combined_text and '한국 국적' not in combined_text:
         # Fallback for GKS if it doesn't say 'Foreigner' but also doesn't require Korean citizenship
         target_nationality = "'foreigner'"

    # AI Graduate Scholarship override
    if '대학원' in name and 'AI' in name:
        target_school_type = "'grad_school'"

    # Strong override: If text prohibits dual citizenship but requires Korean, it's Korea.
    # If text says "Korean National", it is Korea.
    if '대한민국 국적' in combined_text or ('한국 국적' in combined_text and '아닌' not in combined_text):
        target_nationality = "'Korea'"
        
     # --- MANUAL JUDGEMENT OVERRIDES ---
    # These are specific fixes where generic logic might fail due to complex negative phrasing (e.g. "Not Dual Citizen including Korean")
    
    if '외국인우수교환학생지원' in name or 'GKS' in name and '외국인' in name:
         target_nationality = "'foreigner'"
         
    if '한일교육교류협력사업' in name:
         target_nationality = "'foreigner'"
    target_parents_region = "'전국'"
    target_university_region = "'전국'"
    target_high_school_region = "'전국'"
    max_csat_grade = 9
    max_school_grade = 9
    
    target_enrollment_status = "'enrolled'"
    if track_tag and ('신입' in track_tag or '신규' in track_tag):
         target_enrollment_status = "'enrolled,expected'"
    elif "신입" in combined_text or "예정" in combined_text:
        target_enrollment_status = "'enrolled,expected'"
        
    # Graduation logic
    if '졸업자' in combined_text or '졸업예정' in combined_text:
        # If explicitly targeting graduates or those about to graduate
        # We append 'graduated' if not already covering 'expected' well enough. 
        # But usually 'expected' is enrolled. 'graduated' is distinct.
        target_enrollment_status = target_enrollment_status.replace("'", "")
        if 'graduated' not in target_enrollment_status:
             target_enrollment_status += ",graduated"
        if 'expected' not in target_enrollment_status and '예정' in combined_text:
             target_enrollment_status += ",expected"
        target_enrollment_status = f"'{target_enrollment_status}'"

    # Target Uni
    target_universities_val = row.get('target_university')
    target_universities = clean_val(target_universities_val)
    # Target Uni
    target_universities_val = row.get('target_university')
    target_universities = clean_val(target_universities_val)
    
    # Special Handling for K-Nuclear (K-원전) based on user image
    if 'K-원전' in group_name or 'K-원전' in name:
         target_universities = "'서울대학교,한양대학교,경희대학교,조선대학교,세종대학교,전북대학교,제주대학교,위덕대학교,동국대학교,경북대학교,중앙대학교,단국대학교'"
    
    # GKS Exchange (foreign) University List from Image
    if 'GKS' in group_name and '교환' in group_name:
         # Combined list from Type A, B, UIC, Associate (Deduplicated)
         # Note: using substrings for matching simplicity in DB if needed, but here full names.
         gks_unis = [
            "건국대학교","경희대학교","고려대학교","국민대학교","단국대학교","덕성여자대학교","동국대학교","명지대학교","서강대학교","서경대학교","서울과학기술대학교","서울대학교","서울시립대학교","성균관대학교","성신여자대학교","숙명여자대학교","신한대학교","아주대학교","연세대학교","울산과학기술원","이화여자대학교","인하대학교","인천대학교","중앙대학교","포항공과대학교","한국공학대학교","한국외국어대학교","한성대학교","한양대학교","홍익대학교",
            "강원대학교","건양대학교","경북대학교","경상국립대학교","경성대학교","계명대학교","고려대학교(세종)","공주대학교","군산대학교","국립경국대학교","대구대학교","대구가톨릭대학교","대전대학교","동서대학교","동아대학교","목원대학교","배재대학교","부경대학교","부산대학교","부산외국어대학교","선문대학교","세명대학교","순천대학교","순천향대학교","신라대학교","영남대학교","울산대학교","인제대학교","전남대학교","전북대학교","제주대학교","조선대학교","청주대학교","충남대학교","충북대학교","한국기술교육대학교","한국해양대학교","한남대학교","호서대학교",
            "동의과학대학교","오산대학교","구미대학교","영진전문대학교","전주비전대학교","한국영상대학교","한양여자대학교","호산대학교"
         ]
         target_universities = f"'{','.join(list(set(gks_unis)))}'"
         target_universities = f"'{','.join(list(set(gks_unis)))}'"
    
    # Generic University Extraction from Text (if NULL)
    if target_universities == "NULL":
         # Look for "XX대학교" or "XX대학" in parentheses or explicitly listed
         # Regex for generally likely university names (2+ chars + university/college)
         # Using a slightly restrictive pattern to avoid noise.
         # Found in File 22: (*원광대학교, 원광보건대학교, 전북대학교 특성화캠퍼스, 한국폴리텍V대학교 익산캠퍼스 ...)
         
         # Identify candidates
         uni_matches = re.findall(r'([가-힣A-Za-z0-9]+대학교|[가-힣A-Za-z0-9]+대학)', combined_text)
         
         valid_unis = []
         if uni_matches:
             for u in uni_matches:
                 # Exclude common generic terms
                 if u in ['대학교', '전문대학', '사이버대학', '디지털대학', '관내대학', '소재대학', '4년제대학', '4년제대학교', '일반대학', '일반대학교', '전국대학', '전국대학교']:
                     continue
                 if '서울' in u and len(u) < 4: continue # Too vague like "서울대학"? No, Seoul National is 서울대학교.
                 
                 valid_unis.append(u)
         
         if valid_unis:
             # De-duplicate
             valid_unis = list(set(valid_unis))
             target_universities = f"'{','.join(valid_unis)}'"
         else:
             target_universities = "'무관'"
         
    # Region Logic Refinement
    # Default is '전국'

    # Parent Region for JDC (Jeju)
    if '제주' in combined_text and ('자녀' in combined_text or '부모' in combined_text or '환경미화원' in combined_text):
        target_parents_region = "'제주'"

    if '충남' in combined_text or '충청남도' in combined_text:
        target_parents_region = "'충남'"

    # Seoul Region Override (Late Application)
    if '서울' in foundation or '서울' in group_name:
        if '서울 소재' in specific_eligibility_text and '서울 시민' not in specific_eligibility_text and '서울시민' not in specific_eligibility_text:
             target_university_region = "'서울'"

    if '강원' in combined_text:
        target_university_region = "'강원'"
        # Check for specific Wonju logic
        if '원주' in combined_text:
            if '제외' in combined_text or '아닌' in combined_text or '불가' in combined_text or '제한' in combined_text:
                # "Gangwon (Excl Wonju)" -> Use exclusion syntax
                target_university_region = "'강원,!원주'" 
            else:
                 # "Wonju Only" or "Wonju based"
                 target_university_region = "'원주'"
    elif '대구' in combined_text or '경북' in combined_text:
        # Check for Daegu / Gyeongbuk logic
        regions = []
        if '대구' in combined_text: regions.append('대구')
        if '경북' in combined_text: regions.append('경북')
        
        if '제외' in combined_text or '아닌' in combined_text or '불가' in combined_text or '제한' in combined_text:
             # Exclusion logic (only supports single exclusion well in this simplistic block, but let's assume !Daegu)
             if '대구' in combined_text: target_university_region = "'!대구'"
             # If exclude Gyeongbuk? Rare case for now.
        else:
             # Inclusion: Join with comma
             target_university_region = f"'{','.join(regions)}'"

    if '광주' in combined_text or '광주광역시' in combined_text:
        if '거주' in combined_text or '주민' in combined_text or '행정복지센터' in combined_text:
             target_region = "'광주'"
             
    # High School Region Logic
    if track_tag and '성적우수' in track_tag and '부천' in combined_text and '고등' in combined_text:
        # "Bucheon High School Grad" -> Bucheon is in Gyeonggi
        target_high_school_region = "'경기'" # Or specific Bucheon if supported
    
    if '고등' in combined_text:
         # Generic High School Region Inference
         if '부천' in combined_text: target_high_school_region = "'경기'"
         if '서울' in combined_text and '소재 고등' in combined_text: target_high_school_region = "'서울'"
         if '광주' in combined_text and '소재 고등' in combined_text: target_high_school_region = "'광주'"

    
    # Special Fix for Bucheon High School
    if '부천' in group_name:
         target_high_school_region = "'부천'"
         
    # Special Fix for Kimje (File 15)
    if '김제' in group_name:
         target_region = "'김제'"
         target_parents_region = "'김제'"
         target_high_school_region = "'김제'"
         target_universities = "'무관'"
         target_major_category = "'무관'"
         selection_count = "'위원회 심사 후 결정'"
         
         # Remove 'sme_employee' if '이/통장' (Village Head)
         if '이/통장' in name and 'sme_employee' in special_criteria:
             # Manually fix specific list if it was parsed as string representation of list in script
             # But here `special_criteria` is a string suitable for SQL (ARRAY['...'])
             if "'sme_employee'" in special_criteria:
                 special_criteria = special_criteria.replace(", 'sme_employee'", "").replace("'sme_employee', ", "").replace("'sme_employee'", "")
                 
    if '안양' in group_name or '안양' in name:
         target_region = "'안양'"
         target_parents_region = "'안양'"
         target_high_school_region = "'안양'"
         if '재능' in name or '예체능' in name:
             target_major_category = "'무관'"
             target_universities = "'무관'"
             
    # Special Fix for Ansan (File 16 appears to be Ansan, not Anyang)
    if '안산' in group_name or '안산' in name or '안산' in foundation:
         target_region = "'안산'"
         target_parents_region = "'안산'"
         target_high_school_region = "'안산'"
         selection_count = "'위원회 심사 후 결정'" # Default as it was null
         
         # Special handling for Ansan tracks
         # "Half-tuition": name contains '반값'
         # "Special (Chamber of Commerce)": '상공회의소'

    # Special Fix for Iksan (File 21)
    if '익산' in group_name or '익산' in name or '익산' in foundation:
         target_region = "'익산'"
         
         # Check for Parents/Guardian requirement
         if '부모' in combined_text or '보호자' in combined_text:
             target_parents_region = "'익산'"
         else:
             target_parents_region = "'전국'"
         # Iksan generally requires parents to be in Iksan, but High School might be flexible?
         # Iksan High School Logic - Relaxed as per user request
         target_high_school_region = "'전국'"
         if '관내 고교' in combined_text or '관내 고등' in combined_text or '익산 소재 고등' in combined_text:
              target_high_school_region = "'익산'"



         has_inside = '관내' in name or ('관내' in combined_text and '대학' in combined_text)
         has_outside = '관외' in name or ('관외' in combined_text and '대학' in combined_text)
         
         if has_inside and has_outside:
             target_university_region = "'전국'"
         elif has_inside:
             target_university_region = "'익산'"
         elif has_outside:
             target_university_region = "'!익산'"

    # Generic 'Sudogwon' (Metropolitan) match
    if '수도권' in combined_text:
         # Check if it implies target uni region
         if '소재' in combined_text or '진학' in combined_text or '대학' in combined_text:
              target_university_region = "'서울,경기,인천'"
    
    return {
        "group_name": group_name, "name": name, "foundation": foundation, "category": category,
        "benefit_type": benefit_type, "payment_method": payment_method, "payment_period": payment_period,
        "extra_benefits": extra_benefits, "target_hashtags": target_hashtags, "target_description": target_description,
        "eligibility": eligibility_db, "selection_count": selection_count, "application_count": application_count,
        "app_period_str": app_period_str, "app_start_val": app_start_val, "app_end_val": app_end_val,
        "application_method": application_method, "required_documents": required_documents, "description": description,
        "contact": contact, "link": link, "amount_val": amount_val, "target_grade_str": target_grade_str,
        "min_gpa": min_gpa, "max_income": max_income, "target_gender": target_gender, "target_school_type": target_school_type,
        "target_region": target_region, "target_major_category": target_major_category,
        "min_prev_semester_credits": min_prev_semester_credits, "special_criteria": special_criteria,
        "target_nationality": target_nationality, "target_parents_region": target_parents_region,
        "target_university_region": target_university_region, "target_high_school_region": target_high_school_region,
        "max_csat_grade": max_csat_grade, "max_school_grade": max_school_grade,
        "target_enrollment_status": target_enrollment_status, "target_universities": target_universities
    }

# --- Main ---

files_to_process = [
    ('scholarship24.xlsx', 'data/generated_scholarships_24.sql'),
]



def create_proxy_row_for_kimje(row):
    """Maps shifted columns in scholarship15.xlsx to distinct scholarship entry."""
    name_val = row.get('target_grade')
    
    # Check if name is valid
    if pd.isna(name_val) or str(name_val).strip() == '' or str(name_val) == 'nan':
        return None
        
    new_row = row.copy()
    new_row['name'] = name_val
    new_row['foundation'] = row.get('min_gpa')
    new_row['category'] = row.get('max_income')
    new_row['benefit_type'] = row.get('target_gender')
    new_row['support_detail'] = row.get('target_school_type') # Amount/Benefit Detail
    new_row['payment_period'] = row.get('target_region') # Payment info
    new_row['extra_benefits'] = row.get('min_prev_semester_credits')
    new_row['target_hashtags'] = row.get('special_criteria')
    new_row['target_description'] = row.get('target_nationality')
    new_row['eligibility'] = row.get('target_parents_region')
    new_row['selection_count'] = row.get('target_university_region')
    new_row['application_count'] = row.get('target_high_school_region')
    
    # Dates (Timestamps in Excel)
    new_row['application_period'] = row.get('max_csat_grade')
    new_row['application_end'] = row.get('max_school_grade')
    
    new_row['application_method'] = row.get('target_enrollment_status')
    new_row['required_documents'] = row.get('Unnamed: 38')
    new_row['required_documents'] = row.get('Unnamed: 38')
    new_row['description'] = row.get('target_university')
    # Clear target_university so it doesn't get picked up as 'target_universities' in create_entry_data
    new_row['target_university'] = None
    new_row['contact'] = row.get('Unnamed: 40')
    new_row['link'] = row.get('Unnamed: 41')
    
    new_row['link'] = row.get('Unnamed: 41')
    
    # Clear columns that were used as source but now are mapped elsewhere, to prevent pollution
    new_row['target_grade'] = None
    new_row['target_major_category'] = None
    new_row['section_count'] = None # Clear original left-side count
    
    # Map selection count from target_university_region (which holds "이사회 심사 후 결정")
    # Using hardcoded string if extraction is messy or encoding issues
    # "이사회 심사 후 결정" (Board review) or "위원회 심사 후 결정"?
    # User said "위원회 심사 후 결정" (Committee). The column likely has "이사회..." based on debug.
    # We will use the user's preferred text if acceptable, or the column value if decent.
    # Let's trust the column but if it looks like garbage, we might want to override.
    # But for now, just mapping it correctly by clearing mismatch is step 1.
    val = row.get('target_university_region')
    if pd.isna(val) or str(val).strip() == '':
         new_row['selection_count'] = '위원회 심사 후 결정'
    else:
         new_row['selection_count'] = val
    
    return new_row

for input_file, output_file in files_to_process:
    try:
        df = pd.read_excel(input_file, header=2)
        print(f"Processing {input_file}...")
    except FileNotFoundError:
        print(f"Skipping {input_file} (not found)")
        continue
        
    sql_content = "-- Generated SQL for Scholarship Insertion (v3 - Extracted & Split)\n\n"
    
    for index, row in df.iterrows():
        # Special File 15 Logic: Extract Right Side (Kimje) ONLY (ignoring Left Side as DUPLICATE of 14)
        if input_file in ['scholarship15.xlsx', 'scholarship16.xlsx']:
            proxy_row = create_proxy_row_for_kimje(row)
            if proxy_row is None:
                continue
            entries = parse_sub_tracks(proxy_row)
        elif input_file in ['scholarship17.xlsx', 'scholarship18.xlsx']:
             # Process BOTH Left (Cols 1-20) and Right (Cols 22+)
             entries = []
             
             # Left Side
             if input_file == 'scholarship17.xlsx':
                 left_name = row.get('name')
                 if not (pd.isna(left_name) or str(left_name).strip() == ''):
                     # User request: "scholarship17.xlsx has only 5 scholarships" and manual file excluded '호국장학금'.
                     # '호국장학금' (Row 1 Left) appears to be a duplicate or unwanted.
                     if str(left_name).strip() != '호국장학금':
                         clean_row = row.copy()
                         # Columns to clear (that map to Right side data)
                         cols_to_clear = [
                             'target_grade', 'min_gpa', 'max_income', 'target_gender', 
                             'target_school_type', 'target_region', 'target_major_category',
                             'min_prev_semester_credits', 'special_criteria', 'target_nationality',
                             'target_parents_region', 'target_university_region', 
                             'target_high_school_region', 'max_csat_grade', 'max_school_grade',
                             'target_enrollment_status', 'target_university' 
                         ]
                         
                         for c in cols_to_clear:
                             if c in clean_row:
                                 clean_row[c] = None
                                 
                         entries.extend(parse_sub_tracks(clean_row))
                 
             # Right Side
             proxy_row = create_proxy_row_for_kimje(row)
             if proxy_row is not None:
                 entries.extend(parse_sub_tracks(proxy_row))
                 
             if not entries:
                 continue
        else:
            if pd.isna(row.get('name')) or str(row.get('name')).strip() == '':
                continue
            entries = parse_sub_tracks(row)
        
        # Post-Process: Split logic for scholarships with "Seoul University OR (Seoul Citizen + Non-Seoul University)" requirement.
        # Targets: Seoul Hope College Career, Independent Patriot Descendants, Seoul Virtuous Cycle Talent
        final_entries = []
        target_split_keywords = ['서울희망 대학진로', '독립유공자 후손', '서울선순환인재']
        
        for e in entries:
            # Check if this is the target scholarship (using name match)
            # Remove existing quotes for checking
            e_name = e['name'].strip("'")
            
            is_target = any(keyword in e_name for keyword in target_split_keywords)
            
            if is_target:
                # Entry 1: Seoul University Student
                # Logic: target_university_region = '서울', target_parents_region = '전국' (or whatever default)
                e1 = e.copy()
                e1['target_university_region'] = "'서울'"
                e1['name'] = f"'{e_name} (서울 소재 대학)'"
                # Ensure no conflict with parents region if previously set
                # e1['target_parents_region'] = "'전국'" 
                
                # Entry 2: Seoul Citizen's Child in Non-Seoul University
                # Logic: target_university_region = '!서울', target_parents_region = '서울'
                e2 = e.copy()
                e2['target_university_region'] = "'!서울'" # Must NOT be Seoul University
                e2['target_parents_region'] = "'서울'"
                e2['name'] = f"'{e_name} (서울 시민 자녀 - 비서울 대학)'"
                
                final_entries.extend([e1, e2])
            
            # Special Logic for Songpa (scholarship18)
            # "서울에서 송파구 거주 및 한국 체육대학교 재학생을 선발기준에서 두고 있기 때문에 두개로 분류해야할거 같고"
            elif '송파구인재육성장학재단' in e_name:
                # Entry 1: Songpa Residents (General)
                # target_parents_region = '송파' (or target_region = '송파')
                e1 = e.copy()
                e1['target_parents_region'] = "'송파'" # User said "Songpa resident"
                e1['target_region'] = "'송파'" # Usually mapped to target_region if student residency
                e1['name'] = f"'{e_name} (송파구 거주자)'"
                
                # Entry 2: Korea National Sport University (Hanchedae)
                # target_university = '한국체육대학교'
                e2 = e.copy()
                e2['target_universities'] = "'한국체육대학교'"
                e2['name'] = f"'{e_name} (한국체육대학교)'"
                # The prompt implies they might be distinct, but checking if Hanchedae students ALSO need to be Songpa residents?
                # "송파구 거주 및 한국 체육대학교 재학생" -> "Songpa Resident AND Hanchedae Student" usually ONE group?
                # But user said "두개로 분류해야할거 같고" (I think we should classify them into TWO).
                # So implies Group A: Songpa Residents, Group B: Hanchedae Students (regardless of residency? or maybe also Songpa?)
                # Usually purely university based scholarships don't restrict region as strictly as general resident ones.
                # I will create two.
                
                final_entries.extend([e1, e2])

            # Special Logic for Eunpyeong (scholarship18)
            # "이 장학금은 은평구에 사는 사람들만을 대상으로 하는거거든 target_region 필터링 로직을 좀 잡아야될거 같은데"
            elif '은평구민장학생' in e_name:
                e_mod = e.copy()
                e_mod['target_region'] = "'은평'" # Force Eunpyeong
                e_mod['target_parents_region'] = "'은평'" # Force Eunpyeong for safety
                final_entries.append(e_mod)
                
            # Generic Split for "Self OR Guardian/Parent Address" (e.g. Iksan)
            # If target_region is Specific AND target_parents_region is Specific AND "OR" is keyword
            # We assume it implies AND logic in standard schema, so we split to allow OR matching.
            elif ('본인 또는 보호자' in e['eligibility'] or '본인 또는 부모' in e['eligibility']) and e['target_region'] != "'전국'" and e['target_parents_region'] != "'전국'":
                 # Entry A: Self Residence
                 e_self = e.copy()
                 e_self['target_parents_region'] = "'전국'" # Clear parent requirement
                 e_self['name'] = f"'{e_name} (본인 주소)'"
                 
                 # Entry B: Parent Residence
                 e_parent = e.copy()
                 e_parent['target_region'] = "'전국'" # Clear self requirement
                 e_parent['name'] = f"'{e_name} (보호자 주소)'"
                 
                 final_entries.extend([e_self, e_parent])

            else:
                final_entries.append(e)
        
        for e in final_entries:
            sql = f"""
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
    {e['group_name']}, {e['name']}, {e['foundation']}, {e['category']}, {e['benefit_type']}, {e['payment_method']}, {e['payment_period']},
    {e['extra_benefits']}, {e['target_hashtags']}, {e['target_description']}, {e['eligibility']}, {e['selection_count']},
    {e['application_count']}, {e['app_period_str']}, {e['app_start_val']}, {e['app_end_val']},
    {e['application_method']}, {e['required_documents']}, {e['description']}, {e['contact']}, {e['link']}, {e['amount_val']},
    {e['target_grade_str']}, {e['min_gpa']}, {e['max_income']}, {e['target_gender']}, {e['target_school_type']},
    {e['target_region']}, {e['target_major_category']}, {e['min_prev_semester_credits']}, {e['special_criteria']},
    {e['target_nationality']}, {e['target_parents_region']}, {e['target_university_region']}, {e['target_high_school_region']},
    {e['max_csat_grade']}, {e['max_school_grade']}, {e['target_enrollment_status']}, {e['target_universities']}
);
"""
            sql_content += sql
            
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(sql_content)
        
    print(f"SQL file generated successfully at {output_file}")
