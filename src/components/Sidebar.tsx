import { Link } from '@chakra-ui/next-js';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  Icon,
  Image,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';

import { useWindowSize } from '@uidotdev/usehooks';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { MdMenu } from 'react-icons/md';

import { options } from '../configs/sidebar';

export function Sidebar() {
  const pathname = usePathname();
  const { isOpen } = useDisclosure();
  const { width } = useWindowSize();
  const [collapse, setCollapse] = useState(isOpen);

  const tablet = width && width < 1080;

  useEffect(() => {
    if (tablet) {
      setCollapse(true);
    }
  }, [tablet]);

  return (
    <Box
      animate={{ width: isOpen ? 500 : 85 }}
      animation={collapse ? 'close 0.5s ease-in-out' : 'open 0.5s ease-in-out'}
      as={motion.div}
      bg="#110834"
      color="#bcbcbc"
      height="100dvh"
      initial={false}
      minW={collapse ? '4rem' : '16rem'}
      overflowY="scroll"
      transition="all 0.5s ease-in-out"
      css={{
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#636363',
          borderRadius: '24px',
        },
        '&::-webkit-scrollbar-track': {
          mr: '3px',
          width: '6px',
        },
      }}
      onAnimationComplete={() => setCollapse(!isOpen)}
      onAnimationStart={() => setCollapse(false)}
    >
      <Center m="1rem 0 2rem 0">
        <Icon
          as={MdMenu}
          cursor="pointer"
          h="24px"
          mr={collapse ? '0' : '2rem'}
          w="24px"
          onClick={() => setCollapse(!collapse)}
        />
        <Image
          alt="petroplus logo"
          display={collapse ? 'none' : 'block'}
          src="/petroplus.png"
          transition="all 0.8s ease-in-out"
          w="8rem"
        />
      </Center>
      <VStack
        align="left"
        gap="1rem"
        padding="0 1rem"
      >
        {options.map((option) =>
          'path' in option ? (
            <Button
              key={option.id}
              as={Link}
              bg="transparent"
              color="white"
              fontSize="md"
              gap={3}
              h="3.25rem"
              href={option.path}
              isActive={pathname.startsWith(option.path)}
              justifyContent="flex-start"
              lineHeight="shorter"
              px={3}
              _active={{
                bg: '#1d1242',
                color: 'blue.500',
                textDecoration: 'none',
              }}
              _hover={{
                bg: '#1d1242',
                color: 'blue.500',
                textDecoration: 'none',
              }}
              leftIcon={
                <Icon
                  as={option.icon}
                  fontSize="2xl"
                />
              }
            >
              <Box
                as="span"
                display={collapse ? 'none' : 'block'}
                transition="all 0.8s ease-in-out"
              >
                {option.name}
              </Box>
            </Button>
          ) : (
            <Accordion
              key={option.id}
              defaultIndex={[pathname.includes(option.rootPath) ? 0 : -1]}
              allowMultiple
            >
              <AccordionItem
                borderWidth={0}
                sx={{ '&:last-of-type': { borderWidth: 0 } }}
              >
                <AccordionButton
                  color="white"
                  fontSize="md"
                  gap={3}
                  h="3.25rem"
                  lineHeight="shorter"
                  px={3}
                  _hover={{
                    bg: '#1d1242',
                    color: 'blue.500',
                    textDecoration: 'none',
                  }}
                >
                  <Icon
                    as={option.icon}
                    fontSize="2xl"
                  />
                  <Box
                    as="span"
                    display={collapse ? 'none' : 'block'}
                    flex="1"
                    fontWeight="600"
                    textAlign="left"
                    transition="all 0.8s ease-in-out"
                  >
                    {option.name}
                  </Box>
                  <AccordionIcon
                    display={collapse ? 'none' : 'block'}
                    fontSize="2xl"
                  />
                </AccordionButton>
                <AccordionPanel p={0}>
                  <VStack
                    align="left"
                    gap={0}
                    px={0}
                  >
                    {option.items.map((item) => (
                      <Button
                        key={item.id}
                        as={Link}
                        bg="transparent"
                        color="#a09cae"
                        fontSize="md"
                        gap={3}
                        h="2.5rem"
                        href={item.path}
                        isActive={pathname.endsWith(item.path)}
                        justifyContent="flex-start"
                        px={9}
                        _active={{
                          bg: '#1d1242',
                          color: 'blue.500',
                          textDecoration: 'none',
                        }}
                        _hover={{
                          bg: '#1d1242',
                          color: 'blue.500',
                          textDecoration: 'none',
                        }}
                      >
                        <Box
                          as="span"
                          display={collapse ? 'none' : 'block'}
                        >
                          {item.name}
                        </Box>
                      </Button>
                    ))}
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          ),
        )}
      </VStack>
    </Box>
  );
}
