const path=require("path");//加载path模块
const HtmlwebpackPlugin=require('html-webpack-plugin');
const miniCssExtractPlugin=require('mini-css-extract-plugin');
module.exports={
    mode:'production',
    entry:{
        index:'./src/index.js',
        prule:'./src/prule.js'
    },//入口 多入口
    output:{//打包出口
        path:path.resolve(__dirname,"../dist/"),//打包文件输出路径 绝对路径
        // filename:'bundle.js'
        filename:'[name].js' //入口文件修改就重新生成
    },
    module:{
        
        rules:[
            {
                test:/\.css$/,
                use:[{
                    loader:'style-loader'
                },
                    {loader:miniCssExtractPlugin.loader},
                    {loader:'css-loader'}       
                ]
            },
            {
                test:/\.less$/,
                use:[
                    {loader:miniCssExtractPlugin.loader},
                    {loader:'css-loader'},      
                    {loader:'less-loader'}     
            ]
            },
            // {
            //     test:/\.(jpg|png|gif|webp|jpeg)$/,
            //     use:[
            //         {loader:'file-loader'}    
            // ]
            // }
            {
                test:/\.(jpg|png|git|webp|jpeg)$/,
                use:[
                    {loader:'url-loader',
                    options:{
                        limit:102400    //单位byte 图片小于100k转换base64
                    }
                }    
                ]
            },
            {
                test:/\.js$/,
                exclude:/(node_modules|brower_components)/,
                use:[
                    {
                        loader:'babel-loader',
                        options:{
                            presets:['env']
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new HtmlwebpackPlugin({
        title:"网页标题",
        template:'./src/tpl.html',
        inject:'head',
        minify:{
            removeComments:true,//移除注释
            removeAttributeQuotes:true,//移除属性引号
            collapseWhitespace:true//移除空白
        },
        filename:'index_1.html'
        }),
        new miniCssExtractPlugin({
            filename:'[name].[hash].css'
        })
    ]


}