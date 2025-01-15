const express = require('express');
const bodyParser = require('body-parser');
const messageRoutes = require('./routes/messageRoutes');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/api/messages', messageRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
