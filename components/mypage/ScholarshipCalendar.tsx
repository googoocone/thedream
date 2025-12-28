'use client'

import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { createClient } from '@/utils/supabase/client';
import { Scholarship } from '@/utils/matching';
import Link from 'next/link';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function ScholarshipCalendar() {
    const [value, onChange] = useState<Value>(new Date());
    const [scholarships, setScholarships] = useState<Scholarship[]>([]);
    const [selectedDateScholarships, setSelectedDateScholarships] = useState<Scholarship[]>([]);
    const supabase = createClient();

    useEffect(() => {
        const fetchScholarships = async () => {
            const { data } = await supabase
                .from('scholarships')
                .select('*');

            if (data) {
                setScholarships(data);
            }
        };

        fetchScholarships();
    }, [supabase]);

    // Helper to parse period string "YYYY-MM-DD ~ YYYY-MM-DD"
    const parsePeriod = (periodStr: string | null) => {
        if (!periodStr) return null;
        const parts = periodStr.split('~').map(s => s.trim());
        if (parts.length !== 2) return null;
        return { start: new Date(parts[0]), end: new Date(parts[1]) };
    };

    useEffect(() => {
        if (value instanceof Date) {
            const dateStr = value.toISOString().split('T')[0];
            // Filter scholarships that are active on this date (within period) OR end on this date
            const filtered = scholarships.filter(s => {
                if (s.application_end === dateStr) return true;

                const period = parsePeriod(s.application_period);
                if (period) {
                    const current = new Date(dateStr);
                    // Reset hours for comparison
                    current.setHours(0, 0, 0, 0);
                    period.start.setHours(0, 0, 0, 0);
                    period.end.setHours(0, 0, 0, 0);
                    return current >= period.start && current <= period.end;
                }
                return false;
            });
            setSelectedDateScholarships(filtered);
        }
    }, [value, scholarships]);

    const tileContent = ({ date, view }: { date: Date, view: string }) => {
        if (view === 'month') {
            const dateStr = date.toISOString().split('T')[0];
            const current = new Date(dateStr);
            current.setHours(0, 0, 0, 0);

            // Find all active scholarships for this date
            const activeScholarships = scholarships.filter(s => {
                const period = parsePeriod(s.application_period);
                if (period) {
                    period.start.setHours(0, 0, 0, 0);
                    period.end.setHours(0, 0, 0, 0);
                    return current >= period.start && current <= period.end;
                }
                return s.application_end === dateStr;
            });

            // Group by group_name or id to count unique "items"
            const uniqueGroups = new Set(activeScholarships.map(s => s.group_name || s.id));

            if (uniqueGroups.size > 0) {
                return (
                    <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-0.5 px-1">
                        {Array.from(uniqueGroups).slice(0, 4).map((groupId, i) => {
                            // Check if any scholarship in this group has a deadline today
                            const isDeadline = activeScholarships.some(s =>
                                (s.group_name === groupId || s.id === groupId) && s.application_end === dateStr
                            );

                            return (
                                <div
                                    key={groupId}
                                    className={`w-1 h-1 rounded-full ${isDeadline ? 'bg-red-500' : 'bg-[#0984E3]'}`}
                                ></div>
                            );
                        })}
                        {uniqueGroups.size > 4 && (
                            <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                        )}
                    </div>
                );
            }
        }
        return null;
    };

    // Group selectedDateScholarships for display
    const groupedScholarships = selectedDateScholarships.reduce((acc, curr) => {
        const key = curr.group_name || curr.id;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(curr);
        return acc;
    }, {} as Record<string, Scholarship[]>);

    return (
        <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 bg-white p-6 rounded-[20px] shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">장학금 달력 📅</h3>
                <div className="calendar-container">
                    <Calendar
                        onChange={onChange}
                        value={value}
                        tileContent={tileContent}
                        calendarType="gregory"
                        formatDay={(locale, date) => date.getDate().toString()}
                        className="w-full border-none !font-sans"
                        tileClassName="relative h-12 text-sm flex items-center justify-center rounded-lg hover:bg-gray-50 focus:bg-[#0984E3] focus:text-white"
                    />
                </div>
                <style jsx global>{`
                    .react-calendar {
                        width: 100%;
                        background: white;
                        border: none;
                        font-family: inherit;
                    }
                    .react-calendar__tile {
                        font-size: 0.9rem;
                        padding: 0.5em 0.3em;
                    }
                    .react-calendar__tile--active {
                        background: transparent !important;
                        color: inherit !important;
                        border: 1px solid #e5e7eb !important;
                        border-radius: 8px;
                        font-weight: bold;
                    }
                    .react-calendar__tile--now {
                        background: #e6f3fb;
                        border-radius: 8px;
                        color: #0984E3;
                    }
                    .react-calendar__navigation button {
                        font-size: 1rem;
                        font-weight: bold;
                    }
                    .react-calendar__month-view__weekdays {
                        font-size: 0.8rem;
                        font-weight: normal;
                        color: #a0aec0;
                        text-decoration: none;
                    }
                    .react-calendar__month-view__weekdays__weekday abbr {
                        text-decoration: none;
                    }
                    /* Dim neighboring month dates */
                    .react-calendar__month-view__days__day--neighboringMonth {
                        opacity: 0.3;
                    }
                `}</style>
            </div>

            <div className="flex-1 bg-white p-6 rounded-[20px] shadow-sm border border-gray-100 h-[420px] flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex-shrink-0">
                    {value instanceof Date ? `${value.getMonth() + 1}월 ${value.getDate()}일` : '선택된 날짜'}
                </h3>

                <div className="space-y-4 overflow-y-auto flex-1 pr-2 custom-scrollbar">
                    {Object.keys(groupedScholarships).length > 0 ? (
                        Object.values(groupedScholarships).map(group => {
                            const scholarship = group[0]; // Display info from the first one
                            const isGroup = group.length > 1;
                            const isDeadline = value instanceof Date && group.some(s => s.application_end === value.toISOString().split('T')[0]);

                            // Use group_name if available, otherwise name
                            const displayName = scholarship.group_name || scholarship.name;

                            return (
                                <Link
                                    key={scholarship.id}
                                    href={`/scholarships/${scholarship.id}`}
                                    className={`block p-4 rounded-xl border transition-all ${isDeadline
                                        ? 'border-red-200 bg-red-50 hover:border-red-300'
                                        : 'border-gray-100 hover:border-[#0984E3] hover:shadow-md'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex gap-2">
                                            <span className="text-xs font-bold text-[#0984E3] bg-[#0984E3]/10 px-2 py-1 rounded">
                                                {scholarship.category === 'private' ? '민간' : '공공'}
                                            </span>
                                            {isDeadline && (
                                                <span className="text-xs font-bold text-red-500 bg-red-100 px-2 py-1 rounded">
                                                    마감일
                                                </span>
                                            )}
                                            {isGroup && (
                                                <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded">
                                                    +{group.length - 1}개 옵션
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-xs text-gray-400">{scholarship.foundation}</span>
                                    </div>
                                    <h4 className="font-bold text-gray-900 line-clamp-1 mb-1">{displayName}</h4>
                                    <div className="text-sm text-gray-500">
                                        {scholarship.amount || '금액 미정'}
                                    </div>
                                    <div className="text-xs text-gray-400 mt-2">
                                        {scholarship.application_period}
                                    </div>
                                </Link>
                            );
                        })
                    ) : (
                        <div className="text-center py-20 text-gray-400">
                            <div className="text-4xl mb-2">😴</div>
                            <p>이 날 마감되는 장학금이 없어요.</p>
                        </div>
                    )}
                </div>
                <style jsx>{`
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 6px;
                        height: 6px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: #f1f1f1;
                        border-radius: 4px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: #ccc;
                        border-radius: 4px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                        background: #999;
                    }
                `}</style>
            </div>
        </div>
    );
}
