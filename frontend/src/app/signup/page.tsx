import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signup } from "@/services/auth.service";

const LoginForm = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Create new account
          </h2>
        </div>
        <form className='mt-8 space-y-6' action={signup}>
          <Input
            type='fullname'
            name='fullname'
            placeholder='Fullname'
            required
          />
          <Input
            type='email'
            name='email'
            placeholder='Email address'
            required
          />

          <Input
            type='password'
            name='password'
            placeholder='Password'
            required
          />
          <div>
            <Button className='w-full' type='submit'>
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
