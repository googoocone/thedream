'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Loader2 } from 'lucide-react'

interface LoadingOverlayProps {
    isVisible: boolean
    message?: string
}

export default function LoadingOverlay({ isVisible, message = '잠시만 기다려주세요...' }: LoadingOverlayProps) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <div className="relative">
                            <div className="h-16 w-16 rounded-full border-4 border-gray-200"></div>
                            <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-4 border-[var(--primary)] border-t-transparent animate-spin"></div>
                            {/* Icon overlay (optional) */}
                            {/* <Loader2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[var(--primary)] w-6 h-6 animate-pulse" /> */}
                        </div>
                        <p className="text-gray-600 font-medium animate-pulse">{message}</p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
