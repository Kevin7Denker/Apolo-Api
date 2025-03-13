export interface Profile {
  email: string;
  phone: string;
  name: string;
  surname: string;
  password: string;
  lastLogin: Date;
  lastUpdate: Date;
  dateCriation?: Date;
  identity?: string;
  nationality?: {
    country: string;
    code: string;
  };
  image?: string;
}

export interface Config {
  theme: string;
  language: string;
}

export interface Validation {
  email: boolean;
  phone: boolean;
}

export interface Data {
  genres: string[];
}

export interface UserDocument extends Document {
  toObject(): import("mongoose").AnyObject;
  _id: unknown;
  save(): unknown;
  profile: Profile;
  validation: Validation;
  config: Config;
  data: Data;
}
