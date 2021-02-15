import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import baseUrl from '../helpers/baseUrl';

const Signup = () => {
  const { register, handleSubmit, errors, reset } = useForm(); // initialize the hook
  const router = useRouter();
  const onSubmit = async (data) => {
    try {
      // console.log(data);
      const res = await axios.post(`${baseUrl}/api/register`, data);
      M.toast({ html: `<div>User created successfuly</div>`, classes: 'green' });
      router.push('/login');
    } catch (err) {
      console.log('=============errrr', err);
      let html = '';
      const errData = err.response.data;
      for (const prop in errData) {
        html += `<p>${errData[prop]}</p>`;
      }
      M.toast({ html: `<div>${html}</div>`, classes: 'red' });
    }
  };

  return (
    <div>
      <Head>
        <title>Signup</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <h3>Signup</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input placeholder="name" name="name" ref={register({ required: true })} />
          {errors.name && 'User name is required.'}
          <input name="email" placeholder="email" ref={register({ required: true })} />
          {errors.email && 'Email is required.'}
          <input
            name="password"
            type="password"
            placeholder="password"
            ref={register({ required: true })}
          />
          {errors.password && 'Password is required.'}
          <input
            type="password"
            name="password2"
            placeholder="re-type password"
            ref={register({ required: true })}
          />
          {errors.password2 && 'Password 2 is required.'}
          <button className="btn waves-effect waves-light" type="submit" name="action">
            Submit
            <i className="material-icons right">forward</i>
          </button>
        </form>
        <Link href="/login">
          <a>
            <h5 className="deep-orange-text text-darken-2">Already have an account !</h5>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
