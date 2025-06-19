//Import Libraries Interns
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthPublicGuard } from './core/guards/auth-public/auth-public.guard';
//Import Components
//Import Moduls
//Import Guards

//Constants
const titlePlatform: string = environment.titleWindowPlatform;
const routes: Routes = [  
  { path: '', redirectTo: 'web', pathMatch: 'full' },
  { path: 'web', loadChildren: () => import('./web/web.module').then(m => m.WebModule), data: {title: titlePlatform } },  
  { path: 'iniciar-sesion', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule), data: {title: titlePlatform }, canActivate: [AuthPublicGuard] },
  { path: 'recuperar-contrasena', loadChildren: () => import('./pages/reset-password/reset-password.module').then(m => m.ResetPasswordModule), data: {title: titlePlatform }, canActivate: [AuthPublicGuard] },  
  { path: 'registrar', loadChildren: () => import('./pages/register-user/register-user.module').then(m => m.RegisterUserModule), data: {title: titlePlatform }, canActivate: [AuthPublicGuard] },
  { path: '', loadChildren: () => import('./aplications-platform/aplications-platform.module').then(m => m.AplicationsPlatformModule), data: {title: titlePlatform }	},  
  { path: '**', redirectTo: 'web', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
