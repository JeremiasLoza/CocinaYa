export interface Users {
    user: User[];
    favorites: Favorite[];
  }
  
  export interface User {
    id: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
  }
  
  export interface Favorite {
    id: string;
    favorites: string[];
  }
