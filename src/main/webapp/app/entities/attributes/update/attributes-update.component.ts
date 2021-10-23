import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IAttributes, Attributes } from '../attributes.model';
import { AttributesService } from '../service/attributes.service';

@Component({
  selector: 'jhi-attributes-update',
  templateUrl: './attributes-update.component.html',
})
export class AttributesUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    key: [],
    value: [],
  });

  constructor(protected attributesService: AttributesService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ attributes }) => {
      this.updateForm(attributes);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const attributes = this.createFromForm();
    if (attributes.id !== undefined) {
      this.subscribeToSaveResponse(this.attributesService.update(attributes));
    } else {
      this.subscribeToSaveResponse(this.attributesService.create(attributes));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAttributes>>): void {
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

  protected updateForm(attributes: IAttributes): void {
    this.editForm.patchValue({
      id: attributes.id,
      key: attributes.key,
      value: attributes.value,
    });
  }

  protected createFromForm(): IAttributes {
    return {
      ...new Attributes(),
      id: this.editForm.get(['id'])!.value,
      key: this.editForm.get(['key'])!.value,
      value: this.editForm.get(['value'])!.value,
    };
  }
}
