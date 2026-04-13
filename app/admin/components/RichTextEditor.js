'use client';

import { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

function ToolbarButton({ onClick, isActive, children, title }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`px-2.5 py-1.5 text-xs font-semibold rounded border transition-colors cursor-pointer ${
        isActive
          ? 'bg-black text-white border-black'
          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
      }`}
    >
      {children}
    </button>
  );
}

export default function RichTextEditor({ value, onChange, placeholder = 'Start writing...' }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [3, 4],
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class: 'min-h-[120px] w-full px-3 py-2 focus:outline-none prose prose-sm max-w-none',
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.getHTML());
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    const next = value || '';
    if (current !== next) {
      editor.commands.setContent(next, false);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden bg-white">
      <div className="flex flex-wrap gap-2 border-b border-gray-200 p-2 bg-gray-50">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          title="Bold"
        >
          Bold
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          title="Italic"
        >
          Italic
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          title="Bullet list"
        >
          Bullet
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          title="Numbered list"
        >
          Numbered
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setParagraph().run()}
          isActive={editor.isActive('paragraph')}
          title="Paragraph"
        >
          P
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive('heading', { level: 3 })}
          title="Heading"
        >
          H3
        </ToolbarButton>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}