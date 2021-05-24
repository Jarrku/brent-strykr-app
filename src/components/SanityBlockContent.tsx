import { PortableText } from '@/lib/sanity/sanity';

export type SanityBlockContent = { __type: 'sanity_block' }[];

export function BlockContent({ blocks }: { blocks: SanityBlockContent }) {
  return <PortableText blocks={blocks} />;
}
