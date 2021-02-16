import Head from 'next/head';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import axios from 'axios';
import cookie from 'js-cookie';

import baseUrl from '../helpers/baseUrl';

const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  const router = useRouter();
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${baseUrl}/api/login`, data);
      const { token, msg } = res.data;
      cookie.set('token', token);
      const successToast = M.toast({ html: `<div>${msg}</div>`, classes: 'green' });
      setTimeout(() => {
        successToast.dismiss();
        router.push('/');
      }, 500);
    } catch (error) {
      let html = '';
      const errData = error.response.data;
      for (const prop in errData) {
        html += `<p>${errData[prop]}</p>`;
      }
      M.toast({ html: `<div>${html}</div>`, classes: 'red' });
    }
  };

  return (
    <div>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <h3>Login</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input name="email" placeholder="email" ref={register({ required: true })} />
          {errors.email && 'Email is required.'}
          <input
            name="password"
            type="password"
            placeholder="password"
            ref={register({ required: true })}
          />
          {errors.password && 'Password is required.'}
          <button className="btn waves-effect waves-light" type="submit" name="action">
            Login
            <i className="material-icons right">forward</i>
          </button>
        </form>
        <Link href="/signup">
          <a>
            <h5 className="deep-orange-text text-darken-2">Don't have an account !</h5>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Login;
