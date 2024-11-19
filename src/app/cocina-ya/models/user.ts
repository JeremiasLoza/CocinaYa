export interface Users {
    user: User[];
    favorites: Favorite[];
  }
  
  export interface User {
    id: number;
    name: string;
    lastName: string;
    email: string;
    password: string;
  }
  
  export interface Favorite {
    id: string;
    favorites: string[];
  }
