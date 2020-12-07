const mongoose = require('mongoose');
mongoose.connect(process.env.URL_MONGODB)
.then(() => console.log("mongoDB connected"))
.catch(err => console.log('err: ' + err))

module.export = mongoose
