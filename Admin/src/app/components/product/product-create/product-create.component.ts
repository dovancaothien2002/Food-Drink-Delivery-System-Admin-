import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.services';
import { ProductService } from 'src/app/services/product.services';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  title: string = 'Add Product';
  productFormCreate!: FormGroup;
  fileUpload: any;
  file: any;
  preview: any;
  result: any;
  isDuplicate:boolean=false;
  check:any;
  constructor(
    public catSrv: CategoryService,
    public proSrv: ProductService,
    private router: Router,
    private Toastr: ToastrService
  ) { }
  ngOnInit(): void {
    
    
    this.getAllCategories()
    
    this.productFormCreate = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      price: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      sale_price: new FormControl('', [Validators.pattern('^[0-9]+$')]),
      description: new FormControl('', [Validators.required]),
      status: new FormControl(''),
      category_id: new FormControl(''),
      imageUpload: new FormControl('', [Validators.required]),
    });
  }
  getAllCategories() {
    this.proSrv.getCategories()
      .subscribe((response: any) => {
        this.result = response.result;
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
    if (this.productFormCreate.invalid) { return; }
    let key: any = this.productFormCreate.value.name;
    let name: any = this.productFormCreate.value.name;
    let status: any = this.productFormCreate.value.status;
    let sale_price: any = this.productFormCreate.value.sale_price;
    let price: any = this.productFormCreate.value.price;
    let description: any = this.productFormCreate.value.description;
    let category_id: any = this.productFormCreate.value.category_id;
    this.proSrv.findByName(key).subscribe((res) => {
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

          this.proSrv.create(formData).subscribe(data => {
            if (data) {
              console.log(data);
              this.Toastr.success('Add new successfully!', 'success', {
                timeOut: 3000,
                positionClass: 'toast-top-right',
              })
              this.router.navigateByUrl('product');
            }
          })
        }
      } else {
        this.isDuplicate = true;
      }
    });
  }
}
