import Project from "./Project";

export default interface Task {
    id: number;
    projectId: Project;
    title: string;
    description: string;
    status: string;
    tags: string[];
    priority: string;
    initialDate: string;
    finalDate: string;
    createdAt: string;
    updatedAt: string;
}