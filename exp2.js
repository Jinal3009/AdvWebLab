// events.js
const EventEmitter = require('events');

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
});

userEvents.on('user-logout', (username) => {
  eventCount['user-logout']++;
  console.log(`LOGOUT: ${username} logged out`);
});

userEvents.on('user-purchase', (username, item) => {
  eventCount['user-purchase']++;
  console.log(`PURCHASE: ${username} bought ${item}`);
});

userEvents.on('profile-update', (username, field) => {
  eventCount['profile-update']++;
  console.log(`UPDATE: ${username} updated ${field}`);
});

// Summary event
userEvents.on('summary', () => {
  console.log('\n===== EVENT SUMMARY =====');
  for (let event in eventCount) {
    console.log(`${event}: ${eventCount[event]} times`);
  }
  console.log('=========================\n');
});

// Emit events multiple times
userEvents.emit('user-login', 'Jinal');
userEvents.emit('user-login', 'Devisha');
userEvents.emit('user-login', 'Zalak');

userEvents.emit('user-purchase', 'Jinal', 'Laptop');
userEvents.emit('user-purchase', 'Devisha', 'Phone');
userEvents.emit('user-purchase', 'Zalak', 'Headphones');

userEvents.emit('profile-update', 'Jinal', 'Email');
userEvents.emit('profile-update', 'Devisha', 'Password');
userEvents.emit('profile-update', 'Zalak', 'Profile Picture');

userEvents.emit('user-logout', 'Jinal');
userEvents.emit('user-logout', 'Devisha');
userEvents.emit('user-logout', 'Zalak');

// Trigger summary
userEvents.emit('summary');
