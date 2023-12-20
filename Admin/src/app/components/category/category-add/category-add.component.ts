import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.services';
@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {
  title: string = 'Add Category';
  categoryAddForm!: FormGroup;
  fileUpload: any;
  file: any;
  preview: any;
  isDuplicate:boolean=false;
  check:number=0;

  constructor(
    public catSrv: CategoryService,
    private router: Router,
    private Toastr: ToastrService
  ) { }
  ngOnInit(): void {
    this.categoryAddForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      status: new FormControl('1'),
      imageUpload: new FormControl('', [Validators.required]),
    });
  }

  get f() {
    return this.categoryAddForm.controls;
  }
  onFileChange(event: any) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileUpload = file
      console.log(this.fileUpload.name)
    }
  }
  uploadFile(event: any) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file)
    reader.onload = (e: any) => {
      this.preview = e.target.result;
    }
  }
  onSubmit = () => {
    if (this.categoryAddForm.invalid) { return; }
    const formData = new FormData();
    formData.append('image', this.fileUpload);
    this.catSrv.create(this.categoryAddForm.value).subscribe((res: any) => {

    })
  };
  
  addForm() {
    if (this.categoryAddForm.invalid) { return; }
    let key: any = this.categoryAddForm.value.name;
    let name: any = this.categoryAddForm.value.name;
    let status: any = this.categoryAddForm.value.status;
    this.catSrv.findByName(key).subscribe((res) => {
      this.check = res.result.length;
      console.log(this.check);
      
      if (this.check == 0) {
        this.isDuplicate = false;
        if (this.file) {
          const formData = new FormData();
          formData.append('image', this.file, this.file.name);
          formData.append('name', name);
          formData.append('status', status);
          this.catSrv.create(formData).subscribe(data => {
            if (data) {
              console.log(data);
              this.Toastr.success('Add new successfully!', 'success', {
                timeOut: 3000,
                positionClass: 'toast-top-right',
              })
              this.router.navigateByUrl('category');
            }
          })
        }
      }else{
        this.isDuplicate = true;
      }
    });
  }

}
