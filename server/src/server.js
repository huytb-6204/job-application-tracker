
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const applicationsRoutes = require('./routes/applications.routes');
const interviewsRoutes = require('./routes/interviews.routes');
// Swagger configuration
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const app = express();
const PORT = process.env.PORT || 5000;



app.use(cors());
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/applications', applicationsRoutes);
app.use('/interviews', interviewsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});