"use client";

import {
  MDXEditor,
  MDXEditorMethods,
  diffSourcePlugin,
  markdownShortcutPlugin,
  AdmonitionDirectiveDescriptor,
  directivesPlugin,
  frontmatterPlugin,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  KitchenSinkToolbar,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { FC } from "react";

interface EditorProps {
  markdown: string;
  readOnly?: boolean;
  onChange?: (markdown: string) => void;
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
}

const ALL_PLUGINS = [
  toolbarPlugin({ toolbarContents: () => <KitchenSinkToolbar /> }),
  listsPlugin(),
  quotePlugin(),
  headingsPlugin(),
  linkPlugin(),
  linkDialogPlugin(),
  imagePlugin({
    imageAutocompleteSuggestions: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
    imageUploadHandler: async () =>
      Promise.resolve("https://picsum.photos/200/300"),
  }),
  tablePlugin(),
  thematicBreakPlugin(),
  frontmatterPlugin(),
  codeBlockPlugin({ defaultCodeBlockLanguage: "" }),
  codeMirrorPlugin({
    codeBlockLanguages: {
      js: "JavaScript",
      css: "CSS",
      txt: "Plain Text",
      tsx: "TypeScript",
      "": "Unspecified",
    },
  }),
  directivesPlugin({
    directiveDescriptors: [AdmonitionDirectiveDescriptor],
  }),
  diffSourcePlugin({ viewMode: "source", diffMarkdown: "boo" }),
  markdownShortcutPlugin(),
];

const READONLY_PLUGINS = [
  listsPlugin(),
  quotePlugin(),
  headingsPlugin(),
  linkPlugin(),
  linkDialogPlugin(),
  imagePlugin({
    imageAutocompleteSuggestions: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
    imageUploadHandler: async () =>
      Promise.resolve("https://picsum.photos/200/300"),
  }),
  tablePlugin(),
  thematicBreakPlugin(),
  frontmatterPlugin(),
  codeBlockPlugin({ defaultCodeBlockLanguage: "" }),
  codeMirrorPlugin({
    codeBlockLanguages: {
      js: "JavaScript",
      css: "CSS",
      txt: "Plain Text",
      tsx: "TypeScript",
      "": "Unspecified",
    },
  }),
  directivesPlugin({
    directiveDescriptors: [AdmonitionDirectiveDescriptor],
  }),
  markdownShortcutPlugin(),
];

const Editor: FC<EditorProps> = ({
  markdown,
  readOnly = false,
  editorRef = null,
  onChange = (markdown: string) => {
    console.info(markdown);
  },
}) => {
  return (
    <MDXEditor
      onChange={onChange}
      ref={editorRef}
      markdown={markdown}
      readOnly={readOnly}
      plugins={readOnly ? READONLY_PLUGINS : ALL_PLUGINS}
    />
  );
};

export default Editor;
