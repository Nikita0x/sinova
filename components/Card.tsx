import type { Breed } from '../interfaces/breeds.interface';
import Image from 'next/image';
import Link from 'next/link';

export function Card(props: Breed) {
  return (
    <Link href={`/breed/${props.id}`}>
      <div className="relative flex flex-col overflow-hidden rounded-lg ">
        {props.image && (
          <div className="relative aspect-square w-full">
            <Image
              className="object-cover transition duration-300 hover:scale-[1.04] hover:rotate-1"
              fill
              alt={props.name}
              src={props.image.url}
              priority
            />
          </div>
        )}
        <p className="absolute bottom-0 w-full  truncate  p-2 text-center font-semibold backdrop-blur-sm">
          {props.name}
        </p>
      </div>
    </Link>
  );
}
