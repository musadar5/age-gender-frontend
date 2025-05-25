"use client";
import React, { useState } from "react";

export default function Home() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    const res = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center transition-all duration-500 hover:shadow-indigo-300">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">👁️‍🗨️ Age & Gender Detector</h1>

        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="w-full text-sm text-gray-600
                     file:mr-4 file:py-2 file:px-6
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-indigo-100 file:text-indigo-700
                     hover:file:bg-indigo-200 cursor-pointer mb-6"
        />

        {preview && (
          <div className="mb-6">
            <img
              src={preview}
              alt="Uploaded"
              className="w-40 h-40 mx-auto object-cover rounded-full shadow-lg border-4 border-indigo-300"
            />
          </div>
        )}

        {loading && (
          <div className="text-sm text-gray-500 animate-pulse">
            ⏳ Analyzing image...
          </div>
        )}

        {result && (
          <div className="mt-6 bg-gray-100 p-4 rounded-xl text-left">
            <p className="text-xl text-gray-700 font-semibold mb-2">
              🎂 Predicted Age: <span className="text-indigo-600">{result.age}</span>
            </p>
            <p className="text-xl text-gray-700 font-semibold">
              🚻 Predicted Gender: <span className="text-indigo-600">{result.gender}</span>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
