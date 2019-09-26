
export class AuthService {
    loggedIn = false;
    isAuthenticated() {
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
        if (auth.data.jti && auth.success) {
            localStorage.setItem("token", auth.data.jti)
            localStorage.setItem("alias", auth.data.data.alias)
            localStorage.setItem("username", auth.data.data.username)
            localStorage.setItem("name", auth.data.data.name)
            localStorage.setItem("iss", auth.data.iss)
            localStorage.setItem("exp", auth.data.exp)
            localStorage.setItem("photo", auth.data.data.photo)
            localStorage.setItem("user_id", auth.data.data.user_id)
            localStorage.setItem("profile", JSON.stringify(auth.profile))
            localStorage.setItem("branch_id", auth.profile.branch_id)
            return this.loggedIn
        }
    }
    logout() {
        localStorage.clear()
        this.loggedIn = false;
    }
}

export class AuthType {
    branches: string
    data: {
        data: {
            alias: string,
            username: string,
            name: string,
            user_id: string,
            photo: string
        }
        exp: string
        iat: number
        iss: string
        jti: string
        nbf: number
    }
    msg: string
    profile: {
        AgentAgenda: string,
        AgentChat: string,
        AgentDashboard: string,
        AgentOperations: string,
        AgentProfile: string,
        ConfigurationActivityType: string,
        ConfigurationBranch: string,
        ConfigurationColecctionPlan: string,
        ConfigurationDebtType: string,
        ConfigurationLeadStatus: string,
        ConfigurationNoteColor: string,
        ConfigurationPortfolios: string,
        ConfigurationReport: string,
        ConfigurationScripts: string,
        ConfigurationUsers: string,
        ConfigurationVendor: string,
        FinanceBatchpayments: string,
        FinanceDashboard: string,
        FinanceManualpayments: string,
        FinanceMerchants: string,
        SupervisorAssignPortfolio: string,
        SupervisorChallenges: string,
        SupervisorDashboard: string,
        SupervisorTeams: string,
        SupervisorTopCollectors: string,
        active: string,
        branch_id: string,
        created_at: string,
        created_by: string,
        deleted_at: string,
        deleted_by: string,
        description: string,
        id: string,
        profile: string,
        updated_at: string,
        updated_by: string
    }
    success: boolean
}