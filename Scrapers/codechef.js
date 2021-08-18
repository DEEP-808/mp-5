const axios =require('axios');
const cheerio= require('cheerio');

module.exports.getCodechef=async function(url,cb){
    async function getStats(){
       // let userstats=[];
        let ccresponse = {stars:'',rating:'',solved:'',ratings:'',dates:''}
        await axios(url).then(response=>{
            const html=response.data;
            const $ = cheerio.load(html)
            let stars = ($('.rating').text()[0]);
            let rating=$('.rating-number').text();
            let solved=$('section[class="rating-data-section problems-solved"]').find('div > h5').text();
            ccresponse.stars = stars
            ccresponse.rating = rating   
            var x =solved;
            var y=x.split(' ')
            var l=y[2];
            var count="";
            for(let i=1;i<l.length;i++)
            {
                    if(l[i]==')')
                    break;
                count+=l[i];
            }
            ccresponse.solved = count
            var st=html.indexOf("all_rating");
            var en = html.indexOf("var current_user_rating",st);
            var str=html.slice(st+14,en-5);
            //var contest_ratings=(html.slice(st+14,en-5));
            var ratings =[];
            var contest_dates =[];
            for(let i=0;i<en-5;i++)
            {
                var start=i;
                var end=str.indexOf('}',start)+1;
                if(end==0)
                    break;
                var temp=str.slice(start,end);
                var jsonData=JSON.parse(temp);
                var con_year = jsonData.getyear;
                var con_month = jsonData.getmonth;
                var con_day = jsonData.getday;
                var cdate= con_day+'-'+con_month+'-'+con_year;
                contest_dates.push(cdate);
                //console.log(jsonData.rating);
                ratings.push(jsonData.rating)
                i=end;
            }
            ccresponse.ratings=ratings;
            ccresponse.dates=contest_dates;
            //console.log(ccresponse);
            cb(ccresponse)
            return ccresponse
        }).catch(console.error);
      //  return userstats;
     
    }
    let x={}
    async function final(){
        x = await getStats();
        return x;
    }
   await final();
}