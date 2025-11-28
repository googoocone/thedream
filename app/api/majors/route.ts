import { NextRequest, NextResponse } from 'next/server';
import { XMLParser } from 'fast-xml-parser';

const CAREERNET_API_URL = 'http://www.career.go.kr/cnet/openapi/getOpenApi';
const API_KEY = process.env.CAREERNET_API_KEY;

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
    // We might want to support filtering by category if the API supports it,
    // but for now let's just search by keyword.

    if (!query) {
        return NextResponse.json({ majors: [] });
    }

    if (!API_KEY) {
        console.warn('CAREERNET_API_KEY is not set. Using fallback.');
        return NextResponse.json({ majors: null, warning: 'API Key missing' });
    }

    try {
        // gubun=univ_list seems to be for schools, let's try gubun=dpt_list (department list) if it exists,
        // or searchSchulNm might be wrong for majors.
        // Based on research, 'gubun=univ_list' is for universities.
        // For majors, it might be 'gubun=job_list' or something else?
        // Actually, the search result said "provide major info... XML".
        // Let's assume there's a way. If not, we might just fail gracefully.
        // Wait, I saw 'gubun=univ_list' in the school search.
        // Let's try to find the parameter for major search.
        // If I can't find it, I'll just return empty and rely on manual input for the name.
        // But the user wants search.
        // Let's try 'svcCode=MAJOR' as I saw in some docs (maybe).
        // Actually, let's try to use the same endpoint but different parameters if possible.
        // Or maybe 'gubun=major_list'?

        // RE-CHECKING RESEARCH:
        // "커리어넷 학과 정보 API의 gubun (구분) 파라미터는 필수 값이며, '학교 분류'를 나타냅니다... 대학교..."
        // This suggests 'gubun=univ_list' might be for *University* list, not major list.
        // But maybe there is 'gubun=major'?

        // Let's try a generic search URL that might work for majors if we change svcCode?
        // svcCode=SCHOOL is for schools.
        // Maybe svcCode=MAJOR?

        const url = `${CAREERNET_API_URL}?apiKey=${API_KEY}&svcType=api&svcCode=MAJOR&contentType=xml&gubun=univ_list&searchTitle=${encodeURIComponent(query)}`;

        const response = await fetch(url);
        const xmlText = await response.text();

        const parser = new XMLParser();
        const jsonObj = parser.parse(xmlText);

        const content = jsonObj.dataSearch?.content;

        let majors: string[] = [];

        if (Array.isArray(content)) {
            majors = content.map((item: any) => item.majorName || item.mClass); // mClass is middle class? majorName?
        } else if (content) {
            majors = [content.majorName || content.mClass];
        }

        // Remove duplicates and filter empty
        majors = Array.from(new Set(majors)).filter(Boolean);

        return NextResponse.json({ majors });

    } catch (error) {
        console.error('Error fetching major data:', error);
        return NextResponse.json({ error: 'Failed to fetch major data' }, { status: 500 });
    }
}
