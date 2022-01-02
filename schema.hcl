table "users" {
    column "name" string {}
    column "email" string {}
    column "title" string {}
    column "twitter" string {}
    column "linkedin" string {}
    column "biography" text {}
    column "picture" string {}
    column "roles" multiple {}
    column mentor object {
        column status string {}
        column hide bool {}
    }
}

table "requests" {
    column "mentor" link { table="users" }
    column "mentee" link { table="users" }
    column "message" text {}
}

table "nextauth_providers" {
    column user link{ table="users" }
    column provider string{}
    column providerAccountId string{}
}