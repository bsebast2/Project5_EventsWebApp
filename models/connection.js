const { DateTime} =require("luxon");
const { v4:uuidv4}=require('uuid');
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const connectionSchema=new Schema({
    name:{type:String,required:[true,'cannot be empty'],unique:true},
    author: {type: Schema.Types.ObjectId, ref:'User'},
    topic:{type:String,required:[true,'cannot be empty']},
    details:{type:String,required:[true,'cannot be empty'],minLength: [10, 'the content should have at least 10 characters']},
    date:{type:String,required:[true,'cannot be empty']},
    start_time:{type:String,required:[true,'cannot be empty']},
    end_time:{type:String,required:[true,'cannot be empty']},
    host_name:{type:String,required:[true,'cannot be empty']},
    image:{type:String,required:[true,'cannot be empty']},
    createdAt:{type:String,required:[true,'cannot be empty']},
    //email:{type:String,required:[true,'cannot be empty'],unique:true},
    //password:{type:String,required:[true,'cannot be empty']},
    
},
{timestamps:true});

/*
const connections=[
{
    id:'1',
    name:'Edelweiss',
    topic:'Piano',
    details:'This is an amazing song 1.',
    date:DateTime.local(2021,2,12,18,0).toLocaleString(DateTime.DATETIME_SHORT),
    start_time:DateTime.local(2021,2,12,18,0).toLocaleString(DateTime.DATETIME_SHORT),
    end_time:DateTime.local(2021,2,12,19,0).toLocaleString(DateTime.DATETIME_SHORT),
    host_name:'Mary Anderson',
    image:'https://www.wikihow.com/images/e/e1/Play-%22Happy-Birthday%22-on-the-Piano-Step-17.jpg',
    createdAt:DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
},
///console.log(new Date(Date.now()).toISOString());
//
{
    id:'2',
    name:'Rocket Man',
    topic:'Piano',
    details:'A song by Elton John',
    date:DateTime.local(2021,2,14,18,0).toLocaleString(DateTime.DATETIME_SHORT),
    start_time:DateTime.local(2021,2,14,18,0).toLocaleString(DateTime.DATETIME_SHORT),
    end_time:DateTime.local(2021,2,14,19,0).toLocaleString(DateTime.DATETIME_SHORT),
    host_name:'Bentic Sebastian',
    image:'https://spockandchristine.com/wp-content/uploads/2018/10/Elton-John.jpg',
    createdAt:DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
},
{
    id:'3',
    name:'Twinkle, Twinkle Little Star',
    topic:'Piano',
    details:'This is classical and very famous. This song is an easy way to start into the subject',
    date:DateTime.local(2021,2,14,18,0).toLocaleString(DateTime.DATETIME_SHORT),
    start_time:DateTime.local(2021,2,14,18,0).toLocaleString(DateTime.DATETIME_SHORT),
    end_time:DateTime.local(2021,2,14,19,0).toLocaleString(DateTime.DATETIME_SHORT),
    host_name:'Abraham Gustav',
    image:'https://www.dailydot.com/wp-content/uploads/e7b/94/5ccfc8f4cec4d024ea42aa559446b572.jpg',
    createdAt:DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
},
{
    id:'4',
    name:'Back in Black',
    topic:'Guitar',
    details:'This is a hiphop track, so the style of guitar-playing is very modern.',
    date:DateTime.local(2021,2,13,18,0).toLocaleString(DateTime.DATETIME_SHORT),
    start_time:DateTime.local(2021,2,13,18,0).toLocaleString(DateTime.DATETIME_SHORT),
    end_time:DateTime.local(2021,2,13,19,0).toLocaleString(DateTime.DATETIME_SHORT),
    host_name:'Rick Ross',
    image:'https://www.wikihow.com/images/e/e1/Play-%22Happy-Birthday%22-on-the-Piano-Step-17.jpg',
    createdAt:DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
},
{
    id:'5',
    name:'Yellow',
    topic:'Guitar',
    details:'This famous song by Coldplay is very famous.',
    date:DateTime.local(2021,2,13,18,0).toLocaleString(DateTime.DATETIME_SHORT),
    start_time:DateTime.local(2021,2,13,18,0).toLocaleString(DateTime.DATETIME_SHORT),
    end_time:DateTime.local(2021,2,13,19,0).toLocaleString(DateTime.DATETIME_SHORT),
    host_name:'Nathan Rodrigues',
    image:'https://1dvq991ol66r37j0122osl0r-wpengine.netdna-ssl.com/wp-content/uploads/2017/05/best-electric-guitar-players-of-all-time-1024x823.jpg',
    createdAt:DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
},
{
    id:'6',
    name:'Purple Rain',
    topic:'Guitar',
    details:'This is a famous song by the artist Prince. There is high distortion and an incredible lead section',
    date:DateTime.local(2021,2,13,18,0).toLocaleString(DateTime.DATETIME_SHORT),
    start_time:DateTime.local(2021,2,13,18,0).toLocaleString(DateTime.DATETIME_SHORT),
    end_time:DateTime.local(2021,2,13,19,0).toLocaleString(DateTime.DATETIME_SHORT),
    host_name:'Tania Jane',
    image:'https://i.ytimg.com/vi/Gbmt7IpINBc/maxresdefault.jpg',
    createdAt:DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
},
{
    id:'7',
    name:'Stairway To Heaven',
    topic:'Drums',
    details:'This song is a very standard song for classic heavy metal enthusiasts',
    date:DateTime.local(2021,2,13,18,0).toLocaleString(DateTime.DATETIME_SHORT),
    start_time:DateTime.local(2021,2,13,18,0).toLocaleString(DateTime.DATETIME_SHORT),
    end_time:DateTime.local(2021,2,13,19,0).toLocaleString(DateTime.DATETIME_SHORT),
    host_name:'Justin DMello',
    image:'https://www.yamaha.com/en/musical_instrument_guide/common/images/drums/play_p03_01.jpg',
    createdAt:DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
},
{
    id:'8',
    name:'Autumn Leaves',
    topic:'Drums',
    details:'This song is a very famous jazz piece. It was created in 1904, and has led to many versions.',
    date:DateTime.local(2021,2,13,18,0).toLocaleString(DateTime.DATETIME_SHORT),
    start_time:DateTime.local(2021,2,13,18,0).toLocaleString(DateTime.DATETIME_SHORT),
    end_time:DateTime.local(2021,2,13,19,0).toLocaleString(DateTime.DATETIME_SHORT),
    host_name:'Lara Bareilles',
    image:'https://s-media-cache-ak0.pinimg.com/originals/fa/17/ef/fa17eff1f2dbadfb448006155ea651cf.jpg',
    createdAt:DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
},
{
    id:'9',
    name:'Pretender',
    topic:'Drums',
    details:'The song is a very difficult piece to perform, created by a famous band. ',
    date:DateTime.local(2021,2,13,18,0).toLocaleString(DateTime.DATETIME_SHORT),
    start_time:DateTime.local(2021,2,13,18,0).toLocaleString(DateTime.DATETIME_SHORT),
    end_time:DateTime.local(2021,2,13,19,0).toLocaleString(DateTime.DATETIME_SHORT),
    host_name:'Mario Lopez',
    image:'https://th.bing.com/th/id/R83c4a62187141a75920dfe27b1a6a324?rik=4BWRVdkfMYzFKQ&riu=http%3a%2f%2ftheparadiddler.com%2fwp-content%2fuploads%2f2011%2f01%2fjlc.jpg&ehk=Tn%2fHsQvckjObd7jnT%2fHyOJudxVgy5cSPX1EvRPBiF8o%3d&risl=&pid=ImgRaw',
    createdAt:DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
}
];

*/


