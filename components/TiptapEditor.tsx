'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

interface TiptapEditorProps {
    content: string
    onChange: (content: string) => void
}

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: '장학금 상세 내용을 입력하세요...',
            }),
        ],
        content: content,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none min-h-[300px]',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
        immediatelyRender: false,
    })

    if (!editor) {
        return null
    }

    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
            {/* Toolbar */}
            <div className="bg-gray-50 border-b border-gray-200 p-2 flex gap-2 flex-wrap">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-gray-200 font-bold' : ''}`}
                    type="button"
                >
                    B
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                    className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('italic') ? 'bg-gray-200 italic' : ''}`}
                    type="button"
                >
                    I
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={!editor.can().chain().focus().toggleStrike().run()}
                    className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('strike') ? 'bg-gray-200 line-through' : ''}`}
                    type="button"
                >
                    S
                </button>
                <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 font-bold' : ''}`}
                    type="button"
                >
                    H2
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200 font-bold' : ''}`}
                    type="button"
                >
                    H3
                </button>
                <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
                    type="button"
                >
                    • List
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
                    type="button"
                >
                    1. List
                </button>
            </div>

            {/* Editor Content */}
            <div className="p-4 min-h-[300px]">
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}
