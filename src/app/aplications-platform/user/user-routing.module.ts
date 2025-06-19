//Import Libraries Interns
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
//Import Libraries Externs

//Import Components
import { UserComponent } from './user.component';

//Constants
const titlePlatform: string = 'Usuarios | ' + environment.titleWindowPlatform;
const userRoutes: Routes = [
    {
        path: '',
        component: UserComponent,
        data: {title: titlePlatform },
        children: [
        ]
    }
];

/** Array of Components Routes */
export const routableUserComponents = [
	UserComponent
];

@NgModule ({
    imports: [
        RouterModule.forChild(userRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class UserRoutingModule {}

