import React from 'react';
import Image from 'next/image';

export default function Third() {
  return (
    <div>
      <h1 className="font-extrabold text-3xl">SEJARAH</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="mt-0 lg:mt-[-100px] flex justify-center items-center">
          <Image
            src={'/images/pdvector.png'}
            alt="model perisai diri"
            width={500}
            height={500}
          />
        </div>
        <div className="pb-10">
          <p className="break-words text-justify">
            Perisai Diri atau lengkapnya bisa disebut Kelatnas Indonesia Perisai
            Diri adalah organisasi olahraga yang didirikan oleh R.M. Soebandiman
            Dirdjoatmojo putra bangsawan Keraton Paku Alam pada tanggal 2 Juli
            1955 di Surabaya, Jawa Timur. Kelatnas Indonesia Perisai Diri
            merupakan salah satu anggota IPSI (Ikatan Pencak Silat Indonesia),
            induk organisasi resmi pencak silat di Indonesia di bawah naungan
            KONI (Komite Olahraga Nasional Indonesia). Kelatnas Indonesia
            Perisai Diri merupakan salah satu dari 10 perguruan pencak silat
            yang mendapatkan predikat Perguruan Historis Pencak Silat karena
            memberikan kontribusi dan pengaruh terhadap sejarah perkembangan
            IPSI serta pencak silat secara umum pada era awal terbentuknya IPSI.
          </p>
          <p className="font-light break-words text-[#aaa7ab]">
            (Source: https://pd.ukm.ugm.ac.id/2020/12/18/mengenal-perisai-diri/)
          </p>
        </div>
      </div>
    </div>
  );
}
