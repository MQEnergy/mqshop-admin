import './index.scss'
import {useEditor, EditorContent} from '@tiptap/react'
import MenuBar from './menu/menu-bar.tsx'
import StarterKit from '@tiptap/starter-kit'
import CharacterCount from '@tiptap/extension-character-count'
import Highlight from '@tiptap/extension-highlight'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link';

interface TiptapProps {
  content: string,
  onContentChange: (content: string) => void
}

const Tiptap = ({content, onContentChange}: TiptapProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      TaskList,
      TaskItem,
      Image,
      Link,
      CharacterCount.configure({
        limit: 10000,
      }),
    ],
    content: content || '请输入...',
    onUpdate: ({editor}) => {
      onContentChange(editor.getHTML())
    }
  })

  return (
    <div className='prose prose-zinc' style={{maxWidth: '100%'}}>
      {editor && <MenuBar editor={editor}/>}
      {/*{editor && <MenuBubble editor={editor}/>}*/}
      {/*{editor && <MenuFloating editor={editor}/>}*/}
      <EditorContent className="editor__content" editor={editor}/>
    </div>
  )
}

export default Tiptap
