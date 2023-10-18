import { useSession } from "next-auth/react"
import { ADMIN_ROLE } from "../../constants"

export const ACCESS_DENIED_MESSAGE = 'Access denied'

function AuthChecker({ children, authObject }) {
    const { data: session } = useSession()

    // if the user does not have a session deny access
    if (!session) {
        return <div>Access denied</div>
    }

    // if page requires the user to be published and the user is not published deny access
    if (authObject?.publishedOnly && !session?.user?.published) {
        return <div>Access denied</div>
    }

    // if the page requires the user to have a certain role and the user does not have the role deny access
    if (authObject?.roles && !authObject.roles.some(item => session?.user?.roles?.includes(item)) && !authObject.roles.includes(ADMIN_ROLE)) {
        return <div data-testid>{ACCESS_DENIED_MESSAGE}</div>
    }

    return children
}

export default AuthChecker