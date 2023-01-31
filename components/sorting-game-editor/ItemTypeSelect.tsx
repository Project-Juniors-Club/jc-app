import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup } from '@chakra-ui/react';
import { UseFormReturn } from 'react-hook-form';

type ItemTypeSelectProp = {
  registerLabel: string;
  defaultType?: 'text' | 'image';
  useFormReturns: UseFormReturn;
};

const TYPE_DISPLAY_TEXT = {
  text: 'Text',
  image: 'Image',
};

const ItemTypeSelect = ({ registerLabel, defaultType = 'text', useFormReturns: { watch, register, setValue } }: ItemTypeSelectProp) => {
  register(registerLabel, { value: defaultType });
  const optionTypeWatch: string = watch(registerLabel, defaultType);
  type OptionType = keyof typeof TYPE_DISPLAY_TEXT;
  // since optionTypeWatch is a string, it can be used as an index to access the TYPE_DISPLAY_TEXT object
  const optionTypeDisplay = TYPE_DISPLAY_TEXT[optionTypeWatch as OptionType] || '';

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
        {optionTypeDisplay}
      </MenuButton>
      <MenuList>
        <MenuOptionGroup defaultValue='text' type='radio' onChange={val => setValue(registerLabel, val)}>
          <MenuItemOption value='text'>{TYPE_DISPLAY_TEXT.text}</MenuItemOption>
          <MenuItemOption value='image'>{TYPE_DISPLAY_TEXT.image}</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default ItemTypeSelect;
