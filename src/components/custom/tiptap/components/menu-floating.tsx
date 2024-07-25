import {Editor, FloatingMenu} from "@tiptap/react";
import {Fragment} from "react";
import MenuItem from "@/components/custom/tiptap/components/menu-item.tsx";

export default function MenuFloating({editor}: { editor: Editor }) {
  const items = [
    {
      icon: 'h-1',
      title: 'Heading 1',
      action: () => editor.chain().focus().toggleHeading({level: 1}).run(),
      isActive: () => editor.isActive('heading', {level: 1}),
    },
    {
      icon: 'h-2',
      title: 'Heading 2',
      action: () => editor.chain().focus().toggleHeading({level: 2}).run(),
      isActive: () => editor.isActive('heading', {level: 2}),
    },
    {
      icon: 'paragraph',
      title: 'Paragraph',
      action: () => editor.chain().focus().setParagraph().run(),
      isActive: () => editor.isActive('paragraph'),
    },
  ]

  return (
    <FloatingMenu className="flex flex-auto flex-wrap items-center p-1" tippyOptions={{duration: 100}} editor={editor}>
      {items.map((item, index) => (
        <Fragment key={index}>
          <MenuItem {...item} />
        </Fragment>
      ))}
    </FloatingMenu>
  )
}