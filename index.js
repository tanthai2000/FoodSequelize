var express = require('express');
var app = express();
var hbs = require('express-handlebars');

app.use(express.static(__dirname));
var models = require('./models');
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials',

}));

app.set('view engine', 'hbs');
app.set('port', (process.env.PORT || 5000));




let recipes=[];
app.get('/', function (req, res) {
  var context = {
    dodulieu: [],
    foot: "MSSV:18127204 - Thai Nhat Tan - Lam chuc nang tim kiem",
  }

  models.Recipe.findAll().then((products)=>{
    if(recipes.length<5){
      products.forEach((item)=>{
        recipes.push(item);
      })
    }
  })
  .catch((error)=>{
      res.json(error);
  })
  var search = req.query.search;
  if (search !== undefined) {
    recipes.forEach(element => {
      if(search.toUpperCase()===element.title.toUpperCase()){
        context.dodulieu.push(
          `<li>
          <a href="index.html"><img src="${element.smallImagePath}" alt="Image"></a>
        <div>
          <h3><a href="featured.html">${element.title}</a></h3>
        <p>${element.summary}</p>
        <p>${element.description}</p>
        </div>
      </li>`
        ) 
      }
    });
    if(context.dodulieu.length!=0){
      res.render('search', context);
    }
    else{
      context.dodulieu.push(`<p>Dang nhap khong hop le</p>`);
      res.render('search', context);
    }
  }
  else {
    res.render('index', { foot: "Group 02" });
  }
})

var Recipes = require('./task1')
app.use('/task1',Recipes);

app.get('/sync',function(req,res){
  models.sequelize.sync().then(function(){
      res.send('database sync complete!');
  })
})



app.listen(app.get('port'), function () {
  console.log("Listenning " + app.get('port'));
});

