import { Icon, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import { dayNames, monthNames } from 'src/commons/dateUtils';

interface DatePickerProps {
  selectedDate: Date;
  onChange: (date: Date) => void;
  isClearable?: boolean;
}

export default function InputDatePicker({ selectedDate, onChange, isClearable = false, ...props }: DatePickerProps) {
  const [startDate, setStartDate] = useState(new Date());

  const handleDateSelect = (date: Date) => {
    setStartDate(date);
    onChange(date);
  };

  return (
    <InputGroup {...props} width="15rem" zIndex="999" bg="#fff">
      <InputLeftElement pl="20px" color="#898989">
        Data:
      </InputLeftElement>
      <InputRightElement>
        <Icon as={MdArrowDropDown} />
      </InputRightElement>

      <SingleDatepicker
        name="date-input"
        date={startDate}
        onDateChange={handleDateSelect}
        propsConfigs={{
          popoverCompProps: {
            popoverBodyProps: {
              zIndex: 'auto',
            },
          },
          inputProps: {
            pl: '5rem',
            w: '15rem',
          },
        }}
        configs={{
          dateFormat: 'dd/MM/yyyy',
          dayNames,
          monthNames,
        }}
      />
    </InputGroup>
  );
}
