import React from 'react';
import { janji } from '@/libs';
import Card from '../card/card';

export default function Second() {
  return (
    <div>
      <h1 className="pt-14 font-extrabold text-3xl mb-10 text-white">
        JANJI PERISAI DIRI
      </h1>
      <div className="grid gap-5 grid-cols-2 text-white">
        {janji?.map((item, index) => {
          return (
            <div key={index}>
              <Card id={item.id} title={item.title} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
