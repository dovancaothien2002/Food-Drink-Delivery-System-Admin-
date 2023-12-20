import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StoreService } from 'src/app/services/store.services';

@Component({
  selector: 'app-store-edit',
  templateUrl: './store-edit.component.html',
  styleUrls: ['./store-edit.component.css']
})
export class StoreEditComponent {
  title: string = 'Edit Store';
  
  id!: number;
  form!: FormGroup;
  result: any;
  isDuplicate:boolean=false;
  check:number=0;
  constructor(public storeSrc: StoreService, private route: ActivatedRoute,
    private router: Router, private Toastr: ToastrService) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.storeSrc.getById(this.id).subscribe((data: any) => {
      this.result = data.result;
      console.log(this.result)
      
    });

    this.form = new FormGroup({
      id: new FormControl(),
      name: new FormControl('', [Validators.required]),
      introduce: new FormControl(),
      fulladdress: new FormControl()
    });
  }

  onUpdate() {
    console.log(this.form.value);
    this.storeSrc.update(this.id, this.form.value).subscribe((res: any) => {
      this.Toastr.success('Post updated successfully!', 'success')
      this.router.navigateByUrl('store');
    })
  }
 
  addForm() {
    if (this.form.invalid) { return; }
    let key: any = this.form.value.name;
    let name: any = this.form.value.name;
    let fulladdress: any = this.form.value.fulladdress;
    let introduce: any = this.form.value.introduce;
    this.storeSrc.findByName2(key,this.id).subscribe((res) => {
      this.check = res.result.length;
      console.log(this.check);
      console.log(key+"=="+ this.id);
      if (this.check == 0) {
        this.isDuplicate = false;
        
          // const formData = new FormData();
          // formData.append('name', name);
          // formData.append('introduce', introduce);
          // formData.append('fulladdress', fulladdress);
          console.log(name);
          const ngu = {
            id:this.id,
            name:name,
            introduce:introduce,
            fulladdress:fulladdress,
            createdate:this.result.createdate,
            updatedate:new Date()
          }
          this.storeSrc.update(this.id,ngu).subscribe(data => {
            if (data) {
              console.log(data);
              this.Toastr.success('Update successfully!', 'success', {
                timeOut: 3000,
                positionClass: 'toast-top-right',
              })
              this.router.navigateByUrl('store');
            }
          })
       
      }else{
        this.isDuplicate = true;
      }
    });
  
  }
}
