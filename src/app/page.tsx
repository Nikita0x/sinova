    'use client';
    import { Card } from '../../components/Card';
    import { useEffect, useState } from 'react';
    import type { DogBreed, CatBreed, Breed } from '../../interfaces/breeds.interface';
    import data from '../../mock_dogs.json';
    import Loader from '../../components/Loader';

    export default function App() {
    const [breeds, setBreeds] = useState<Breed[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
  try {
    // fetch cats and dogs in parallel
    const [dogsRes, catsRes] = await Promise.all([
      fetch('https://api.thedogapi.com/v1/breeds', {
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_DOG_API_KEY!,
        },
      }),
      fetch('https://api.thecatapi.com/v1/breeds', {
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_CAT_API_KEY!,
        },
      }),
    ]);

    const [dogsRaw, catsRaw] = await Promise.all([
      dogsRes.json(),
      catsRes.json(),
    ]);



    // add type discriminator
    const dogs = dogsRaw.map((dog: DogBreed) => ({
      ...dog,
      type: "dog" as const,
    }));

    const cats = catsRaw.map((cat:CatBreed) => ({
      ...cat,
      type: "cat" as const,
    }));

    const merged:Breed[] = [...dogs, ...cats];
    const shuffled = merged.sort(() => Math.random() - 0.5);

    console.log(merged);

    setBreeds(shuffled);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
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
