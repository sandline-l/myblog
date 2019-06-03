//随机标签
var randomTag = new Vue({
    el:'#random_tag',
    data:{
        tags:['div','js','jquery','php','python','bootstrap','每日一句','博客文章','收藏','div','js','jquery','php','python','bootstrap','每日一句','博客文章','收藏','div','js','jquery','php','python','bootstrap','每日一句','博客文章','收藏'],
    },
    computed:{
        randomColor(){
            return function () {
                var red = Math.random()*255;
                var green = Math.random()*255;
                var blue = Math.random()*255;
                return `rgb(${red},${green},${blue})`
            }
        },
        randomSize(){
            return function () {
                var size = Math.random()*20 + 12;
                return `${size}px`
            }
        }
    },
    created(){

    }
});

var newHot = new Vue({
    el:'#newHot',
    data:{
        hotList:[
            {title:'这是一个热门条目',link:'http://www.baidu.com'},
            {title:'这是一个热门条目',link:'http://www.baidu.com'},
            {title:'这是一个热门条目',link:'http://www.baidu.com'},
            {title:'这是一个热门条目',link:'http://www.baidu.com'},
            {title:'这是一个热门条目',link:'http://www.baidu.com'},
            {title:'这是一个热门条目',link:'http://www.baidu.com'},
            {title:'这是一个热门条目',link:'http://www.baidu.com'},
            {title:'这是一个热门条目',link:'http://www.baidu.com'},
            {title:'这是一个热门条目',link:'http://www.baidu.com'},
        ]
    }
});



var newComment = new Vue({
    el:'#newComment',
    data:{
        list:[
            {
                name:'kavn',
                time:'1小时前',
                comment:'今天好热,喝了很多水,咚咚咚'
            },{
                name:'kavn',
                time:'1小时前',
                comment:'今天好热,喝了很多水,咚咚咚'
            },{
                name:'kavn',
                time:'1小时前',
                comment:'今天好热,喝了很多水,咚咚咚'
            },{
                name:'kavn',
                time:'1小时前',
                comment:'今天好热,喝了很多水,咚咚咚'
            },
        ]
    }
});















