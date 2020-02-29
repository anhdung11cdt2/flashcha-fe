export interface Flashcard {
    id?: string,
    word: string,
    hiragana: string,
    lesson_id: string,
    sino?: string,
    ipa?: string,
    example?: string,
    created_at?: string,
    updated_at?: string
}
export interface Meta {
    meta: string,
    current_page: number,
    next_page: number,
    prev_page: number,
    total_pages: number,
    total_count: number
}
