// events.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const EventEmitter = require('events');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve your HTML directly
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public.html'));
});

// Create EventEmitter instance
const userEvents = new EventEmitter();

// Object to track event counts
const eventCount = {
  'user-login': 0,
  'user-logout': 0,
  'user-purchase': 0,
  'profile-update': 0
};

// Event listeners
userEvents.on('user-login', (username) => {
  eventCount['user-login']++;
  console.log(`LOGIN: ${username} logged in`);
  io.emit('event', `LOGIN: ${username} logged in`);
});

userEvents.on('user-logout', (username) => {
  eventCount['user-logout']++;
  console.log(`LOGOUT: ${username} logged out`);
  io.emit('event', `LOGOUT: ${username} logged out`);
});

userEvents.on('user-purchase', (username, item) => {
  eventCount['user-purchase']++;
  console.log(`PURCHASE: ${username} bought ${item}`);
  io.emit('event', `PURCHASE: ${username} bought ${item}`);
});

userEvents.on('profile-update', (username, field) => {
  eventCount['profile-update']++;
  console.log(`UPDATE: ${username} updated ${field}`);
  io.emit('event', `UPDATE: ${username} updated ${field}`);
});

userEvents.on('summary', () => {
  console.log('\n===== EVENT SUMMARY =====');
  for (let event in eventCount) {
    console.log(`${event}: ${eventCount[event]} times`);
  }
  console.log('=========================\n');
  io.emit('summary', eventCount);
});

// Socket.io connections
io.on('connection', (socket) => {
  console.log('User connected');

  // Receive event from frontend
  socket.on('emit-event', (data) => {
    const { type, username, extra } = data;
    userEvents.emit(type, username, extra);
  });

  // Send summary when requested
  socket.on('get-summary', () => {
    userEvents.emit('summary');
  });
});

// Start server
server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
