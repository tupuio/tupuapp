import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import AuthChecker, { ACCESS_DENIED_MESSAGE } from "./AuthChecker";
import { SessionProvider } from "next-auth/react";
import { MENTEE_ROLE } from "../../constants";

const mockSessionObject = {
    "user": {
        "name": "test user",
        "email": "test@gmail.com",
        "published": true,
        "roles": ["mentor"]
    },
    "expires": "2200-08-07T15:44:00.045Z"
}

const AUTHCHECKER_CHILD_TEST_ID = 'authchecker-child'

function renderComponent(authObject = {}, sessionObject = mockSessionObject, ChildComponent) {
    return render(
        <SessionProvider session={sessionObject}>
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

    describe('published only components', () => {
        test('should render children if the user is published', () => {
            const publishedSessionObject = {
                ...mockSessionObject,
                user: {
                    ...mockSessionObject.user,
                    published: true
                }
            }

            renderComponent({ publishedOnly: true }, publishedSessionObject)

            expect(screen.queryByTestId(AUTHCHECKER_CHILD_TEST_ID)).toBeInTheDocument()
        })

        test('should not render children if the user is not published', () => {

            const notPublishedSessionObject = {
                ...mockSessionObject,
                user: {
                    ...mockSessionObject.user,
                    published: false
                }
            }

            renderComponent({ publishedOnly: true }, notPublishedSessionObject)

            expect(screen.queryByTestId(AUTHCHECKER_CHILD_TEST_ID)).not.toBeInTheDocument()

            expect(screen.queryByText(ACCESS_DENIED_MESSAGE)).toBeInTheDocument()
        })
    })

    describe('mentee only components', () => {
        test('should render children if the user has the mentee role', () => {
            const menteeSessionObject = {
                ...mockSessionObject,
                user: {
                    ...mockSessionObject.user,
                    roles: [MENTEE_ROLE]
                }
            }

            renderComponent({ roles: [MENTEE_ROLE] }, menteeSessionObject)

            expect(screen.queryByTestId(AUTHCHECKER_CHILD_TEST_ID)).toBeInTheDocument()
        })

        test('should not render children if the user does not have the mentee role', () => {

            renderComponent({ roles: [MENTEE_ROLE] }, null)

            expect(screen.queryByTestId(AUTHCHECKER_CHILD_TEST_ID)).not.toBeInTheDocument()

            expect(screen.queryByText(ACCESS_DENIED_MESSAGE)).toBeInTheDocument()
        })
    })


})