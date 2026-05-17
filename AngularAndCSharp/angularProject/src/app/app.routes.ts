import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';
import { ShoppingCartPage } from './shopping-cart-page/shopping-cart-page';
import { ProdactsListPage } from './prodact-list-page/prodact-list-page';
import { ProdactDetiels } from './prodact-detiels/prodact-detiels';
import { ConnectionComponent } from './connection/connection';
import { Login } from './login/login';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomePage, title: 'דף הבית' },
    { path: 'prodacts', component: ProdactsListPage, title: 'רשימת מוצרים' },
    
    { path: 'cart', component: ShoppingCartPage, title: 'סל קניות' }, 
    
    { path: 'prodact-detiels', component: ProdactDetiels },
    
    { path: 'connection', component: ConnectionComponent, title: 'התחברות' },
    { path: 'login', component: Login, title: 'כניסה' }
];