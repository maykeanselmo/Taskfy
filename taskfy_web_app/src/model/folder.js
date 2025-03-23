class Folder {
    constructor({
      id,
      user_id,
      parent_id,
      name,
      created_at = new Date().toISOString(),
      updated_at,
    }) {
      this.id = id;
      this.user_id = user_id;
      this.parent_id = parent_id;
      this.name = name;
      this.created_at = created_at; // Se 'created_at' não for fornecido, usa o valor padrão
      this.updated_at = updated_at;
    }
  }
  
  export default Folder;
