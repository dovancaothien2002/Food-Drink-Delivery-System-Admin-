import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/services/order.services';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit{
  title: string = 'Order Detail';
  id!: number;
  listOrderDetail: any;
  order:any;
  totalPrice:number = 0;
  statusforUpdate:number =0 ;
  
  constructor(private orderSrc: OrderService, private route: ActivatedRoute,
    private router: Router, private Toastr: ToastrService) { }
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.orderSrc.getById(this.id).subscribe((data: any) => {
      this.order = data.result[0];
      console.log(this.order);
    });
    this.orderSrc.getListOrderDetailById(this.id).subscribe((data: any) => {
      this.listOrderDetail = data.result;
      this.listOrderDetail.forEach((o : any )=> {
        this.totalPrice += o.quantity * o.price;
      });
      console.log(this.listOrderDetail);
    });
    
  }

  onChangeStatusOrder(status : any){
    this.statusforUpdate = parseInt(status.target.value);
  }

  onUpdateStatus(){
    if(this.statusforUpdate > 0){
      //alert(this.statusforUpdate+"=="+this.id);
      let data = {
        order_status : this.statusforUpdate,
        order_id : this.id
      }
      this.orderSrc.updateStatus(data).subscribe((data: any) => {
        this.Toastr.success('Post updated successfully!', 'success')
        this.router.navigateByUrl('order');
      });

    }else{
      alert("Please choose a status");
    }
    
    
  }

}
