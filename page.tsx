"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDogs() {
      try {
        const res = await fetch("http://localhost:1337/api/dogs?populate=Image");
        const data = await res.json();
        setDogs(data.data || []);
      } catch (err) {
        console.error("Error fetching dogs:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDogs();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl">
        Loading dogs... 🐶
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Dogs Gallery 🐕</h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {dogs.map((dog: any) => {
          const imgUrl = dog?.Image?.data?.attributes?.url;



          return (
            <div
              key={dog.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
            >
              {imgUrl && (
  <img
    src={`http://localhost:1337${imgUrl}`}
    alt={dog.Name}
    className="w-full h-48 object-cover"
  />
)}


              <div className="p-4">
                <h2 className="text-xl font-semibold">{dog.Name}</h2>
                <p className="text-gray-600">Breed: {dog.Breed}</p>
                <p className="text-gray-600">Age: {dog.Age} years</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}