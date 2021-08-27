const express = require('express');
const { render, name } = require('ejs');
const dbConnection = require('./lib/dbConnection')
const user = require('./Schema/user')
const session = require('express-session')
var MongoDBStore = require('connect-mongodb-session')(session)
const cf=require('./Scrapers/codeforces');
const cc=require('./Scrapers/codechef');
const he=require('./Scrapers/hackerearth');
const ib=require('./Scrapers/interviewbt');
const lc =  require('./Scrapers/leetcode');
const sp = require('./Scrapers/spoj')
const hr=require('./Scrapers/hackerrank');
let userLib=require('./lib/userlib');



const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set('view engine','ejs')

dbConnection.connect()

const PORT = process.env.PORT || 3000;

var store = new MongoDBStore({
   uri: 'mongodb+srv://tenor06:Abhishyant22102004@cluster0.mw1u9.mongodb.net/CRUD?retryWrites=true&w=majority',
   collection: 'Sessions'
 });

 var store = new MongoDBStore({
  uri: 'mongodb+srv://tenor06:Abhishyant22102004@cluster0.mw1u9.mongodb.net/stopstalk?retryWrites=true&w=majority',
  collection: 'mySessions'
});


 app.use(session({
  name: 'sid',
  resave: false,
  saveUninitialized: false,
  secret: 'stopstalk123',
   cookie: {
       maxAge: 1000*60*60,
       sameSite: true,
       secure: false
   },
   store: store
}))

var isAuth=(req,res,next)=>{
  if(req.session.user)
    next()
  else
    res.redirect('/login')  
}

// Start the server
app.listen(PORT, function(){
    console.log("Server Starting running on http://localhost:"+PORT);
})

app.get("/", function(req, res){
  res.render('home');

})
app.get("/login", function(req, res){
    res.render('login');
 })
 app.get("/register", function(req, res){
    res.render('register')
 })

 app.post('/register',async function(req, res){
  var data= req.body;
    var ccstats;
    var cfstats;
    var lcstats;
    var spojstats;
    var hrstats;
    var hestats;
    var ibstats;
    let heusrname=data.hackerearth_profile.split('@')[1];
    var ccurl=data.codechef_profile;
    var cfurl=data.codeforces_profile;
    var hrurl=data.hackerrank_profile;
    var heurl='https://www.hackerearth.com/users/pagelets/'+heusrname+'/hackerearth-profile-overview/';
    var iburl=data.interviewbit_profile;
    var lcurl = data.leetcode_profile;
    var lcusr=lcurl.split('/')[3];
    console.log(lcusr);
    lcurl='https://competitive-coding-api.herokuapp.com/api/leetcode/'+lcusr;
    console.log(lcurl);
    var spurl = data.spoj_profile;
    await hr.getHackerRank(hrurl,function(result){
      console.log('HR solved',result);
      hrstats=result;
    })
    await cc.getCodechef(ccurl,function(result){
      console.log(result);
      ccstats=result;
    })
    await cf.getCodeforces(cfurl,function(result){
      console.log(result);
      cfstats=result;
    })
    await he.getHackerearth(heurl,function(result){
      console.log(result.count);
      hestats=result.count;
    })
    await ib.getInterviewBit(iburl,function(result){
      console.log('ibres',result);
      ibstats=result;
    })
    await lc.getleetcode(lcurl,function(result){
      console.log('lcres',result);
      lcstats=result;
    })
    await sp.getspoj(spurl,function(result){
      console.log('spres',result);
      spojstats=result;
    })
   console.log(data);
   const usr= new user({
      username: data.username,
      email: data.email,
      password: data.password,
      hackerrank_profile: data.hackerrank_profile,
      hackerearth_profile: data.hackerearth_profile,
      codechef_profile: data.codechef_profile,
      codeforces_profile: data.codeforces_profile,
      interviewbit_profile: data.interviewbit_profile,
      leetcode_profile:data.leetcode_profile,
      spoj_profile: data.spoj_profile,
      hackerrank_solved: hrstats,
      hackerearth_solved: hestats,
      leetcode_solved:lcstats,
      codechef_solved: ccstats,
      codeforces_solved: cfstats,
      interviewbit_solved: ibstats,
      spoj_solved: spojstats
  })
  await usr.save();
  res.redirect('/login');
})

app.get('/api/users/:usrname',(req,res)=>{
   var name=req.params.username;
   ratings={codechef:'',codeforces:''};
   user.find({username: name},async function(err, data){
      ratings.codechef=data[0].codechef_solved.ratings; 
      ratings.codeforces=data[0].codeforces_solved.ratings;
   })
   res.send(ratings);
})

