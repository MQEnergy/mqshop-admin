import {
  CheckSquare,
  Heading1,
  Heading2,
  Heading3, Heading4,
  ImageIcon,
  List,
  ListOrdered,
  Text,
  TextQuote,
  Twitter,
  Youtube,
} from "lucide-react";
import { createSuggestionItems } from "novel/extensions";
import { Command, renderItems } from "novel/extensions";
import { uploadFn } from "./image-upload";

export const suggestionItems = createSuggestionItems([
  {
    title: "文本", // Text
    description: "开始键入纯文本。", // Just start typing with plain text.
    searchTerms: ["p", "paragraph"],
    icon: <Text size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleNode("paragraph", "paragraph").run();
    },
  },
  {
    title: "待办列表", // To-do List
    description: "用待办事项列表跟踪任务。", // Track tasks with a to-do list.
    searchTerms: ["todo", "task", "list", "check", "checkbox"],
    icon: <CheckSquare size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleTaskList().run();
    },
  },
  {
    title: "标题1", // Heading 1
    description: "大标题。", // Big section heading.
    searchTerms: ["title", "big", "large"],
    icon: <Heading1 size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode("heading", { level: 1 }).run();
    },
  },
  {
    title: "标题2", // Heading 2
    description: "中标题。", // Medium section heading.
    searchTerms: ["subtitle", "medium"],
    icon: <Heading2 size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode("heading", { level: 2 }).run();
    },
  },
  {
    title: "标题3", // Heading 3
    description: "小标题。", // Small section heading.
    searchTerms: ["subtitle", "small"],
    icon: <Heading3 size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode("heading", { level: 3 }).run();
    },
  },
  {
    title: "标题4", // Heading 4
    description: "标题。", // Mini section heading.
    searchTerms: ["subtitle", "small"],
    icon: <Heading4 size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode("heading", { level: 4 }).run();
    },
  },
  {
    title: "无序列表", // Bullet List
    description: "创建一个简单的无序列表。", // Create a simple bullet list.
    searchTerms: ["unordered", "point"],
    icon: <List size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    title: "有序列表", // Numbered List
    description: "创建一个有序列表。", // Create a list with numbering.
    searchTerms: ["ordered"],
    icon: <ListOrdered size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    title: "引用", // Quote
    description: "插入引用格式。", // Capture a quote.
    searchTerms: ["blockquote"],
    icon: <TextQuote size={18} />,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).toggleNode("paragraph", "paragraph").toggleBlockquote().run(),
  },
  {
    title: "图片", // Image
    description: "选择图片上传。", // Upload an image from your computer.
    searchTerms: ["photo", "picture", "media"],
    icon: <ImageIcon size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).run();
      // upload image
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = async () => {
        if (input.files?.length) {
          const file = input.files[0];
          const pos = editor.view.state.selection.from;
          console.log(file, pos)
          uploadFn(file, editor.view, pos);
        }
      };
      input.click();
    },
  },
  {
    title: "YouTube", // Youtube
    description: "嵌入Youtube视频。", // Embed a Youtube video.
    searchTerms: ["video", "youtube", "embed"],
    icon: <Youtube size={18} />,
    command: ({ editor, range }) => {
      const videoLink = prompt("Please enter Youtube Video Link");
      //From https://regexr.com/3dj5t
      const ytregex = new RegExp(
        /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/,
      );

      if (ytregex.test(videoLink as string)) {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setYoutubeVideo({
            src: videoLink as string,
          })
          .run();
      } else {
        if (videoLink !== null) {
          alert("Please enter a correct Youtube Video Link");
        }
      }
    },
  },
  {
    title: "Twitter",
    description: "嵌入一条Tweet。", // Embed a Tweet.
    searchTerms: ["twitter", "embed"],
    icon: <Twitter size={18} />,
    command: ({ editor, range }) => {
      const tweetLink = prompt("Please enter Twitter Link");
      const tweetRegex = new RegExp(/^https?:\/\/(www\.)?x\.com\/([a-zA-Z0-9_]{1,15})(\/status\/(\d+))?(\/\S*)?$/);

      if (tweetRegex.test(tweetLink as string)) {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setTweet({
            src: tweetLink as string,
          })
          .run();
      } else {
        if (tweetLink !== null) {
          alert("Please enter a correct Twitter Link");
        }
      }
    },
  },
]);

export const slashCommand = Command.configure({
  suggestion: {
    items: () => suggestionItems,
    render: renderItems,
  },
});
