import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAttributes, getAttributesIdentifier } from '../attributes.model';

export type EntityResponseType = HttpResponse<IAttributes>;
export type EntityArrayResponseType = HttpResponse<IAttributes[]>;

@Injectable({ providedIn: 'root' })
export class AttributesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/attributes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(attributes: IAttributes): Observable<EntityResponseType> {
    return this.http.post<IAttributes>(this.resourceUrl, attributes, { observe: 'response' });
  }

  update(attributes: IAttributes): Observable<EntityResponseType> {
    return this.http.put<IAttributes>(`${this.resourceUrl}/${getAttributesIdentifier(attributes) as string}`, attributes, {
      observe: 'response',
    });
  }

  partialUpdate(attributes: IAttributes): Observable<EntityResponseType> {
    return this.http.patch<IAttributes>(`${this.resourceUrl}/${getAttributesIdentifier(attributes) as string}`, attributes, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IAttributes>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAttributes[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addAttributesToCollectionIfMissing(
    attributesCollection: IAttributes[],
    ...attributesToCheck: (IAttributes | null | undefined)[]
  ): IAttributes[] {
    const attributes: IAttributes[] = attributesToCheck.filter(isPresent);
    if (attributes.length > 0) {
      const attributesCollectionIdentifiers = attributesCollection.map(attributesItem => getAttributesIdentifier(attributesItem)!);
      const attributesToAdd = attributes.filter(attributesItem => {
        const attributesIdentifier = getAttributesIdentifier(attributesItem);
        if (attributesIdentifier == null || attributesCollectionIdentifiers.includes(attributesIdentifier)) {
          return false;
        }
        attributesCollectionIdentifiers.push(attributesIdentifier);
        return true;
      });
      return [...attributesToAdd, ...attributesCollection];
    }
    return attributesCollection;
  }
}
