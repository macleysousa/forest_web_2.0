'use client';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';

type CancelOrderDialogProps = {
  cancelRef: React.RefObject<HTMLButtonElement>;
  isOpen: boolean;
  onClose: () => void;
};

export function CancelOrderDialog({
  isOpen,
  cancelRef,
  onClose,
}: CancelOrderDialogProps) {
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader
            fontSize="lg"
            fontWeight="bold"
          >
            Cancelar Pedido
          </AlertDialogHeader>

          <AlertDialogBody>
            Tem certeza que deseja cancelar esse pedido?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              onClick={onClose}
            >
              Confirmar ação
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
