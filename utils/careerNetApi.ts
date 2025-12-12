const API_KEY = process.env.NEXT_PUBLIC_CAREERNET_API_KEY;
const BASE_URL = 'https://www.career.go.kr/cnet/openapi/getOpenApi';

export async function searchSchools(keyword: string, type: 'univ' | 'high' = 'univ') {
    if (!API_KEY) {
        console.error('CareerNet API Key is missing');
        return [];
    }

    const gubun = type === 'high' ? 'high_list' : 'univ_list';

    const params = new URLSearchParams({
        apiKey: API_KEY,
        svcType: 'api',
        svcCode: 'SCHOOL',
        contentType: 'json',
        gubun: gubun,
        searchSchulNm: keyword,
    });

    try {
        const response = await fetch(`${BASE_URL}?${params.toString()}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        if (data.dataSearch && data.dataSearch.content) {
            return data.dataSearch.content.map((item: any) => ({
                name: item.schoolName,
                address: item.adres,
                link: item.link,
                region: item.region,
                totalCount: item.totalCount,
                estType: item.estType, // 설립유형 (사립/국립/공립)
                schoolGubun: item.schoolGubun // 학교구분 (대학교/전문대학 등)
            }));
        }
        return [];
    } catch (error) {
        console.error('Error fetching schools:', error);
        return [];
    }
}

export async function searchMajors(keyword: string) {
    if (!API_KEY) {
        console.error('CareerNet API Key is missing');
        return [];
    }

    const params = new URLSearchParams({
        apiKey: API_KEY,
        svcType: 'api',
        svcCode: 'MAJOR',
        contentType: 'json',
        gubun: 'univ_list', // 대학교 학과 정보
        searchTitle: keyword,
    });

    try {
        const response = await fetch(`${BASE_URL}?${params.toString()}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        if (data.dataSearch && data.dataSearch.content) {
            return data.dataSearch.content.map((item: any) => ({
                name: item.majorName, // 학과명
                univ: item.university, // 개설대학
                category: item.lClass, // 대계열
                subCategory: item.mClass, // 중계열
            }));
        }
        return [];
    } catch (error) {
        console.error('Error fetching majors:', error);
        return [];
    }
}
