import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IProjects, Projects } from '../projects.model';

import { ProjectsService } from './projects.service';

describe('Projects Service', () => {
  let service: ProjectsService;
  let httpMock: HttpTestingController;
  let elemDefault: IProjects;
  let expectedResult: IProjects | IProjects[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ProjectsService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 'AAAAAAA',
      name: 'AAAAAAA',
      description: 'AAAAAAA',
      photo: 'AAAAAAA',
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

    it('should create a Projects', () => {
      const returnedFromService = Object.assign(
        {
          id: 'ID',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Projects()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Projects', () => {
      const returnedFromService = Object.assign(
        {
          id: 'BBBBBB',
          name: 'BBBBBB',
          description: 'BBBBBB',
          photo: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Projects', () => {
      const patchObject = Object.assign(
        {
          photo: 'BBBBBB',
        },
        new Projects()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Projects', () => {
      const returnedFromService = Object.assign(
        {
          id: 'BBBBBB',
          name: 'BBBBBB',
          description: 'BBBBBB',
          photo: 'BBBBBB',
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

    it('should delete a Projects', () => {
      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addProjectsToCollectionIfMissing', () => {
      it('should add a Projects to an empty array', () => {
        const projects: IProjects = { id: 'ABC' };
        expectedResult = service.addProjectsToCollectionIfMissing([], projects);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(projects);
      });

      it('should not add a Projects to an array that contains it', () => {
        const projects: IProjects = { id: 'ABC' };
        const projectsCollection: IProjects[] = [
          {
            ...projects,
          },
          { id: 'CBA' },
        ];
        expectedResult = service.addProjectsToCollectionIfMissing(projectsCollection, projects);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Projects to an array that doesn't contain it", () => {
        const projects: IProjects = { id: 'ABC' };
        const projectsCollection: IProjects[] = [{ id: 'CBA' }];
        expectedResult = service.addProjectsToCollectionIfMissing(projectsCollection, projects);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(projects);
      });

      it('should add only unique Projects to an array', () => {
        const projectsArray: IProjects[] = [{ id: 'ABC' }, { id: 'CBA' }, { id: 'e6c8f81c-f369-4a65-9e40-6077789895e8' }];
        const projectsCollection: IProjects[] = [{ id: 'ABC' }];
        expectedResult = service.addProjectsToCollectionIfMissing(projectsCollection, ...projectsArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const projects: IProjects = { id: 'ABC' };
        const projects2: IProjects = { id: 'CBA' };
        expectedResult = service.addProjectsToCollectionIfMissing([], projects, projects2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(projects);
        expect(expectedResult).toContain(projects2);
      });

      it('should accept null and undefined values', () => {
        const projects: IProjects = { id: 'ABC' };
        expectedResult = service.addProjectsToCollectionIfMissing([], null, projects, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(projects);
      });

      it('should return initial array if no Projects is added', () => {
        const projectsCollection: IProjects[] = [{ id: 'ABC' }];
        expectedResult = service.addProjectsToCollectionIfMissing(projectsCollection, undefined, null);
        expect(expectedResult).toEqual(projectsCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
