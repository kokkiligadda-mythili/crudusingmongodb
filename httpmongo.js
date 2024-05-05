const express = require('express');

const a = express();
const crudRouter = require('./crud'); 
a.use('/', crudRouter); 
a.get('/notes',crudRouter);
a.put('/notes/:id', crudRouter);
a.delete('/notes/:id', crudRouter); 

a.listen(3002, () => {
  console.log("Server running on port 3002");

});