import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

// import { ServerPrebootModule } from 'preboot/server';

// import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
	imports: [
		ServerModule,
		AppModule,
		ModuleMapLoaderModule,
		// ServerPrebootModule.recordEvents({
		// 	appRoot: 'app-root',
		// 	eventSelectors
		// })
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppServerModule { }
