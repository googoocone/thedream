create or replace view scholarships_sorted as
select *,
  case
    when application_end < current_date then 1
    else 0
  end as is_closed
from scholarships;
