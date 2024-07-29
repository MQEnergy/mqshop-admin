import {withProps} from '@udecode/cn';
import {createPlugins, Plate, RenderAfterEditable, PlateLeaf} from '@udecode/plate-common';
import {createParagraphPlugin, ELEMENT_PARAGRAPH} from '@udecode/plate-paragraph';
import {
  createHeadingPlugin,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6
} from '@udecode/plate-heading';
import {createBlockquotePlugin, ELEMENT_BLOCKQUOTE} from '@udecode/plate-block-quote';
import {
  createCodeBlockPlugin,
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE,
  ELEMENT_CODE_SYNTAX
} from '@udecode/plate-code-block';
import {createHorizontalRulePlugin, ELEMENT_HR} from '@udecode/plate-horizontal-rule';
import {createLinkPlugin, ELEMENT_LINK} from '@udecode/plate-link';
import {createImagePlugin, ELEMENT_IMAGE, createMediaEmbedPlugin, ELEMENT_MEDIA_EMBED} from '@udecode/plate-media';
import {createExcalidrawPlugin, ELEMENT_EXCALIDRAW} from '@udecode/plate-excalidraw';
import {createTogglePlugin, ELEMENT_TOGGLE} from '@udecode/plate-toggle';
import {createColumnPlugin, ELEMENT_COLUMN_GROUP, ELEMENT_COLUMN} from '@udecode/plate-layout';
import {createCaptionPlugin} from '@udecode/plate-caption';
import {createTablePlugin, ELEMENT_TABLE, ELEMENT_TR, ELEMENT_TD, ELEMENT_TH} from '@udecode/plate-table';
import {createTodoListPlugin, ELEMENT_TODO_LI} from '@udecode/plate-list';
import {
  createBoldPlugin,
  MARK_BOLD,
  createItalicPlugin,
  MARK_ITALIC,
  createUnderlinePlugin,
  MARK_UNDERLINE,
  createStrikethroughPlugin,
  MARK_STRIKETHROUGH,
  createCodePlugin,
  MARK_CODE,
  createSubscriptPlugin,
  MARK_SUBSCRIPT,
  createSuperscriptPlugin,
  MARK_SUPERSCRIPT
} from '@udecode/plate-basic-marks';
import {createFontColorPlugin, createFontBackgroundColorPlugin, createFontSizePlugin} from '@udecode/plate-font';
import {createHighlightPlugin, MARK_HIGHLIGHT} from '@udecode/plate-highlight';
import {createKbdPlugin, MARK_KBD} from '@udecode/plate-kbd';
import {createAlignPlugin} from '@udecode/plate-alignment';
import {createIndentPlugin} from '@udecode/plate-indent';
import {createIndentListPlugin} from '@udecode/plate-indent-list';
import {createLineHeightPlugin} from '@udecode/plate-line-height';
import {createAutoformatPlugin} from '@udecode/plate-autoformat';
import {createBlockSelectionPlugin} from '@udecode/plate-selection';
import {createDndPlugin} from '@udecode/plate-dnd';
import {createEmojiPlugin} from '@udecode/plate-emoji';
import {createExitBreakPlugin, createSoftBreakPlugin} from '@udecode/plate-break';
import {createNodeIdPlugin} from '@udecode/plate-node-id';
import {createResetNodePlugin} from '@udecode/plate-reset-node';
import {createDeletePlugin} from '@udecode/plate-select';
import {createTabbablePlugin} from '@udecode/plate-tabbable';
import {createTrailingBlockPlugin} from '@udecode/plate-trailing-block';
import {createCommentsPlugin, CommentsProvider, MARK_COMMENT} from '@udecode/plate-comments';
import {createDeserializeDocxPlugin} from '@udecode/plate-serializer-docx';
import {createDeserializeCsvPlugin} from '@udecode/plate-serializer-csv';
import {createDeserializeMdPlugin} from '@udecode/plate-serializer-md';
import {createJuicePlugin} from '@udecode/plate-juice';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

