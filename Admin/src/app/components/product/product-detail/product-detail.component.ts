import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.services';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  id!: number;
  result: any;
  title: string = 'Detail Product';
  name!: string;
  price!: number;
  sale_price!: number;
  image!: string;
  description!: string;
  status!: number;
  createdate!: string;
  updatedate!: string;
  cat_name!: string;
  constructor(public proSrc: ProductService, private route: ActivatedRoute,
    private router: Router, private Toastr: ToastrService) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.proSrc.getById2(this.id).subscribe((data: any) => {
      this.result = data.result;
      console.log(this.result)
      this.name = this.result.name
      this.price = this.result.price;
      this.sale_price = this.result.sale_price;
      this.image = this.result.image;
      this.description = this.result.description;
      this.status= this.result.status;
      this.createdate= this.result.createdate;
      this.updatedate= this.result.updatedate;
      this.cat_name= this.result.cat_name;
    });
  }

}
