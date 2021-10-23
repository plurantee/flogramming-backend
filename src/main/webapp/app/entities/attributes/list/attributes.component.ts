import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAttributes } from '../attributes.model';
import { AttributesService } from '../service/attributes.service';
import { AttributesDeleteDialogComponent } from '../delete/attributes-delete-dialog.component';

@Component({
  selector: 'jhi-attributes',
  templateUrl: './attributes.component.html',
})
export class AttributesComponent implements OnInit {
  attributes?: IAttributes[];
  isLoading = false;

  constructor(protected attributesService: AttributesService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.attributesService.query().subscribe(
      (res: HttpResponse<IAttributes[]>) => {
        this.isLoading = false;
        this.attributes = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IAttributes): string {
    return item.id!;
  }

  delete(attributes: IAttributes): void {
    const modalRef = this.modalService.open(AttributesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.attributes = attributes;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
