import React from 'react';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import locale from 'antd/es/date-picker/locale/pt_BR';
import 'dayjs/locale/pt-br';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs'




export  function InputDate(props) {
  const { value, onChange } = props;

  const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    onChange(date ? date.valueOf() : null)
    console.log(typeof value)
  };

  return (
    <Space direction="vertical">
      <DatePicker format={'DD/MM/YYYY'} locale={locale} value={value ? dayjs(value) : null} onChange={onChangeDate} />
    </Space>
  )
};
