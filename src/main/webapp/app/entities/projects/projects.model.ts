export interface IProjects {
  id?: string;
  name?: string | null;
  description?: string | null;
  photo?: string | null;
}

export class Projects implements IProjects {
  constructor(public id?: string, public name?: string | null, public description?: string | null, public photo?: string | null) {}
}

export function getProjectsIdentifier(projects: IProjects): string | undefined {
  return projects.id;
}
