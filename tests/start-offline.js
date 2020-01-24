const {spawn} = require('child_process');
let serverProcess;

global.beforeAll((done) => {
  jest.setTimeout(15000);
  startSLSOffline((err) => {
    if (err) {
      return done(err);
    }

    done();
  });

}, 30000);

global.afterAll((done) => {
  killSLSOffline((err) => {
    if (err) {
      return done(err);
    }

    done()
  });
}, 30000);

const startSLSOffline = (done) => {
  serverProcess = spawn('sls', ['offline', 'start']);

  console.log(`Serverless: Offline started with PID : ${serverProcess.pid}`);

  serverProcess.stdout.on('data', (data) => {
    if (data.includes("listening on")) {
      console.log(data.toString().trim());
      done();
    }
  });

  serverProcess.stderr.on('data', (errData) => {
    console.error(`Error starting Serverless Offline:\n${errData}`);
    // done(errData);
  });
};

const killSLSOffline = (done) => {
  if (serverProcess) {
    serverProcess.kill();
    console.log('Serverless: Offline stopped');
    done();
  } else {
    console.error('Attempted to kill SLS Offline, but there is no active instance. Ignoring.');
  }
};