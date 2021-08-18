const fetch = require('node-fetch');

module.exports.getHackerRank=async function gethr(hrurl,cb) {
    var result = {solved: "",submissions:''}
    console.log(hrurl);
    var hrusrname=hrurl.split('/')[3];
    console.log('hrurl',hrurl.split('/'));
    var url = 'https://www.hackerrank.com/rest/hackers/'+hrusrname+'/recent_challenges?limit=1000&response_version=v1';
    console.log(url);
    var response= await fetch(url);
    var data= await response.json()
    let all_probs=data.models;
    let submissions=[]
    for(let i=0;i<all_probs.length;i++)
    {
        //console.log(all_probs[i]);
        submissions.push(all_probs[i].name);
    }
    console.log(submissions);
    result.submissions=submissions;
    result.solved=String(data.total);
    cb(result);
    console.log('hr solved',result);
}

