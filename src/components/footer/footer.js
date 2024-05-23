import React from 'react';
import Image from 'next/image';

export default function Footer() {
  return (
    <div className="grid gap-10 grid-cols-1 lg:grid-cols-3">
      <div className="flex justify-center lg:justify-start">
        <Image
          src={'/images/pdlogo.svg'}
          alt="logo perisai diri"
          width={200}
          height={200}
        />
      </div>
      <div>
        <p className="font-bold text-white mb-5 text-xl">Media Social</p>
        <div className="flex items-center gap-3">
          <Image
            src={'/images/instagram.svg'}
            alt="icon-ig"
            width={30}
            height={30}
          />
          <p className="font-medium text-white hover:text-blue-500 cursor-pointer transition duration-500 ease-in-out">
            <a href="https://instagram.com/perisaidirisleman" target="_blank">
              Perisai Diri Sleman
            </a>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Image
            src={'/images/gmail.svg'}
            alt="icon-ig"
            width={30}
            height={30}
          />
          <p className="font-medium text-white hover:text-blue-500 cursor-pointer transition duration-500 ease-in-out">
            <a href="mailto:info.pdsleman@gmail.com" target="_blank">
              Perisai Diri Sleman
            </a>
          </p>
        </div>
      </div>
      <div>
        <p className="font-bold text-white mb-5 cursor-pointer text-xl">
          Sekretariat
        </p>
        <p className="font-medium text-white">
          Jl. Gelatik NO. 161 B Mancasan Lor Condongcatur Depok Sleman
          Yogyakarta
        </p>
      </div>
    </div>
  );
}
