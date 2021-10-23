import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AttributesComponent } from '../list/attributes.component';
import { AttributesDetailComponent } from '../detail/attributes-detail.component';
import { AttributesUpdateComponent } from '../update/attributes-update.component';
import { AttributesRoutingResolveService } from './attributes-routing-resolve.service';

const attributesRoute: Routes = [
  {
    path: '',
    component: AttributesComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AttributesDetailComponent,
    resolve: {
      attributes: AttributesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AttributesUpdateComponent,
    resolve: {
      attributes: AttributesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AttributesUpdateComponent,
    resolve: {
      attributes: AttributesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(attributesRoute)],
  exports: [RouterModule],
})
export class AttributesRoutingModule {}
