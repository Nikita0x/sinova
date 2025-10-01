'use client';
import { Card } from '../../components/Card';
import { useEffect, useState } from 'react';
import type { Breed } from '../../interfaces/breeds.interface';
import data from '../../mock.json';
import Loader from '../../components/Loader';

export default function App() {
  const [breeds, setBreeds] = useState<Breed[]>([]);

  useEffect(() => {
    // fetchData();
    setBreeds(data);
  }, []);

  async function fetchData() {
    const response = await fetch('https://api.thedogapi.com/v1/breeds', {
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_DOG_API_KEY!,
      },
    });
    const data = await response.json();
    setBreeds(data);
  }

  if (!breeds.length)
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <>
      <div className="grid grid-cols-1 gap-5 p-5 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {breeds.map((item, index) => (
          <Card {...item} key={index} />
        ))}
      </div>
    </>
  );
}
