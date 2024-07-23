import './index.scss'
import {useEditor, EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CharacterCount from '@tiptap/extension-character-count'
import Highlight from '@tiptap/extension-highlight'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Image from '@tiptap/extension-image'

import MenuBar from './menu/menu-bar.tsx'
import MenuBubble from "./menu/menu-bubble.tsx";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Highlight,
      TaskList,
      TaskItem,
      Image,
      CharacterCount.configure({
        limit: 10000,
      }),
    ],
    content: `请输入...`,
  })

  return (
    <div className="">
      {editor && <MenuBar editor={editor}/>}
      {editor && <MenuBubble editor={editor}/>}
      {/*{editor && <MenuFloating editor={editor}/>}*/}
      <EditorContent className="editor__content" editor={editor}/>
    </div>
  )
}

export default Tiptap
