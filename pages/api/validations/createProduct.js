import validator from 'validator';
import isEmpty from './is-empty';

module.exports = function validateProduct(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : '';
  data.price = !isEmpty(data.price) ? data.price : '';
  data.mediaUrl = !isEmpty(data.mediaUrl) ? data.mediaUrl : '';
  data.description = !isEmpty(data.description) ? data.description : '';

  if (validator.isEmpty(data.name)) {
    errors.name = 'Product Name is required.';
  }

  if (validator.isEmpty(data.price)) {
    errors.price = 'Price is required.';
  }

  if (validator.isEmpty(data.mediaUrl)) {
    errors.mediaUrl = 'Image is required.';
  }

  if (validator.isEmpty(data.description)) {
    errors.description = 'Description is required.';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
