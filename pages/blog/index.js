import fs from "fs";
import path from "path";
import matter from "gray-matter";
import React from "react";
import BlogpostCard from "../../components/BlogpostCard";

const posts = [
  {
    title: "Boost your conversion rate",
    slug: "writing-great-unit-testsundefined",
    href: "#",
    category: { name: "Article", href: "#" },
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos quis dolorum.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
    readingTime: "6 min",
    author: {
      name: "Roel Aufderehar",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    title: "How to use search engine optimization to drive sales",
    slug: "writing-great-unit-testsundefined",
    href: "#",
    category: { name: "Video", href: "#" },
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis asperiores porro quaerat doloribus, eveniet dolore. Adipisci tempora aut inventore optio animi., tempore temporibus quo laudantium.",
    date: "Mar 10, 2020",
    datetime: "2020-03-10",
    imageUrl:
      "https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
    readingTime: "4 min",
    author: {
      name: "Brenna Goyette",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    title: "Improve your customer experience",
    href: "#",
    slug: "writing-great-unit-testsundefined",
    category: { name: "Case Study", href: "#" },
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.",
    date: "Feb 12, 2020",
    datetime: "2020-02-12",
    imageUrl:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
    readingTime: "11 min",
    author: {
      name: "Daniela Metz",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
];

export default function Example({ own_posts }) {
  return (
    <div className="">
      <div className="relative max-w-7xl mx-auto">
        <div className="relative bg-white overflow-hidden border-t-2">
          <div className="relative pt-2 pb-16 sm:pb-24 lg:pb-32">
            <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6 lg:mt-16">
              <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                  <h1>
                    <span className="mt-1 block text-2xl tracking-tight font-extrabold sm:text-3xl xl:text-4xl">
                      <span className="block text-gray-900">
                        My personal blog about
                      </span>
                      <span className="block text-red-600">
                        Coding, Data Science & DevOps
                      </span>
                    </span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    I have benefited incredibly from people sharing their
                    knowledge online. So here is my approach to give a little
                    bit back and share my learnings.
                  </p>
                  <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                    <p className="text-base font-medium text-gray-900">
                      Sign up to get notified when it’s ready.
                    </p>
                    <form action="#" method="POST" className="mt-3 sm:flex">
                      <label htmlFor="email" className="sr-only">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="block w-full py-3 text-base rounded-md placeholder-gray-500 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:flex-1 border-gray-300"
                        placeholder="Enter your email"
                      />
                      <button
                        type="submit"
                        className="mt-3 w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto"
                      >
                        Notify me
                      </button>
                    </form>
                    <p className="mt-3 text-sm text-gray-500">
                      We care about the protection of your data. Read our
                      <a
                        href="#"
                        className="font-medium text-gray-900 underline"
                      >
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </div>
                </div>
                <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                  <svg
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 scale-75 origin-top sm:scale-100 lg:hidden"
                    width={640}
                    height={784}
                    fill="none"
                    viewBox="0 0 640 784"
                    aria-hidden="true"
                  >
                    <defs>
                      <pattern
                        id="4f4f415c-a0e9-44c2-9601-6ded5a34a13e"
                        x={118}
                        y={0}
                        width={20}
                        height={20}
                        patternUnits="userSpaceOnUse"
                      >
                        <rect
                          x={0}
                          y={0}
                          width={4}
                          height={4}
                          className="text-gray-200"
                          fill="currentColor"
                        />
                      </pattern>
                    </defs>
                    <rect
                      y={72}
                      width={640}
                      height={640}
                      className="text-gray-50"
                      fill="currentColor"
                    />
                    <rect
                      x={118}
                      width={404}
                      height={784}
                      fill="url(#4f4f415c-a0e9-44c2-9601-6ded5a34a13e)"
                    />
                  </svg>
                  <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                    <button
                      type="button"
                      className="relative block w-full bg-white rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <span className="sr-only">
                        Watch our video to learn more
                      </span>
                      <img
                        className="w-full"
                        src="https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                        alt=""
                      />
                      <span
                        className="absolute inset-0 w-full h-full flex items-center justify-center"
                        aria-hidden="true"
                      >
                        <svg
                          className="h-20 w-20 text-indigo-500"
                          fill="currentColor"
                          viewBox="0 0 84 84"
                        >
                          <circle
                            opacity="0.9"
                            cx={42}
                            cy={42}
                            r={42}
                            fill="white"
                          />
                          <path d="M55.5039 40.3359L37.1094 28.0729C35.7803 27.1869 34 28.1396 34 29.737V54.263C34 55.8604 35.7803 56.8131 37.1094 55.9271L55.5038 43.6641C56.6913 42.8725 56.6913 41.1275 55.5039 40.3359Z" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
          {own_posts.map((post) => (
            <BlogpostCard post={post} key={post.slug} />
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join("blog-posts"));
  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");
    const markdownWithMeta = fs.readFileSync(
      path.join("blog-posts", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWithMeta);

    return { slug, frontmatter };
  });

  return { props: { own_posts: posts } };
}
