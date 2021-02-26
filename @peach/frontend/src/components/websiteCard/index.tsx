import { FunctionalComponent, h } from 'preact';
import { WebsiteCardFragment } from '@peach/types';
import { useState } from 'preact/hooks';
import { Image } from '../image';

type WebsiteCardProps = {
  website: WebsiteCardFragment;
  className?: string;
  onClick?: () => void;
};

export const WebsiteCard: FunctionalComponent<WebsiteCardProps> = ({
  website,
  className,
  onClick,
}) => {
  const [imageErrored, setImageErrored] = useState(false);

  return (
    <div
      tabIndex={0}
      role="button"
      onClick={onClick || undefined}
      className={`h-full w-full rounded shadow flex flex-col focus:outline-none ${className} ${
        imageErrored ? 'px-0' : 'px-3'
      }`}
    >
      <Image
        className={`h-full ${imageErrored ? 'object-cover' : 'object-contain'} w-full rounded-t`}
        alt={website.name}
        src={website.picture}
        onError={() => {
          setImageErrored(true);
        }}
      />
      <span className="bg-white p-2">{website.name}</span>
    </div>
  );
};
