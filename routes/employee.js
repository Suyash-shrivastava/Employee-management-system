var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer')

var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

router.get('/employeeinterface', function(req, res, next) {
var admin=JSON.parse(localStorage.getItem('ADMIN'))
if(admin)
{
  res.render('employeeinterface',{'message':''});
}
else
{
  res.render('adminlogin',{'message':' '});
}
});

router.post('/employeesubmit',upload.single('pic'),function(req,res){
    console.log("BODY",req.body)
    console.log("FILE",req.file)

pool.query("insert into employeedetails (empid,emptype,empname, address, dob, city,state, gender, picture)values(?,?,?,?,?,?,?,?,?)",[req.body.empid, req.body.emptype, req.body.empname, req.body.add, req.body.dob, req.body.city, req.body.state, req.body.gender, req.file.originalname],function(error,result){
  
  if(error)
  {
    console.log(error)
    res.render('employeeinterface',{'message':'Server Error'})
  }  
  else
  {
    res.render('employeeinterface',{'message':'Record Submitted Succesfully'})
  }
  })
  })

  router.get('/fetchallcities',function(req,res){
    pool.query("select * from cities",function(error,result){
      if(error)
      {res.status(500).json({result:[],message:'Server Error'})}
      else
      {res.status(200).json({result:result,message:'Success'})}
    })
  })

  router.get('/fetchallstate',function(req,res){
    pool.query("select * from state",function(error,result){
      if(error)
      {res.status(500).json({result:[],message:'Server Error'})}
      else
      {res.status(200).json({result:result,message:'Success'})}
    })
  })


  router.get('/displayemployee',function(req,res){
    var admin=JSON.parse(localStorage.getItem('ADMIN'))
if(!admin)
{res.render('adminlogin',{message:''})}
else
{

  pool.query("select F.*,(select C.cityname from cities C where C.cityid=F.city)as city, (select S.statename from state S where S.stateid=F.state)as state from employeedetails F",function(error,result){
    if(error)
    {
      console.log(error)
      res.render('displayemployee',{'data':[],'message':'Server Error...'})
    }
    else
    {
      res.render('displayemployee',{'data':result,'message':'Success'})
    }    
    })
  }
})

router.get('/searchbyid',function(req,res){
  pool.query("select F.*,(select C.cityname from cities C where C.cityid=F.city)as city,(select S.statename from state S where S.stateid=F.state)as state from employeedetails F where empid=?",[req.query.fid],function(error,result){
if(error)
{
console.log(error)
res.render('employeebyid',{'data':[],'message':'Server Error'})
}
else{
console.log(error)
res.render('employeebyid',{'data':result[0],'message':'Success'})
}
})
})

router.get('/searchbyidforimage',function(req,res){
  pool.query("select F.*,(select C.cityname from cities C where C.cityid=F.city)as city,(select S.statename from state S where S.stateid=F.state)as state from employeedetails F where empid=?",[req.query.fid],function(error,result){
if(error)
{
console.log(error)
res.render('showimage',{'data':[],'message':'Server Error'})
}
else
{
res.render('showimage',{'data':result[0],'message':'Success'})
}
})
})

router.post('/editimage',upload.single('pic'),function(req,res){
  console.log("BODY",req.body)
  console.log("FILE",req.file)

pool.query("update employeedetails set picture=? where empid=?",[req.file.originalname,req.body.empid],function(error,result){

if(error)
{
  console.log(error)
  res.redirect('/employee/displayemployee')}  
else
{
  res.redirect('/employee/displayemployee')}
})
})

router.post('/editdelete',function(req,res){
if(req.body.btn=="Edit")
  {
  pool.query("update employeedetails set empid=?, emptype=?, empname=?, address=?, dob=?, city=?, state=?, gender=? where empid=?",[req.body.empid,req.body.emptype,req.body.empname,req.body.add,req.body.dob,req.body.city,req.body.state,req.body.gender,req.body.empid],function(error,result){
  if(error)
  {console.log(error)
    res.redirect('/employee/displayemployee')
  }  
  else
  {
    res.redirect('/employee/displayemployee')
  }
  })
  }
else 
  {
  pool.query("delete from employeedetails where empid=?",[req.body.empid],function(error,result){
  if(error)
  {console.log(error)
    res.redirect('/employee/displayemployee')
  }  
  else
  {
    res.redirect('/employee/displayemployee')
  }
  })
  } 
  })


    module.exports = router;
