import React from "react";
import Link from "next/link";
function BlogpostCard({ post }) {
  console.log(post["slug"]);

  console.log("blog/" + post.slug);

  return (
    <div
      key={post.slug}
      className="flex flex-col rounded-lg shadow-lg overflow-hidden"
    >
      <div className="flex-shrink-0">
        <img
          className="h-48 w-full object-cover"
          src={post.frontmatter.cover_image}
          alt=""
        />
      </div>
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-indigo-600">
            <a href="#" className="hover:underline">
              to be filled
            </a>
          </p>
          <Link href={`blog/${post.slug}`}>
            <a className="block mt-2">
              <p className="text-xl font-semibold text-gray-900">
                {post.frontmatter.title}
              </p>
              <p className="mt-3 text-base text-gray-500">
                {post.frontmatter.excerpt}
              </p>
            </a>
          </Link>
        </div>
        <div className="flex mt-4">
          <div className="text-gray-500 text-sm">
            <time dateTime={post.datetime}>{post.date}</time>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogpostCard;
