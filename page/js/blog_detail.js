var blog_detail = new Vue({
    el:'#blog_detail',
    data:{
        title:'',
        tags:'',
        views:'',
        ctime:'',
        content:'',

    },
    computed:{

    },
    created(){
        var searchUrlParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&'):'';
        if (searchUrlParams == ''){
            return  
        } 
        var bid = -1;
        for (var i = 0; i < searchUrlParams.length; i++) {
            if (searchUrlParams[i].split('=')[0] == 'bid'){
                try{
                    bid = parseInt(searchUrlParams[i].split('=')[1]);
                }catch (e){
                    console.log(e);
                }
            }
        }
        //通过id获取到文章的信息
        axios({
            method:'get',
            url:'/queryBlogById?bid=' + bid
        }).then(function (resp) {
            console.log(resp);
            var data = resp.data.data[0];
            blog_detail.title = data.title;
            blog_detail.tags = data.tags;
            blog_detail.views = data.views;
            blog_detail.ctime = data.ctime;
            blog_detail.content = data.content;
        }).catch(function (resp) {
            console.log('请求失败')
        })
        
    }
})