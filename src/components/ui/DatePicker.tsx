import { Icon, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { RangeDatepicker, RangeDatepickerProps } from 'chakra-dayzed-datepicker';
import { dayNames, monthNames } from 'src/commons/dateUtils';

interface DatePickerProps {
  onChange: (dates: Date[]) => void;
  datePickerProps?: RangeDatepickerProps;
}

export default function InputDatePicker({ onChange, datePickerProps, ...props }: DatePickerProps) {
  const [selectedDates, setSelectedDates] = useState<Date[]>([new Date(), new Date()]);

  const handleOnDateChange = (dates: Date[]) => {
    setSelectedDates(dates);
    onChange(dates);
  };

  return (
    <InputGroup {...props} width="20rem" zIndex="999" bg="#fff">
      <InputLeftElement pl="20px" color="#898989">
        Data:
      </InputLeftElement>
      <InputRightElement>
        <Icon as={MdArrowDropDown} />
      </InputRightElement>

      <RangeDatepicker
        name="date-input"
        selectedDates={selectedDates}
        onDateChange={handleOnDateChange}
        propsConfigs={{
          popoverCompProps: {
            popoverBodyProps: {
              zIndex: 'auto',
            },
          },
          inputProps: {
            pl: '4rem',
            pr: '2rem',
            width: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
        }}
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
