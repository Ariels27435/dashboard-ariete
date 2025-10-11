const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md">
        <input className="border border-gray-300 px-4 py-2 mb-4 w-full" placeholder="Email" />
        <input className="border border-gray-300 px-4 py-2 mb-4 w-full" placeholder="Password" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Login</button>
      </form>
    </div>
  );
};
