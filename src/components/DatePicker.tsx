import {
  Icon,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';

import {
  RangeDatepicker,
  RangeDatepickerProps,
} from 'chakra-dayzed-datepicker';

import { useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { dayNames, monthNames } from '../configs/datepicker';

type DatePickerProps = {
  datePickerProps?: RangeDatepickerProps;
  initialSelectedDates?: Date[];
  onChange: (dates: Date[]) => void;
};

export function DatePicker({
  onChange,
  datePickerProps,
  initialSelectedDates,
  ...props
}: DatePickerProps) {
  const [selectedDates, setSelectedDates] = useState<Date[]>([
    initialSelectedDates?.[0] || new Date(),
    initialSelectedDates?.[1] || new Date(),
  ]);

  const handleOnDateChange = (dates: Date[]) => {
    setSelectedDates(dates);
    onChange(dates);
  };

  return (
    <InputGroup
      {...props}
      bg="#fff"
      width="20rem"
      zIndex="999"
    >
      <InputLeftElement
        color="#898989"
        pl="20px"
      >
        Data:
      </InputLeftElement>
      <InputRightElement>
        <Icon as={MdArrowDropDown} />
      </InputRightElement>

      <RangeDatepicker
        name="date-input"
        selectedDates={selectedDates}
        propsConfigs={{
          inputProps: {
            overflow: 'hidden',
            pl: '4rem',
            pr: '2rem',
            textOverflow: 'ellipsis',
            width: '100%',
          },
          popoverCompProps: {
            popoverBodyProps: {
              zIndex: 'auto',
            },
          },
        }}
        onDateChange={handleOnDateChange}
        {...datePickerProps}
        configs={{
          dateFormat: 'dd/MM/yyyy',
          dayNames,
          monthNames,
        }}
      />
    </InputGroup>
  );
}
