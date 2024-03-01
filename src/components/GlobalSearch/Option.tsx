'use client';
import { Box, Flex, Icon, IconButton } from '@chakra-ui/react';
import { MdOpenInNew } from 'react-icons/md';
import { OptionProps } from 'react-select';
import type { OptionType } from './index';

export function Option(props: OptionProps<OptionType>) {
  const {
    children,
    className,
    cx,
    getStyles,
    isDisabled,
    isFocused,
    isSelected,
    innerRef,
    innerProps,
  } = props;

  return (
    <Box
      ref={innerRef}
      css={getStyles('option', props)}
      className={cx(
        {
          'option': true,
          'option--is-disabled': isDisabled,
          'option--is-focused': isFocused,
          'option--is-selected': isSelected,
        },
        className,
      )}
      {...innerProps}
    >
      <Flex
        align="center"
        as="span"
        display="inline-flex"
        position="relative"
        w="100%"
      >
        {children}
        <Box
          as="span"
          color="#898989"
          fontSize="xs"
          ml={1}
        >
          {props.data.value}
        </Box>
        <IconButton
          aria-label="Abrir em uma nova aba"
          as="a"
          bg="white"
          href={props.data.value}
          icon={<Icon as={MdOpenInNew} />}
          position="absolute"
          rel="noreferrer noopener"
          right="0"
          size="xs"
          target="_blank"
          variant="outline"
          onClick={(e) => e.stopPropagation()}
        />
      </Flex>
    </Box>
  );
}
