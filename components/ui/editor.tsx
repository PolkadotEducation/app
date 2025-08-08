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
  jsxPlugin,
  JsxComponentDescriptor,
  JsxEditorProps,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { FC, useEffect, useState } from "react";
import { ResponsiveIframe } from "./responsiveIframe";

interface EditorProps {
  markdown: string;
  readOnly?: boolean;
  onChange?: (_markdown: string) => void;
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
}

// Custom editor component that renders ResponsiveIframe
const ResponsiveIframeEditor: FC<JsxEditorProps> = ({ mdastNode }) => {
  // Extract attributes safely
  const attributes = mdastNode.attributes || [];
  const srcAttr = attributes.find((attr) => (attr as { name: string }).name === "src");
  const titleAttr = attributes.find((attr) => (attr as { name: string }).name === "title");

  const src = srcAttr?.value as string;
  const title = titleAttr?.value as string;

  return (
    <div className="my-4">
      <ResponsiveIframe src={src} title={title} />
    </div>
  );
};

const ResponsiveIframeDescriptor: JsxComponentDescriptor = {
  name: "ResponsiveIframe",
  kind: "flow",
  source: "@/components/ui/responsiveIframe",
  props: [
    {
      name: "src",
      type: "string",
    },
    {
      name: "title",
      type: "string",
    },
  ],
  hasChildren: false,
  Editor: ResponsiveIframeEditor,
};

const ALL_PLUGINS = [
  toolbarPlugin({ toolbarContents: () => <KitchenSinkToolbar /> }),
  listsPlugin(),
  quotePlugin(),
  headingsPlugin(),
  linkPlugin(),
  linkDialogPlugin(),
  imagePlugin({
    imageAutocompleteSuggestions: ["https://via.placeholder.com/150", "https://via.placeholder.com/150"],
    imageUploadHandler: async () => Promise.resolve("https://picsum.photos/200/300"),
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
  jsxPlugin({
    jsxComponentDescriptors: [ResponsiveIframeDescriptor],
  }),
  diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: "boo" }),
  markdownShortcutPlugin(),
];

const Editor: FC<EditorProps> = ({ markdown, onChange, editorRef = null }) => {
  const [key, setKey] = useState(0);

  // TODO Find a better way to force re-render of this component
  useEffect(() => {
    setKey((prev) => prev + 1);
  }, []);

  return (
    <MDXEditor
      key={key}
      ref={editorRef}
      markdown={markdown}
      plugins={ALL_PLUGINS}
      onChange={onChange}
      className="bg-slate-100"
    />
  );
};

export default Editor;
