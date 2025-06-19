//Import Libraries Interns
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PermisosGuard } from '../core/guards/permisos/permisos.guard';
//Import Libraries Externs
//Import Modules
//Import Components
import { AplicationsPlatformComponent } from './aplications-platform.component';
//Import Guards
//import { AuthLoginGuard } from '../guards/auth/authlogin.guard';


//Constants
const titlePlatform: string = 'Panel Administración | ' + environment.titleWindowPlatform;
const aplicationsPlatformRoutes: Routes = [
    {
        path: '',
        component: AplicationsPlatformComponent,
        children: [
            { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), data: {title: titlePlatform }, canActivate: [PermisosGuard]	},
            { path: 'inicio', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), data: {title: titlePlatform }, canActivate: [PermisosGuard]	},
            { path: 'dashboard', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), data: {title: titlePlatform }, canActivate: [PermisosGuard]	},
            { path: 'usuarios', loadChildren: () => import('./user/user.module').then(m => m.UserModule), data: {title: titlePlatform }, canActivate: [PermisosGuard]	},            
            { path: '**', redirectTo: 'inicio', pathMatch: 'full' }
        ]
    }
];

/** Array of components routes */
export const routableAPlicationsPlatformComponents = [
	AplicationsPlatformComponent
];

@NgModule ({
    imports: [
        RouterModule.forChild(aplicationsPlatformRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AplicationsPlatformRoutingModule {}