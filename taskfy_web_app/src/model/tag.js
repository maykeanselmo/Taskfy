class Tag {
    constructor({
      id = undefined,
      name,
      created_at = new Date().toISOString(),
      updated_at = created_at,
    }) {
      this.id = id;
      this.name = name;
      this.created_at = created_at; // Se 'created_at' não for fornecido, usa o valor padrão
      this.updated_at = updated_at;
    }
  }

  export default Tag;