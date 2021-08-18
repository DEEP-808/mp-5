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
        var spurl = stat.spoj_profile;
        console.log(lcurl);
        const iburl=stat.interviewbit_profile;
        await cc.getCodechef(ccurl,function(result){
          console.log(result.solved);
          ccsolved=result.solved;
        })
        await cf.getCodeforces(cfurl,function(result){
          console.log(result.count);
          cfsolved=result.count;
        })
        await he.getHackerearth(heurl,function(result){
          console.log("HE Solved:"+result.count);
          hesolved=result.count;
        })
        await lc.getleetcode(lcurl,function(result){
          console.log('lcres',result);
          lcsolved=result.count;
        })
        await sp.getspoj(spurl,function(result){
          console.log('spres',result);
          spojsolved=result.score;
        })
        await ib.getInterviewBit(iburl,function(result){
          console.log('ibres',result);
          ibsolved=result.score;
        })

        var myquery = { username: data.username };
var newvalues = { $set: {hackerearth_solved: hesolved, codechef_solved: ccsolved, codeforces_solved: cfsolved, leetcode_solved: lcsolved, interviewbit_solved: ibsolved, hackerrank_solved: hrsolved, spoj_solved: spojsolved } };
user.updateOne(myquery, newvalues, function(err, res) {
if (err) throw err;
console.log("1 document updated");
});

       console.log(stat);
       console.log(cfsolved);
       console.log(ccsolved);}