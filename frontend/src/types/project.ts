type Project = {
    id: number;
    title: string;
    created: Date;
    todos?: Array<Todo>
}