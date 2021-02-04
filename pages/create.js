import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  lastname: yup.string().required(),
  age: yup.string().required(),
  picture: yup.mixed().test('fileSize', 'The file is too large', (value) => {
    if (!value.length) return false; // attachment is optional
    return value[0].size <= 2000000;
  }),
});

const Create = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  }); // initialize the hook
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Head>
        <title>Create</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form onSubmit={handleSubmit(onSubmit)} className="container">
        <input name="firstname" ref={register} /> {/* register an input */}
        <input name="lastname" ref={register({ required: true })} />
        {errors.lastname && 'Last name is required.'}
        <div className="file-field input-field">
          <div className="btn">
            <span>File</span>
            <input ref={register} type="file" name="picture" />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
          {errors.picture && <p>{'Please select an image.'}</p>}
        </div>
        <input name="age" ref={register({ pattern: /\d+/ })} />
        {errors.age && 'Please enter number for age.'}
        <input type="submit" className="btn" />
      </form>
    </div>
  );
};

export default Create;
