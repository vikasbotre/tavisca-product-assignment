import { AppComponent } from '../app/app.component';
import { Meta, Story } from '@storybook/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../app/store/app.states';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../app/store/effects/auth.effects';
import { ProductEffects } from '../app/store/effects/product.effects';
import { AuthService } from '../app/services/auth.service';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { HeaderComponent } from '../app/header/header.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LandingComponent } from './components/landing/landing.component';
import { AddProductComponent } from './components/product/add-product/add-product.component';
import { EditProductComponent } from './components/product/edit-product/edit-product.component';
import { ListProductComponent } from './components/product/list-product/list-product.component';

export default {
  title: 'App component',
  component: AppComponent,
} as Meta;
const Template: Story<AppComponent> = (args: AppComponent) => ({
  component: AppComponent,
  moduleMetadata: {
    declarations: [
      AppComponent,
      LandingComponent,
      SignUpComponent,
      LogInComponent,
      HeaderComponent,
      AddProductComponent,
      EditProductComponent,
      ListProductComponent,
    ],
    imports: [
      BrowserModule,
      CommonModule,
      FormsModule,
      EffectsModule.forRoot([]),
      EffectsModule.forFeature([AuthEffects, ProductEffects]),
      HttpClientModule,
      ReactiveFormsModule,
      RouterModule.forRoot([
        { path: 'log-in', component: LogInComponent },
        { path: 'sign-up', component: SignUpComponent },
        { path: '', component: LandingComponent },
        { path: 'add-product', component: AddProductComponent },
        { path: 'list-product', component: ListProductComponent },
        { path: 'edit-product/:productId', component: EditProductComponent },
        { path: '**', redirectTo: '/' },
      ]),
      StoreModule.forRoot(reducers, {}),
    ],
    providers: [Store, AuthService, { provide: APP_BASE_HREF, useValue: '/' }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  },
  props: { args },
});
export const App = Template.bind({});
