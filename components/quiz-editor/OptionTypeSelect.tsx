import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup } from '@chakra-ui/react';
import { UseFormReturn } from 'react-hook-form';

type OptionTypeSelectProp = {
  registerLabel: string;
  defaultType?: 'text' | 'image' | 'both';
  useFormReturns: UseFormReturn;
};

type TypeDisplayText = {
  text: string;
  image: string;
  both: string;
};

// record has a string index signature
const TYPE_DISPLAY_TEXT: Record<string, string> = {
  text: 'Text',
  image: 'Image',
  both: 'Both',
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
        minW='138px'
        textAlign='left'
        px={2}
      >
        {TYPE_DISPLAY_TEXT[optionTypeWatch]}
      </MenuButton>
      <MenuList>
        <MenuOptionGroup defaultValue='text' type='radio' onChange={val => setValue(registerLabel, val)}>
          <MenuItemOption value='text'>{TYPE_DISPLAY_TEXT.text}</MenuItemOption>
          <MenuItemOption value='image'>{TYPE_DISPLAY_TEXT.image}</MenuItemOption>
          <MenuItemOption value='both'>{TYPE_DISPLAY_TEXT.both}</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default OptionTypeSelect;
