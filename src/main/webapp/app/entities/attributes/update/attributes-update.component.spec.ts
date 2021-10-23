jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { AttributesService } from '../service/attributes.service';
import { IAttributes, Attributes } from '../attributes.model';

import { AttributesUpdateComponent } from './attributes-update.component';

describe('Attributes Management Update Component', () => {
  let comp: AttributesUpdateComponent;
  let fixture: ComponentFixture<AttributesUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let attributesService: AttributesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AttributesUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(AttributesUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AttributesUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    attributesService = TestBed.inject(AttributesService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const attributes: IAttributes = { id: 'CBA' };

      activatedRoute.data = of({ attributes });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(attributes));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Attributes>>();
      const attributes = { id: 'ABC' };
      jest.spyOn(attributesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ attributes });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: attributes }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(attributesService.update).toHaveBeenCalledWith(attributes);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Attributes>>();
      const attributes = new Attributes();
      jest.spyOn(attributesService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ attributes });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: attributes }));
      saveSubject.complete();

      // THEN
      expect(attributesService.create).toHaveBeenCalledWith(attributes);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Attributes>>();
      const attributes = { id: 'ABC' };
      jest.spyOn(attributesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ attributes });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(attributesService.update).toHaveBeenCalledWith(attributes);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
