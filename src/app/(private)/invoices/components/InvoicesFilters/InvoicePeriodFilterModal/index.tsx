'use client';

import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import { ptBR } from 'date-fns/locale/pt-BR';
import { useState } from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import { currentDate, firstDayOfTheMonth } from '../../../utils/date';
import { createPeriod } from '../../../utils/period';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('pt-BR', ptBR);
setDefaultLocale('pt-BR');

type InvoicePeriodFilterModalProps = {
  onClose: () => void;
  onSubmit: (period: string) => void;
  open: boolean;
};

export function InvoicePeriodFilterModal({
  onClose,
  onSubmit,
  open,
}: InvoicePeriodFilterModalProps) {
  const [periodStartDate, setPeriodStartDate] = useState<Date | null>(null);
  const [periodEndDate, setPeriodEndDate] = useState<Date | null>(null);

  const handleClickPeriodToday = () => {
    onSubmit(createPeriod(currentDate, currentDate));
    onClose();
  };

  const handleClickPeriodYesterday = () => {
    const oneDayInMs = 24 * 60 * 60 * 1000;
    const yesterday = new Date(currentDate.getTime() - oneDayInMs);
    onSubmit(createPeriod(yesterday, yesterday));
    onClose();
  };

  const handleClickPeriodLast7Days = () => {
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
    const last7Days = new Date(currentDate.getTime() - sevenDaysInMs);
    onSubmit(createPeriod(last7Days, currentDate));
    onClose();
  };

  const handleClickPeriodLast30Days = () => {
    const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
    const last30Days = new Date(currentDate.getTime() - thirtyDaysInMs);
    onSubmit(createPeriod(last30Days, currentDate));
    onClose();
  };

  const handleClickPeriodCurrentMonth = () => {
    onSubmit(createPeriod(firstDayOfTheMonth(currentDate), currentDate));
    onClose();
  };

  const handleClickPeriodLastMonth = () => {
    const firstDayOfTheLastMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1,
    );

    const oneDayInMs = 24 * 60 * 60 * 1000;
    const lastDayOfTheLastMonth = new Date(currentDate.getTime() - oneDayInMs);

    onSubmit(createPeriod(firstDayOfTheLastMonth, lastDayOfTheLastMonth));
    onClose();
  };

  const handleCustomPeriodChange = (dates: [Date | null, Date | null]) => {
    setPeriodStartDate(dates[0]);
    setPeriodEndDate(dates[1]);

    if (dates[0] && dates[1]) {
      onSubmit(createPeriod(dates[0], dates[1]));
      onClose();
    }
  };

  return (
    <Modal
      isOpen={open}
      size="xs"
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Período</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            direction="column"
            gap={2}
          >
            <Button
              size="sm"
              variant="outline"
              onClick={handleClickPeriodToday}
            >
              Hoje
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleClickPeriodYesterday}
            >
              Ontem
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleClickPeriodLast7Days}
            >
              Últimos 7 dias
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleClickPeriodLast30Days}
            >
              Últimos 30 dias
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleClickPeriodCurrentMonth}
            >
              Este mês
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleClickPeriodLastMonth}
            >
              Mês passado
            </Button>
            <DatePicker
              endDate={periodEndDate}
              selected={periodStartDate}
              startDate={periodStartDate}
              customInput={
                <Button
                  size="sm"
                  variant="outline"
                  w="100%"
                >
                  Personalizado
                </Button>
              }
              selectsRange
              onChange={handleCustomPeriodChange}
            />
          </Flex>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}
