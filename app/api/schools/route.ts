import { NextRequest, NextResponse } from 'next/server';
import { XMLParser } from 'fast-xml-parser';

const CAREERNET_API_URL = 'http://www.career.go.kr/cnet/openapi/getOpenApi';
const API_KEY = process.env.CAREERNET_API_KEY;

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type') || 'univ'; // 'univ' or 'high'
    const query = searchParams.get('query');

    if (!query) {
        return NextResponse.json({ schools: [] });
    }

    if (!API_KEY) {
        console.warn('CAREERNET_API_KEY is not set. Using fallback.');
        // Return 200 with empty schools to trigger frontend fallback gracefully
        // without causing a 500 network error in the console.
        return NextResponse.json({ schools: null, warning: 'API Key missing' });
    }

    try {
        let url = '';
        if (type === 'high') {
            url = `${CAREERNET_API_URL}?apiKey=${API_KEY}&svcType=api&svcCode=SCHOOL&contentType=xml&gubun=high_list&searchSchulNm=${encodeURIComponent(query)}`;
        } else {
            url = `${CAREERNET_API_URL}?apiKey=${API_KEY}&svcType=api&svcCode=SCHOOL&contentType=xml&gubun=univ_list&searchSchulNm=${encodeURIComponent(query)}`;
        }

        const response = await fetch(url);
        const xmlText = await response.text();

        const parser = new XMLParser();
        const jsonObj = parser.parse(xmlText);

        const content = jsonObj.dataSearch?.content;

        let schools: { name: string, address: string }[] = [];

        if (Array.isArray(content)) {
            schools = content.map((item: any) => ({
                name: item.schoolName,
                address: item.adres || ''
            }));
        } else if (content) {
            // Single result
            schools = [{
                name: content.schoolName,
                address: content.adres || ''
            }];
        }

        // Remove duplicates based on name (and maybe address if needed, but name is usually enough for display list)
        // For simplicity, we'll just return the list. The frontend might want to dedup if needed.
        // But actually, different addresses might mean different schools with same name.
        // So we keep them.

        return NextResponse.json({ schools });

    } catch (error) {
        console.error('Error fetching school data:', error);
        return NextResponse.json({ error: 'Failed to fetch school data' }, { status: 500 });
    }
}