app.post('/login',  function(req, res){
      var data = req.body
      console.log(data);
      //console.log(usr);
      userLib.isUserValid(data, async function(resultJson){
          console.log(resultJson);
          if(resultJson.success==true){
              req.session.user = data.username  
              var ccsolved=0;
              var cfsolved=0;
              var lcsolved=0;
              var spojsolved=0;
              var hrsolved=0;
              var hesolved=0;
              var ibsolved=0;        
              var stat = resultJson.stats
              var ccurl=stat.codechef_profile;
              var cfurl=stat.codeforces_profile;
              var heurl=stat.hackerearth_profile;
              var lcurl = stat.leetcode_profile;
              var lcusr=lcurl.split('/')[3];
              var hrurl=stat.hackerrank_profile;
              //console.log(lcusr);
              lcurl='https://competitive-coding-api.herokuapp.com/api/leetcode/'+lcusr;
              var spurl = stat.spoj_profile;
              console.log(lcurl);
              const iburl=stat.interviewbit_profile;
              await hr.getHackerRank(hrurl,function(result){
                console.log('HR solved',result);
                hrsolved=result;
              })
              await cc.getCodechef(ccurl,function(result){
                console.log(result);
                ccsolved=result;
              })
              await cf.getCodeforces(cfurl,function(result){
                console.log(result);
                cfsolved=result;
              })
              await he.getHackerearth(heurl,function(result){
                console.log("HE Solved:",result.count);
                hesolved=result;
              })
              await lc.getleetcode(lcurl,function(result){
                console.log('lcres',result);
                lcsolved=result;
              })
              await sp.getspoj(spurl,function(result){
                console.log('spres',result);
                spojsolved=result;
              })
              await ib.getInterviewBit(iburl,function(result){
                console.log('ibres',result);
                ibsolved=result;
              })
      
              var myquery = { username: data.username };
              var newvalues = { $set:{hackerrank_solved:hrsolved,hackerearth_solved: hesolved, codechef_solved: ccsolved, codeforces_solved: cfsolved, leetcode_solved: lcsolved, interviewbit_solved: ibsolved, hackerrank_solved: hrsolved, spoj_solved: spojsolved } };
              user.updateOne(myquery, newvalues, function(err, res) {
              if (err) throw err;
              console.log("1 document updated");
              });
      
             console.log(stat);
             console.log(cfsolved);
             console.log(ccsolved);
             res.redirect('/dashboard');
            } 
            else
            {
                res.redirect('/login');
            }
      })
})

// app.get('/api/user/',(req,res)=>{
    //get data from db and send as response to js file 
// });

app.get('/dashboard',isAuth,(req,res)=> {
   var usr = req.session.user
   //console.log(usr);
   var a=[]
   var usr_id;
   user.find({username: usr},async function(err, data){
     usr_id=data[0]._id;
    await  a.push(data[0].codechef_solved.solved)
    await  a.push(data[0].codeforces_solved.solved)
    await  a.push(data[0].interviewbit_solved.score)
    await  a.push(data[0].leetcode_solved.count)
    await a.push(data[0].hackerrank_solved.solved)
    await  a.push(data[0].hackerearth_solved.count)
    await  a.push(data[0].spoj_solved)
     console.log(a);
    var donut=[a[0],a[1],a[3],a[4],a[5]];
     res.render('profile',{username:usr,a:a},{plot_donut:donut});
   })
  
    
})
// var url ='https://www.codechef.com/users/deepaknad'
// cc.getCodechef(url,function(result){
//    console.log('ccres',result);
// })

// //  const cf=require('./Scrapers/codeforces')
// var url ='https://codeforces.com/profile/18H51A04D6'
// cf.getCodeforces(url,function(result){
//    console.log('cfresult',result)
//    //codeforces = result.count
//    //res.render('home',{codechef,codeforces})  
// })

// var heurl='https://www.hackerearth.com/@saideepak6';
// he.getHackerearth(heurl,function(result){
//    console.log('heresult',result);
// });

// var hrurl='https://www.hackerrank.com/18H51A04D6';
// hr.getHackerRank(hrurl,function(result){
//   console.log("Hr result",result);
// })

app.get('/logout', function(req, res){
  req.session.destroy((err)=>{
      if(err) throw err;
      res.redirect('/')
  })
})

