import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/services/order.services';

@Component({
  selector: 'app-order-index',
  templateUrl: './order-index.component.html',
  styleUrls: ['./order-index.component.css']
})
export class OrderIndexComponent implements OnInit{
  title: string = 'Order List';
  result: any;
  id!: number;
  p: number = 1;
  total: number = 0;
  formSearch!: FormGroup;
  displayedColumns: string[] =  ['id','orderDate','user_name','user_email','user_phone', 'store_name','action'];
  dataSource: any;
  empdata: any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  constructor(private orderSrc: OrderService, private route: ActivatedRoute,
    private router: Router, private Toastr: ToastrService) { }
  ngOnInit() {
    this.GetAll(0);
    this.formSearch = new FormGroup({
      key: new FormControl(),
    });
  }

  GetAll(status:number) {
    this.orderSrc.findByStatus(status).subscribe(result => {
      this.empdata = result.result;
      this.dataSource = new MatTableDataSource<any>(this.empdata)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    
    }
    Filterchange(event: Event) {
      const filvalue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filvalue;
    }
    getrow(row: any) {
      //console.log(row);
    }

  pageChangeEvent(event: number) {
    this.p = event;
  }

  onChangeStatus(status:number){
    console.log(status);
    this.GetAll(status);
  }

  onSubmit = () => {
    let key = this.formSearch.value.key;
    this.orderSrc.findByName(key)
      .subscribe((response: any) => {
        this.result = response.result;
        this.total = response.total;
      });
  };

}
