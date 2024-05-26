import React from "react";
import Image from "next/image";

export default function EventCard({
  onImage,
  onTags,
  onTitle,
  onPost,
  onAuthor,
  onDate
}) {
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };
  return (
    <div>
      <div className="h-96 w-full rounded-2xl bg-white transition duration-500 ease-in-out cursor-pointer border-2 hover:bg-blue-50 relative border">
        <div className="relative">
          <Image
            src={onImage}
            alt="event-image"
            width={500}
            height={500}
            className="rounded-2xl h-64 object-cover w-full"
          />
          {onTags.length > 0 ? (
            <span className="p-2 rounded-2xl bg-white absolute top-2 left-2 text-xs font-medium border">
              {onTags}
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="p-2 text-black">
          <div className="font-bold truncate text-lg">{onTitle}</div>
          <div className="break-all" dangerouslySetInnerHTML={{ __html: truncateText(onPost, 50) }}/>
        </div>
        <div className="p-2 absolute bottom-0 text-right w-full">
          <p className="font-medium">{onDate}</p>
          <p className="font-medium text-blue-400">{onAuthor}</p>
        </div>
      </div>
    </div>
  );
}
