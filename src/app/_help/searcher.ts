export function rmSpace (str: string) {
    if (!str || str && !str.length) return str
    return str.replace(/\s/g, '')
}
export function rmAccent(str:string) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  }
export function compareStr (full: string, term: string) {
    return rmSpace(full.toLowerCase()).includes(rmSpace(term.toLowerCase()))
}