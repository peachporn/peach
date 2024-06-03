import { Tag } from "@/components/atoms/tag";
import { cn } from "@/lib/cn";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";

type LinkType = {
  label: string;
  href: string;
};

export type MovieCardProps = {
  title: string;
  href?: string;
  duration?: string;
  screencap: string;
  actresses?: LinkType[];
  tags?: LinkType[];
  website?: LinkType;
  negativeIndex: number;
};

export const MovieCard = ({
  title,
  href,
  screencap,
  duration,
  actresses,
  website,
  tags,
  negativeIndex,
}: MovieCardProps) => (
  <div
    style={{ zIndex: negativeIndex }}
    className={cn(
      styles.card,
      "text-neutral-black group relative isolate block aspect-video cursor-pointer overflow-visible rounded-xl bg-[var(--color)] ring-[var(--color)] transition-all",
      "hover:scale-105 hover:ring-8"
    )}
  >
    <div className='absolute top-1 z-20 px-2 transition-opacity group-hover:opacity-0'>
      <div className='mt-1 flex w-full items-center gap-1'>
        {tags?.slice(0, 3).map((tag) => (
          <Tag variant='light' color='white' href={tag.href} key={tag.label}>
            {tag.label}
          </Tag>
        ))}
      </div>
    </div>
    <div className='text-neutral-white absolute bottom-1 z-20 flex w-full transform-gpu items-center justify-between gap-2 px-2 transition-transform group-hover:translate-y-8'>
      <Link href={href ?? "#"}>
        <h4 className='overflow-hidden text-ellipsis whitespace-nowrap'>{title}</h4>
      </Link>
      {duration && <span className='rounded bg-[rgba(0,0,0,.2)] p-0.5 text-xs'>{duration}</span>}
    </div>
    <div className='size-full rounded-xl bg-[var(--color)] transition-all group-hover:rounded-b-none'>
      <Link href={href ?? "#"}>
        <Image
          alt={title}
          className='animate-fadSlidee size-full rounded-xl bg-[var(--color)] object-cover transition-all'
          src={screencap}
          width={300}
          height={(300 / 16) * 9}
        />
      </Link>
    </div>
    <div
      className={cn(
        "text-background absolute bottom-0 isolate -z-10 flex w-full transform-gpu flex-col items-start rounded-b-xl bg-[var(--color)] p-2 pb-2 pt-3 shadow-md ring-[var(--color)] transition-[box-shadow_transform] group-hover:translate-y-[98%] group-hover:ring-8"
      )}
    >
      <div className='h-8' />
      <div className='flex w-full items-center justify-between'>
        {(tags ?? [])?.length === 0 ? null : (
          <div className='flex w-full items-center gap-1'>
            {tags?.map((tag) => (
              <Tag variant='light' color='purple' href={tag.href} key={tag.label}>
                {tag.label}
              </Tag>
            ))}
          </div>
        )}
        {website && (
          <Tag
            variant='light'
            color='blue'
            className='whitespace-nowrap text-xs'
            href={website.href}
          >
            {website.label}
          </Tag>
        )}
      </div>
      {(actresses ?? []).length === 0 ? null : (
        <div className='mt-2 flex w-full items-center gap-1 overflow-hidden'>
          {actresses?.map((actress) => (
            <Tag
              href={actress.href}
              key={actress.label}
              variant='light'
              color='yellow'
              className='inline-block whitespace-nowrap text-xs'
            >
              {actress.label}
            </Tag>
          ))}
        </div>
      )}
    </div>
  </div>
);
