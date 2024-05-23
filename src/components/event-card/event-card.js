import React from 'react';
import Image from 'next/image';

export default function EventCard({
  onImage,
  onTags,
  onTitle,
  onPost,
  onAuthor,
}) {
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };
  return (
    <div>
      <div className="h-72 rounded-2xl bg-white transition duration-500 ease-in-out cursor-pointer shadow hover:bg-blue-50 relative">
        <div className="relative">
          <Image
            src={onImage}
            alt="event-image"
            width={500}
            height={500}
            className="rounded-2xl h-44 object-cover w-full"
          />
          <span className="p-2 rounded-2xl bg-white absolute top-2 left-2 text-xs font-medium">
            {onTags}
          </span>
        </div>
        <div className="p-2">
          <h1 className="font-bold truncate">{onTitle}</h1>
          <p className="break-all">{truncateText(onPost, 50)}</p>
        </div>
        <div className="p-2 absolute bottom-0 text-right w-full">
          <p className="font-medium text-blue-400">{onAuthor}</p>
        </div>
      </div>
    </div>
  );
}
