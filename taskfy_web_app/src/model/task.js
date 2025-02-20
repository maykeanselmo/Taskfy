class Task {
    constructor({
      id,
      folder_id,
      title,
      description,
      due_date,
      status,
      priority,
      created_at,
      updated_at,
    }) {
      this.id = id;
      this.folder_id = folder_id;
      this.title = title;
      this.description = description;
      this.due_date = due_date;
      this.status = status;
      this.priority = priority;
      this.created_at = created_at;
      this.updated_at = updated_at;
    }
  }
  
  export default Task;
  