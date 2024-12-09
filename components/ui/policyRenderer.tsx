"use client";

import { useEffect, useState } from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { getPrivacyPolicy } from "@/helpers/files";
import Logo from "@/components/ui/logo";
import Loading from "./loading";

const PolicyRenderer = ({ policyMarkdown }: { policyMarkdown: string }) => {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);

  useEffect(() => {
    const compileMDX = async () => {
      const markdown = await getPrivacyPolicy(policyMarkdown);
      const source = await serialize(markdown);
      setMdxSource(source);
    };
    if (!mdxSource) compileMDX();
  }, [mdxSource]);

  return (
    <main className="w-full flex justify-center p-10">
      <div className="flex flex-col max-w-[696px] mdxeditor pb-8">
        <Logo pathToRedirect="/login" />
        <div className="flex flex-col justify-center mt-2">
          {mdxSource ? (
            <MDXRemote {...mdxSource} />
          ) : (
            <div className="flex w-full justify-center">
              <Loading />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default PolicyRenderer;
