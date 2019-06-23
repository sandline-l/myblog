// var axios = require('axios');

var everyDay = new Vue({
    el:'#every_day',
    data:{
        content:'ssssss'
    },
    computed:{
        getContent(){
            return this.content;
        }
    },
    created(){
        //用ajax 请求数据, 给content赋值
    }
})

var articleList = new Vue({
    el:'#article_list',
    data:{
        page:1,
        pageSize:5,
        count:100,
        pageNumList:[],
        articlelist:[
            {
                title:'Docker搜索或拉取镜像时提示timeout',
                //跳转到文章的详情页面,这个还没写
                link:'/about.html',
                content:' 【更新】推荐直接在物理主机的config.json文件进行配置，因为发现下面的方式修改/etc/resolv.conf后，\n' +
                '                        重启docker时会失效。配置文件默认在C:\\Users\\你的用户名\\.docker\\machine\\machines\\default内。\n' +
                '                        编辑其中的HostOptions>EngineOptions>Dns项，比如修改成:{"HostOptions": { "Driver": "&quo...',
                date:'2019-05-20',
                tag:'docker',
                num:'347'
            },
        ]
    },
    computed:{
        jumpTo:function(){
          return function (page) {
              this.getPage(page,this.pageSize);
          }
        },
        getPage(){
            return function (page, pageSize) {
                //发送一个ajax请求, 来获取页数和每页大小
                axios.get('/queryBlogByPage?page='+(page-1)+'&pageSize='+pageSize).then(function (resp) {
                    var result = resp.data.data;
                    var list = [];
                    for (var i = 0; i < result.length; i++) {
                        var temp = {};
                        temp.title = result[i].title;
                        temp.tags = result[i].tags;
                        temp.id = result[i].id;
                        temp.content = result[i].content;
                        temp.data = result[i].ctime;
                        temp.views = result[i].views;
                        temp.link = '/blog_detail.html?bid=' + result[i].id;
                        list.push(temp)
                    }
                    articleList.articlelist = list;
                    articleList.page = page;
                }).catch(function (resp) {
                    console.log('请求错误')
                    console.log(resp)
                });
                //发送请求,获得总数据条数
                axios.get('queryBlogcount').then(function (resp) {
                    articleList.count = resp.data.data[0].count;
                    articleList.generatePageTool
                }).catch(function (resp) {

                });
            }
        },
        //生成分页的函数 , 初始话的时候,执行这个函数,就可以生成分页了
        generatePageTool(){
            //当前页数
            var nowPage = this.page;
            var pageSize = this.pageSize;
            var totalCount = this.count;
            //把每一个li当作一个对象,来放入数组,
            var result = [];
            result.push({text:'<<',page:1});
            if(nowPage > 2){
                result.push({text:nowPage - 2,page:nowPage-2})
            }
            if(nowPage > 1){
                result.push({text:nowPage - 1,page:nowPage-1})
            }
            result.push({text:nowPage,page:nowPage});
            if(nowPage +1 <= (totalCount+pageSize-1) / pageSize){
                result.push({text:nowPage + 1,page:nowPage+1})
            }
            if(nowPage +2 <= (totalCount+pageSize-1) / pageSize){
                result.push({text:nowPage + 2,page:nowPage+2})
            }
            result.push({text:'>>',page:parseInt((totalCount+pageSize-1) / pageSize)});
            this.pageNumList = result;
            return result;
        }
    },
    created(){
        //创建页面的时候,传入页数和每页的大小
        this.getPage(this.page, this.pageSize);
    }
})













