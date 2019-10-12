
export class AuthService {
    loggedIn = false;
    isAuthenticated(): Promise<any> {
        const promise = new Promise((resolve, reject) => {
            if (localStorage.token) {
                this.loggedIn = true
            }
            //setTimeout(() => {
            resolve(this.loggedIn)
            // }, 800)
        })
        return promise;
    }

    login(auth: AuthType): boolean {
        this.loggedIn = true
        localStorage.setItem("id", auth.id)
        localStorage.setItem("username", auth.username)
        localStorage.setItem("firstname", auth.firstname)
        localStorage.setItem("lastname", auth.lastname)
        localStorage.setItem("photo", auth.photo)
        localStorage.setItem("token", auth.token)
        localStorage.setItem("gender", auth.gender)
        localStorage.setItem("position", auth.position)
        localStorage.setItem("position_id", auth.position_id)
        localStorage.setItem("root", JSON.stringify(auth.root))
        localStorage.setItem("root_id", auth.root.id)
        localStorage.setItem("current_folder", auth.root.id)
        return this.loggedIn
    }

    logout() {
        localStorage.clear()
        this.loggedIn = false;
    }
}

export class AuthType {
    id: string
    username: string
    firstname: string
    lastname: string
    photo: string
    token: string
    gender: string
    position: string
    position_id: string
    root: {
        id: string
    }
}