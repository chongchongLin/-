import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClient } from "@angular/common/http";

interface FileType {
  fileName:string;
  client?:string;
  suffix?:string;
  template?:string;
}
@Component({
  selector: 'app-createFile',
  templateUrl: './createFile.component.html',
  styleUrls: ['./createFile.component.scss']
})
export class CreateFileComponent implements OnInit {
  title = 'my-node';
  iptVal: string = '';
  validateForm!: FormGroup;
  options:string[]=['uniapp','angular'];
  constructor(public http: HttpClient, private fb: FormBuilder,private message: NzMessageService) { }

  ngOnInit() {
    this.initForm()
  }
  initForm() {
    this.validateForm = this.fb.group({
      fileName: [null, [Validators.required]],
      client:['uniapp',],
      isCreateList:['0'],
    });
  }
  //创建文件接口
  createFile(file:FileType) {
    this.http.post('http://127.0.0.1:3000/createFile', file).subscribe((res:any) => {
      if(res.msg == 'success'){
        this.message.success('创建成功',{
          nzDuration:1000
        })
      }
    })
  }

  //重置按钮
  reset() {
    this.validateForm.reset();
  }
  //提交
  submit() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    const { value, valid } = this.validateForm;
    console.log(value)
    if(valid){
      this.createFile(value)
    }
  }
}
