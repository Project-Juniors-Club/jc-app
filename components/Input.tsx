const Input = ({ isDisabled = false, id, label }) => {
  return (
    <div className='w-5/12 text-left'>
      <label htmlFor={id} className='mb-2 block text-sm text-gray-900'>
        {label}
      </label>
      <input
        type='text'
        id={id}
        aria-label={id}
        className={
          (isDisabled ? 'bg-gray-100' : 'bg-white') +
          ' mb-6 block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
        }
        disabled={isDisabled}
      />
    </div>
  );
};

export default Input;
