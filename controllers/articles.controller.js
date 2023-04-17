


const  connection = require('../config/db')
const Joi = require('joi');

const createArticles = async (req ,res)=>{
    let path=null;
    let message = null;
    res.render('article/create.ejs',{
        error:{
            path,
            message
        }
    })
}

const getAllarticles = async (req, res) => {//async katgolina matdoz la fonction tania tatvalider chno kayn fl await
   
    console.log("ahemmmdmmdmdm")// bach kan3arfo ndeboguew , n7ado lmochkil fina blasa kayn
    try {
        const [result] = await connection.query('SELECT * FROM article ');
        
        res.render('article/index.ejs',{articles:result})// kangolo lbase donnés t7at lina fhad l'objet likayn ftableau result
       
        
    } catch (error) {
        res.status(500).json({ //
            message:"server is down !"
        })
        
    }
}


const saveArticle = async(req, res) => {

    // return res.send(req.body)// bach ntestew

   const valid = Joi.object({//validation dial lformulaire
        smartphone: Joi.string().uppercase().trim().min(3).max(10).required(),
        description: Joi.string().trim().min(10).required(),
        category_id: Joi.number().integer().positive().required(),


    })

    const {value , error} = valid.validate(req.body)
    
if(error){
    
    const {path,message}=error?.details[0];

    
    const myError = {
        path: path[0],
       message : message
    }

    
    return res.render('article/create',{
        error: myError
    });
}




    let{smartphone,description,category_id}=value // req.body hia likansta9blo biha data 3la chkal json
    
    try {
        const [result] = await connection.query('INSERT INTO article (smartphone,description,category_id) VALUES (?,?,?) ',[smartphone,description,category_id] );
        
            
        
        // res.send(result)

       res.redirect('/articles');
        
    } catch (error) {
        res.status(500).json({
            message:"server is down !"
        })
        
    }
}

const oneArticle = async (req, res) => {
    const id = req.params.id;

    try {
        const [result] = await connection.query(`SELECT * FROM article where id = ?`,[id] );
        if(result.length==0){
            return res.status(404).json({
                message : " is not found"
            })
        }
        res.status(200).json(result)
        
    } catch (error) {
        res.status(500).json({
            message:"server is down !"
        })
        
    }
}
const EditArticles = async (req, res) => { 
    
    let id = req.params.id
    let path=null;
    let message = null;

    const [[data]] =  await connection.query(`SELECT * FROM article where id = ?`,[id] )

 
 
    res.render('article/update.ejs',{
        error:{
            path,
            message
        },
        article : data
    })
    
}


const putArticles = async (req, res) => {
    let id = req.params.id
    let{smartphone,description,category_id}=req.body; 


    const upvalid = Joi.object({//validation dial lformulaire
        smartphone: Joi.string().uppercase().trim().min(3).max(10).required(),
        description: Joi.string().trim().min(10).required(),
        category_id: Joi.number().integer().positive().required(),


    })
    const {value , error}=upvalid.validate(req.body)

    if(error){
    
        const {path,message}=error?.details[0];
        
        const [[data]] =  await connection.query(`SELECT * FROM article where id = ?`,[id] )
        
        const myError = {
            path: path[0],
            message
        }
    
        
        return res.render('article/update',{
            error: myError,
            article:data
        });
    }
    
      

    try {
        const [result] = await connection.query("UPDATE article set smartphone = ?, description = ?,category_id =? where id = ?" ,[smartphone,description,category_id,id] );
 
        res.redirect('/articles')
            
         
        
    } catch (error) {
        res.status(500).json({
            message:"server is down !"
        })
        
    }

}
   

const patchArticles = async (req, res) => {
let id = req.params.id
    let{smartphone,description,category_id}=req.body;
    
    try {
        const [result] = await connection.query("UPDATE article set smartphone =  IFNULL (?,smartphone) , description = IFNULL (?,description), category_id = IFNULL (?,category_id) where id = ?" ,[smartphone,description,category_id,id] );
        if(result.affectedRows==0){
            return res.status(400).send({

                message : "bad requeqt"
            })
        }
            
        
        res.status(200).send(result)
        
    } catch (error) {
        res.status(500).json({
            message:"server is down !"
        })
        
    }
}

const deleteArticles = async (req, res) => {
    let id = req.params.id
        try {
            const [data] = await connection.query("DELETE FROM article where id =?",[id] );
           
               return res.redirect('/articles');
            
        } catch (error) {
            res.status(500).json({
                message:"delete  !"
            })
            
        }
}

exports.getAllarticles = getAllarticles
exports.oneArticle = oneArticle
exports.putArticles = putArticles
exports.saveArticle =saveArticle
exports.patchArticles =patchArticles
exports.deleteArticles =deleteArticles
exports.createArticles =createArticles
exports.EditArticles =EditArticles