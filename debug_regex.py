import re

text = "- 직전학기 성적이 백분율 환산점수 60점 이상 최소 12학점 이상 이수 "
pattern = r'(?:백분위|백분율|환산\s*점수)\s*:?\s*(\d{2,3})'

matches = re.findall(pattern, text)
print(f"Text: {text}")
print(f"Pattern: {pattern}")
print(f"Matches: {matches}")

min_score = 0
if matches:
    scores = [int(x) for x in matches if 60 <= int(x) <= 100]
    if scores:
        min_score = min(scores)

print(f"Min Score: {min_score}")
