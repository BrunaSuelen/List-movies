var request = require('request');
var ejs = require('ejs');
var fs = require('fs');

request('https://api.themoviedb.org/3/discover/movie?api_key=05db07e27024bc56a1e3aa80f74fc6bd', {json:true}, function (error, response, body) {
  if(error){
    console.log('Erro: ',error);


  }else{
    var listMovies = body.results.map(function (movie) {      
      return { title: movie.title, overview: movie.overview};
    });
        
    ejs.renderFile("./views/template.ejs", {listMovies}, function(err, str){    
      var template = './views/index.html';
      var stream = fs.createWriteStream(template);

      stream.once('open', function(fd) {      
        stream.end(str);
      });
    });
  }


});


