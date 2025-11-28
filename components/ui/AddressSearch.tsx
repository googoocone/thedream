'use client'

import { useState } from 'react'
import DaumPostcodeEmbed from 'react-daum-postcode'

interface AddressSearchProps {
    onComplete: (address: string) => void;
}

export default function AddressSearch({ onComplete }: AddressSearchProps) {
    const [isOpen, setIsOpen] = useState(false)

    const handleComplete = (data: any) => {
        let fullAddress = data.address
        let extraAddress = ''

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName)
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '')
        }

        onComplete(fullAddress)
        setIsOpen(false)
    }

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 h-[52px] bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
                주소 검색
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h3 className="font-bold text-lg">검색</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-gray-600 p-1"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>
                        <div className="h-[450px]">
                            <DaumPostcodeEmbed
                                onComplete={handleComplete}
                                style={{ height: '100%' }}
                                autoClose={false}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