import {BlockquoteElement} from '@/components/plate-ui/blockquote-element.tsx';
import {CodeBlockElement} from '@/components/plate-ui/code-block-element.tsx';
import {CodeLineElement} from '@/components/plate-ui/code-line-element.tsx';
import {CodeSyntaxLeaf} from '@/components/plate-ui/code-syntax-leaf.tsx';
import {ExcalidrawElement} from '@/components/plate-ui/excalidraw-element.tsx';
import {HrElement} from '@/components/plate-ui/hr-element.tsx';
import {ImageElement} from '@/components/plate-ui/image-element.tsx';
import {LinkElement} from '@/components/plate-ui/link-element.tsx';
import {LinkFloatingToolbar} from '@/components/plate-ui/link-floating-toolbar.tsx';
import {ToggleElement} from '@/components/plate-ui/toggle-element.tsx';
import {ColumnGroupElement} from '@/components/plate-ui/column-group-element.tsx';
import {ColumnElement} from '@/components/plate-ui/column-element.tsx';
import {HeadingElement} from '@/components/plate-ui/heading-element.tsx';
import {MediaEmbedElement} from '@/components/plate-ui/media-embed-element.tsx';
import {ParagraphElement} from '@/components/plate-ui/paragraph-element.tsx';
import {TableElement} from '@/components/plate-ui/table-element.tsx';
import {TableRowElement} from '@/components/plate-ui/table-row-element.tsx';
import {TableCellElement, TableCellHeaderElement} from '@/components/plate-ui/table-cell-element.tsx';
import {TodoListElement} from '@/components/plate-ui/todo-list-element.tsx';
import {CodeLeaf} from '@/components/plate-ui/code-leaf.tsx';
import {CommentLeaf} from '@/components/plate-ui/comment-leaf.tsx';
import {CommentsPopover} from '@/components/plate-ui/comments-popover.tsx';
import {HighlightLeaf} from '@/components/plate-ui/highlight-leaf.tsx';
import {KbdLeaf} from '@/components/plate-ui/kbd-leaf.tsx';
import {Editor} from '@/components/plate-ui/editor.tsx';
import {FixedToolbar} from '@/components/plate-ui/fixed-toolbar.tsx';
import {FixedToolbarButtons} from '@/components/plate-ui/fixed-toolbar-buttons.tsx';
import {FloatingToolbar} from '@/components/plate-ui/floating-toolbar.tsx';
import {FloatingToolbarButtons} from '@/components/plate-ui/floating-toolbar-buttons.tsx';
import {withPlaceholders} from '@/components/plate-ui/placeholder.tsx';
import {withDraggables} from '@/components/plate-ui/with-draggables.tsx';

