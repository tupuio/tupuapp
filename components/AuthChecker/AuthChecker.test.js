import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import AuthChecker from "./AuthChecker";
import { SessionProvider } from "next-auth/react";

const mockSessionObject = {
    "user": {
        "name": "test user",
        "email": "test@gmail.com",
        "published": true, "roles": ["mentor"]
    },
    "expires": "2200-08-07T15:44:00.045Z"
}

const AUTHCHECKER_CHILD_TEST_ID = 'authchecker-child'

function renderComponent(authObject = {}) {
    return render(
        <SessionProvider session={mockSessionObject}>
            <AuthChecker authObject={authObject}>
                <div data-testid={AUTHCHECKER_CHILD_TEST_ID}>Test</div>
            </AuthChecker>
        </SessionProvider>
    )
}

describe('AuthChecker', () => {
    test('should render children if there is no auth object on the component instance', () => {
        renderComponent()

        expect(screen.getByTestId(AUTHCHECKER_CHILD_TEST_ID)).toBeInTheDocument()
    })
})