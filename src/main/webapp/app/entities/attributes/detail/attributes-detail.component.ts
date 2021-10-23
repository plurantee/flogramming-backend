import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAttributes } from '../attributes.model';

@Component({
  selector: 'jhi-attributes-detail',
  templateUrl: './attributes-detail.component.html',
})
export class AttributesDetailComponent implements OnInit {
  attributes: IAttributes | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ attributes }) => {
      this.attributes = attributes;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
