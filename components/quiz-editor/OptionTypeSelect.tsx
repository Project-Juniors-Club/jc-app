import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup } from '@chakra-ui/react';
import { UseFormReturn } from 'react-hook-form';

type OptionTypeSelectProp = {
  registerLabel: string;
  defaultType?: 'text' | 'image';
  useFormReturns: UseFormReturn;
};

const OptionTypeSelect = ({ registerLabel, defaultType = 'text', useFormReturns: { watch, register, setValue } }: OptionTypeSelectProp) => {
  register(registerLabel, { value: defaultType });
  const optionTypeWatch = watch(registerLabel, defaultType) as string;
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        bg='white'
        borderColor='#9E9E9E'
        borderWidth={1}
        fontWeight={400}
        fontSize={14}
        minW='100px'
        textAlign='left'
      >
        {optionTypeWatch == 'text' ? 'Text' : 'Image'}
      </MenuButton>
      <MenuList>
        <MenuOptionGroup defaultValue='text' type='radio' onChange={val => setValue(registerLabel, val)}>
          <MenuItemOption value='text'>Text</MenuItemOption>
          <MenuItemOption value='image'>Image</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default OptionTypeSelect;
