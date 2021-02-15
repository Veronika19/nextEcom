import Head from 'next/head';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

import baseUrl from '../helpers/baseUrl';

const schema = yup.object().shape({
  name: yup.string().required(),
  price: yup.string().required(),
  description: yup.string().required(),
  picture: yup.mixed().test('fileSize', 'The file is too large', (value) => {
    if (!value.length) return false; // attachment is optional
    return value[0].size <= 2000000;
  }),
});

const Create = () => {
  const [media, setMedia] = useState('');
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema),
  }); // initialize the hook

  const onSubmit = async (data) => {
    const mediaUrl = await imageUpload();
    const { name, price, description } = data;
    try {
      const res = await axios.post(`${baseUrl}/api/product`, {
        name,
        price,
        description,
        mediaUrl,
      });
      reset();
      setMedia('');
      M.toast({ html: 'Product saved sucessfully', classes: 'green' });
    } catch (err) {
      let html = '';
      const errData = err.response.data;
      for (const prop in errData) {
        html += `<p>${errData[prop]}</p>`;
      }
      console.log(err.response.data);
      M.toast({ html: `<div>${html}</div>`, classes: 'red' });
    }
  };

  const imageUpload = async () => {
    const data = new FormData();
    data.append('file', media);
    data.append('upload_preset', 'nxtecomstore');
    data.append('cloud_name', 'nxtpwp');
    const res = await fetch(`${process.env.NEXT_PUBLIC_CLOUDINARY_API_BASE_URL}/image/upload`, {
      method: 'POST',
      body: data,
    });
    const uploadRes = await res.json();
    console.log(uploadRes);
    return uploadRes.eager[0].secure_url;
  };

  return (
    <div>
      <Head>
        <title>Create</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form onSubmit={handleSubmit(onSubmit)} className="container">
        <input name="name" ref={register({ required: true })} />
        {errors.name && 'Product Name is required.'}
        <div className="file-field input-field">
          <div className="btn">
            <span>File</span>
            <input
              ref={register}
              onChange={(e) => setMedia(e.target.files[0])}
              type="file"
              name="picture"
            />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
          {errors.picture && <p>{'Please select an image.'}</p>}
          {media && (
            <img
              width="150"
              height="200"
              className="responsive-img"
              src={media ? URL.createObjectURL(media) : ''}
            />
          )}
        </div>
        <input name="price" ref={register({ pattern: /\d+/ })} />
        {errors.price && 'Please enter the price.'}
        <div className="input-field col s12">
          <input name="description" ref={register({ required: true })} />
          {errors.description && 'Please enter the description.'}
        </div>
        <button class="btn waves-effect waves-light" type="submit" name="action">
          Submit
          <i class="material-icons right">forward</i>
        </button>
      </form>
    </div>
  );
};

export default Create;
