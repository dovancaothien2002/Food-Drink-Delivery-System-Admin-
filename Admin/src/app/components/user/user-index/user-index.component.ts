import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.services';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.css']
})
export class UserIndexComponent {
  title: string = 'Users List';
  result: any;
  id!: number;
  p: number = 1;
  total: number = 0;
  formSearch!: FormGroup;
  displayedColumns: string[] = ['index', 'name' ,'email','phone','action'];
  dataSource: any;
  empdata: any;
  check = 0;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private userSrc: UserService, private route: ActivatedRoute,
    private router: Router, private Toastr: ToastrService) { }
  ngOnInit() {
    this.GetAll();
    this.formSearch = new FormGroup({
      key: new FormControl(),
    });
  }
  GetAll() {
    
    this.userSrc.getAll().subscribe(result => {
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
    this.userSrc.findByName(key)
      .subscribe((response: any) => {
        this.result = response.result;
        this.total = response.total;
      });
  };
}
