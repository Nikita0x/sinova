'use client';
import { use } from 'react';
import { useEffect, useState } from 'react';
import type { DogBreed } from '../../../../interfaces/breeds.interface';
import Image from 'next/image';
import PopupImage from '../../../../components/PopupImage';
import Loader from '../../../../components/Loader';

interface BreedPageProps {
  params: Promise<{ slug: string }>;
}

interface BreedImagesObject {
  breeds: DogBreed[];
  id: string;
  height: number;
  width: number;
  url: string;
}

export default function BreedPage({ params }: BreedPageProps) {
  const { slug } = use(params);
  const [breed, setBreed] = useState<DogBreed | null>(null);
  const [images, setImages] = useState<BreedImagesObject[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const BREED_IMAGES_LIMIT = 6;

  useEffect(() => {
    fetch(`https://api.thedogapi.com/v1/breeds/${slug}`)
      .then((res) => res.json())
      .then(setBreed);

    fetch(
      `https://api.thedogapi.com/v1/images/search?breed_id=${slug}&limit=${BREED_IMAGES_LIMIT}`,
      {
        headers: { 'x-api-key': process.env.NEXT_PUBLIC_DOG_API_KEY! },
      }
    )
      .then((res) => res.json())
      .then(setImages);
  }, [slug]);

  if (!breed)
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <>
      <div className="p-4">
        <h1 className="text-3xl">{breed.name}</h1>

        {breed.bred_for && (
          <p>
            <span className="font-medium text-indigo-600">Purpose:</span>{' '}
            {breed.bred_for}
          </p>
        )}

        {breed.breed_group && (
          <p>
            <span className="font-medium text-green-600">Group:</span>{' '}
            {breed.breed_group}
          </p>
        )}

        {breed.temperament && (
          <p>
            <span className="font-medium text-amber-600">Temperament:</span>{' '}
            {breed.temperament}
          </p>
        )}

        <p>
          <span className="font-medium text-purple-600">Life span:</span>{' '}
          {breed.life_span}
        </p>

        <p>
          <span className="font-medium text-blue-600">Weight:</span> Imperial{' '}
          {breed.weight.imperial}, Metric {breed.weight.metric}
        </p>

        <div className="grid max-w-lg place-items-center gap-2 pt-5 sm:grid-cols-3">
          {images.map((item, index) => (
            <Image
              key={index}
              src={item.url}
              width={item.width}
              height={item.height}
              alt={`Image of the breed-${index}`}
              onClick={() => setSelectedImage(item.url)}
              className="h-auto w-full cursor-pointer rounded object-cover transition duration-300 hover:scale-[1.04]"
            />
          ))}
        </div>
      </div>
      {selectedImage && (
        <PopupImage
          url={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
}
