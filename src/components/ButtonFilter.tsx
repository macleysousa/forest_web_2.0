import { Button, ButtonProps, Icon, Text } from '@chakra-ui/react';
import { MdFilterList } from 'react-icons/md';

export const ButtonFilter: React.FC<ButtonProps> = ({ ...props }) => {
  return (
    <Button
      variant="outline"
      {...props}
      bg="#fff"
    >
      <Icon
        as={MdFilterList}
        mr=".5rem"
      />
      <Text
        fontSize="14px"
        fontWeight="400"
      >
        Filtros
      </Text>
    </Button>
  );
};
