import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.services';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  title: string = 'Edit Category';
  file: any;
  preview: any;
  id!: number;
  form!: FormGroup;
  result: any;
  check:number=0;
  isDuplicate:boolean=false;
  constructor(public catSrc: CategoryService, private route: ActivatedRoute,
    private router: Router, private Toastr: ToastrService) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.catSrc.getById(this.id).subscribe((data: any) => {
      this.result = data.result;
      console.log(this.result)
      this.preview = data.result.image;
    });

    this.form = new FormGroup({
      id: new FormControl(),
      name: new FormControl('', [Validators.required]),
      status: new FormControl(),
      image: new FormControl()
    });
  }
  onUpdate() {
    console.log(this.form.value);
    this.catSrc.update(this.id, this.form.value).subscribe((res: any) => {
      this.Toastr.success('Post updated successfully!', 'success')
      this.router.navigateByUrl('category');
    })
  }
  uploadFile(event: any) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file)
    reader.onload = (e: any) => {
      this.preview = e.target.result;
    }
  }
  addForm() {
    if (this.form.invalid) { return; }
    console.log(this.form.value);
    let key : any = this.form.value.name;
    let name: any = this.form.value.name;
    let status: any = this.form.value.status;
    let image: any = this.form.value.image;
    const updatedate = new Date();
    updatedate.setHours(updatedate.getHours() + 7);
    this.catSrc.findByName2(key,this.id).subscribe((res) => {
      this.check = res.result.length;
      console.log(this.check);
      console.log(res.result);
      if (this.check == 0) {
        this.isDuplicate = false;
    // alert(image);
    if (this.file) {
      const formData = new FormData();
      formData.append('image', this.file, this.file.name);
      formData.append('name', name);
      formData.append('status', status);
      formData.append('createdate',this.result.createdate),
      formData.append('updatedate',updatedate.toJSON()),
      this.catSrc.update(this.id,formData).subscribe(data => {
        if (data) {
          console.log(data);
          this.Toastr.success('Edit successfully!', 'success')
          this.router.navigateByUrl('category');
        }
      })
    }else{
      const formData = new FormData();
      formData.append('image', image.split('uploads/')[1]);
      formData.append('name', name);
      formData.append('status', status);
      formData.append('createdate',this.result.createdate),
      formData.append('updatedate',updatedate.toJSON()),
      this.catSrc.update(this.id,formData).subscribe(data => {
        if (data) {
          console.log(data);
          this.Toastr.success('Edit successfully!', 'success')
          this.router.navigateByUrl('category');
        }
      })
    }
      }else{
        this.isDuplicate = true;
      }
    })
  }
}
