//Import Libraries Interns
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
//Import Libraries Externs
import { RegisterUserComponent } from '../register-user/register-user.component';
//Import Components

//Constants
const titlePlatform: string = 'Registrar Usuario | ' + environment.titleWindowPlatform;

const registerUserRoutes: Routes = [
    {
        path: '',
        component: RegisterUserComponent,
        data: {title: titlePlatform },
        children: [
        ]
    }
];

/** Array of Components Routes */
export const routableRegisterUserComponent = [
	RegisterUserComponent
];

@NgModule ({
    imports: [
        RouterModule.forChild(registerUserRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class RegisterUserRoutingModule {}
