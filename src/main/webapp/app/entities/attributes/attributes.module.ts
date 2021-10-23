import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AttributesComponent } from './list/attributes.component';
import { AttributesDetailComponent } from './detail/attributes-detail.component';
import { AttributesUpdateComponent } from './update/attributes-update.component';
import { AttributesDeleteDialogComponent } from './delete/attributes-delete-dialog.component';
import { AttributesRoutingModule } from './route/attributes-routing.module';

@NgModule({
  imports: [SharedModule, AttributesRoutingModule],
  declarations: [AttributesComponent, AttributesDetailComponent, AttributesUpdateComponent, AttributesDeleteDialogComponent],
  entryComponents: [AttributesDeleteDialogComponent],
})
export class AttributesModule {}
