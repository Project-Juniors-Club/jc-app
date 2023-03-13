import { CloseIcon } from '@chakra-ui/icons';
import { Box, Image, Text, CloseButton } from '@chakra-ui/react';
import { RegisterOptions, UseFormReturn, useWatch } from 'react-hook-form';
import CustomButton from './Button';
import { useRef } from 'react';

type UploadImageButtonWithPreviewProps = {
  registerLabel: string;
  registerOptions?: RegisterOptions;
  useFormReturns: UseFormReturn;
  selectedImageUrl?: string;
  imageHeight?: string;
  imageWidth?: string;
  imagePadding?: number;
};

const UploadImageButtonWithPreview = ({
  registerLabel,
  registerOptions,
  useFormReturns: { register, watch, setValue, resetField },
  selectedImageUrl,
  imageHeight,
  imageWidth,
  imagePadding,
}: UploadImageButtonWithPreviewProps) => {
  const { ref, onChange, ...rest } = register(registerLabel, { value: [], ...registerOptions });
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
          <Box p={imagePadding ?? 1.5}>
            <Image
              src={previewImageUrl}
              alt='Question Cover Image Preview'
              width={imageWidth ?? '100%'}
              height={imageHeight ?? '100%'}
              zIndex={1}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default UploadImageButtonWithPreview;
