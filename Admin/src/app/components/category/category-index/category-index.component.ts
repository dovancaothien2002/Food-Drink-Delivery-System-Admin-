import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.services';

@Component({
  selector: 'app-category-index',
  templateUrl: './category-index.component.html',
  styleUrls: ['./category-index.component.css']
})
export class CategoryIndexComponent implements OnInit {
  title: string = 'Categories List';
  result: any;
  id!: number;
  p: number = 1;
  total: number = 0;
  formSearch!: FormGroup;
  displayedColumns: string[] = ['index', 'name' ,'image','status','createdate','updatedate','action'];
  dataSource: any;
  empdata: any;
  check = 0;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private catSrc: CategoryService, private route: ActivatedRoute,
    private router: Router, private Toastr: ToastrService) { }
  ngOnInit() {
    this.GetAll();
    this.formSearch = new FormGroup({
      key: new FormControl(),
    });
  }
  GetAll() {
    console.log(this.catSrc.getAll());
    this.catSrc.getAll().subscribe(result => {
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

  onSubmit = () => {
    let key = this.formSearch.value.key;
    this.catSrc.findByName(key)
      .subscribe((response: any) => {
        this.result = response.result;
        this.total = response.total;
      });
  };

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this record ?')) {
      this.catSrc.checkDelete(id).subscribe((res) => {
        this.check = res.result.length;
        console.log(this.check);
        console.log(res.result);
        if (this.check == 0) {
          this.catSrc.delete(id).subscribe((res: any) => {
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
