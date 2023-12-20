import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.services';
import { OrderService } from 'src/app/services/order.services';
import { ProductService } from 'src/app/services/product.services';
import { UserService } from 'src/app/services/user.services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  title = 'Dashboard';
  totalOrder : number = 0;
  totalProduct : number = 0;
  totalCat : number = 0;
  totalUser : number = 0
  constructor(private catSrc: CategoryService,private prodSrc: ProductService,private userSrc: UserService, private route: ActivatedRoute,
    private router: Router,private orderSrc: OrderService, private Toastr: ToastrService) { }
    ngOnInit() {
      this.GetCat();
    }

    GetCat() {
      
      this.catSrc.getAll().subscribe(result => {
        this.totalCat = result.result.length;
        
      });
    }  

    GetProd() {
    
      this.prodSrc.getAll().subscribe(result => {
        this.totalProduct = result.result.length;
        
      });
    }  

    GetOrder() {
      this.orderSrc.findByStatus(0).subscribe(result => {
        this.totalOrder = result.result.length;
        
      });
    }  

    GetUser() {
      this.userSrc.getAll().subscribe(result => {
        this.totalUser = result.result.length;
      });
    }  
  
}
