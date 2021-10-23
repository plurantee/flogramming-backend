jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ProjectsService } from '../service/projects.service';
import { IProjects, Projects } from '../projects.model';

import { ProjectsUpdateComponent } from './projects-update.component';

describe('Projects Management Update Component', () => {
  let comp: ProjectsUpdateComponent;
  let fixture: ComponentFixture<ProjectsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let projectsService: ProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ProjectsUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(ProjectsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProjectsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    projectsService = TestBed.inject(ProjectsService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const projects: IProjects = { id: 'CBA' };

      activatedRoute.data = of({ projects });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(projects));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Projects>>();
      const projects = { id: 'ABC' };
      jest.spyOn(projectsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ projects });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: projects }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(projectsService.update).toHaveBeenCalledWith(projects);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Projects>>();
      const projects = new Projects();
      jest.spyOn(projectsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ projects });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: projects }));
      saveSubject.complete();

      // THEN
      expect(projectsService.create).toHaveBeenCalledWith(projects);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Projects>>();
      const projects = { id: 'ABC' };
      jest.spyOn(projectsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ projects });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(projectsService.update).toHaveBeenCalledWith(projects);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
