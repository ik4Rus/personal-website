import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { Link } from "next/link";
import BlogpostBadges from "../../components/BlogpostBadges";

import CodeBlock from "../../components/CodeBlock";

function BlogPost({ frontmatter, slug, content }) {
  return (
    <>
      <div className="relative mt-4">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
            <div className="absolute inset-0">
              <img
                className="h-full w-full object-cover blur-sm"
                src={frontmatter.cover_image}
                alt="Cover image"
              />
              <div className="absolute inset-0 bg-gray-500 mix-blend-multiply" />
            </div>
            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
              <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block text-white">{frontmatter.title}</span>
                <p>
                  {frontmatter.badges.split("|").map((singlebadge) => (
                    <BlogpostBadges
                      key={`${singlebadge}-${slug}`}
                      badgetype={singlebadge}
                      size="medium"
                    />
                  ))}
                </p>
              </h1>
              <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-1 sm:gap-5">
                  <a
                    href="/blog"
                    className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-red-700 bg-white hover:bg-indigo-50 sm:px-8"
                  >
                    Back to blog
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="m-8 mx-auto prose dark:prose-invert max-w-4xl">
        <ReactMarkdown components={CodeBlock}>{content}</ReactMarkdown>
      </div>
    </>
  );
}

export default BlogPost;

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("blog-posts"));
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join("blog-posts", slug + ".md"),
    "utf-8"
  );
  let { data: frontmatter, content } = matter(markdownWithMeta);
  content = content.replaceAll("(/public/", "(/");
  return {
    props: { frontmatter, slug, content },
  };
}
