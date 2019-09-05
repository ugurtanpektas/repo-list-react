export const getReposStart = () => ({
    type: 'GET_REPOS_START'
})

export const repos = repos => ({
    type: 'GET_REPOS',
    repos
})