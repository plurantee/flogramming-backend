import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IProjects, getProjectsIdentifier } from '../projects.model';

export type EntityResponseType = HttpResponse<IProjects>;
export type EntityArrayResponseType = HttpResponse<IProjects[]>;

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/projects');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(projects: IProjects): Observable<EntityResponseType> {
    return this.http.post<IProjects>(this.resourceUrl, projects, { observe: 'response' });
  }

  update(projects: IProjects): Observable<EntityResponseType> {
    return this.http.put<IProjects>(`${this.resourceUrl}/${getProjectsIdentifier(projects) as string}`, projects, { observe: 'response' });
  }

  partialUpdate(projects: IProjects): Observable<EntityResponseType> {
    return this.http.patch<IProjects>(`${this.resourceUrl}/${getProjectsIdentifier(projects) as string}`, projects, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IProjects>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProjects[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addProjectsToCollectionIfMissing(projectsCollection: IProjects[], ...projectsToCheck: (IProjects | null | undefined)[]): IProjects[] {
    const projects: IProjects[] = projectsToCheck.filter(isPresent);
    if (projects.length > 0) {
      const projectsCollectionIdentifiers = projectsCollection.map(projectsItem => getProjectsIdentifier(projectsItem)!);
      const projectsToAdd = projects.filter(projectsItem => {
        const projectsIdentifier = getProjectsIdentifier(projectsItem);
        if (projectsIdentifier == null || projectsCollectionIdentifiers.includes(projectsIdentifier)) {
          return false;
        }
        projectsCollectionIdentifiers.push(projectsIdentifier);
        return true;
      });
      return [...projectsToAdd, ...projectsCollection];
    }
    return projectsCollection;
  }
}
