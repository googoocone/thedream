
const getRegion = (addr) => {
    if (!addr) return '';
    if (addr.startsWith('NULL')) return addr.substring(4).split(' ')[0]; // Emulate fix or raw behavior?
    // Let's emulate raw behavior first to see if it fails
    return addr.split(' ')[0];
};

const calculateMatchScore = (user, scholarship) => {
    let score = 0;
    let isDisqualified = false;

    // ... (include previous logic) ...
    // 1.5.7 Target Universities
    if (scholarship.target_universities && scholarship.target_universities !== '무관') {
        const targetUnis = scholarship.target_universities.split(',').map(u => u.trim());
        if (targetUnis.length > 0 && targetUnis[0] !== '') {
            if (!user.school_name) return { score: 0, reason: 'No school name' };
            const isMatch = targetUnis.some(target => user.school_name.includes(target));
            if (!isMatch) return { score: 0, reason: `University mismatch` };
        }
    }

    // 2. Region Matching
    let regionScore = 0;
    let regionConstraintExists = false;
    let regionMatched = false;

    const userRegion = getRegion(user.address);
    const parentsRegion = getRegion(user.parents_address) || userRegion;
    const schoolRegion = getRegion(user.school_address);

    // 2.0 University Region (Strict)
    if (scholarship.target_university_region && scholarship.target_university_region !== '전국') {
        const targets = scholarship.target_university_region.split(',').map(r => r.trim());
        if (!schoolRegion) return { score: 0, reason: 'No school region' };
        if (!targets.some(t => schoolRegion.includes(t))) {
            return { score: 0, reason: `Uni Region mismatch (User: ${schoolRegion}, Targets: ${targets})` };
        }
    }

    // 2.1 Student Region
    if (scholarship.target_region && scholarship.target_region !== '전국') {
        regionConstraintExists = true;
        const targets = scholarship.target_region.split(',').map(r => r.trim());
        console.log(`Checking User Region: '${userRegion}' against Targets: ${targets}`);
        if (targets.some(t => userRegion.includes(t))) {
            regionMatched = true;
        }
    }

    if (regionConstraintExists && !regionMatched) {
        return { score: 0, reason: `Region mismatch (Constraint Exists, UserRegion: ${userRegion})` };
    }

    return { score: 100, reason: 'Matched' };
};

const haedong = {
    name: '2026 해동장학생',
    target_universities: '서울대',
    target_university_region: '서울,전북,경북,부산',
    target_region: '서울,전북,경북,부산'
};

const userGyeonggi = {
    school_name: "서울대학교",
    school_address: "서울 종로구",
    address: "NULL경기 화성시", // Simulating the corrupted data
    parents_address: "전북 김제시" // Parents region matches!
};

console.log('Testing User (Gyeonggi):', calculateMatchScore(userGyeonggi, haedong));
