import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StoreService } from 'src/app/services/store.services';
@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.css']
})
export class StoreDetailComponent {
  title: string = 'Store Detail';
  id!: number;
  name!: string;
  introduce!: string;
  fulladdress!: string;
  createdate!: string;
  updatedate!: string;
  result: any;

  constructor(public storeSrc: StoreService, private route: ActivatedRoute,
    private router: Router) { }

    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      this.storeSrc.getById(this.id).subscribe((data: any) => {
        this.result = data.result;
        console.log(this.result)
        this.name = this.result.name
        this.introduce = this.result.introduce;
        this.fulladdress= this.result.fulladdress;
        this.createdate= this.result.createdate;
        this.updatedate= this.result.updatedate;
      });
    }
}
