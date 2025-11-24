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
        <div className="w-full max-w-[550px] min-h-[250px] bg-white rounded-[20px] p-7 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative cursor-pointer group flex flex-col justify-between">
            {/* Top Section */}
            <div className="flex justify-between items-start mb-4">
                <span className="inline-flex items-center justify-center bg-[#FF6B6B] text-white text-lg font-bold px-4 py-1.5 rounded-xl">
                    {dDay}
                </span>
                <button className="text-[#FF6B6B] hover:opacity-80 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            {/* Content Container */}
            <div className="space-y-2 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 line-clamp-2">
                    {title}
                </h3>
                <p className="text-gray-500 font-medium">{location}</p>
            </div>

            {/* Bottom Section */}
            <div className="flex justify-between items-end flex-wrap gap-4">
                {/* Tags */}
                <div className="flex gap-2 flex-wrap">
                    {tags.map((tag, index) => (
                        <span key={index} className="bg-gray-50 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Amount */}
                <span className="text-2xl font-bold text-gray-900 whitespace-nowrap">{amount}</span>
            </div>
        </div>
    );
}
