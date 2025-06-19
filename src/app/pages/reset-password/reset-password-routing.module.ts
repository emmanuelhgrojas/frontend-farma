//Import Libraries Interns
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ResetPasswordComponent } from './reset-password.component';
//Import Libraries Externs

//Import Components

//Constants
const titlePlatform: string = 'Recuperar Contraseña | ' + environment.titleWindowPlatform;
const resetPasswordRoutes: Routes = [
    {
        path: '',
        component: ResetPasswordComponent,
        data: {title: titlePlatform },
        children: [
        ]
    }
];

/** Array of Components Routes */
export const routableResetPasswordComponents = [
	ResetPasswordComponent
];

@NgModule ({
    imports: [
        RouterModule.forChild(resetPasswordRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class ResetPassworRoutingModule {}
