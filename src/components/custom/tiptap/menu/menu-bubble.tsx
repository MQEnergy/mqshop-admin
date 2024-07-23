import {Editor, BubbleMenu} from "@tiptap/react";
import {Fragment} from "react";
import MenuItem from "@/components/custom/tiptap/menu/menu-item.tsx";

export default function MenuBubble({editor}: { editor: Editor }) {
  const items = [
    {
      icon: 'bold',
      title: 'Bold',
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive('bold'),
    },
    {
      icon: 'italic',
      title: 'Italic',
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive('italic'),
    },
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
      icon: 'h-3',
      title: 'Heading 3',
      action: () => editor.chain().focus().toggleHeading({level: 3}).run(),
      isActive: () => editor.isActive('heading', {level: 3}),
    },
    {
      icon: 'h-4',
      title: 'Heading 4',
      action: () => editor.chain().focus().toggleHeading({level: 4}).run(),
      isActive: () => editor.isActive('heading', {level: 4}),
    },
    {
      icon: 'paragraph',
      title: 'Paragraph',
      action: () => editor.chain().focus().setParagraph().run(),
      isActive: () => editor.isActive('paragraph'),
    },
  ]

  return (
    <BubbleMenu className="flex flex-auto flex-wrap items-center p-1 bg-background border rounded-md"
                tippyOptions={{duration: 100}} editor={editor}>
      {items.map((item, index) => (
        <Fragment key={index}>
          <MenuItem {...item} />
        </Fragment>
      ))}
    </BubbleMenu>
  )
}