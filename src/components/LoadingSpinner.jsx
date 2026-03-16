const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="text-center py-20">
      <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
      <p className="text-zinc-500">{message}</p>
    </div>
  );
};

export default LoadingSpinner;