import React from 'react';

export default function Card({ id, title }) {
  return (
    <div className="border border-2 border-[#fad74f] rounded-tr-2xl rounded-bl-2xl p-3 h-32 md:h-28 lg:h-24">
      <div className="font-bold text-3xl">{id}</div>
      <div className="font-medium">{title}</div>
    </div>
  );
}
