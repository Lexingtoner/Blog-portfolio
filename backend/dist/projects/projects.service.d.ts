export declare class ProjectsService {
    private projects;
    findAll(): {
        id: string;
        title: string;
        description: string;
        status: string;
        tags: string[];
    }[];
    findOne(id: string): {
        id: string;
        title: string;
        description: string;
        status: string;
        tags: string[];
    } | undefined;
    create(createProjectDto: any): any;
}
//# sourceMappingURL=projects.service.d.ts.map