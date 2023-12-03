export interface IForm {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: Gender;
  acceptance: boolean;
  img: FileList;
  countries: string;
}

export interface IFormStore {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: Gender;
  acceptance: boolean;
  img: string;
  countries: string;
}

export interface IFormYup {
  name?: string;
  age?: number;
  email?: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  acceptance?: boolean;
  img?: FileList | null;
  countries?: string;
}

type Gender = 'male' | 'female';
