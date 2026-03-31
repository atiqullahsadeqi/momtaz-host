"use client";

import { IconCloud } from "@/components/ui/icon-cloud";

const slugs = [
  "swift",
  "kotlin",
  "dart",
  "flutter",
  "react",
  "android",
  "apple",
  "firebase",
  "typescript",
  "javascript",
  "graphql",
  "postgresql",
  "redux",
  "gradle",
  "xcode",
  "androidstudio",
  "figma",
  "testinglibrary",
  "git",
  "github",
  "docker",
  "amazonaws",
];

const images = slugs.map(
  (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
);

export default function MobileIconCloud() {
  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden">
      <IconCloud images={images} />
    </div>
  );
}
