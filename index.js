const express = require('express');
const morgan = require('morgan');

require('./resources/lib/dotenv');
const logger = require('./resources/lib/logger');
const mongoose = require('./resources/lib/mongoose');
const errorHandler = require('./resources/lib/errorHandler');
const cambridgeRoutes = require('./resources/cambridge/cambridge.routes');

const app = express();

app.use(morgan('short', { stream: { write: message => logger.info(message.trim()) } }));

app.use('/cambridge', cambridgeRoutes);

app.use(errorHandler.procesarErroresDeDB);
app.use(errorHandler.catchResolver);

app.listen(process.env.PORT, () => {
    console.log(`Nuestra app esta escuchando el puerto ${process.env.PORT}`);
});
logger.info('** APLICATION START **');