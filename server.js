// Import express and create the server
const express = require('express');
const app = express();
const port = 3000; // Server runs on port 3000
const path = require('path'); // Used to get the file path for index.html

// body-parser is used to read data sent from a form in req.body
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Main route, shows a welcome message
app.get('/', (req, res) => {
  res.send('Welcome to Data Representation & Quering')
})

// Gets the name and surname from the URL and displays them
//   /hello/John/Costea shows "Hello John Costea"
app.get('/hello/:name/:surname', (req, res) => {
    const name = req.params.name;
    const surname = req.params.surname;
    res.send(`Hello ${name} ${surname}`);
});

// Returns a list of movies in JSON format
app.get('/api/myMovies', (req, res) => {
    const myMovies = [
        {
            "Title": "Avengers: Infinity War",
            "Year": "2018",
            "imdbID": "tt4154756",
            "Type": "movie",
            "Poster": "https://example.com/poster1.jpg"
        },
        {
            "Title": "Captain America: Civil War",
            "Year": "2016",
            "imdbID": "tt3498820",
            "Type": "movie",
            "Poster": "https://example.com/poster2.jpg"
        },
        {
            "Title": "World War Z",
            "Year": "2013",
            "imdbID": "tt0816711",
            "Type": "movie",
            "Poster": "https://example.com/poster3.jpg"
        }
    ];
    // Send the movies back as JSON
    res.status(201).json({ myMovies });
});

// Sends the index.html file to the browser
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Gets the first and last name from the query string
// in the URL name?firstname=John&lastname=Costea
app.get('/name', (req, res) => {
    const firstname = req.query.firstname;
    const lastname = req.query.lastname;
    res.send(`Hello ${firstname} ${lastname}`);
});

// Gets the first and last name from the form using POST
app.post('/name', (req, res) => {
    const fname = req.body.firstname;
    const lname = req.body.lastname;
    res.send(`Howaya ${fname} ${lname}`);
});

// Starts the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// Handles errors and sends back a 500 error message
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
