'use client';
import { Flex, Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';

export type Tag = {
  label: string;
  onClose: () => void;
  show: boolean;
  value: string;
};

type InvoicesTagsProps = {
  tags: Tag[];
};

export function InvoicesTags({ tags }: InvoicesTagsProps) {
  if (tags.every((tag) => !tag.show)) {
    return null;
  }

  return (
    <Flex
      flexWrap="wrap"
      gap={2}
      mt={6}
    >
      {tags.map(
        (tag) =>
          tag.show && (
            <Tag
              key={tag.label}
              colorScheme="blue"
            >
              <TagLabel>
                {tag.label}: {tag.value}
              </TagLabel>
              <TagCloseButton onClick={tag.onClose} />
            </Tag>
          ),
      )}
    </Flex>
  );
}
