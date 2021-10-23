import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IAttributes, Attributes } from '../attributes.model';

import { AttributesService } from './attributes.service';

describe('Attributes Service', () => {
  let service: AttributesService;
  let httpMock: HttpTestingController;
  let elemDefault: IAttributes;
  let expectedResult: IAttributes | IAttributes[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AttributesService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 'AAAAAAA',
      key: 'AAAAAAA',
      value: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find('ABC').subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Attributes', () => {
      const returnedFromService = Object.assign(
        {
          id: 'ID',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Attributes()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Attributes', () => {
      const returnedFromService = Object.assign(
        {
          id: 'BBBBBB',
          key: 'BBBBBB',
          value: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Attributes', () => {
      const patchObject = Object.assign(
        {
          key: 'BBBBBB',
          value: 'BBBBBB',
        },
        new Attributes()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Attributes', () => {
      const returnedFromService = Object.assign(
        {
          id: 'BBBBBB',
          key: 'BBBBBB',
          value: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Attributes', () => {
      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addAttributesToCollectionIfMissing', () => {
      it('should add a Attributes to an empty array', () => {
        const attributes: IAttributes = { id: 'ABC' };
        expectedResult = service.addAttributesToCollectionIfMissing([], attributes);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(attributes);
      });

      it('should not add a Attributes to an array that contains it', () => {
        const attributes: IAttributes = { id: 'ABC' };
        const attributesCollection: IAttributes[] = [
          {
            ...attributes,
          },
          { id: 'CBA' },
        ];
        expectedResult = service.addAttributesToCollectionIfMissing(attributesCollection, attributes);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Attributes to an array that doesn't contain it", () => {
        const attributes: IAttributes = { id: 'ABC' };
        const attributesCollection: IAttributes[] = [{ id: 'CBA' }];
        expectedResult = service.addAttributesToCollectionIfMissing(attributesCollection, attributes);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(attributes);
      });

      it('should add only unique Attributes to an array', () => {
        const attributesArray: IAttributes[] = [{ id: 'ABC' }, { id: 'CBA' }, { id: 'e6f3255f-a63a-483a-bd88-e54a19a5f6ba' }];
        const attributesCollection: IAttributes[] = [{ id: 'ABC' }];
        expectedResult = service.addAttributesToCollectionIfMissing(attributesCollection, ...attributesArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const attributes: IAttributes = { id: 'ABC' };
        const attributes2: IAttributes = { id: 'CBA' };
        expectedResult = service.addAttributesToCollectionIfMissing([], attributes, attributes2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(attributes);
        expect(expectedResult).toContain(attributes2);
      });

      it('should accept null and undefined values', () => {
        const attributes: IAttributes = { id: 'ABC' };
        expectedResult = service.addAttributesToCollectionIfMissing([], null, attributes, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(attributes);
      });

      it('should return initial array if no Attributes is added', () => {
        const attributesCollection: IAttributes[] = [{ id: 'ABC' }];
        expectedResult = service.addAttributesToCollectionIfMissing(attributesCollection, undefined, null);
        expect(expectedResult).toEqual(attributesCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
