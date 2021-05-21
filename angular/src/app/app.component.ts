import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
interface FileType {
  fileName:string;
  client?:string;
  suffix?:string;
  template?:string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'my-node';
  iptVal: string = '';
  validateForm!: FormGroup;
  options:string[]=['uniapp','angular'];

  constructor(public http: HttpClient, private fb: FormBuilder) { }  // 赋值给当前属性
  ngOnInit(): void {
    this.initForm()
  }
  initForm() {
    this.validateForm = this.fb.group({
      fileName: [null, [Validators.required]],
      client:[null,],
      suffix: [null,],
      template: [null,],
    });
  }
  //创建文件接口
  createFile(file:FileType) {
    this.http.post('http://127.0.0.1:3000/createFile', file).subscribe((res) => {
      console.log(res)
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