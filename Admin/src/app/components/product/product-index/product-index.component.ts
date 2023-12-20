import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.services';

@Component({
  selector: 'app-product-index',
  templateUrl: './product-index.component.html',
  styleUrls: ['./product-index.component.css']
})
export class ProductIndexComponent {
  title: string = 'Products List';
  result: any;
  id!: number;
  p: number = 1;
  total: number = 0;
  formSearch!: FormGroup;
  displayedColumns: string[] = ['index', 'name', 'price', 'sale_price','image','status','cat_name','action'];
  dataSource: any;
  empdata: any;
  check = 0;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  
  constructor(private proSrc: ProductService, private route: ActivatedRoute,
    private router: Router, private Toastr: ToastrService) { }
  ngOnInit() {
    this.GetAll();
    this.formSearch = new FormGroup({
      key: new FormControl(),
    });
  }

  GetAll() {
    
    this.proSrc.getAll().subscribe(result => {
      this.empdata = result.result;
      this.dataSource = new MatTableDataSource<any>(this.empdata)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    console.log(this.dataSource);
    }
    Filterchange(event: Event) {
      const filvalue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filvalue;
    }
    getrow(row: any) {
      //console.log(row);
    }
  
  onSubmit = () => {
    let key = this.formSearch.value.key;
    this.proSrc.findByName(key)
      .subscribe((response: any) => {
        this.result = response.result;
        this.total = response.total;
      });
  };

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this record ?')) {
      this.proSrc.checkDelete(id).subscribe((res) => {
        this.check = res.result;
        console.log(this.check);
        console.log(res.result);
        if (this.check == 0) {
          this.proSrc.delete(id).subscribe((res: any) => {
          this.Toastr.success('Delete successfully!', 'success',{ positionClass: 'toast-top-right',timeOut:5000})
          this.GetAll();
          })
        }else{
          console.log("Khong in ra loi");
          this.Toastr.error('Cannot delete this record!', 'error',{ positionClass: 'toast-top-right',timeOut:5000})
          this.GetAll();
        }
      
      });
      // this.GetAll();
      //location.reload();
    }
   
  }
}
