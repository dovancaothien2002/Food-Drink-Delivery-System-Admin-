import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AsideComponent } from './components/aside/aside.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoryIndexComponent } from './components/category/category-index/category-index.component';
import { CategoryAddComponent } from './components/category/category-add/category-add.component';
import { CategoryEditComponent } from './components/category/category-edit/category-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPipe } from './services/filter.services';
import { ProductIndexComponent } from './components/product/product-index/product-index.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductEditComponent } from './components/product/product-edit/product-edit.component';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from './material-module';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { OrderIndexComponent } from './components/order/order-index/order-index.component';
import { OrderDetailComponent } from './components/order/order-detail/order-detail.component';
import { StoreIndexComponent } from './components/store/store-index/store-index.component';
import { StoreEditComponent } from './components/store/store-edit/store-edit.component';
import { StoreDetailComponent } from './components/store/store-detail/store-detail.component';
import { StoreAddComponent } from './components/store/store-add/store-add.component';
import { CategoryDetailComponent } from './components/category/category-detail/category-detail.component';
import { UserIndexComponent } from './components/user/user-index/user-index.component';
import { UserDetailComponent } from './components/user/user-detail/user-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AsideComponent,
    DashboardComponent,
    CategoryIndexComponent,
    CategoryAddComponent,
    CategoryEditComponent,
    FilterPipe,
    ProductIndexComponent,
    ProductCreateComponent,
    ProductEditComponent,
    LoginComponent,
    ProductDetailComponent,
    OrderIndexComponent,
    OrderDetailComponent,
    StoreIndexComponent,
    StoreEditComponent,
    StoreDetailComponent,
    StoreAddComponent,
    CategoryDetailComponent,
    UserIndexComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    MaterialModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
