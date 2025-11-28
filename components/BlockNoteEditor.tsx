'use client'

import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useEffect } from "react";

interface EditorProps {
    initialContent?: string; // JSON string
    onChange: (content: string) => void;
}

export default function BlockNoteEditorComponent({ initialContent, onChange }: EditorProps) {
    const editor = useCreateBlockNote();

    useEffect(() => {
        if (initialContent) {
            try {
                // 1. Try to parse as JSON (BlockNote format)
                const blocks = JSON.parse(initialContent);
                editor.replaceBlocks(editor.document, blocks);
            } catch (e) {
                console.log("Initial content is not JSON, trying HTML/Text fallback");

                // 2. Try to parse as HTML
                const htmlBlocks = editor.tryParseHTMLToBlocks(initialContent);
                if (htmlBlocks.length > 0) {
                    editor.replaceBlocks(editor.document, htmlBlocks);
                } else {
                    // 3. Fallback: treat as plain text
                    editor.replaceBlocks(editor.document, [
                        {
                            type: "paragraph",
                            content: initialContent
                        }
                    ]);
                }
            }
        }
    }, [editor, initialContent]);

    const handleChange = () => {
        const json = JSON.stringify(editor.document);
        onChange(json);
    };

    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white min-h-[300px]">
            <BlockNoteView
                editor={editor}
                onChange={handleChange}
                theme="light"
            />
        </div>
    );
}
