import NavBarCart from '../../components/navbar/NavBarCart';
import CustomButton from '../../components/Buttons';
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import Input from '../../components/Input';

const editAction = {
  EDIT: 'EDIT',
  DELETE: 'DELETE',
};

const EditPopUp = ({ isOpen, setIsOpen }) => {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className='relative z-50'>
      <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
      <div className='fixed inset-0 flex items-center justify-center p-4'>
        <Dialog.Panel className='w-5/12 transform overflow-hidden rounded-xl bg-white p-14 text-left align-middle shadow-xl transition-all'>
          <Dialog.Title as='h1' className='mb-8 text-center text-2xl font-bold text-gray-900'>
            Update Account Details
          </Dialog.Title>
          <div className='mt-2 mb-5'>
            <p className='text-sm text-gray-500'>
              You have updated your account details. To confirm the update, please enter the OTP sent to your email.
            </p>
          </div>
          <input
            type='number'
            id='otp'
            aria-label='otp'
            className='mb-10 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-[#7FB519] focus:ring-[#7FB519]'
            placeholder='Enter your OTP'
          />
          <div className='flex flex-row justify-center space-x-7'>
            <CustomButton variant='green-outline' onClick={() => setIsOpen(false)}>
              <h3 className='text-base'>Cancel</h3>
            </CustomButton>{' '}
            <CustomButton variant='black-solid' onClick={() => setIsOpen(false)}>
              <h3 className='text-base text-white'>Submit</h3>
            </CustomButton>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

const DeletePopUp = ({ isOpen, setIsOpen }) => {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className='relative z-50'>
      <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
      <div className='fixed inset-0 flex items-center justify-center p-4'>
        <Dialog.Panel className='w-5/12 transform overflow-hidden rounded-xl bg-white p-14 text-left align-middle shadow-xl transition-all'>
          <Dialog.Title as='h1' className='mb-8 text-center text-2xl font-bold text-gray-900'>
            Delete Account
          </Dialog.Title>
          <div className='mt-2 mb-5'>
            <p className='text-sm text-gray-500'>
              Deleting the account will delete all records. This action <b>cannot be undone</b>. To confirm, please enter the OTP sent to
              your email.
            </p>
          </div>
          <input
            type='number'
            id='otp'
            aria-label='otp'
            className='mb-10 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-[#7FB519] focus:ring-[#7FB519]'
            placeholder='Enter your OTP'
          />
          <div className='flex flex-row justify-center space-x-7'>
            <CustomButton variant='green-outline' onClick={() => setIsOpen(false)}>
              <h3 className='text-base'>Cancel</h3>
            </CustomButton>{' '}
            <CustomButton variant='black-solid' onClick={() => setIsOpen(false)}>
              <h3 className='text-base text-white'>Submit</h3>
            </CustomButton>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

const Manage = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [action, setAction] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = () => {
    setIsDisabled(false);
  };

  const handleConfirm = () => {
    setAction(editAction.EDIT);
    // TODO
    setIsDisabled(true);
    setIsOpen(true);
  };

  const handleDelete = () => {
    setAction(editAction.DELETE);
    setIsOpen(true);
  };

  return (
    <>
      <NavBarCart />
      <h1 className='my-10 text-center text-3xl font-bold'> Account Details </h1>
      <div className='align grid place-items-center'>
        <div className='mb-5 flex w-full flex-col items-center justify-center'>
          <Input isDisabled={isDisabled} id='email' label='Email' />
          <Input isDisabled={isDisabled} id='full-name' label='Full Name' />
          <Input isDisabled={isDisabled} id='date-of-birth' label='Date of Birth' />
        </div>
        <div className='flex flex-row space-x-7'>
          {isDisabled ? (
            <CustomButton variant='green-solid' onClick={handleEdit}>
              <h3 className='min-w-full text-base'>Edit Details</h3>
            </CustomButton>
          ) : (
            <CustomButton variant='green-solid' onClick={handleConfirm}>
              <h3 className='text-base'>Confirm Changes</h3>
            </CustomButton>
          )}
          <CustomButton variant='black-solid' onClick={handleDelete}>
            <h3 className='text-base text-white'>Delete Account</h3>
          </CustomButton>
        </div>
      </div>
      <EditPopUp isOpen={isOpen && action === editAction.EDIT} setIsOpen={setIsOpen} />
      <DeletePopUp isOpen={isOpen && action === editAction.DELETE} setIsOpen={setIsOpen} />
    </>
  );
};

export default Manage;
