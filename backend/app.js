require('dotenv').config();
const express = require('express');
const optRoutes = require('./services/otp-service/src/routes/otpRoutes');

const app = express();
app.use(express.json());
app.use('/api', optRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server listening on port ${port}`));
