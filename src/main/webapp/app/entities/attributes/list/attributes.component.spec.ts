import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { AttributesService } from '../service/attributes.service';

import { AttributesComponent } from './attributes.component';

describe('Attributes Management Component', () => {
  let comp: AttributesComponent;
  let fixture: ComponentFixture<AttributesComponent>;
  let service: AttributesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AttributesComponent],
    })
      .overrideTemplate(AttributesComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AttributesComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(AttributesService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 'ABC' }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.attributes?.[0]).toEqual(expect.objectContaining({ id: 'ABC' }));
  });
});