const plugins = createPlugins(
  [
    createParagraphPlugin(),
    createHeadingPlugin(),
    createBlockquotePlugin(),
    createCodeBlockPlugin(),
    createHorizontalRulePlugin(),
    createLinkPlugin({
      renderAfterEditable: LinkFloatingToolbar as RenderAfterEditable,
    }),
    createImagePlugin(),
    createExcalidrawPlugin(),
    createTogglePlugin(),
    createColumnPlugin(),
    createMediaEmbedPlugin(),
    createCaptionPlugin({
      options: {
        pluginKeys: [
          // ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED
        ]
      },
    }),
    createTablePlugin(),
    createTodoListPlugin(),
    createBoldPlugin(),
    createItalicPlugin(),
    createUnderlinePlugin(),
    createStrikethroughPlugin(),
    createCodePlugin(),
    createSubscriptPlugin(),
    createSuperscriptPlugin(),
    createFontColorPlugin(),
    createFontBackgroundColorPlugin(),
    createFontSizePlugin(),
    createHighlightPlugin(),
    createKbdPlugin(),
    createAlignPlugin({
      inject: {
        props: {
          validTypes: [
            ELEMENT_PARAGRAPH,
            // ELEMENT_H1, ELEMENT_H2, ELEMENT_H3
          ],
        },
      },
    }),
    createIndentPlugin({
      inject: {
        props: {
          validTypes: [
            ELEMENT_PARAGRAPH,
            // ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_BLOCKQUOTE, ELEMENT_CODE_BLOCK
          ],
        },
      },
    }),
    createIndentListPlugin({
      inject: {
        props: {
          validTypes: [
            ELEMENT_PARAGRAPH,
            // ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_BLOCKQUOTE, ELEMENT_CODE_BLOCK
          ],
        },
      },
    }),
    createLineHeightPlugin({
      inject: {
        props: {
          defaultNodeValue: 1.5,
          validNodeValues: [1, 1.2, 1.5, 2, 3],
          validTypes: [
            ELEMENT_PARAGRAPH,
            // ELEMENT_H1, ELEMENT_H2, ELEMENT_H3
          ],
        },
      },
    }),
    createAutoformatPlugin({
      options: {
        rules: [
          // Usage: https://platejs.org/docs/autoformat
        ],
        enableUndoOnDelete: true,
      },
    }),
    createBlockSelectionPlugin({
      options: {
        sizes: {
          top: 0,
          bottom: 0,
        },
      },
    }),
    createDndPlugin({
      options: {enableScroller: true},
    }),
    createEmojiPlugin(),
    createExitBreakPlugin({
      options: {
        rules: [
          {
            hotkey: 'mod+enter',
          },
          {
            hotkey: 'mod+shift+enter',
            before: true,
          },
          {
            hotkey: 'enter',
            query: {
              start: true,
              end: true,
              // allow: KEYS_HEADING,
            },
            relative: true,
            level: 1,
          },
        ],
      },
    }),
    createNodeIdPlugin(),
    createResetNodePlugin({
      options: {
        rules: [
          // Usage: https://platejs.org/docs/reset-node
        ],
      },
    }),
    createDeletePlugin(),
    createSoftBreakPlugin({
      options: {
        rules: [
          {hotkey: 'shift+enter'},
          {
            hotkey: 'enter',
            query: {
              allow: [
                // ELEMENT_CODE_BLOCK, ELEMENT_BLOCKQUOTE, ELEMENT_TD
              ],
            },
          },
        ],
      },
    }),
    createTabbablePlugin(),
    createTrailingBlockPlugin({
      options: {type: ELEMENT_PARAGRAPH},
    }),
    createCommentsPlugin(),
    createDeserializeDocxPlugin(),
    createDeserializeCsvPlugin(),
    createDeserializeMdPlugin(),
    createJuicePlugin(),
  ],
  {
    components: withDraggables(withPlaceholders({
      [ELEMENT_BLOCKQUOTE]: BlockquoteElement,
      [ELEMENT_CODE_BLOCK]: CodeBlockElement,
      [ELEMENT_CODE_LINE]: CodeLineElement,
      [ELEMENT_CODE_SYNTAX]: CodeSyntaxLeaf,
      [ELEMENT_EXCALIDRAW]: ExcalidrawElement,
      [ELEMENT_HR]: HrElement,
      [ELEMENT_IMAGE]: ImageElement,
      [ELEMENT_LINK]: LinkElement,
      [ELEMENT_TOGGLE]: ToggleElement,
      [ELEMENT_COLUMN_GROUP]: ColumnGroupElement,
      [ELEMENT_COLUMN]: ColumnElement,
      [ELEMENT_H1]: withProps(HeadingElement, {variant: 'h1'}),
      [ELEMENT_H2]: withProps(HeadingElement, {variant: 'h2'}),
      [ELEMENT_H3]: withProps(HeadingElement, {variant: 'h3'}),
      [ELEMENT_H4]: withProps(HeadingElement, {variant: 'h4'}),
      [ELEMENT_H5]: withProps(HeadingElement, {variant: 'h5'}),
      [ELEMENT_H6]: withProps(HeadingElement, {variant: 'h6'}),
      [ELEMENT_MEDIA_EMBED]: MediaEmbedElement,
      [ELEMENT_PARAGRAPH]: ParagraphElement,
      [ELEMENT_TABLE]: TableElement,
      [ELEMENT_TR]: TableRowElement,
      [ELEMENT_TD]: TableCellElement,
      [ELEMENT_TH]: TableCellHeaderElement,
      [ELEMENT_TODO_LI]: TodoListElement,
      [MARK_BOLD]: withProps(PlateLeaf, {as: 'strong'}),
      [MARK_CODE]: CodeLeaf,
      [MARK_COMMENT]: CommentLeaf,
      [MARK_HIGHLIGHT]: HighlightLeaf,
      [MARK_ITALIC]: withProps(PlateLeaf, {as: 'em'}),
      [MARK_KBD]: KbdLeaf,
      [MARK_STRIKETHROUGH]: withProps(PlateLeaf, {as: 's'}),
      [MARK_SUBSCRIPT]: withProps(PlateLeaf, {as: 'sub'}),
      [MARK_SUPERSCRIPT]: withProps(PlateLeaf, {as: 'sup'}),
      [MARK_UNDERLINE]: withProps(PlateLeaf, {as: 'u'}),
    })),
  }
);

const initialValue = [
  {
    id: '1',
    type: 'p',
    children: [{text: '请输入商品详情...'}],
  },
];

export function PlateEditor() {
  return (
    <DndProvider backend={HTML5Backend}>
      <CommentsProvider users={{}} myUserId="1">
        <Plate plugins={plugins} initialValue={initialValue}>
          <FixedToolbar>
            <FixedToolbarButtons/>
          </FixedToolbar>
          <Editor className='min-h-[200px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0'/>

          <FloatingToolbar>
            <FloatingToolbarButtons/>
          </FloatingToolbar>
          <CommentsPopover/>
        </Plate>
      </CommentsProvider>
    </DndProvider>
  );
}