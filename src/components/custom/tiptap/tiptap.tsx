import './index.scss'
import {useEditor, EditorContent} from '@tiptap/react'
import MenuBar from './components/menu-bar.tsx'
import StarterKit from '@tiptap/starter-kit'
import CharacterCount from '@tiptap/extension-character-count'
import Highlight from '@tiptap/extension-highlight'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Image from '@tiptap/extension-image'
import {Document} from "@tiptap/extension-document";
import {Dropcursor} from "@tiptap/extension-dropcursor";
import {Link} from "@tiptap/extension-link";

interface TiptapProps {
  content: string,
  onContentChange: (content: string) => void
}

const Tiptap = ({content, onContentChange}: TiptapProps) => {
  const limit = 255

  const editor = useEditor({
    extensions: [
      Document,
      StarterKit,
      Highlight,
      TaskList,
      TaskItem,
      Image,
      Link,
      Dropcursor,
      CharacterCount.configure({
        limit,
      }),
    ],
    content: content || '请输入...',
    onUpdate: ({editor}) => {
      onContentChange(editor.getHTML())
    }
  })

  const percentage = editor
    ? Math.round((100 / limit) * editor.storage.characterCount.characters())
    : 0

  return (
    <div className='prose prose-zinc' style={{maxWidth: '100%'}}>
      {editor && <MenuBar editor={editor}/>}
      {/*{editor && <MenuBubble editor={editor}/>}*/}
      {/*{editor && <MenuFloating editor={editor}/>}*/}
      <EditorContent className="editor__content" editor={editor}/>
      <div
        className={`flex justify-end p-2 items-center space-x-2 text-sm character-count ${editor.storage.characterCount.characters() === limit ? 'character-count--warning' : ''}`}>
        <svg
          height="20"
          width="20"
          viewBox="0 0 20 20"
        >
          <circle
            r="10"
            cx="10"
            cy="10"
            fill="#e9ecef"
          />
          <circle
            r="5"
            cx="10"
            cy="10"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="10"
            strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
            transform="rotate(-90) translate(-20)"
          />
          <circle
            r="6"
            cx="10"
            cy="10"
            fill="white"
          />
        </svg>
        <span>
          {editor.storage.characterCount.characters()} / {limit} 字符
        </span>
      </div>
    </div>
  )
}

export default Tiptap
