const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const env = require('./config/env');

const cropsRouter = require('./routes/crops');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const mandiRouter = require('./routes/mandi');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: env.clientOrigin === '*' ? true : env.clientOrigin },
});

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/crops', cropsRouter);
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);
app.use('/api/mandi', mandiRouter);

io.on('connection', (socket) => {
  socket.on('new:post', (payload) => {
    socket.broadcast.emit('community:post', payload);
  });
});

app.use((error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid identifier supplied' });
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({ message: error.message });
  }

  console.error(error);
  return res.status(500).json({ message: 'Unexpected server error' });
});

async function start() {
  await mongoose.connect(env.mongodbUri);
  server.listen(env.port, () => {
    console.log(`Backend listening on port ${env.port}`);
  });
}

if (require.main === module) {
  start().catch((error) => {
    console.error('Failed to start server', error);
    process.exit(1);
  });
}

module.exports = { app, start, io };
