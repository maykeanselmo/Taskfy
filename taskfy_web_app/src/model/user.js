class User {
    constructor({
      id,
      username,
      nickname,
      email,
      password,
      created_at = new Date().toISOString(),
      updated_at,
      is_active,
    }) {
      this.id = id;
      this.username = username;
      this.nickname = nickname;
      this.email = email;
      this.password = password;
      this.created_at = created_at;
      this.updated_at = updated_at;
      this.is_active = is_active;
    }
  }
  
  export default User;
