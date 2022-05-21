import React from "react";

const BADGECOLORS = {
  AWS: "red",
  Lambda: "red",
  EventBridge: "red",
  Python: "yellow",
  boto3: "yellow",
};

export default function BlogpostBadges({ key, badgetype, size = "small" }) {
  return (
    <span
      key={key}
      className={`inline-flex items-center ${
        size == "small" ? "px-2.5" : "px-5"
      } py-0.5 rounded-full ${
        size == "small" ? "text-xs" : "text-base"
      } font-medium bg-${
        BADGECOLORS[badgetype] ? BADGECOLORS[badgetype] : "gray"
      }-100 text-${
        BADGECOLORS[badgetype] ? BADGECOLORS[badgetype] : "gray"
      }-800 m-1`}
    >
      {badgetype}
    </span>
  );
}
