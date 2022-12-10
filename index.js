const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');
const random = require('random');

const FILE_PATH = './data.json';

// const makeCommit = n => {
//   if(n===0) return simpleGit.push();
  
//   // Generate a random date between 1 year ago and today
//   let DATE = moment().subtract(1, 'y').add(1, 'd').format();
//   let dayOfWeek = moment(DATE).day(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  
//   // Generate a new date until we get a working day
//   while (dayOfWeek === 0 || dayOfWeek === 6) {
//     // Add 1 day to DATE and update dayOfWeek
//     DATE = moment(DATE).add(1, 'd').format();
//     dayOfWeek = moment(DATE).day();
//   }
  
//   // Reduce the probability of making commits on weekends
//   if (dayOfWeek === 5) { // Friday
//     if (random.int(0, 3) === 0) { // 25% probability
//       // Add 3 days to DATE to simulate a long weekend
//       DATE = moment(DATE).add(3, 'd').format();
//     }
//   } else if (dayOfWeek === 6) { // Saturday
//     if (random.int(0, 1) === 0) { // 50% probability
//       // Add 2 days to DATE to simulate a weekend
//       DATE = moment(DATE).add(2, 'd').format();
//     }
//   }

//   const data = {
//     date: DATE
//   }
  
//   console.log(DATE);
//   jsonfile.writeFile(FILE_PATH, data, ()=>{
//     simpleGit().add([FILE_PATH]).commit(DATE, {'--date': DATE }, makeCommit.bind(this, --n));
//   });
// }
// makeCommit(100);

// From the video 

const makeCommit = (n) => {
  if (n === 0) return simpleGit.push()

  const x = random.int(0, 50)
  const y = random.int(0, 5)
  const DATE = moment()
    .subtract(1, "y")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format()

  const data = {
    date: DATE,
  }

  console.log(DATE)
  jsonfile.writeFile(FILE_PATH, data, () => {
    simpleGit()
      .add([FILE_PATH])
      .commit(DATE, { "--date": DATE }, makeCommit.bind(this, --n))
  })
}
makeCommit(300)


// Another solution -------------------------------

// const makeCommit = (n) => {
//   if (n === 0) return simpleGit.push()

//   const DATE = moment().subtract(1, "y").add(1, "d")
//   const dayOfWeek = DATE.day()

//   let commitsPerDay = 1

//   if (dayOfWeek === 0 || dayOfWeek === 6) {
//     // weekend
//     commitsPerDay = 0.2
//   } else {
//     // weekday
//     commitsPerDay = 2.5
//   }

//   for (let i = 0; i < commitsPerDay; i++) {
//     const x = random.int(0, 50)
//     const y = random.int(0, 5)

//     const commitDate = DATE.clone().add(x, "w").add(y, "d")
//     const data = {
//       date: commitDate.format(),
//     }

//     console.log(data.date)
//     jsonfile.writeFile(FILE_PATH, data, () => {
//       simpleGit()
//         .add([FILE_PATH])
//         .commit(
//           commitDate.format(),
//           { "--date": commitDate.format() },
//           () => {}
//         )
//     })
//   }

//   makeCommit(--n)
// }

// makeCommit(300)
