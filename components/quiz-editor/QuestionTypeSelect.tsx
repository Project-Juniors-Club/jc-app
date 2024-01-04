import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup } from '@chakra-ui/react';
import { UseFormReturn } from 'react-hook-form';

type QuestionTypeSelectProp = {
  registerLabel: string;
  defaultType: 'mcq' | 'mrq';
  useFormReturns: UseFormReturn;
  onChange: () => void;
};

const QuestionTypeSelect = ({
  registerLabel,
  defaultType = 'mrq',
  useFormReturns: { watch, register, setValue },
  onChange,
}: QuestionTypeSelectProp) => {
  const mcqText = 'Multiple Choice (MCQ)';
  const mrqText = 'Multiple Response (MRQ)';
  register(registerLabel, { value: defaultType });
  const isMultipleResponse: boolean = watch(registerLabel, defaultType === 'mrq');
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
        w='100%'
        textAlign='left'
      >
        {isMultipleResponse ? mrqText : mcqText}
      </MenuButton>
      <MenuList zIndex={3}>
        <MenuOptionGroup
          defaultValue={defaultType}
          type='radio'
          onChange={val => {
            setValue(registerLabel, val === 'mrq');
            onChange();
          }}
        >
          <MenuItemOption value='mcq'>{mcqText}</MenuItemOption>
          <MenuItemOption value='mrq'>{mrqText}</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default QuestionTypeSelect;
