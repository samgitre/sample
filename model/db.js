var mongoose = require('mongoose');

var url = 'mongodb://localhost/boutiqueDatabase';

mongoose.connect(url, function (err) {
    if (err){
        console.log('not connected');
    }
    else {console.log('connected to mongodb')}

});