export interface PersonalInfo {
  fullName: string;
  email: string;
  age: number;
}

export interface MissionDetails {
  destination: string;
  role: string;
  hasExperience: boolean;
  yearsOfExperience: number;
}

export interface Companion {
  name: string;
  relation: string;
}

export interface SpacePioneerModel {
  personalInfo: PersonalInfo;
  missionDetails: MissionDetails;
  companions: Companion[];
}

export const INITIAL_MODEL: SpacePioneerModel = {
  personalInfo: {
    fullName: '',
    email: '',
    age: 25,
  },
  missionDetails: {
    destination: 'Mars Base Alpha',
    role: 'Engineer',
    hasExperience: false,
    yearsOfExperience: 0,
  },
  companions: [],
};
