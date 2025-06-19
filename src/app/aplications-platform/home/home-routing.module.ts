//Import Libraries Interns
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
//Import Libraries Externs
//Import Modules
//Import Components
import { HomeComponent } from './home.component';
//Import Guards

//Constants
const titlePlatform: string = 'Inicio | ' + environment.titleWindowPlatform;
const homeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [

        ]
    }
];

/** Array of Components Routes */
export const routableHomeComponents = [
	HomeComponent
];


@NgModule ({
    imports: [
        RouterModule.forChild(homeRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class HomeRoutingModule {}
