import { NextRequest, NextResponse } from 'next/server';
import { searchMajors } from '@/utils/careerNetApi';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');

    if (!query) {
        return NextResponse.json({ majors: [] });
    }

    try {
        const majorsData = await searchMajors(query);
        // Frontend expects string[] of major names
        // De-duplicate names
        const uniqueNames = Array.from(new Set(majorsData.map((m: any) => m.name)));

        return NextResponse.json({ majors: uniqueNames });
    } catch (error) {
        console.error('Error fetching majors:', error);
        return NextResponse.json({ error: 'Failed to fetch majors' }, { status: 500 });
    }
}
