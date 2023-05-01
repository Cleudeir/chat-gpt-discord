
import { FC } from 'react';
import { FaSpinner } from 'react-icons/fa';

const LoadingSpinner: FC = () => (
  <div className="flex justify-center items-center h-screen">
    <FaSpinner className="animate-spin text-blue-500" size={36} />
  </div>
);

export default LoadingSpinner;
