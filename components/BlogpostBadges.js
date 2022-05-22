import React from "react";

const BADGECOLORS = {
  AWS: "red",
  Lambda: "red",
  "API Gateway": "red",
  Cognito: "red",
  EventBridge: "red",
  Python: "yellow",
  boto3: "yellow",
};

const COLORDETAILS = {
  red: { badge: "rgb(254 202 202)", text: "rgb(153 27 27)" },
  yellow: { badge: "rgb(253 230 138)", text: "rgb(146 64 14)" },
  gray: { badge: "rgb(243 244 246)", text: "rgb(31 41 55)" },
};

export default function BlogpostBadges({ key, badgetype, size = "small" }) {
  const color_bg = BADGECOLORS[badgetype]
    ? COLORDETAILS[BADGECOLORS[badgetype]]["badge"]
    : COLORDETAILS["gray"]["badge"];
  const text_col = BADGECOLORS[badgetype]
    ? COLORDETAILS[BADGECOLORS[badgetype]]["text"]
    : COLORDETAILS["gray"]["text"];

  return (
    <span
      key={key}
      className={`inline-flex items-center ${
        size == "small" ? "px-2.5" : "px-5"
      } py-0.5 rounded-full ${
        size == "small" ? "text-xs" : "text-base"
      } font-medium1 m-1 shadow-sm text-gray-800`}
      style={{ backgroundColor: color_bg, color: text_col }}
    >
      {badgetype}
    </span>
  );
}
