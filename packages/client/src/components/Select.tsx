import { Select } from 'grommet';
import React from 'react';

const SelectFilter = () => {
  const [value, setValue] = React.useState('');

  return (
    <Select
      options={[]}
      value={value}
      placeholder={'Filtrar por'}
      onChange={({ option }) => setValue(option)}
    />
  );
};

export default SelectFilter;
