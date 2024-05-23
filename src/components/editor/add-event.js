'use client';
import React, { useState } from 'react';
import { AddEventDashboard } from '@/libs';
import Image from 'next/image';

export default function FormEvent() {
  const [inputEvent, setInputEvent] = useState({
    title: '',
    post_article: '',
    tags: '',
    image: '',
  });
  const [imageUpload, setImageUpload] = useState(null);

  const handleAddEvent = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', inputEvent.title);
    formData.append('post_article', inputEvent.post_article);
    formData.append('tags', inputEvent.tags);
    formData.append('image', imageUpload);
    await AddEventDashboard(formData);
    setInputEvent({ title: '', post_article: '', tags: '', image: '' });
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInputEvent({ ...inputEvent, [name]: value });
  };

  const handleChangeImage = (e) => {
    setImageUpload(e.target.files[0]);
    e.target.files[0] &&
      setInputEvent({
        ...inputEvent,
        image: URL.createObjectURL(e.target.files[0]),
      });
  };

  return (
    <div>
      <label htmlFor="file" className="block">
        <Image
          src={(imageUpload && inputEvent.image) || '/images/noimage.png'}
          alt="Preview"
          className="mb-5 rounded-md border border-gray-300 w-96 h-60 rounded-lg object-cover"
          width={100}
          height={100}
        />
      </label>
      <input
        id="file"
        type="file"
        name="image"
        onChange={handleChangeImage}
        className="hidden"
      />
      <div className="flex flex-col gap-5 mb-5">
        <input
          type="text"
          name="title"
          value={inputEvent.title}
          onChange={handleChangeInput}
          placeholder="Title"
          className="p-3 outline-none bg-white rounded-md w-full"
        />
        <textarea
          name="post_article"
          value={inputEvent.post_article}
          onChange={handleChangeInput}
          cols="30"
          rows="10"
          className="w-full outline-none p-3 rounded-md"
          placeholder="Article"
        ></textarea>
        <input
          type="text"
          name="tags"
          value={inputEvent.tags}
          onChange={handleChangeInput}
          placeholder="Tags"
          className="p-3 outline-none bg-white rounded-md w-full"
        />
        <button
          className="p-3 bg-[#dc0000] rounded-md font-bold text-white hover:bg-green-400 transition duration-500 ease-in-out"
          onClick={handleAddEvent}
        >
          Tambahkan
        </button>
      </div>
    </div>
  );
}