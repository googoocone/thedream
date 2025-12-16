'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react'

export interface SelectOption {
    group?: string;
    options: string[] | { label: string; value: string }[];
}

interface CustomSelectProps {
    value: string;
    onChange: (value: string) => void;
    options: (string | SelectOption)[];
    placeholder?: string;
    className?: string;
}

export default function CustomSelect({ value, onChange, options, placeholder = "Select option", className = "" }: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false)
    const wrapperRef = useRef<HTMLDivElement>(null)

    // Close on click outside
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

    const handleSelect = (selectedValue: string) => {
        onChange(selectedValue)
        setIsOpen(false)
    }

    // Helper to determine if options are grouped
    const isGrouped = options.length > 0 && typeof options[0] !== 'string';

    return (
        <div className={`relative ${className}`} ref={wrapperRef}>
            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 border transition-all duration-200 outline-none
                    ${isOpen ? 'ring-2 ring-[var(--primary)] border-transparent bg-white' : 'border-transparent hover:bg-gray-100'}
                    ${!value ? 'text-gray-400' : 'text-gray-900'}
                `}
            >
                <span className="truncate">{value || placeholder}</span>
                <ChevronDown
                    size={20}
                    className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 max-h-[300px] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent p-1"
                    >
                        {isGrouped ? (
                            // Grouped Options Rendering
                            (options as SelectOption[]).map((group, groupIndex) => (
                                <div key={groupIndex} className="mb-2 last:mb-0">
                                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-100/80 backdrop-blur-sm sticky top-0 z-10">
                                        {group.group}
                                    </div>
                                    <div className="space-y-0.5">
                                        {group.options.map((opt, optIndex) => {
                                            const optValue = typeof opt === 'string' ? opt : opt.value;
                                            const optLabel = typeof opt === 'string' ? opt : opt.label;
                                            const isSelected = value === optValue;

                                            return (
                                                <button
                                                    key={optIndex}
                                                    type="button"
                                                    onClick={() => handleSelect(optValue)}
                                                    className={`w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-colors
                                                        ${isSelected ? 'bg-blue-50 text-[var(--primary)] font-medium' : 'text-gray-700 hover:bg-gray-50'}
                                                    `}
                                                >
                                                    {optLabel}
                                                    {isSelected && <Check size={16} />}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            ))
                        ) : (
                            // Simple List Rendering
                            <div className="space-y-0.5">
                                {(options as string[]).map((opt, index) => {
                                    const isSelected = value === opt;
                                    return (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => handleSelect(opt)}
                                            className={`w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-colors
                                                ${isSelected ? 'bg-blue-50 text-[var(--primary)] font-medium' : 'text-gray-700 hover:bg-gray-50'}
                                            `}
                                        >
                                            {opt}
                                            {isSelected && <Check size={16} />}
                                        </button>
                                    )
                                })}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
