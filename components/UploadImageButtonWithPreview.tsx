import { CloseIcon } from '@chakra-ui/icons';
import { Box, Image as ChakraImage, Text, CloseButton, FormErrorMessage, FormControl, useDisclosure } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { RegisterOptions, UseFormReturn, useFormState, useWatch } from 'react-hook-form';
import CustomButton from './Button';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { setConstantValue } from 'typescript';
import { register } from 'ts-node';
import { Image as PrismaImage, QuizGame } from '@prisma/client';
import { ErrorMessage } from '@hookform/error-message';
import Button from './Button';
import Cropper from 'react-easy-crop';
import { Area } from 'react-easy-crop/types';

export type ImageWithUploadableFile = PrismaImage & { _uploadedFile?: File };

type UploadImageButtonWithPreviewProps = {
  registerLabel: string;
  registerOptions?: RegisterOptions;
  useFormReturns: UseFormReturn;
  image?: ImageWithUploadableFile;
  imageHeight?: string;
  imageWidth?: string;
  imagePadding?: number;
  isCroppable?: boolean;
};

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve: (image: HTMLImageElement) => void, reject: (error: ErrorEvent) => void) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error: ErrorEvent) => reject(error));
    image.src = url;
  });

const getCroppedImage = async (imageSrc: string, pixelCrop: any) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return null;
  }

  canvas.width = image.width;
  canvas.height = image.height;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw rotated image
  ctx.drawImage(image, 0, 0);

  // croppedAreaPixels values are bounding box relative
  // extract the cropped image using these values
  const data = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height);

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);

  // As Base64 string
  // console.log(canvas.toDataURL('image/jpeg'));

  // As a File
  return new Promise<File | null>((resolve, reject) => {
    canvas.toBlob(blob => {
      if (blob) {
        const file = new File([blob], 'cropped-image.png', { type: 'image/png' });
        resolve(file);
      } else {
        resolve(null);
      }
    }, 'image/png');
  });
};

const UploadImageButtonWithPreview = ({
  registerLabel,
  registerOptions,
  useFormReturns: { register, watch, setValue, resetField, control },
  image,
  imageHeight,
  imageWidth,
  imagePadding,
  isCroppable = false,
}: UploadImageButtonWithPreviewProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { errors } = useFormState({ control: control, name: registerLabel });

  const previewImageUrl: string = useWatch({ name: `${registerLabel}.url`, defaultValue: image?.url, control: control });

  const assetIdLabel = `${registerLabel}.assetId`;
  const urlLabel = `${registerLabel}.url`;
  const uploadedFileLabel = `${registerLabel}._uploadedFile`;
  register(assetIdLabel, { value: image?.assetId });
  register(urlLabel, { value: previewImageUrl });
  register(uploadedFileLabel, { value: null, ...registerOptions });

  // cropping related stuff
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(0.8);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [imageUrlToBeCropped, setImageUrlToBeCropped] = useState(null);
  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const saveCroppedImage = useCallback(async () => {
    const croppedImageFile = await getCroppedImage(imageUrlToBeCropped, croppedAreaPixels);
    setValue(urlLabel, URL.createObjectURL(croppedImageFile));
    setValue(uploadedFileLabel, croppedImageFile);
    onClose();
  }, [imageUrlToBeCropped, croppedAreaPixels, uploadedFileLabel, setValue, urlLabel, onClose]);

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
              if (isCroppable) {
                setImageUrlToBeCropped(URL.createObjectURL(e.target.files[0]));
                onOpen();
                return;
              }
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
          <ErrorMessage
            errors={errors}
            name={registerLabel}
            render={({ message }) => {
              return (
                <FormControl isInvalid={true}>
                  <FormErrorMessage>{message}</FormErrorMessage>
                </FormControl>
              );
            }}
          />
        </Box>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crop the Image</ModalHeader>
          <ModalCloseButton />
          <ModalBody className='relative' minH={'30rem'}>
            <Cropper
              image={imageUrlToBeCropped}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              objectFit='contain'
              minZoom={0.5}
              restrictPosition={false}
            />
          </ModalBody>

          <ModalFooter gap={2}>
            <Button onClick={onClose} variant='black-outline'>
              Cancel
            </Button>
            <Button onClick={saveCroppedImage}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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
            <ChakraImage
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
