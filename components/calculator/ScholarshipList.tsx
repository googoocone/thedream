'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { subscribeToNotification } from '@/app/subscribe/actions';
import { Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import ShareModal from './ShareModal';

interface Scholarship {
    id: string;
    name: string;
    foundation: string;
    amount: string;
    score: number;
    [key: string]: any;
}

interface ScholarshipListProps {
    scholarships: Scholarship[];
    totalAmount: number;
}

export default function ScholarshipList({ scholarships, totalAmount }: ScholarshipListProps) {
    const [showEmailInput, setShowEmailInput] = useState(false);
    const [email, setEmail] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [subscribed, setSubscribed] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    // Trigger confetti on mount
    useEffect(() => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => {
            return Math.random() * (max - min) + min;
        }

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            // since particles fall down, start a bit higher than random
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    // Format huge numbers to Korean readable format (e.g. 4500000 -> 450만)
    const formatMoney = (amount: number) => {
        if (amount === 0) return '0원';
        const man = Math.floor(amount / 10000);
        return `${man.toLocaleString()}만 원`;
    };

    const handleSubscribe = async () => {
        if (!email || !email.includes('@')) {
            alert('올바른 이메일 주소를 입력해주세요.');
            return;
        }
        setSubmitting(true);
        try {
            await subscribeToNotification(email);
            setSubscribed(true);
        } catch (e) {
            console.error(e);
            alert('오류가 발생했습니다.');
        } finally {
            setSubmitting(false);
        }
    };

    // Confetti effect or similar could be added here later

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Wow Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-10 p-8 bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl border border-orange-200 shadow-sm"
            >
                <p className="text-gray-600 mb-2 font-medium">이번 학기, 내가 받을 수 있는</p>
                <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
                    최대 <span className="text-orange-600 inline-block transform hover:scale-110 transition-transform cursor-default">{formatMoney(totalAmount)}</span>
                </h2>
                <p className="text-sm text-gray-500">* 예상 금액이며 실제와 다를 수 있습니다.</p>
            </motion.div>

            {/* CTA Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.5 } }}
                className="mb-8 flex flex-col items-center gap-6"
            >
                {!showEmailInput && !subscribed && (
                    <button
                        onClick={() => setShowEmailInput(true)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-4 rounded-full font-bold shadow-md flex items-center gap-2 transition-all hover:shadow-lg transform hover:-translate-y-0.5 text-md"
                    >
                        <span>✨</span> 공고 뜨면 바로 알려드릴까요? [30초 알림 예약]
                    </button>
                )}

                {showEmailInput && !subscribed && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col gap-3 w-full max-w-sm bg-white p-4 rounded-2xl shadow-lg border border-gray-100"
                    >
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">이메일 주소</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@email.com"
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                            />
                        </div>
                        {/* 
                          TODO: Phone Number Input logic 
                          User Question: "Should we add phone number?"
                          My Opinion: SMS has higher open rates for deadlines, but higher friction.
                          Start with Email for MVP, maybe add Phone as optional later.
                        */}
                        <button
                            onClick={handleSubscribe}
                            disabled={submitting}
                            className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-colors flex justify-center items-center"
                        >
                            {submitting ? <Loader2 className="animate-spin w-4 h-4" /> : '알림 예약하기'}
                        </button>
                    </motion.div>
                )}

                {subscribed && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center p-4 bg-green-50 text-green-700 rounded-2xl border border-green-200 font-bold"
                    >
                        🔔 알림 예약이 완료되었습니다!
                    </motion.div>
                )}

                {/* Social Share Button (Triggers Modal) */}
                <div className="mt-4">
                    <button
                        onClick={() => setIsShareModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 font-bold transition-all shadow-sm hover:scale-105"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="18" cy="5" r="3"></circle>
                            <circle cx="6" cy="12" r="3"></circle>
                            <circle cx="18" cy="19" r="3"></circle>
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                        </svg>
                        <span>친구에게 공유하기</span>
                    </button>
                </div>

                <ShareModal
                    isOpen={isShareModalOpen}
                    onClose={() => setIsShareModalOpen(false)}
                    totalAmount={totalAmount}
                />
            </motion.div>

            {/* List */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 px-2">매칭된 장학금 ({scholarships.length}개)</h3>
                {scholarships.map((s, idx) => (
                    <motion.div
                        key={s.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex justify-between items-center group"
                    >
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{s.foundation}</span>
                                {s.score > 80 && <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">추천</span>}
                            </div>
                            <h4 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">{s.name}</h4>
                            <p className="text-sm text-gray-500">{s.amount}</p>
                        </div>
                        <div className="text-right">
                            <button className="text-gray-400 hover:text-gray-900 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
