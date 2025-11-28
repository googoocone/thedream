'use client'

import { useState, useEffect, useRef } from 'react'
import { majorCategories } from '@/data/majorCategories'

interface MajorSearchProps {
    value: string;
    onChange: (value: string, largeCategory?: string, middleCategory?: string) => void;
}

export default function MajorSearch({ value, onChange }: MajorSearchProps) {
    const [largeCategory, setLargeCategory] = useState('')
    const [middleCategory, setMiddleCategory] = useState('')
    const [majorName, setMajorName] = useState('')

    const [query, setQuery] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [filteredMajors, setFilteredMajors] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

    // Initialize state from value if possible (simple heuristic)
    useEffect(() => {
        if (value && value !== query) {
            setQuery(value)
        }
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

    const fetchMajors = async (searchQuery: string) => {
        if (!searchQuery) {
            setFilteredMajors([])
            return
        }

        setIsLoading(true)
        try {
            const response = await fetch(`/api/majors?query=${encodeURIComponent(searchQuery)}`)
            if (response.ok) {
                const data = await response.json()
                if (data.majors) {
                    setFilteredMajors(data.majors)
                } else {
                    setFilteredMajors([])
                }
            } else {
                setFilteredMajors([])
            }
        } catch (error) {
            console.error("Failed to fetch majors:", error)
            setFilteredMajors([])
        } finally {
            setIsLoading(false)
            setIsOpen(true)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const userInput = e.target.value
        setQuery(userInput)
        setMajorName(userInput)

        // Pass current categories
        onChange(userInput, largeCategory, middleCategory)

        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current)
        }

        if (userInput.length > 0) {
            debounceTimerRef.current = setTimeout(() => {
                fetchMajors(userInput)
            }, 300)
        } else {
            setFilteredMajors([])
            setIsOpen(false)
        }
    }

    const handleSelectMajor = (major: string) => {
        setQuery(major)
        setMajorName(major)
        onChange(major, largeCategory, middleCategory)
        setIsOpen(false)
    }

    const handleLargeCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value
        setLargeCategory(selected)
        setMiddleCategory('') // Reset middle
        // We don't update major name here, but we might want to inform parent of category change?
        // Currently onChange is bound to major name field in parent.
        // We should probably trigger onChange with current major name (if any) and new categories.
        onChange(majorName, selected, '')
    }

    const handleMiddleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value
        setMiddleCategory(selected)
        onChange(majorName, largeCategory, selected)
    }

    // Get middle categories based on large category selection
    const currentMiddleCategories = majorCategories.find(c => c.name === largeCategory)?.subcategories || []

    return (
        <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
                <select
                    value={largeCategory}
                    onChange={handleLargeCategoryChange}
                    className="w-full h-[52px] px-4 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all bg-white"
                >
                    <option value="">계열(대분류)</option>
                    {majorCategories.map((cat) => (
                        <option key={cat.name} value={cat.name}>{cat.name}</option>
                    ))}
                </select>

                <select
                    value={middleCategory}
                    onChange={handleMiddleCategoryChange}
                    disabled={!largeCategory}
                    className="w-full h-[52px] px-4 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all bg-white disabled:bg-gray-100 disabled:text-gray-400"
                >
                    <option value="">전공(중분류)</option>
                    {currentMiddleCategories.map((sub) => (
                        <option key={sub} value={sub}>{sub}</option>
                    ))}
                </select>
            </div>

            <div className="relative" ref={wrapperRef}>
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onFocus={() => {
                        if (query.length > 0) setIsOpen(true)
                    }}
                    placeholder={middleCategory ? `${middleCategory} 관련 학과 입력` : "학과/전공명 입력 (예: 컴퓨터공학과)"}
                    className="w-full h-[52px] px-4 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all"
                />
                {isOpen && (filteredMajors.length > 0 || isLoading) && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                        {isLoading ? (
                            <div className="px-4 py-3 text-sm text-gray-500 text-center">
                                검색 중...
                            </div>
                        ) : (
                            filteredMajors.map((major, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => handleSelectMajor(major)}
                                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors text-sm text-gray-700"
                                >
                                    {major}
                                </button>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
