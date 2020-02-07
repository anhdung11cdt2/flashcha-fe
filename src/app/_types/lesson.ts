import { Flashcard } from './flashcard';

export interface Lesson {
    name: string,
    created_at: string,
    updated_at: string,
    id: string,
    course_id: string,
    flashcard?: Flashcard[]
}
