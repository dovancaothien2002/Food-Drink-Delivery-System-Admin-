import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.services';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  title: string = 'Edit Product';
  file: any;
  preview: any;
  category_id: any;
  id!: number;
  productFormEdit!: FormGroup;
  result: any;
  results: any;
  check:number=0;
  isDuplicate:boolean=false;
  constructor(public proSrc: ProductService, private route: ActivatedRoute,
    private router: Router, private Toastr: ToastrService) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.proSrc.getById(this.id).subscribe((data: any) => {
      this.result = data.result;
      console.log(this.result)
      this.preview = data.result.image;
      this.category_id = data.result.category_id;
      this.productFormEdit = new FormGroup({
        id: new FormControl(this.id),
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        price: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
        sale_price: new FormControl('', [Validators.pattern('^[0-9]+$')]),
        description: new FormControl('', [Validators.required]),
        status: new FormControl(),
        category_id: new FormControl(this.result.category_id),
        // imageUpload: new FormControl('', [Validators.required]),
        image: new FormControl()
      });
    });

    this.getAllCategories()

    
  }
  getAllCategories() {
    this.proSrc.getCategories()
      .subscribe((response: any) => {
        this.results = response.result;
      });
  }
  uploadFile(event: any) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file)
    reader.onload = (e: any) => {
      this.preview = e.target.result;
    }
  }
  onSubmit() {
    if (this.productFormEdit.invalid) { return; }
    let key: any = this.productFormEdit.value.name;
    let image: any = this.productFormEdit.value.image;
    let name: any = this.productFormEdit.value.name;
    let status: any = this.productFormEdit.value.status;
    let sale_price: any = this.productFormEdit.value.sale_price;
    let price: any = this.productFormEdit.value.price;
    let description: any = this.productFormEdit.value.description;
    let category_id: any = this.productFormEdit.value.category_id;
    const updatedate = new Date();
    updatedate.setHours(updatedate.getHours() + 7);
   
    this.proSrc.findByName2(key,this.id).subscribe((res) => {
      this.check = res.result.length;
      console.log(this.check);
      if (this.check == 0) {
        this.isDuplicate = false;
        if (this.file) {
          const formData = new FormData();
          formData.append('image', this.file, this.file.name);
          formData.append('name', name);
          formData.append('price', price);
          formData.append('sale_price', sale_price);
          formData.append('description', description);
          formData.append('category_id', category_id);
          formData.append('status', status);
          formData.append('createdate',this.result.createdate),
          formData.append('updatedate',updatedate.toJSON()),
          
          this.proSrc.update(this.id, formData).subscribe(data => {
            if (data) {
              console.log(data);
              this.Toastr.success('Edit successfully!', 'success', {
                timeOut: 3000,
                positionClass: 'toast-top-right',
              })
              this.router.navigateByUrl('product');
            }
          })
        } else {
          const formData = new FormData();
          formData.append('image', image.split('uploads/')[1]);
          formData.append('name', name);
          formData.append('price', price);
          formData.append('sale_price', sale_price);
          formData.append('description', description);
          formData.append('category_id', category_id);
          formData.append('status', status);
          formData.append('createdate',this.result.createdate),
          formData.append('updatedate',updatedate.toJSON()),
          this.proSrc.update(this.id, formData).subscribe(data => {
            if (data) {
              console.log(data);
              this.Toastr.success('Edit successfully!', 'success', {
                timeOut: 3000,
                positionClass: 'toast-top-right',
              })
              this.router.navigateByUrl('product');
            }
          })
        }
      }else{
        this.isDuplicate = true;
      }
    });
  }
}
