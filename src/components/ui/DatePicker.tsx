import { Icon, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { forwardRef, useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';

import DatePicker, { ReactDatePickerProps } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerProps {
  selectedDate: Date;
  onChange: (date: Date) => void;
  isClearable?: boolean;
  showPopperArrow?: boolean;
}

const customDateInput = ({ value, onClick, onChange, ...props }: any, ref: any) => (
  <InputGroup>
    <InputLeftElement pl="20px" color="#898989">
      Data:
    </InputLeftElement>
    <InputRightElement>
      <Icon as={MdArrowDropDown} />
    </InputRightElement>
    <Input
      pl="60px"
      pr="20px"
      autoComplete="off"
      background="white"
      value={value}
      ref={ref}
      onClick={onClick}
      onChange={onChange}
      {...props}
    />
  </InputGroup>
);
customDateInput.displayName = 'DateInput';
const CustomInput = forwardRef(customDateInput);

export default function InputDatePicker({
  selectedDate,
  onChange,
  isClearable = false,
  showPopperArrow = false,
  ...props
}: DatePickerProps & ReactDatePickerProps) {
  const [startDate, setStartDate] = useState(new Date());

  const handleDateSelect = (date: Date) => {
    setStartDate(date);
    onChange(date);
  };

  return (
    <DatePicker
      {...props}
      selected={startDate}
      onChange={(date) => console.log(date)}
      onSelect={handleDateSelect}
      isClearable={isClearable}
      showPopperArrow={showPopperArrow}
      dateFormat="dd MMM yyyy"
      customInput={<CustomInput {...props} />}
    />
  );
}
