import http from 'http';

const options = {
  host: 'localhost',
  port: process.env.PORT || 3000,
  timeout: 2000,
};

const makeRequest = () => {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      console.log(`STATUS: ${res.statusCode}`);
      res.statusCode === 200 ? resolve() : reject();
    });

    req.on('error', (err) => {
      console.error('ERROR:', err.message);
      reject();
    });

    req.end();
  });
};

const run = async () => {
  try {
    await makeRequest();
    process.exit(0);
  } catch {
    process.exit(1);
  }
};

run();
