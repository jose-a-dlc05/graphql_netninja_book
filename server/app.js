const express = require('express');
const app = express(); // invoke express
const PORT = 4000; // Define and initialize the PORT variable to hold value of 4000

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
