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
    // Remove HTML tags from text
    const plainText = text.replace(/<[^>]*>/g, ' ');
    if (plainText.length > maxLength) {
      return plainText.substring(0, maxLength) + "...";
    }
    return plainText;
  };
  return (
    <div>
      <div className="h-[430px] w-full rounded-2xl bg-white transition duration-500 ease-in-out cursor-pointer border-2 hover:bg-blue-50 relative border overflow-hidden">
        <div className="relative">
          <Image
            src={onImage}
            alt="event-image"
            width={500}
            height={500}
            className="rounded-2xl h-64 object-cover w-full"
          />
          {onTags.length > 0 ? (
            <span className="p-2 rounded-2xl bg-white text-black absolute top-2 left-2 text-xs font-medium border">
              {onTags}
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="p-2 text-black">
          <div className="font-bold text-lg truncate">{onTitle}</div>
          <div className="break-words" dangerouslySetInnerHTML={{ __html: truncateText(onPost, 100) }}/>
        </div>
        <div className="p-2 absolute bottom-0 text-right w-full">
          <div className="font-medium text-black">{onDate}</div>
          <div className="font-medium text-blue-400">{truncateText(onAuthor, 15)}</div>
        </div>
      </div>
    </div>
  );
}
