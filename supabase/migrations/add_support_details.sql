-- Add support_details column for detailed amount information
ALTER TABLE scholarships 
ADD COLUMN IF NOT EXISTS support_details TEXT; -- 상세 지원 내용 (긴 텍스트)
