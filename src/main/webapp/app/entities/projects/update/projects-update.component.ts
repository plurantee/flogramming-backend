import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IProjects, Projects } from '../projects.model';
import { ProjectsService } from '../service/projects.service';

@Component({
  selector: 'jhi-projects-update',
  templateUrl: './projects-update.component.html',
})
export class ProjectsUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
    description: [],
    photo: [],
  });

  constructor(protected projectsService: ProjectsService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ projects }) => {
      this.updateForm(projects);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const projects = this.createFromForm();
    if (projects.id !== undefined) {
      this.subscribeToSaveResponse(this.projectsService.update(projects));
    } else {
      this.subscribeToSaveResponse(this.projectsService.create(projects));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProjects>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(projects: IProjects): void {
    this.editForm.patchValue({
      id: projects.id,
      name: projects.name,
      description: projects.description,
      photo: projects.photo,
    });
  }

  protected createFromForm(): IProjects {
    return {
      ...new Projects(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      photo: this.editForm.get(['photo'])!.value,
    };
  }
}
