import { Link } from 'react-router-dom';
import { FaRegSadTear } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen text-sm md:text-base flex flex-col justify-center items-center px-4 bg-gray-50 text-center animate-fade-in">
      <FaRegSadTear className="text-9xl text-green-600 mb-4 animate-bounce" />
      <p className="text-7xl font-bold text-green-600 mb-2 heading-font">404</p>
      <p className="text-2xl font-semibold text-green-600 heading-font mb-2">
        Page Not Found
      </p>
      <p className="text-gray-500 mb-6 max-w-md inter">
        Oops! The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="green-button "
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;