'use client'

import { useState, useEffect, useRef } from 'react'
import { universities } from '@/data/universities'

interface SchoolSearchProps {
    value: string;
    onChange: (value: string) => void;
    type?: 'univ' | 'high';
    onSelect?: (school: { name: string, address: string }) => void;
}

export default function SchoolSearch({ value, onChange, type = 'univ', onSelect }: SchoolSearchProps) {
    const [query, setQuery] = useState(value || '')
    const [isOpen, setIsOpen] = useState(false)
    const [filteredSchools, setFilteredSchools] = useState<{ name: string, address: string }[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        setQuery(value || '')
    }, [value])

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [wrapperRef])

    const fetchSchools = async (searchQuery: string) => {
        if (!searchQuery) {
            setFilteredSchools([])
            return
        }

        setIsLoading(true)
        try {
            const response = await fetch(`/api/schools?query=${encodeURIComponent(searchQuery)}&type=${type}`)
            if (response.ok) {
                const data = await response.json()
                if (data.schools) {
                    setFilteredSchools(data.schools)
                } else {
                    // Fallback to static list if API returns no structure (or error handled gracefully)
                    fallbackSearch(searchQuery)
                }
            } else {
                // API error, fallback to static list
                fallbackSearch(searchQuery)
            }
        } catch (error) {
            console.error("Failed to fetch schools:", error)
            fallbackSearch(searchQuery)
        } finally {
            setIsLoading(false)
            setIsOpen(true)
        }
    }

    const fallbackSearch = (searchQuery: string) => {
        // Fallback only supports universities for now as we don't have a static high school list
        if (type === 'univ') {
            const filtered = universities
                .filter(school => school.includes(searchQuery))
                .map(school => ({ name: school, address: '' }))
            setFilteredSchools(filtered)
        } else {
            setFilteredSchools([])
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const userInput = e.target.value
        setQuery(userInput)
        onChange(userInput)

        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current)
        }

        if (userInput.length > 0) {
            debounceTimerRef.current = setTimeout(() => {
                fetchSchools(userInput)
            }, 300) // 300ms debounce
        } else {
            setFilteredSchools([])
            setIsOpen(false)
        }
    }

    const handleSelectSchool = (school: { name: string, address: string }) => {
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current)
        }
        setQuery(school.name)
        onChange(school.name)
        if (onSelect) {
            onSelect(school)
        }
        setIsOpen(false)
        setFilteredSchools([]) // Also clear results to be sure
    }

    return (
        <div className="relative" ref={wrapperRef}>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                onFocus={() => {
                    if (query.length > 0) setIsOpen(true)
                }}
                placeholder={type === 'high' ? "고등학교명을 입력하세요" : "대학교명을 입력하세요"}
                className="w-full h-[52px] px-4 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all"
            />
            {isOpen && (filteredSchools.length > 0 || isLoading) && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                    {isLoading ? (
                        <div className="px-4 py-3 text-sm text-gray-500 text-center">
                            검색 중...
                        </div>
                    ) : (
                        filteredSchools.map((school, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => handleSelectSchool(school)}
                                className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors text-sm text-gray-700"
                            >
                                <div className="font-medium">
                                    {school.name.split(query).map((part, i, arr) => (
                                        <span key={i}>
                                            {part}
                                            {i < arr.length - 1 && <span className="text-[var(--primary)] font-bold">{query}</span>}
                                        </span>
                                    ))}
                                </div>
                                {school.address && (
                                    <div className="text-xs text-gray-400 mt-0.5 truncate">
                                        {school.address}
                                    </div>
                                )}
                            </button>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}
