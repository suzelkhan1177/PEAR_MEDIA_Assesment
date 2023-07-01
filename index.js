const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

let spinCount = 0;
let prize = '';

app.get('/', (req, res) => {
  res.render('home', { spinCount, prize });
});

app.post('/spin', (req, res) => {
  if (spinCount === 0) {

    // First spin
    spinCount = 1;
    res.redirect('/');
  } else if (spinCount === 1) {
    // Second spin 
    prize = getRandomPrize(); // Implement this function to generate a random prize
    spinCount = 2;
    res.redirect('/');
  } else {
    res.render('error');
  }
});

function getRandomPrize() {
  // Implement your logic to generate a random prize
  const prizes = ['50% off', 'Free shipping', '10$ discount', '20% off'];
  const randomIndex = Math.floor(Math.random() * prizes.length);
  return prizes[randomIndex];
}


app.listen(PORT, (err) => {
    if(err){
        console.log("Error Occure", err);
    }
  console.log(`Server is running on port ${PORT}`);
});
