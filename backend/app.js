require('dotenv').config();
const express = require('express');
const otpRoutes = require('./services/otp-service/src/routes/otpRoutes');

const app = express();
app.use(express.json());
app.use('/api', otpRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server listening on port ${port}`));
