'use client'

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';

interface Document {
    id: string;
    name: string;
    size_bytes: number;
    created_at: string;
    file_path: string;
    file_type: string;
}

export default function DocumentVault({ userData }: { userData: any }) {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const supabase = createClient();
    const [targetDocType, setTargetDocType] = useState<string | null>(null);

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        const { data } = await supabase
            .from('documents')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setDocuments(data);
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        setUploading(true);

        try {
            const fileExt = file.name.split('.').pop();
            // If uploading for a specific type, prepend the type to the name
            const finalName = targetDocType
                ? `[${targetDocType}] ${file.name}`
                : file.name;

            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${userData.id}/${fileName}`;

            // 1. Upload to Storage
            const { error: uploadError } = await supabase.storage
                .from('user_documents')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // 2. Save Metadata to DB
            const { error: dbError } = await supabase
                .from('documents')
                .insert({
                    user_id: userData.id,
                    name: finalName,
                    file_path: filePath,
                    file_type: file.type,
                    size_bytes: file.size
                });

            if (dbError) throw dbError;

            await fetchDocuments();
            alert('업로드 완료!');
        } catch (error: any) {
            alert('업로드 실패: ' + error.message);
        } finally {
            setUploading(false);
            setTargetDocType(null); // Reset target
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleDownload = async (doc: Document) => {
        try {
            const { data, error } = await supabase.storage
                .from('user_documents')
                .download(doc.file_path);

            if (error) throw error;

            const url = URL.createObjectURL(data);
            const a = document.createElement('a');
            a.href = url;
            a.download = doc.name;
            document.body.appendChild(a);
            a.click();
            URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error: any) {
            alert('다운로드 실패: ' + error.message);
        }
    };

    const handleDelete = async (doc: Document) => {
        if (!confirm('정말 삭제하시겠습니까?')) return;

        try {
            // 1. Delete from Storage
            const { error: storageError } = await supabase.storage
                .from('user_documents')
                .remove([doc.file_path]);

            if (storageError) throw storageError;

            // 2. Delete from DB
            const { error: dbError } = await supabase
                .from('documents')
                .delete()
                .eq('id', doc.id);

            if (dbError) throw dbError;

            setDocuments(prev => prev.filter(d => d.id !== doc.id));
        } catch (error: any) {
            alert('삭제 실패: ' + error.message);
        }
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };

    const RECOMMENDED_DOCS = [
        '재학증명서',
        '성적증명서',
        '주민등록등본',
        '가족관계증명서',
        '통장사본',
        '학자금지원구간통지서'
    ];

    // Find the document that matches the docType (assuming one per type for now)
    const getDocForType = (docType: string) => {
        return documents.find(d => d.name.startsWith(`[${docType}]`));
    };

    const handleQuickUpload = (docName: string) => {
        setTargetDocType(docName);
        // Trigger file input
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // Filter out checklist docs from the main list
    const generalDocuments = documents.filter(d => !d.name.startsWith('['));

    return (
        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">서류 보관함 🗄️</h3>
                    <p className="text-sm text-gray-500">자주 사용하는 서류를 안전하게 보관하세요.</p>
                </div>
                <div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleUpload}
                        className="hidden"
                        id="file-upload"
                    />
                    <label
                        htmlFor="file-upload"
                        onClick={() => setTargetDocType(null)} // Reset target for general upload
                        className={`cursor-pointer px-4 py-2 rounded-lg font-bold text-white transition-colors ${uploading ? 'bg-gray-400' : 'bg-[#0984E3] hover:bg-[#0984E3]/90'
                            }`}
                    >
                        {uploading ? '업로드 중...' : '+ 일반 서류 추가'}
                    </label>
                </div>
            </div>

            {/* Recommended Documents Checklist */}
            <div className="mb-8">
                <h4 className="text-sm font-bold text-gray-700 mb-3">필수 서류 체크리스트 ✅</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {RECOMMENDED_DOCS.map(docName => {
                        const uploadedDoc = getDocForType(docName);
                        return (
                            <div
                                key={docName}
                                className={`p-4 rounded-xl border flex items-center justify-between transition-all ${uploadedDoc
                                        ? 'bg-blue-50 border-blue-200'
                                        : 'bg-gray-50 border-gray-100 hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${uploadedDoc ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-400'}`}>
                                        {uploadedDoc ? '📄' : '☁️'}
                                    </div>
                                    <div className="min-w-0">
                                        <div className={`text-sm font-bold ${uploadedDoc ? 'text-[#0984E3]' : 'text-gray-600'}`}>
                                            {docName}
                                        </div>
                                        {uploadedDoc && (
                                            <div className="text-xs text-gray-500 truncate">
                                                {uploadedDoc.name.replace(`[${docName}] `, '')}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {uploadedDoc ? (
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => handleDownload(uploadedDoc)}
                                            className="p-1.5 text-gray-400 hover:text-[#0984E3] hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                                            title="다운로드"
                                        >
                                            📥
                                        </button>
                                        <button
                                            onClick={() => handleDelete(uploadedDoc)}
                                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                                            title="삭제"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => handleQuickUpload(docName)}
                                        className="px-3 py-1.5 text-xs font-bold bg-white border border-gray-200 text-gray-600 rounded-lg hover:border-[#0984E3] hover:text-[#0984E3] transition-colors cursor-pointer"
                                    >
                                        업로드
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="space-y-3">
                <h4 className="text-sm font-bold text-gray-700 mb-2">기타 서류 📂</h4>
                {generalDocuments.length > 0 ? (
                    generalDocuments.map(doc => (
                        <div key={doc.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="text-2xl">
                                    {doc.file_type.includes('pdf') ? '📕' :
                                        doc.file_type.includes('image') ? '🖼️' : '📄'}
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900">{doc.name}</div>
                                    <div className="text-xs text-gray-400">
                                        {new Date(doc.created_at).toLocaleDateString()} • {formatSize(doc.size_bytes)}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleDownload(doc)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-500 hover:text-[#0984E3] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                >
                                    <span>📥</span>
                                    <span>다운로드</span>
                                </button>
                                <button
                                    onClick={() => handleDelete(doc)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                >
                                    <span>🗑️</span>
                                    <span>삭제</span>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        <p className="text-sm">기타 보관된 서류가 없습니다.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
