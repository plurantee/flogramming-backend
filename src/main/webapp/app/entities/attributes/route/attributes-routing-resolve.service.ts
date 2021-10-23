import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAttributes, Attributes } from '../attributes.model';
import { AttributesService } from '../service/attributes.service';

@Injectable({ providedIn: 'root' })
export class AttributesRoutingResolveService implements Resolve<IAttributes> {
  constructor(protected service: AttributesService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAttributes> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((attributes: HttpResponse<Attributes>) => {
          if (attributes.body) {
            return of(attributes.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Attributes());
  }
}
