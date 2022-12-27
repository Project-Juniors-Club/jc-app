import NavBarCart from '../../components/navbar/NavBarCart';
import CustomButton from '../../components/Buttons';
import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import Input from '../../components/Input';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const editAction = {
  EDIT: 'EDIT',
  DELETE: 'DELETE',
};

const EditPopUp = ({ isOpen, setIsOpen }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleClose = () => {
    setIsCompleted(false);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className='relative z-50'>
      <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
      <div className='fixed inset-0 flex items-center justify-center p-4'>
        <Dialog.Panel className='w-5/12 transform overflow-hidden rounded-xl bg-white p-14 text-left align-middle shadow-xl transition-all'>
          <Dialog.Title as='h1' className='mb-8 text-center text-2xl font-bold text-gray-900'>
            Update Account Details
          </Dialog.Title>
          {!isCompleted ? (
            <>
              <div className='mt-2 mb-5'>
                <p className='text-sm'>
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
            </>
          ) : (
            <div className='mt-2 mb-5'>
              <p className='text-center text-sm'>Your account details have been successfully updated!</p>
            </div>
          )}
          <div className='flex flex-row justify-center space-x-7'>
            {!isCompleted ? (
              <>
                <CustomButton variant='green-outline' onClick={() => setIsOpen(false)}>
                  <h3 className='text-base'>Cancel</h3>
                </CustomButton>
                <CustomButton variant='black-solid' onClick={() => setIsCompleted(true)}>
                  <h3 className='text-base text-white'>Submit</h3>
                </CustomButton>
              </>
            ) : (
              <div className='mt-5'>
                <CustomButton variant='green-outline' onClick={handleClose}>
                  <h3 className='text-base'>Done</h3>
                </CustomButton>
              </div>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

const DeletePopUp = ({ isOpen, setIsOpen }) => {
  const deleteProgress = {
    INITIAL: 'INITIAL',
    CONFIRMATION: 'CONFIRMATION',
    COMPLETE: 'COMPLETE',
  };

  const [progress, setProgress] = useState(deleteProgress.INITIAL);

  const handleClose = () => {
    setProgress(deleteProgress.INITIAL);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className='relative z-50'>
      <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
      <div className='fixed inset-0 flex items-center justify-center p-4'>
        <Dialog.Panel className='w-5/12 transform overflow-hidden rounded-xl bg-white p-14 text-left align-middle shadow-xl transition-all'>
          <Dialog.Title as='h1' className='mb-8 text-center text-2xl font-bold text-gray-900'>
            {progress !== deleteProgress.COMPLETE ? 'Delete Account' : 'Your account has been deleted'}
          </Dialog.Title>
          <div className='mt-2 mb-5'>
            {progress === deleteProgress.INITIAL && (
              <p className='text-sm'>
                Deleting the account will delete all records. This action <b>cannot be undone</b>. To confirm, please enter the OTP sent to
                your email.
              </p>
            )}
            {progress === deleteProgress.CONFIRMATION && (
              <p className='text-sm'>
                Your account will be <b>permanently deleted</b>. Are you sure to proceed?
              </p>
            )}
            {progress === deleteProgress.COMPLETE && (
              <p className='text-sm'>
                We have received a request to permanently delete your account. Your account has been deactivated from the site and will be
                permanently deleted within 14 days.
                <br />
                <br />
                If you did not request to delete your account, please cancel the request here:
                <a href='https://foodbacksg.sg/retrieve-your-account'>
                  {' '}
                  <u>
                    <b className='text-[#385600]'>https://foodbacksg.sg/retrieve-your-account</b>
                  </u>
                </a>
                <br />
                <br />
                You will now be redirected to the public landing page.
              </p>
            )}
          </div>
          {progress === deleteProgress.INITIAL && (
            <input
              type='number'
              id='otp'
              aria-label='otp'
              className='mb-10 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-[#7FB519] focus:ring-[#7FB519]'
              placeholder='Enter your OTP'
            />
          )}
          {progress === deleteProgress.INITIAL && (
            <div className='flex flex-row justify-center space-x-7'>
              <CustomButton variant='green-outline' onClick={() => setIsOpen(false)}>
                <h3 className='text-base'>Cancel</h3>
              </CustomButton>
              <CustomButton variant='black-solid' onClick={() => setProgress(deleteProgress.CONFIRMATION)}>
                <h3 className='text-base text-white'>Submit</h3>
              </CustomButton>
            </div>
          )}
          {progress === deleteProgress.CONFIRMATION && (
            <div className='mt-9 flex flex-row justify-center space-x-7'>
              <CustomButton variant='green-outline' onClick={() => setIsOpen(false)}>
                <h3 className='text-base'>Cancel</h3>
              </CustomButton>
              <CustomButton variant='black-solid' onClick={() => setProgress(deleteProgress.COMPLETE)}>
                <h3 className='text-base text-white'>Confirm</h3>
              </CustomButton>
            </div>
          )}
          {progress === deleteProgress.COMPLETE && (
            <div className='mt-9 flex flex-row justify-center space-x-7'>
              <CustomButton variant='green-outline' onClick={handleClose}>
                <h3 className='text-base'>Done</h3>
              </CustomButton>
            </div>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

const Manage = () => {
  const { data: session, status } = useSession();
  const [isDisabled, setIsDisabled] = useState(true);
  const [action, setAction] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  // const [userDetails, setUserDetails] = useState({
  //   email: session?.user?.email,
  //   fullName: session?.user?.name,
  //   //todo
  //   dateOfBirth: '',
  // });
  const [fullName, setFullName] = useState(session?.user?.name);
  const [email, setEmail] = useState(session?.user?.email);
  //TODO
  const [dateOfBirth, setDateOfBirth] = useState('');

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

  const isSessionLoading = status === 'loading';

  if (isSessionLoading) {
    return null;
  }

  if (session == null) {
    return <p>You are not signed in</p>;
  }

  console.log(session);

  return (
    <>
      <NavBarCart />
      <h1 className='my-10 text-center text-3xl font-bold'> Account Details </h1>
      <div className='align grid place-items-center'>
        <div className='mb-5 flex w-full flex-col items-center justify-center'>
          <Input isDisabled={isDisabled} id='email' label='Email' value={email} onChange={setEmail} />
          <Input isDisabled={isDisabled} id='full-name' label='Full Name' value={fullName} onChange={setFullName} />
          <Input isDisabled={isDisabled} id='date-of-birth' label='Date of Birth' value={dateOfBirth} onChange={setDateOfBirth} />
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
