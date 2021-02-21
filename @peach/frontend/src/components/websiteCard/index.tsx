import { FunctionalComponent, h } from 'preact';
import { WebsiteCardFragment } from '@peach/types';
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
}) => (
  <div
    tabIndex={0}
    role="button"
    onClick={onClick || undefined}
    className={`w-full rounded shadow flex flex-col focus:outline-none ${className}`}
  >
    <Image
      className="h-40 object-contain w-full rounded-t"
      alt={website.name}
      src={website.picture}
    />
    <span className="bg-white p-2">{website.name}</span>
  </div>
);