//exports.find=function(){
//    return connections;
//}

/*
//exports.findById=function(id){
//    return stories.find(story=>story.id===id);
//}

exports.findById=id=>connections.find(connection=>connection.id===id);

exports.save=function(connection){
    connection.id=uuidv4();
    //connection.createdAt=DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    connections.push(connection);
}


exports.updateById=function(id,newConnection){
    let connection=connections.find(connection=>connection.id===id);
    if(connection){
        if(newConnection.name){connection.name=newConnection.name};
    //if(newConnection.topic){connection.topic=newConnection.topic};
        if(newConnection.topic){connection.topic=newConnection.topic};
        if(newConnection.details){connection.details=newConnection.details};
        if(newConnection.date){connection.date=newConnection.date};
        if(newConnection.start_time){connection.start_time=newConnection.start_time};
        if(newConnection.end_time){connection.end_time=newConnection.end_time};
        if(newConnection.host_name){connection.host_name=newConnection.host_name};
        if(newConnection.image){connection.image=newConnection.image};    

    return true;
    }
    else
    {
        return false;
    }

}

exports.deleteById=function(id){
    let index=connections.findIndex(connection=>connection.id===id);
    if(index !== -1) {
        connections.splice(index,1);
        return true;
    }else{
        return false;
    }
}
*/

module.exports=mongoose.model('Connection',connectionSchema);