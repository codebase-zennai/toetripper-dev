'use client';

import { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import {
  Bold,
  Italic,
  Heading2,
  List,
  ListOrdered,
  Code,
  Undo,
  Redo,
} from 'lucide-react';

function ToolbarButton({ onClick, isActive, title, disabled, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      disabled={disabled}
      aria-label={title}
      className={`inline-flex items-center justify-center h-8 w-8 rounded-md border border-transparent transition-colors ${
        isActive
          ? 'bg-muted bg-gray-200 text-black'
          : 'text-gray-700 hover:bg-gray-100'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {children}
    </button>
  );
}

function ToolbarSeparator() {
  return <span className="w-px h-6 bg-gray-200 mx-1" />;
}

export default function RichTextEditor({ value, onChange, placeholder = 'Enter specifications...' }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2],
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[200px] px-4 py-3',
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
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="flex items-center gap-1 border-b border-gray-200 bg-gray-100/60 p-2 flex-wrap">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarSeparator />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          title="Ordered List"
        >
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarSeparator />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive('codeBlock')}
          title="Code Block"
        >
          <Code className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarSeparator />

        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          isActive={false}
          title="Undo"
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <Undo className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          isActive={false}
          title="Redo"
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <Redo className="h-4 w-4" />
        </ToolbarButton>
      </div>

      <EditorContent editor={editor} className="bg-white" />
    </div>
  );
}
