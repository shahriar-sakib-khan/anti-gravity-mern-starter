import { LoginForm } from '../components/LoginForm';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <Link to="/" className="absolute top-8 left-8 text-gray-400 hover:text-white transition-colors z-50 flex items-center">
          ← Back to Home
      </Link>
        {/* Background Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]" />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 transition-all hover:scale-105 duration-300">
        <Link to="/" className="block text-center mb-8">
             <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                AntiGravity
             </h1>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Or{' '}
          <Link to="/register" className="font-medium text-blue-500 hover:text-blue-400">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white/5 backdrop-blur-lg py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-white/10">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
