import mongoose from 'mongoose';

function initDB() {
  // console.log('=======', mongoose.connection.readyState);

  if (mongoose.connection.readyState) {
    console.log('Already connected');
    return;
  }

  mongoose
    .connect(process.env.MONGO_CLOUD_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((err) => console.log('==========', err.reason));

  mongoose.connection.on('connected', () => {
    console.log('db connected');
  });

  mongoose.connection.on('error', (err) => {
    console.log(err);
  });
}

export default initDB;
