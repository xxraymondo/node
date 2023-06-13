const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'problem1.json');

const data = fs.readFileSync(jsonPath, 'utf8');

const cats = JSON.parse(data);

// Add height and weight to Fluffy 
cats.name = 'Fluffyy';
cats.height = 10;
cats.weight = 5;

// List all the activities of Fluffyy's catFriends
const fluffyyCatFriendsActivities = cats.catFriends.map(cat => cat.activities).flat();
console.log("Fluffyy's catFriends activities:", fluffyyCatFriendsActivities);

// Print the catFriends names
const catFriendsNames = cats.catFriends.map(cat => cat.name);
console.log("CatFriends names:", catFriendsNames);

// Print the total weight of catFriends
const totalWeight = cats.catFriends.reduce((sum, cat) => sum + (cat.weight || 0), 0);
console.log("Total weight of catFriends:", totalWeight);

// Print the total activities of all cats
const totalActivities = cats.activities.length + fluffyyCatFriendsActivities.length;
console.log("Total activities of all cats:", totalActivities);

// Add 2 more activities to bar & foo cats
cats.catFriends.forEach(cat => {
  if (cat.name === 'bar' || cat.name === 'foo') {
    cat.activities.push('Hunt', 'Scratch');
  }
});

// Update the fur color of bar
cats.catFriends.forEach(cat => {
  if (cat.name === 'bar') {
    cat.furcolor = 'black';
  }
});

console.log(cats);
