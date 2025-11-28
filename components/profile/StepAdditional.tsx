export default function StepAdditional({ data, onChange }: { data: any, onChange: (field: string, value: any) => void }) {
    return (
        <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <h3 className="font-bold text-blue-900 mb-2">💡 숨겨진 장학금을 찾아보세요!</h3>
                <p className="text-sm text-blue-700 leading-relaxed">
                    장학금은 성적이나 소득뿐만 아니라 다양한 조건(부모님 직업, 거주 형태, 특정 자격 등)으로도 지원받을 수 있습니다.<br />
                    혹시 본인에게 해당될 수 있는 특이사항이 있다면 자유롭게 적어주세요.
                </p>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-900">기타 참고사항 <span className="text-gray-400 font-normal">(선택)</span></label>
                <textarea
                    value={data.additional_info || ''}
                    onChange={(e) => onChange('additional_info', e.target.value)}
                    placeholder="예: 택배업 종사자 자녀, 농어업인 자녀, 다문화 가정, 보훈 대상자, 자립준비청년 등 장학금 추천에 도움이 될 만한 내용이 있다면 적어주세요."
                    className="w-full h-[200px] p-4 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all resize-none"
                />
            </div>
        </div>
    );
}
