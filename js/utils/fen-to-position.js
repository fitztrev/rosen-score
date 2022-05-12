export default function (fen) {
    fen = fen.split(' ')[0]

    return fen
        .replace(/\//g, '')
        .replace(/1/g, '.')
        .replace(/2/g, '..')
        .replace(/3/g, '...')
        .replace(/4/g, '....')
        .replace(/5/g, '.....')
        .replace(/6/g, '......')
        .replace(/7/g, '.......')
        .replace(/8/g, '........')
}
