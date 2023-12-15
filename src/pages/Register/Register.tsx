import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
import { FeedbackType } from '@zxcvbn-ts/core/dist/types';
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import PasswordIndicator from '../../components/PassworIndicator/PasswordIndicator';
import PasswordSuggestion from '../../components/PassworIndicator/PasswordSuggestion';
import Logo from '../../components/SVG/Logo';
import { useRegisterMutation } from '../../redux/auth/authApi';

const options = {
  translations: zxcvbnEnPackage.translations,
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnEnPackage.dictionary,
  },
};

zxcvbnOptions.setOptions(options);

interface PasswordIndicator {
  score: number;
  feedback: FeedbackType;
}
interface ErrorState {
  email: string;
  password: string;
}

const Register = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [indicator, setIndicator] =
    useState<PasswordIndicator | null>();
  const [errors, setErrors] = useState<ErrorState>({
    email: '',
    password: '',
  });
  const [responseError, setResponseError] = useState('');
  const [register, { data, error, isLoading }] =
    useRegisterMutation();

  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      if ('data' in error) {
        const errMsg =
          'error' in error ? error.error : JSON.stringify(error.data);
        setResponseError(JSON.parse(errMsg).error);
      }
    }
    if (data?.id && data?.token) {
      navigate('/');
    }
  }, [data, error]);

  useEffect(() => {
    if (password === '') return;
    setIndicator(zxcvbn(password));
  }, [password]);

  const score = indicator ? indicator.score : -1;
  const feedback = indicator ? indicator.feedback : undefined;

  console.log('feedback', score);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResponseError('');
    // Validate email-password
    if (!email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'This field is required',
      }));
      return;
    } else if (
      !email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Please enter a valid email address.',
      }));
      return;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
    }

    if (!password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Please enter a password.',
      }));
      return;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
    }

    register({ email: email, password: password });
  };
  const handleInputFocus = (field: 'email' | 'password') => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
  };

  return (
    <div className="min-h-screen m-auto flex justify-center items-center max-w-[444px] h-[576px]">
      {isLoading && <Loader />}
      <form
        noValidate
        onSubmit={handleSubmit}
        className="py-12 px-16 bg-white rounded-xl shadow-lg z-20">
        <div className="flex justify-start items-center mb-5 cursor-pointer gap-4">
          <Logo />
          <h1 className="text-3xl font-bold text-center text-secondary">
            Stack
          </h1>
        </div>
        <p className="w-80 text-dark text-start text-sm mb-8 font-semibold  tracking-wide cursor-pointer">
          Sign up to join with Stack
        </p>
        <div className="space-y-6 mt-14 text-secondary">
          <div className="relative">
            <label
              htmlFor="email"
              className="drop-shadow-md text-sm mb-0.5">
              Email
            </label>
            <input
              id="email"
              type="text"
              onChange={(event) => setEmail(event.target.value)}
              onFocus={() => handleInputFocus('email')}
              value={email}
              placeholder="Enter Email"
              className={`block text-sm mt-1 py-3 px-4 w-[292px] rounded-lg  border ${
                errors.email
                  ? 'border-error shadow-3xl'
                  : 'outline-[#D6BBFB] '
              }`}
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            />
            <div
              className="relative error-container"
              style={{
                height: '20px',
                visibility: errors.email ? 'visible' : 'hidden',
              }}>
              {errors.email && (
                <p className="absolute top-2 text-red-600 text-sm ml-2">
                  {errors.email}
                </p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="drop-shadow-md text-sm mb-0.5">
              Password
            </label>
            <input
              id="password"
              type="password"
              onChange={(event) => setPassword(event.target.value)}
              onFocus={() => handleInputFocus('password')}
              value={password}
              placeholder="********"
              className="block text-sm mt-1 py-3 px-4 w-[292px] rounded-lg border outline-[#D6BBFB]"
              required
            />

            <div
              className="relative error-container"
              style={{
                height: '20px',
                visibility: errors.password ? 'visible' : 'hidden',
              }}>
              {errors.password && (
                <p className="relative top-2 text-red-500 text-sm ml-2">
                  {errors.password}
                </p>
              )}
            </div>
            {password !== '' && <PasswordIndicator score={score} />}
            {feedback?.warning && feedback.warning.length > 0 && (
              <PasswordSuggestion
                suggestions={feedback.suggestions}
              />
            )}
          </div>
        </div>
        <div
          className={`text-center ${
            password.length !== 0 ? 'mt-0 ' : 'mt-10'
          } relative`}>
          <button
            type="submit"
            className="w-full py-2 font-bold text-white bg-primary rounded-lg hover:bg-purple-500 transition-all">
            Sign Up
          </button>
          {responseError && (
            <p className="mt-1 text-xs text-red-600">
              {responseError}
            </p>
          )}
          <p className="mt-7 text-start text-light">
            Already Have An Account?{' '}
            <span className="hover:underline font-semibold text-link cursor-pointer">
              {' '}
              Sign In
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
