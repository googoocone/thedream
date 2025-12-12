import { NextRequest, NextResponse } from 'next/server';
import { searchSchools } from '@/utils/careerNetApi';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
    const type = (searchParams.get('type') as 'univ' | 'high') || 'univ';

    if (!query) {
        return NextResponse.json({ schools: [] });
    }

    try {
        const schools = await searchSchools(query, type);
        return NextResponse.json({ schools });
    } catch (error) {
        console.error('Error fetching schools:', error);
        return NextResponse.json({ error: 'Failed to fetch schools' }, { status: 500 });
    }
}
