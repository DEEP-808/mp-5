const axios =require('axios');
const cheerio= require('cheerio');

module.exports.getCodeforces=async function(url,cb){
    async function getStats(){
        let cfresponse={rating:'',solved:'',ratings:''};
        let userstats=[];
        let usr=url.split('/');
        console.log(usr);
        let ctapi='https://codeforces.com/contests/with/'+usr[4];
        console.log(ctapi);
        await axios(url).then(response=>{
            const html=response.data;
            const $ = cheerio.load(html);
            let rating = $('.userbox').first().find('ul > li >span').eq(0).text().trim();
            let solved=($('._UserActivityFrame_counterValue').eq(0).text()).split(" ")[0];
            cfresponse.rating=rating;
            cfresponse.solved=solved;
        }).catch(console.error);
        await axios(ctapi).then(response=>{
            const html=response.data;
            const $ = cheerio.load(html);
            var myTableArray = [];
            $('table[class="tablesorter user-contests-table"]').find('tbody > tr').each(function() {
                var arrayOfThisRow = [];
                var tableData = $(this).find('td');
                if (tableData.length > 0) {
                    tableData.each(function() { arrayOfThisRow.push($(this).text().replace(/[ \t\r]+/g,"")); });
                    myTableArray.push(arrayOfThisRow[6].trim());
                }
            });
            //console.log(myTableArray);
            cfresponse.ratings=myTableArray;
            cb(cfresponse);
        }).catch(console.error);
    }
    
    let x={};
    async function final(){
        x = await getStats();
        return x;
    }
    await final();
}
