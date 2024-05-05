import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule and ReactiveFormsModule
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'; // Import RouterModule here

import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { RegisterComponent } from './pages/register/register.component';
import { UsergetallComponent } from './pages/usergetall/usergetall.component';
import { UpdateCommentComponent } from './pages/update-comment/update-comment.component';
import { UpdatePosteComponent } from './pages/update-poste/update-poste.component';
import { AddCommentComponent } from './pages/add-comment/add-comment.component';
import { CommentsComponent } from './pages/comment/comments.component';
import { TablesComponent } from './pages/tables/tables.component';
import { LoginLayoutComponent } from './components/LoginComponent/login-layout.component';
import { ErrorComponentComponent } from './pages/error-component/error-component.component';
import { AccesDeniedComponent } from './pages/acces-denied/acces-denied.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    RegisterComponent,
    UsergetallComponent,
    UpdatePosteComponent,
    UpdateCommentComponent,
    AddCommentComponent,
    CommentsComponent,
    TablesComponent,
    LoginLayoutComponent,
    ErrorComponentComponent,
    AccesDeniedComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule, 
    HttpClientModule,
    RouterModule,
    NgbModule,
    AppRoutingModule,
    ComponentsModule,
    ToastrModule.forRoot() 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }