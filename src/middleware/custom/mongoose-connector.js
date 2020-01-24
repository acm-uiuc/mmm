import mongoose from 'mongoose';

mongoose.Promise = global.Promise; // Is this necessary?
let connection; // unused
let isConnected;

/** A database connection middleware that creates or persists a connection
 * to MongoDB via Mongoose.
 *
 * Database connections in Lambda can persist across multiple function calls
 * so we do not close the connection after use.
 *
 * @param {Object} param
 * @param {String} param.databaseURI The full MongoDB connection string
 *
 * @return {Object} The middleware.
 */
const mongooseConnector = ({ databaseURI }) => ({
  before: async (handler, next) => {
    if (isConnected) {
      console.log('=> using existing database connection');
    } else {
      console.log('=> using new database connection');
      connection = await mongoose.connect(databaseURI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      isConnected = connection.connections[0].readyState;
    }
  }
});

export default mongooseConnector;
