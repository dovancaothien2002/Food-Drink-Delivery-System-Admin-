import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.services';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
  title: string = 'User Detail';
  id!: number;
  name!: string;
  email!: string;
  phone!: string;
  createdate!: string;
  updatedate!: string;
  result: any;

  constructor(public userSrc: UserService, private route: ActivatedRoute,
    private router: Router) { }

    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      this.userSrc.getById(this.id).subscribe((data: any) => {
        this.result = data.result;
        console.log(this.result)
        this.name = this.result.name
        this.email = this.result.email;
        this.phone= this.result.phone;
        this.createdate= this.result.createdate;
        this.updatedate= this.result.updatedate;
      });
    }
}
