class Task {
    constructor({
      id = undefined,
      folder_id: folder,
      title,
      content,
      due_date,
      status,
      priority,
      created_at = new Date().toISOString(),
      updated_at = created_at,
    }) {
      this.id = id;
      this.folder = folder;
      this.title = title;
      this.content = content;
      this.due_date = due_date;
      this.status = status;
      this.priority = priority;
      this.created_at = created_at; // Se 'created_at' não for fornecido, usa o valor padrão
      this.updated_at = updated_at;
    }
  }

  export default Task;
