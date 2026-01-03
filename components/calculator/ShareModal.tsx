'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { useState, useEffect } from 'react';

declare global {
    interface Window {
        Kakao: any;
    }
}

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    totalAmount: number;
}

export default function ShareModal({ isOpen, onClose, totalAmount }: ShareModalProps) {
    const [copied, setCopied] = useState(false);
    const [url, setUrl] = useState('');
    const [kakaoLoaded, setKakaoLoaded] = useState(false);

    const initKakao = () => {
        // Initialize Kakao
        const kakaoKey = '98a7896587578f0c31f36a2369eaf662';
        if (typeof window !== 'undefined' && window.Kakao && !window.Kakao.isInitialized()) {
            window.Kakao.init(kakaoKey);
            setKakaoLoaded(true);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setUrl(window.location.href);

            // Load Kakao SDK if not already loaded
            if (!window.Kakao) {
                const script = document.createElement('script');
                script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';
                // Updated integrity hash based on error message
                script.integrity = 'sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4';
                script.crossOrigin = 'anonymous';
                script.onload = () => {
                    initKakao();
                };
                document.head.appendChild(script);
            } else {
                initKakao();
            }
        }
    }, []);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            // Fallback
            const textArea = document.createElement("textarea");
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleKakaoShare = () => {
        // Try init one more time just in case
        initKakao();

        if (!window.Kakao || !window.Kakao.isInitialized()) {
            alert('카카오톡 SDK가 아직 로드되지 않았습니다. 새로고침 후 다시 시도해주세요.');
            return;
        }

        window.Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: '내 장학금 찾기',
                description: `이번 학기, 내가 받을 수 있는 장학금은 최대 ${totalAmount > 0 ? totalAmount.toLocaleString() + '만 원' : '0원'}입니다!`,
                imageUrl:
                    'https://i.ibb.co/wznwz0z/og-image.png', // TODO: Replace with your actual OG image URL
                link: {
                    mobileWebUrl: url,
                    webUrl: url,
                },
            },
            buttons: [
                {
                    title: '결과 확인하기',
                    link: {
                        mobileWebUrl: url,
                        webUrl: url,
                    },
                },
            ],
        });
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                    >
                        {/* Modal */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl w-full max-w-xs p-6 relative shadow-2xl"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <h3 className="text-xl font-bold text-center text-gray-900 mb-6">결과 공유하기</h3>

                            {/* Social Grid */}
                            <div className="flex justify-center gap-6 mb-8">
                                {/* Kakao (Yellow) */}
                                <button onClick={handleKakaoShare} className="flex flex-col items-center gap-2 group">
                                    <div className="w-14 h-14 bg-[#FEE500] rounded-full flex items-center justify-center text-black shadow-md group-hover:scale-110 transition-transform">
                                        <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24"><path d="M12 3C5.373 3 0 7.373 0 12.766c0 3.533 2.293 6.63 5.76 8.358-.255.937-1.162 4.192-1.218 4.437 0 0-.022.186.096.257.118.07.25.04.25.04l5.137-3.41c.642.095 1.304.145 1.975.145 6.627 0 12-4.373 12-9.766C24 7.373 18.627 3 12 3z" /></svg>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">카카오톡</span>
                                </button>
                            </div>

                            {/* URL Copy Section */}
                            <div className="bg-gray-100 rounded-xl p-2 flex items-center gap-2 border border-gray-200">
                                <input
                                    type="text"
                                    readOnly
                                    value={url}
                                    className="bg-transparent text-sm text-gray-500 flex-1 px-2 outline-none truncate"
                                />
                                <button
                                    onClick={handleCopy}
                                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${copied
                                        ? 'bg-green-500 text-white shadow-md'
                                        : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm border border-gray-200'
                                        }`}
                                >
                                    {copied ? <Check className="w-4 h-4" /> : '복사'}
                                </button>
                            </div>

                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
