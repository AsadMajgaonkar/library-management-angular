import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {studentdata} from './library.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent {
  showadd!:boolean
  showupdate!:boolean
  formValue!:FormGroup
  studentmodelobj:studentdata = new studentdata
  allstudentdata:any

  constructor(private formBuilder:FormBuilder, private api:ApiService){

  }

  ngOnInit(): void{
    this.formValue = this.formBuilder.group({
      name :['', Validators.required],
      email :['', Validators.required],
      mobile :['', Validators.required],
      city :['', Validators.required],
    })
    this.getdata()
  }

  add(){
    this.showadd=true;
    this.showupdate=false;
  }
  edit(data:any){
    this.showadd=false;
    this.showupdate=true;
    this.studentmodelobj.id = data.id

    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['city'].setValue(data.city);
  }

  //update
  update(){
    this.studentmodelobj.name = this.formValue.value.name;
    this.studentmodelobj.email = this.formValue.value.email;
    this.studentmodelobj.mobile = this.formValue.value.mobile;
    this.studentmodelobj.city = this.formValue.value.city;

    this.api.update(this.studentmodelobj, this.studentmodelobj.id).subscribe(res =>{
      this.formValue.reset()
      this.getdata()
      alert("record updated successfully")
    },
    err=>{
      alert("something went wrong")
    })
  }

  addstudent(){
    this.studentmodelobj.name = this.formValue.value.name;
    this.studentmodelobj.email = this.formValue.value.email;
    this.studentmodelobj.mobile = this.formValue.value.mobile;
    this.studentmodelobj.city = this.formValue.value.city;

    this.api.poststudent(this.studentmodelobj).subscribe(res=>{
      console.log(res)
      this.formValue.reset()
      this.getdata()
      alert("Record added Successfully")
      
    },
    err=>{
      alert("something went wrong");
    })
  }

  //get
  getdata(){
    this.api.getstudent().subscribe(res=>{
      this.allstudentdata=res
    })
  }

  //delete
  deletestudent(data:any){
    if(confirm('Are you sure to delete?'))
    this.api.deletestudent(data.id).subscribe(res=>{
      alert("Record deleted successfully");
      this.getdata();
    })
  }

}
