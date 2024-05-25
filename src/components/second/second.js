import React from 'react';
import Card from '../card/card';

export default function Second() {
  const janji = [
    {
      id: 1,
      title: 'Bertakwa kepada Tuhan Yang Maha Esa',
    },
    {
      id: 2,
      title: 'Setia dan taat pada negara',
    },
    {
      id: 3,
      title: 'Mendahulukan kepentingan negara',
    },
    {
      id: 4,
      title: 'Patuh pada perguruan',
    },
    {
      id: 5,
      title: 'Memupuk rasa kasih sayang',
    },
  ];
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
