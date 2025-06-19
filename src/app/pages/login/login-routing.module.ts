//Import Libraries Interns
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
//Import Libraries Externs

//Import Components
import { LoginComponent } from './login.component';

//Constants
const titlePlatform: string = 'Iniciar Sesión | ' + environment.titleWindowPlatform;
const loginRoutes: Routes = [
    {
        path: '',
        component: LoginComponent,
        data: {title: titlePlatform },
        children: [
        ]
    }
];

/** Array of Components Routes */
export const routableLoginComponents = [
	LoginComponent
];

@NgModule ({
    imports: [
        RouterModule.forChild(loginRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class LoginRoutingModule {}
