const express = require('express');
const bodyPares = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(bodyPares.json());
app.use(bodyPares.urlencoded({
    extended: true
}));
app.use(cors());

const successMsg = {
    msg: 'success'
}
let suffixList = [];


//读取文件
const readFile = (file, fileName) => {
    let filePath;
    if (file == 'vue') {
        filePath = './template/template.vue';
    }
    if (file == 'scss') {
        filePath = './template/template.scss';
    }
    if (file == 'js') {
        filePath = './template/template.js';
    }
    if (file == 'ser.js') {
        filePath = './template/template.ser.js';
    }
    const data = appendFile(file, fileName, filePath)
    return data;
}

//追加文件内容
const appendFile = (file, fileName, filePath) => {
    let data = fs.readFileSync(filePath, 'utf-8')
    let content;
    if (file == 'vue') {
        content = `<script src='./${fileName}.js'></script>
  <style lang="scss" scoped>
     @import "./${fileName}.scss";
  </style>`;
        return data + content
    }
    return data

}
//创建文件
const createFile = (name) => {
    const [root,listDir] = name.split('/');
    fs.mkdir(name, {
        recursive: true
    }, (err) => {
        if (err) throw err;
        let template = '';
        let listTemplate = '';
        for (let item of suffixList) {
            template = readFile(item, root)
            listTemplate = readFile(item, listDir)
            fs.writeFile(`${root}/${root}.${item}`, template, (err) => {

            })
            if(listDir){
                fs.writeFile(`${root}/${listDir}/${listDir}.${item}`, listTemplate, (err) => {

                })
            }
           
        }
     

    })
}


app.post('/createFile', (req, res) => {
    const {
        client,
        fileName,
        isCreateList
    } = req.body;
    if (client == 'uniapp') {
        suffixList = ['js', 'scss', 'vue', 'ser.js']
    }
    if (client == 'angular') {
        suffixList = ['component.html', 'component.less', 'component.ts', 'module.ts']
    }
    
    isCreateList === 0 ? createFile(fileName) : createFile(`${fileName}/${fileName}-list`)
    
    res.send(JSON.stringify(successMsg))
})

const getTxtCtn = (value) => {
    let {
        routeList,
        suffix,
        nameList
    } = value;
    nameList = nameList.split(',');
    let txt = ''
    routeList.split(',').map((item, index) => {
        let res = `${nameList[index]}:${suffix}/${item}/${item}\n`
        txt += res;
    })
    return txt;
}

const createJson = (value)=>{
    let {
      routeList,
      suffix,
      nameList
    } = value;
    nameList = nameList.split(',');
    let pageItem = [];
    routeList.split(',').map((item, index) => {
      pageItem.push(
        {
          "path": `${item}/${item}`,
          "style": {
            "navigationBarTitleText": nameList[index]
          }
        }
      )
    })

    let res = JSON.stringify(pageItem)
    res = res.substr(1, res.length - 2)+','
    return res
  }

const createRouterFile = (file,json) => {
    fs.writeFileSync(`路由.txt`, file, (err) => {
    })
    fs.writeFileSync(`page.txt`, json, (err) => {
    })
}
app.post('/createRouterFile', (req, res) => {
    let txt = getTxtCtn(req.body);
    let jsonRes = createJson(req.body);
    createRouterFile(txt,jsonRes)
    res.send(JSON.stringify(successMsg))
})


app.listen(3000, () => {
    console.log('http://127.0.0.1:3000');
})