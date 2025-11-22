import React from "react";

interface ScholarshipCardProps {
    dDay: string;
    title: string;
    location: string;
    tags: string[];
    amount: string;
}

export default function ScholarshipCard({
    dDay,
    title,
    location,
    tags,
    amount,
}: ScholarshipCardProps) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-between h-full relative overflow-hidden group">
            {/* Heart Icon (Placeholder) */}
            <button className="absolute top-6 right-6 text-gray-300 hover:text-red-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </button>

            <div className="space-y-4">
                <span className="inline-block bg-[#FF6B6B] text-white text-xs font-bold px-3 py-1 rounded-full">
                    {dDay}
                </span>

                <div className="space-y-1">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-[var(--primary)] transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-500">{location}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-50 flex justify-end items-center">
                <span className="text-xl font-bold text-gray-900">{amount}</span>
            </div>
        </div>
    );
}
