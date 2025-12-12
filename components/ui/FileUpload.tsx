'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/utils/supabase/client'

interface FileUploadProps {
    onUploadComplete: (files: { name: string; url: string; size: number; type: string }[]) => void;
    existingFiles?: { name: string; url: string; size: number; type: string }[];
}

export default function FileUpload({ onUploadComplete, existingFiles = [] }: FileUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState(existingFiles);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const supabase = createClient();

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        await uploadFiles(Array.from(e.target.files));
    };

    const uploadFiles = async (files: File[]) => {
        setUploading(true);
        const newUploadedFiles = [...uploadedFiles];

        for (const file of files) {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('scholarship-attachments')
                .upload(filePath, file);

            if (uploadError) {
                console.error('Error uploading file:', uploadError);
                alert(`${file.name} 업로드 실패: ${uploadError.message}`);
                continue;
            }

            const { data: { publicUrl } } = supabase.storage
                .from('scholarship-attachments')
                .getPublicUrl(filePath);

            newUploadedFiles.push({
                name: file.name,
                url: publicUrl,
                size: file.size,
                type: file.type
            });
        }

        setUploadedFiles(newUploadedFiles);
        onUploadComplete(newUploadedFiles);
        setUploading(false);

        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const removeFile = (index: number) => {
        const newFiles = uploadedFiles.filter((_, i) => i !== index);
        setUploadedFiles(newFiles);
        onUploadComplete(newFiles);
    };

    return (
        <div className="w-full space-y-4">
            <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${uploading ? 'bg-gray-50 border-gray-300' : 'border-gray-300 hover:border-[#0984E3] hover:bg-blue-50'
                    }`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    e.preventDefault();
                    if (!uploading && e.dataTransfer.files.length > 0) {
                        uploadFiles(Array.from(e.dataTransfer.files));
                    }
                }}
            >
                <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={uploading}
                />
                <div className="flex flex-col items-center gap-2">
                    <div className="p-3 bg-blue-100 text-[#0984E3] rounded-full">
                        <span className="text-xl">📎</span>
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            className="text-[#0984E3] font-bold hover:underline disabled:opacity-50"
                        >
                            파일 선택
                        </button>
                        <span className="text-gray-500"> 또는 여기로 드래그하세요</span>
                    </div>
                    <p className="text-xs text-gray-400">PDF, HWP, DOCX 등 (최대 10MB)</p>
                </div>
            </div>

            {/* File List */}
            {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <div className="flex items-center gap-3 overflow-hidden">
                                <span className="text-gray-400">📄</span>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-sm font-medium text-gray-700 truncate">{file.name}</span>
                                    <span className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</span>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="p-1 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
