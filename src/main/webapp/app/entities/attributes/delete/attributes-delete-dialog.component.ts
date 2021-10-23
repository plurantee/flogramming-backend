import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAttributes } from '../attributes.model';
import { AttributesService } from '../service/attributes.service';

@Component({
  templateUrl: './attributes-delete-dialog.component.html',
})
export class AttributesDeleteDialogComponent {
  attributes?: IAttributes;

  constructor(protected attributesService: AttributesService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.attributesService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
