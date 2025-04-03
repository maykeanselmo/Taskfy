class TaskTag {
    constructor({
        id = undefined,
        task_id,
        tag_id,
        created_at = new Date().toISOString(),
        updated_at = created_at,
    }) {
        this.id = id;
        this.task_id = task_id;
        this.tag_id = tag_id;
        this.created_at = created_at; // Se 'created_at' não for fornecido, usa o valor padrão
        this.updated_at = updated_at;
    }
}

export default TaskTag