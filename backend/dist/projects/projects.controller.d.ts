export declare class ProjectsController {
    getProjects(): Promise<{
        id: string;
        title: string;
        description: string;
        links: {
            label: string;
            url: string;
        }[];
        status: string;
        tags: string[];
    }[]>;
    createProject(createProjectDto: any): Promise<any>;
}
//# sourceMappingURL=projects.controller.d.ts.map