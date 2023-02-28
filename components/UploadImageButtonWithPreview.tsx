import { CloseIcon } from '@chakra-ui/icons';
import { Box, Image, Text, CloseButton } from '@chakra-ui/react';
import { RegisterOptions, UseFormReturn, useWatch } from 'react-hook-form';
import CustomButton from './Button';
import { ChangeEvent, useRef, useState } from 'react';
import { setConstantValue } from 'typescript';
import { register } from 'ts-node';
import { Image as PrismaImage } from '@prisma/client';

export type ImageWithUploadableFile = PrismaImage & { _uploadedFile?: File };

type UploadImageButtonWithPreviewProps = {
  registerLabel: string;
  registerOptions?: RegisterOptions;
  useFormReturns: UseFormReturn;
  image: ImageWithUploadableFile;
  selectedImageUrl?: string;
  imageHeight?: string;
  imageWidth?: string;
  imagePadding?: number;
};

const UploadImageButtonWithPreview = ({
  registerLabel,
  registerOptions,
  useFormReturns: { register, watch, setValue, resetField, control },
  image,
  selectedImageUrl,
  imageHeight,
  imageWidth,
  imagePadding,
}: UploadImageButtonWithPreviewProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const previewImageUrl: string = useWatch({ name: `${registerLabel}.url`, defaultValue: image?.url, control: control });

  const assetIdLabel = `${registerLabel}.assetId`;
  const urlLabel = `${registerLabel}.url`;
  const uploadedFileLabel = `${registerLabel}._uploadedFile`;
  register(assetIdLabel, { value: image?.assetId });
  register(urlLabel, { value: previewImageUrl });
  register(uploadedFileLabel, { value: null, ...registerOptions });

  return (
    <Box>
      {!previewImageUrl && (
        <Box>
          <input
            type='file'
            className='hidden'
            accept='.jpg,.png'
            ref={inputRef}
            onChange={e => {
              setValue(urlLabel, URL.createObjectURL(e.target.files[0]));
              setValue(uploadedFileLabel, e.target.files[0]);
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
              resetField(urlLabel, { defaultValue: null });
              resetField(uploadedFileLabel, { defaultValue: null });
              resetField(assetIdLabel, { defaultValue: null });
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
