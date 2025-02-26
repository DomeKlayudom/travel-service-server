const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const traverllerRoute = require('./routes/traveller.route.js');
const traverlRoute = require('./routes/travel.route.js');

require('dotenv').config(
    
);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use('/traveller', traverllerRoute);
app.use('/travel', traverlRoute);
app.use("/images/traveller/",express.static("images/traveller"));
app.use("/images/travel",express.static("images/travel"));

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to DomeDome server!'
    });
})

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});