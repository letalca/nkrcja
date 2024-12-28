export interface RouteList {
    dashboard: undefined;
    login: undefined;
    logout: undefined;
    members: undefined;
    'password.request': undefined;
    'members.form': { memberId: int };
    'members.save': { memberId: int; form: string };
}
