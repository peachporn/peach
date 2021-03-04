import { FunctionalComponent, h } from 'preact';
import { WebsiteCardFragment } from '@peach/types';
import { useState } from 'preact/hooks';
import { Image } from '../image';

type WebsiteCardProps = {
  website: WebsiteCardFragment;
  className?: string;
  noLabel?: boolean;
  onClick?: () => void;
};

export const WebsiteCard: FunctionalComponent<WebsiteCardProps> = ({
  website,
  className,
  noLabel,
  onClick,
}) => {
  const [imageErrored, setImageErrored] = useState(false);

  return (
    <div
      tabIndex={0}
      role="button"
      onClick={onClick || undefined}
      className={`h-full w-full rounded shadow flex flex-col focus:outline-none ${
        noLabel ? '' : 'focus:border-pink border-b-2 border-transparent'
      } ${className || ''}`}
    >
      <div
        className={`w-full h-full bg-gray-100 rounded-t ${noLabel ? 'rounded-b' : ''} ${
          imageErrored ? 'p-0' : 'p-3'
        }`}
      >
        <Image
          className={`h-full w-full ${imageErrored ? 'object-cover' : 'object-contain'} rounded-t`}
          alt={website.name}
          src={website.picture}
          onError={() => {
            setImageErrored(true);
          }}
        />
      </div>
      {noLabel ? null : (
        <span className="overflow-x-auto overflow-y-hidden bg-white p-2 rounded-b">
          {website.name}
        </span>
      )}
    </div>
  );
};
