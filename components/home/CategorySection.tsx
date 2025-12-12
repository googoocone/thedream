import Link from 'next/link'

const categories = [
    {
        id: 'high_school',
        label: '고등학생',
        subLabel: 'High School',
        emoji: '🏫',
        href: '/scholarships?edu=high_school',
        color: 'bg-green-50 text-green-600',
        count: '45+'
    },
    {
        id: 'university',
        label: '대학생',
        subLabel: 'University',
        emoji: '🎓',
        href: '/scholarships?edu=university',
        color: 'bg-blue-50 text-blue-600',
        count: '120+'
    },

    {
        id: 'graduate',
        label: '대학원생',
        subLabel: 'Graduate',
        emoji: '📜',
        href: '/scholarships?edu=grad_school', // Using grad_school to match DB likely
        color: 'bg-purple-50 text-purple-600',
        count: '30+'
    },
    {
        id: 'vulnerable',
        label: '사회배려계층',
        subLabel: 'Social Support',
        emoji: '❤️',
        href: '/scholarships?tag=social_support', // Need to handle tag filtering
        color: 'bg-orange-50 text-orange-600',
        count: '50+'
    },
    {
        id: 'arts_sports',
        label: '예체능',
        subLabel: 'Arts & Sports',
        emoji: '🎨',
        href: '/scholarships?major=arts_sports',
        color: 'bg-pink-50 text-pink-600',
        count: '15+'
    },
    {
        id: 'startup',
        label: '창업/취업',
        subLabel: 'Career',
        emoji: '🚀',
        href: '/scholarships?tag=startup',
        color: 'bg-indigo-50 text-indigo-600',
        count: '25+'
    }
]

export default function CategorySection() {
    return (
        <section className="w-full bg-gray-50 py-16">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            어떤 장학금을 찾고 계신가요?
                        </h2>
                        <p className="text-gray-500">
                            나에게 해당하는 카테고리를 선택해보세요
                        </p>
                    </div>
                    <Link
                        href="/scholarships"
                        className="text-[var(--primary)] font-medium hover:underline flex items-center gap-1"
                    >
                        전체보기 <span>→</span>
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={category.href}
                            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col items-center text-center group"
                        >
                            <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                                {category.emoji}
                            </div>
                            <h3 className="font-bold text-gray-900 mb-1">{category.label}</h3>
                            <span className="text-xs text-gray-400 font-medium mb-3">{category.subLabel}</span>
                            <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-500 group-hover:bg-gray-200 transition-colors">
                                {category.count} 공고
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
