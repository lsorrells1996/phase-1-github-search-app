window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector("#github-form")
    const userList = document.querySelector('#user-list')
    const reposList = document.querySelector('#repos-list')
    
    form.addEventListener('submit', e => {
        e.preventDefault()
        const userSearch = e.target.search.value
        fetch(`https://api.github.com/search/users?q=${userSearch}`)
        .then(r => r.json())
        .then(data => {
            const users = data.items
            users.forEach(obj => createUserList(obj))
        }) 
    })
    function createsRepoList(obj) {
        const newRepo = document.createElement('li')
        newRepo.textContent = obj.name
        reposList.appendChild(newRepo)
    }
    function clickAndFetchRepos(obj) {
        const person = obj.login
        fetch(`https://api.github.com/users/${person}/repos`)
            .then(r => r.json())
            .then(repoArray => {
                repoArray.forEach(createsRepoList)
            })
    }
    function createUserList(obj) {
        const newLi = document.createElement('li')

        newLi.textContent = obj.login

        newLi.addEventListener('click', e => clickAndFetchRepos(obj))

        userList.appendChild(newLi)
    }
})












