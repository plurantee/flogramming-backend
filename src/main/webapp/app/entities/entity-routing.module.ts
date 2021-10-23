import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'projects',
        data: { pageTitle: 'Projects' },
        loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule),
      },
      {
        path: 'attributes',
        data: { pageTitle: 'Attributes' },
        loadChildren: () => import('./attributes/attributes.module').then(m => m.AttributesModule),
      },
      {
        path: 'products',
        data: { pageTitle: 'Products' },
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
