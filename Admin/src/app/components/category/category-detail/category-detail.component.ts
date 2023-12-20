import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.services';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit{
  id!: number;
  result: any;
  title: string = 'Detail Category';
  name!: string;
  image!: string;
  status!: number;
  createdate!: string;
  updatedate!: string;
  constructor(public catSrc: CategoryService, private route: ActivatedRoute,
    private router: Router, private Toastr: ToastrService) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.catSrc.getById2(this.id).subscribe((data: any) => {
      this.result = data.result;
      console.log(this.result)
      this.name = this.result.name
      this.image = this.result.image;
      this.status= this.result.status;
      this.createdate= this.result.createdate;
      this.updatedate= this.result.updatedate;
    });
  }

}
