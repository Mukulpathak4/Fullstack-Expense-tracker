const Expense = require('../models/details');

exports.AddDetails = async (req,res,next)=>{
    try {
      
      const sellingprice = req.body.sellingprice;
      const productname = req.body.productname;
      
  
      if (!sellingprice) {
          throw new Error('Amount is mandatory !')
      }
      const data = await Expense.create({
          sellingprice : sellingprice,
          productname : productname
      })
  
      res.status(201).json({ newExoenseDetail: data });
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
  }
}
exports.getDetails=async (req,res,next)=>{
    try{
        const Users = await Expense.findAll();
       
        res.status(200).json({allUsers : Users});
    }catch(err) {
        console.log(err);
        res.status(500).json({error : err})
    }
}
exports.deleteDetails = async (req, res, next) => {
    try{
        const id = req.params.id;
        const user = await Expense.findAll({where: {id:id}});
        if(!user){
            console.log('This user does not exist.');
            return res.sendStatus(400);
        }
        await Expense.destroy({where: {id:id}});
        res.sendStatus(200);
        }catch(err){
            console.log(err);
            res.status(500).json({error : err})
        }
}