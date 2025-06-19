//Import Libraries Interns
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
//Import Libraries Externs

//Import Components
import { WebComponent } from './web.component';

//Constants
const titlePlatform: string = 'Web | ' + environment.titleWindowPlatform;
const homeRoutes: Routes = [
    {
        path: '',
        component: WebComponent,
        data: {title: titlePlatform },
        children: [

        ]
    }
];

/** Array of Components Routes */
export const routableWebComponents = [
	WebComponent
];


@NgModule ({
    imports: [
        RouterModule.forChild(homeRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class WebRoutingModule {}
