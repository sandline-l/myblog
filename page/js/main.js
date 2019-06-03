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
            },  {
                title:'Docker搜索或拉取镜像时提示timeout',
                content:' 【更新】推荐直接在物理主机的config.json文件进行配置，因为发现下面的方式修改/etc/resolv.conf后，\n' +
                '                        重启docker时会失效。配置文件默认在C:\\Users\\你的用户名\\.docker\\machine\\machines\\default内。\n' +
                '                        编辑其中的HostOptions>EngineOptions>Dns项，比如修改成:{"HostOptions": { "Driver": "&quo...',
                date:'2019-05-20',
                tag:'docker',
                num:'347'
            },  {
                title:'Docker搜索或拉取镜像时提示timeout',
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

    },
    created(){
    }
})













