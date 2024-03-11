'use client';
import { Button, Flex } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

type InvoicesLoadMoreProps = {
  disabled: boolean;
  onClick: () => void;
  onIntersect: () => void;
};

export function InvoicesLoadMore({
  disabled,
  onClick,
  onIntersect,
}: InvoicesLoadMoreProps) {
  const loadMoreButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!loadMoreButtonRef.current) return;
    const threshold = 1;

    const observer = new IntersectionObserver(
      (entries) =>
        entries.some((entry) => entry.intersectionRatio === threshold) &&
        onIntersect(),
      { threshold },
    );

    observer.observe(loadMoreButtonRef.current);
    return () => observer.disconnect();
  }, [onIntersect]);

  return (
    <Flex
      justify="center"
      mt="2rem"
    >
      <Button
        ref={loadMoreButtonRef}
        bg="#FFFFFF"
        border="1px solid #1E93FF"
        color="#1E93FF"
        h="2.5rem"
        isDisabled={disabled}
        size="sm"
        variant="outline"
        onClick={() => onClick()}
      >
        Carregar mais
      </Button>
    </Flex>
  );
}
