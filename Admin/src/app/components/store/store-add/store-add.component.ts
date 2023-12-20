import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StoreService } from 'src/app/services/store.services';
@Component({
  selector: 'app-store-add',
  templateUrl: './store-add.component.html',
  styleUrls: ['./store-add.component.css']
})
export class StoreAddComponent {
  title: string = 'Add Store';
  storeAddForm!: FormGroup;
  preview: any;
  isDuplicate:boolean=false;
  check:number=0;

  constructor(
    public storeSrc: StoreService,
    private router: Router,
    private Toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.storeAddForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(6)]),
      fulladdress: new FormControl('', [Validators.required]),
      introduce: new FormControl('', [Validators.required]),
    });
  }

  get f() {
    return this.storeAddForm.controls;
  }
 
  
  onSubmit = () => {
    if (this.storeAddForm.invalid) { return; }
    const formData = new FormData();
    this.storeSrc.create(this.storeAddForm.value).subscribe((res: any) => {

    })
  };
  
  addForm() {
    if (this.storeAddForm.invalid) { return; }
    let key: any = this.storeAddForm.value.name;
    let name: any = this.storeAddForm.value.name;
    let fulladdress: any = this.storeAddForm.value.fulladdress;
    let introduce: any = this.storeAddForm.value.introduce;
    this.storeSrc.findByName(key).subscribe((res) => {
      this.check = res.result.length;
      console.log(this.check);
      
      if (this.check == 0) {
        this.isDuplicate = false;
        
          // const formData = new FormData();
          // formData.append('name', name);
          // formData.append('introduce', introduce);
          // formData.append('fulladdress', fulladdress);
          console.log(name);
          const ngu = {
            name:name,
            introduce:introduce,
            fulladdress:fulladdress
          }
          this.storeSrc.create(ngu).subscribe(data => {
            if (data) {
              console.log(data);
              this.Toastr.success('Add new successfully!', 'success', {
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
