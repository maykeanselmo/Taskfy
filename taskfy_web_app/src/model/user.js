class User {
    constructor({
      id = undefined,
      username,
      name,
      email,
      password,
      created_at = new Date().toISOString(),
      updated_at = created_at,
      is_active = true,
    }) {
      this.id = id;
      this.username = username;
      this.name = name;
      this.email = email;
      this.password = password;
      this.created_at = created_at; // Se 'created_at' não for fornecido, usa o valor padrão
      this.updated_at = updated_at;
      this.is_active = is_active;
    }
  }

  export default User;
