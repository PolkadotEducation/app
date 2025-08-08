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
import { useTheme } from "@/context/theme/themeProvider";

interface EditorProps {
  markdown: string;
  readOnly?: boolean;
  onChange?: (_markdown: string) => void;
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
}

const ResponsiveIframeEditor: FC<JsxEditorProps> = ({ mdastNode }) => {
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
  const { theme } = useTheme();

  // Force re-render when theme changes
  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [theme]);

  // Apply theme-aware styling with CSS custom properties
  const editorStyle =
    theme === "dark"
      ? ({
          backgroundColor: "hsl(var(--card))",
          color: "hsl(var(--card-foreground))",
          "--mdxeditor-bg": "hsl(var(--card))",
          "--mdxeditor-text": "hsl(var(--card-foreground))",
          "--mdxeditor-toolbar-bg": "hsl(var(--muted))",
          "--mdxeditor-border": "hsl(var(--border))",
        } as React.CSSProperties)
      : ({
          backgroundColor: "#f1f5f9",
          "--mdxeditor-bg": "#f1f5f9",
          "--mdxeditor-text": "#0f172a",
          "--mdxeditor-toolbar-bg": "#ffffff",
          "--mdxeditor-border": "#e2e8f0",
        } as React.CSSProperties);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .mdx-editor-wrapper.dark .mdxeditor {
            background-color: hsl(var(--card)) !important;
            color: hsl(var(--card-foreground)) !important;
            border-color: hsl(var(--border)) !important;
          }

          .mdx-editor-wrapper.dark .mdxeditor-toolbar {
            background-color: hsl(var(--muted)) !important;
            border-color: hsl(var(--border)) !important;
          }

          .mdx-editor-wrapper.dark .mdxeditor-rich-text-editor {
            background-color: hsl(var(--card)) !important;
            color: hsl(var(--card-foreground)) !important;
          }

          .mdx-editor-wrapper.dark .mdxeditor-toolbar button {
            color: hsl(var(--foreground)) !important;
          }

          .mdx-editor-wrapper.dark .mdxeditor-toolbar button:hover {
            background-color: hsl(var(--accent)) !important;
          }

          .mdx-editor-wrapper.dark .mdxeditor-popup {
            background-color: hsl(var(--popover)) !important;
            border-color: hsl(var(--border)) !important;
            color: hsl(var(--popover-foreground)) !important;
          }

          .mdx-editor-wrapper .mdxeditor {
            border-radius: 0.375rem;
          }
        `,
        }}
      />
      <div className={`mdx-editor-wrapper ${theme === "dark" ? "dark" : ""}`} style={editorStyle}>
        <MDXEditor
          key={key}
          ref={editorRef}
          markdown={markdown}
          plugins={ALL_PLUGINS}
          onChange={onChange}
          className="mdx-editor-themed"
        />
      </div>
    </>
  );
};

export default Editor;
