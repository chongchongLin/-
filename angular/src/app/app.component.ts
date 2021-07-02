import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'my-node';
  tabs = [
    { 
      id:1,
      name: '基于业务快速创建文件',
    },
    { 
      id:2,
      name: '快速创建路由文件',
    }
  ];
  constructor() { }  // 赋值给当前属性
  ngOnInit(): void {
  }



}
