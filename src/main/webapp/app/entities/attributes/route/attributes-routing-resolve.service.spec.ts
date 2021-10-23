jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IAttributes, Attributes } from '../attributes.model';
import { AttributesService } from '../service/attributes.service';

import { AttributesRoutingResolveService } from './attributes-routing-resolve.service';

describe('Attributes routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: AttributesRoutingResolveService;
  let service: AttributesService;
  let resultAttributes: IAttributes | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(AttributesRoutingResolveService);
    service = TestBed.inject(AttributesService);
    resultAttributes = undefined;
  });

  describe('resolve', () => {
    it('should return IAttributes returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAttributes = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultAttributes).toEqual({ id: 'ABC' });
    });

    it('should return new IAttributes if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAttributes = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultAttributes).toEqual(new Attributes());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Attributes })));
      mockActivatedRouteSnapshot.params = { id: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAttributes = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultAttributes).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
