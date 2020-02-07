export interface Flashcard {
    word: string,
    hiragana: string,
    sino: string,
    ipa: string,
    example: string,
    created_at: string,
    updated_at: string,
    id: string,
    lesson_id: string
}
export interface Meta {
    meta: string,
    current_page: number,
    next_page: number,
    prev_page: number,
    total_pages: number,
    total_count: number
}
