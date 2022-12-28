import { AddIcon, ChevronDownIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Image,
  Textarea,
  Text,
  Menu,
  MenuOptionGroup,
  MenuItemOption,
  MenuButton,
  Button,
  MenuList,
  CloseButton,
  Icon,
  Radio,
  Checkbox,
  VStack,
  Input,
} from '@chakra-ui/react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import CustomButton from '../Button';
import { ChangeEvent, useRef, useState } from 'react';
import { setConstantValue } from 'typescript';
import { register } from 'ts-node';

type UploadImageButtonWithPreviewProps = {
  registerLabel: string;
  useFormReturns: UseFormReturn;
  selectedImageUrl?: string;
};

const UploadImageButtonWithPreview = ({
  registerLabel,
  useFormReturns: { register, watch, setValue, resetField },
  selectedImageUrl,
}: UploadImageButtonWithPreviewProps) => {
  const { ref, onChange, ...rest } = register(registerLabel, { value: [] });
  const inputRef = useRef<HTMLInputElement | null>(null);

  const previewUrlRegisterLabel = `${registerLabel}.previewImageUrl`;
  register(previewUrlRegisterLabel, { value: selectedImageUrl });
  const previewImageUrl = watch(previewUrlRegisterLabel, selectedImageUrl) as string;

  return (
    <Box>
      {!previewImageUrl && (
        <Box>
          <input
            type='file'
            className='hidden'
            accept='.jpg,.png'
            {...rest}
            ref={e => {
              ref(e);
              inputRef.current = e;
            }}
            onChange={e => {
              onChange(e);
              setValue(previewUrlRegisterLabel, URL.createObjectURL(e.target.files[0]));
            }}
          />
          <Box display='flex' justifyContent={'flex-end'}>
            <CustomButton
              variant={'green-outline'}
              onClick={event => {
                event.preventDefault();
                inputRef.current.click();
              }}
            >
              <Text textColor='#385600' fontFamily='Open Sans' fontSize={14}>
                Upload Image
              </Text>
            </CustomButton>
          </Box>
        </Box>
      )}

      {previewImageUrl && (
        <Box>
          <CloseButton
            rounded='full'
            bg='#F2F2F2'
            h='4'
            w='4'
            onClick={() => {
              resetField(registerLabel);
              resetField(previewUrlRegisterLabel);
            }}
            pos='absolute'
            zIndex={2}
          >
            <CloseIcon h='1.5' />
          </CloseButton>
          <Box p={1.5}>
            <Image src={previewImageUrl} alt='Question Cover Image Preview' width='100%' height='100%' zIndex={1} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default UploadImageButtonWithPreview;
