import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AttributesDetailComponent } from './attributes-detail.component';

describe('Attributes Management Detail Component', () => {
  let comp: AttributesDetailComponent;
  let fixture: ComponentFixture<AttributesDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttributesDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ attributes: { id: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(AttributesDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(AttributesDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load attributes on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.attributes).toEqual(expect.objectContaining({ id: 'ABC' }));
    });
  });
});
