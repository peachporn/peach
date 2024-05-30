import { LinkType } from "@/components/atoms/link";
import { Tag } from "@/components/atoms/tag";
import { cn } from "@/lib/cn";
import Image from "next/image";
import styles from "./styles.module.scss";

export type MovieCardProps = {
  title: string;
  duration?: string;
  screencap: string;
  actresses?: LinkType[];
  tags?: LinkType[];
  website?: LinkType;
  negativeIndex: number;
};

export const MovieCard = ({
  title,
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
      "relative group overflow-visible isolate cursor-pointer bg-[var(--color)] aspect-video transition-all ring-[var(--color)] text-neutral-black rounded-xl",
      "hover:ring-8 hover:scale-105"
    )}
  >
    <div className="absolute top-1 px-2 z-20 transition-opacity group-hover:opacity-0">
      <div className="flex gap-1 items-center w-full mt-1">
        {tags?.slice(0, 3).map((tag) => (
          <Tag variant="light" color="white" href={tag.href} key={tag.label}>
            {tag.label}
          </Tag>
        ))}
      </div>
    </div>
    <div className="absolute bottom-2 flex justify-between w-full items-center z-20 px-2 transform-gpu group-hover:translate-y-10 text-neutral-white gap-2 transition-transform">
      <h4 className="whitespace-nowrap font-bold text-ellipsis overflow-hidden">
        {title}
      </h4>
      {duration && (
        <span className="text-xs bg-[rgba(0,0,0,.2)] rounded p-0.5">
          {duration}
        </span>
      )}
    </div>
    <div className="size-full bg-[var(--color)] rounded-xl group-hover:rounded-b-none transition-all">
      <Image
        alt={title}
        className="object-cover size-full bg-[var(--color)] rounded-xl transition-all animate-fadSlidee"
        src={screencap}
        width={300}
        height={(300 / 16) * 9}
      />
    </div>
    <div
      className={cn(
        "absolute bottom-0 w-full text-background bg-[var(--color)] isolate -z-10 shadow-md rounded-b-xl transform-gpu group-hover:translate-y-[98%] flex flex-col items-start group-hover:ring-8 ring-[var(--color)] transition-[box-shadow_transform] p-2 pt-3 pb-2"
      )}
    >
      <div className="h-8" />
      <div className="flex justify-between w-full items-center">
        {(tags ?? [])?.length === 0 ? null : (
          <div className="flex gap-1 items-center w-full">
            {tags?.map((tag) => (
              <Tag
                variant="light"
                color="purple"
                href={tag.href}
                key={tag.label}
              >
                {tag.label}
              </Tag>
            ))}
          </div>
        )}
        {website && (
          <Tag
            variant="light"
            color="blue"
            className="text-xs whitespace-nowrap"
            href={website.href}
          >
            {website.label}
          </Tag>
        )}
      </div>
      {(actresses ?? []).length === 0 ? null : (
        <div className="gap-1 flex items-center w-full mt-2 overflow-hidden">
          {actresses?.map((actress) => (
            <Tag
              href={actress.href}
              key={actress.label}
              variant="light"
              color="yellow"
              className="text-xs inline-block whitespace-nowrap"
            >
              {actress.label}
            </Tag>
          ))}
        </div>
      )}
    </div>
  </div>
);
