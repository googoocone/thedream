import React from "react";

interface HorizontalScholarshipCardProps {
    dDay: string;
    title: string;
    location: string;
    tags: string[];
    amount: string;
    isLocked?: boolean;
    score?: number;
}

export default function HorizontalScholarshipCard({
    dDay,
    title,
    location,
    tags,
    amount,
    isLocked = false,
    score
}: HorizontalScholarshipCardProps) {
    const isDDay = dDay === "D-Day";
    const isClosed = dDay === "마감";

    // D-Day Badge Color Logic
    let badgeBg = "bg-gray-100 text-gray-600";
    if (isDDay) badgeBg = "bg-[#FF6B6B] text-white";
    else if (isClosed) badgeBg = "bg-gray-200 text-gray-400";
    else if (dDay.startsWith("D-")) badgeBg = "bg-[#FF9F43] text-white";
    else if (dDay === "상시") badgeBg = "bg-[#0984E3] text-white";

    return (
        <div className={`w-full bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 transition-all duration-200 group flex flex-col md:flex-row md:items-center gap-4 md:gap-6 relative overflow-hidden ${!isLocked ? 'hover:shadow-md hover:border-[#0984E3]/30 cursor-pointer' : 'cursor-default'}`}>

            {/* Locked Overlay */}
            {isLocked && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/10 backdrop-blur-[2px]">
                </div>
            )}

            {/* Left: D-Day & Basic Info */}
            <div className="flex-1 flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center">

                {/* D-Day Badge */}
                <div className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-sm font-bold ${badgeBg} shadow-sm relative z-20`}>
                    {dDay}
                </div>

                {/* Title & Foundation */}
                <div className={`flex-1 min-w-0 space-y-1 ${isLocked ? 'blur-sm select-none' : ''}`}>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md truncate max-w-[150px]">
                            {location}
                        </span>
                        {/* Score Badge */}
                        {score !== undefined && (
                            <span className="text-[#0984E3] font-bold bg-blue-50 px-2 py-0.5 rounded-md text-xs">
                                {score}점
                            </span>
                        )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-[#0984E3] transition-colors line-clamp-1 md:line-clamp-1">
                        {title}
                    </h3>

                    {/* Tags - Mobile Only */}
                    <div className="flex md:hidden gap-1.5 flex-wrap mt-2">
                        {tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="bg-gray-50 text-gray-500 px-2 py-0.5 rounded text-[10px] font-medium">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Middle: Tags (Desktop) */}
            <div className={`hidden md:flex gap-2 flex-wrap max-w-[30%] justify-center ${isLocked ? 'blur-sm select-none' : ''}`}>
                {tags.slice(0, 2).map((tag, index) => (
                    <span key={index} className="bg-gray-50 text-gray-500 px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap">
                        #{tag}
                    </span>
                ))}
                {tags.length > 2 && (
                    <span className="text-xs text-gray-400 self-center">+{tags.length - 2}</span>
                )}
            </div>

            {/* Right: Amount & Arrow */}
            <div className="flex items-center justify-between md:justify-end gap-4 min-w-[120px] pt-4 md:pt-0 border-t md:border-t-0 border-gray-50 relative z-20">
                <div className="text-right">
                    <span className="block text-xs text-gray-400 mb-0.5">지원금액</span>
                    <span className="text-lg font-bold text-[#0984E3]">{amount}</span>
                </div>

                <div className={`w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center transition-colors ${!isLocked ? 'group-hover:bg-[#0984E3] group-hover:text-white' : 'text-gray-300'}`}>
                    {isLocked ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    )}
                </div>
            </div>
        </div>
    );
}
