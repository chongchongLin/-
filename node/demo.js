const fs = require('fs');
var path = require("path");
let suffixList = ['js', 'scss', 'vue', 'ser.js']
// `/demo/demo-list/demo-list.js`
// `/demo/demo.js`
const createFile = (name,index,isAddList) => {
    name  = name.includes('/') ?  name : name.split('/')[0];
    console.log(name)
    fs.mkdir(name, {
        recursive: true
    }, (err) => {
        if (err) throw err;
        let template = '';
        for (let item of suffixList) {
            template = readFile(item, name)
            fs.writeFile(`${name}/${name}.${item}`, template, (err) => {

            })
        }
        console.log(path.dirname(name))
        if(index>1){
            createFile(`./${name}-list`,index-1)
        }else{
            return false
        }

    })


}
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

createFile('demo/demo-list')