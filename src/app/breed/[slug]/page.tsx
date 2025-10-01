'use client';
import { use } from 'react';
import { useEffect, useState, useCallback } from 'react';
import type {
  DogBreed,
  CatBreed,
  Breed,
} from '../../../../interfaces/breeds.interface';
import Image from 'next/image';
import PopupImage from '../../../../components/PopupImage';
import Loader from '../../../../components/Loader';

interface BreedPageProps {
  params: Promise<{ slug: string }>;
}

interface BreedImagesObject {
  breeds: DogBreed[] | CatBreed[];
  id: string;
  height: number;
  width: number;
  url: string;
}

export default function BreedPage({ params }: BreedPageProps) {
  const { slug } = use(params);
  const [breed, setBreed] = useState<Breed | null>(null);
  const [images, setImages] = useState<BreedImagesObject[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const BREED_IMAGES_LIMIT = 6;

  const fetchBreedData = useCallback(async () => {
    setIsLoading(true);
    try {

      const isDogId = !isNaN(Number(slug));

      if (isDogId) {
        // Fetch dog breed
        const [breedRes, imagesRes] = await Promise.all([
          fetch(`https://api.thedogapi.com/v1/breeds/${slug}`),
          fetch(
            `https://api.thedogapi.com/v1/images/search?breed_id=${slug}&limit=${BREED_IMAGES_LIMIT}`,
            {
              headers: { 'x-api-key': process.env.NEXT_PUBLIC_DOG_API_KEY! },
            }
          ),
        ]);

        if (breedRes.ok) {
          const breedData = await breedRes.json();
          const imagesData = await imagesRes.json();

          setBreed({ ...breedData, type: 'dog' as const });
          setImages(imagesData);
          return;
        }
      }

      const [breedRes, imagesRes] = await Promise.all([
        fetch(`https://api.thecatapi.com/v1/breeds/${slug}`, {
          headers: { 'x-api-key': process.env.NEXT_PUBLIC_CAT_API_KEY! },
        }),
        fetch(
          `https://api.thecatapi.com/v1/images/search?breed_ids=${slug}&limit=${BREED_IMAGES_LIMIT}`,
          {
            headers: { 'x-api-key': process.env.NEXT_PUBLIC_CAT_API_KEY! },
          }
        ),
      ]);

      if (breedRes.ok) {
        const breedData = await breedRes.json();
        const imagesData = await imagesRes.json();

        setBreed({ ...breedData, type: 'cat' as const });
        setImages(imagesData);
      }
    } catch (error) {
      console.error('Error fetching breed data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchBreedData();
  }, [fetchBreedData]);

  if (isLoading || !breed)
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <>
      <div className="p-4">
        <h1 className="text-3xl">{breed.name}</h1>

        {breed.type === 'dog' && breed.bred_for && (
          <p>
            <span className="font-medium text-indigo-600">Purpose:</span>{' '}
            {breed.bred_for}
          </p>
        )}

        {breed.type === 'dog' && breed.breed_group && (
          <p>
            <span className="font-medium text-green-600">Group:</span>{' '}
            {breed.breed_group}
          </p>
        )}

        {breed.type === 'cat' && breed.origin && (
          <p>
            <span className="font-medium text-green-600">Origin:</span>{' '}
            {breed.origin}
          </p>
        )}

        {breed.type === 'cat' && breed.description && (
          <p>
            <span className="font-medium text-indigo-600">Description:</span>{' '}
            {breed.description}
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

        {breed.type === 'dog' && breed.height && (
          <p>
            <span className="font-medium text-red-600">Height:</span> Imperial{' '}
            {breed.height.imperial}, Metric {breed.height.metric}
          </p>
        )}

        {breed.type === 'cat' && (
          <div className="mt-4 space-y-2">
            <p>
              <span className="font-medium text-pink-600">Indoor:</span>{' '}
              {breed.indoor ? 'Yes' : 'No'}
            </p>
            <p>
              <span className="font-medium text-cyan-600">Hypoallergenic:</span>{' '}
              {breed.hypoallergenic ? 'Yes' : 'No'}
            </p>
            <div className="flex gap-2 text-sm">
              <div>
                <p>Adaptability: {breed.adaptability}/5</p>
                <p>Affection Level: {breed.affection_level}/5</p>
                <p>Child Friendly: {breed.child_friendly}/5</p>
              </div>
              <div>
                <p>Energy Level: {breed.energy_level}/5</p>
                <p>Intelligence: {breed.intelligence}/5</p>
                <p>Social Needs: {breed.social_needs}/5</p>
              </div>
            </div>
          </div>
        )}

        <div className="mx-auto grid max-w-lg place-items-center gap-2 pt-5 sm:grid-cols-3">
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
