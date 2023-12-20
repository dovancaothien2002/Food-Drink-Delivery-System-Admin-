import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoryIndexComponent } from './components/category/category-index/category-index.component';
import { CategoryAddComponent } from './components/category/category-add/category-add.component';
import { CategoryEditComponent } from './components/category/category-edit/category-edit.component';
import { ProductIndexComponent } from './components/product/product-index/product-index.component';
import { ProductEditComponent } from './components/product/product-edit/product-edit.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './auth.guard';
import { OrderIndexComponent } from './components/order/order-index/order-index.component';
import { OrderDetailComponent } from './components/order/order-detail/order-detail.component';
import { StoreIndexComponent } from './components/store/store-index/store-index.component';
import { StoreEditComponent } from './components/store/store-edit/store-edit.component';
import { StoreDetailComponent } from './components/store/store-detail/store-detail.component';
import { StoreAddComponent } from './components/store/store-add/store-add.component';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { CategoryDetailComponent } from './components/category/category-detail/category-detail.component';
import { UserIndexComponent } from './components/user/user-index/user-index.component';
import { UserDetailComponent } from './components/user/user-detail/user-detail.component';

const routes: Routes = [
  { path: 'dashboard', canActivate: [authGuard], component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'category',canActivate: [authGuard],  component: CategoryIndexComponent },
  { path: 'category-add',canActivate: [authGuard],  component: CategoryAddComponent },
  { path: 'category/edit/:id',canActivate: [authGuard],  component: CategoryEditComponent },
  { path: 'category/detail/:id',canActivate: [authGuard],  component: CategoryDetailComponent},
  { path: 'product',canActivate: [authGuard],  component: ProductIndexComponent },
  { path: 'product-add',canActivate: [authGuard],  component: ProductCreateComponent },
  { path: 'product/edit/:id',canActivate: [authGuard],  component: ProductEditComponent },
  { path: 'product/detail/:id',canActivate: [authGuard],  component: ProductDetailComponent },
  { path: 'order',canActivate: [authGuard],  component: OrderIndexComponent },
  { path: 'order/detail/:id',canActivate: [authGuard],  component: OrderDetailComponent },
  { path: 'store',canActivate: [authGuard],  component: StoreIndexComponent },
  { path: 'store-add',canActivate: [authGuard],  component: StoreAddComponent },
  { path: 'store/edit/:id',canActivate: [authGuard],  component: StoreEditComponent },
  { path: 'store/detail/:id',canActivate: [authGuard],  component: StoreDetailComponent},
  { path: 'user',canActivate: [authGuard],  component: UserIndexComponent },
  { path: 'user/detail/:id',canActivate: [authGuard],  component: UserDetailComponent},
  { path: '',redirectTo:'dashboard' ,pathMatch:'full' },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
