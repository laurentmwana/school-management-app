import { UserModel } from '.';

export interface SchoolModel {
    id: number;
    name: string;
    alias: string;
    address: string;
    description: string;
    levels: LevelModel[];
    years: YearModel[];
    user: UserModel;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface LevelModel {
    id: number;
    name: string;
    alias: string;
    cycle: string;
    sub_cycle: string | null;
    school: SchoolModel;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface YearModel {
    id: number;
    name: string;
    start: string;
    end: string;
    school: SchoolModel;
    is_closed: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface CourseModel {
    id: number;
    name: string;
    alias: string;
    credits: number
    level: LevelModel;
    created_at: string;
    updated_at: string;
}

export interface GradeModel {
    id: number;
    student: StudentModel;
    level: LevelModel;
    course: CourseModel
    year: YearModel
    score: number
    created_at: string;
    updated_at: string;
}

export interface GuardianModel {
    id: number;
    name: string
    firstname: string
    gender: string
    phone: string
    students: StudentModel[];
    created_at: string;
    updated_at: string;
}

export interface StudentModel {
    id: number;
    name: string
    firstname: string
    gender: string
    birth: string
    actual_level: ActualLevelModel
    historic_levels: HistoricLevelModel[]
    guardians: GuardianModel[]
    created_at: string;
    updated_at: string;
}

export interface ActualLevelModel {
    id: number;
    level: LevelModel
    year: YearModel
    student: StudentModel
    created_at: string;
    updated_at: string;
}


export interface HistoricLevelModel {
    id: number;
    level: LevelModel
    year: YearModel
    student: StudentModel
    created_at: string;
    updated_at: string;
}


