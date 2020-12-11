var express = require('express');
var router =express.Router();

var models = require('./models');

var recipe= []
router.get('/',function(req,res){
    var ingre = []
    
    var context = {
        data: []
    }
    models.Recipe.findAll()
    .then(function(products){
        models.Ingredient.findAll()
        .then(function(itemofing){

         
            products.forEach((item)=>{     
            recipe.push(item);
            })
            itemofing.forEach((ings)=>{     
                ingre.push(ings);
            })
            recipe.forEach(element => {
                if(element.id % 2 != 0){
                    context.data.push(
                    `<li>
                    <a href="featured.html"><img src="${element.smallImagePath}" alt="Image"></a>
                    <div>
                    <h3><a href="featured.html">${element.title}</a></h3>
                    <p>${element.summary}</p>
                    </div>
                </li>`
                        )}
                else {
                    var i=0;
                    var StringText ="";
                    for(let a = 0;a < ingre.length;a++){4
                        if (i >=4) break;
                        if(ingre[a].RecipeId == element.id){
                            StringText += `
                            <li>
                                ${ingre[a].title}
                            </li>
                            `
                            i++
                        }
                    }
                    context.data.push(
                            `<li>
                                <a href="featured.html"><img src="${element.smallImagePath}" alt="Image"></a>
                                <div>
                                    <h3><a href="featured.html">${element.title}</a></h3>
                                    <div>
                                            <p>
                                                ${element.summary}
                                            </p>
                                        <ul>
                                            ${StringText}
                                        </ul>
                                    </div>
                                </div>
                            </li>`
                        )}
                
                
            });
        
            res.locals.foot = "18127186 - Tran Dinh Phuoc - 18127186@student.hcmus.edu.vn"
            res.render('recipes',context)
        })
      })
      .catch(function(error){
          res.json(error);
      })
});

module.exports = router;
