export interface RouteList {
    dashboard: undefined;
    login: undefined;
    logout: undefined;
    members: undefined;
    'password.request': undefined;
    'members.form': { member: string };
    'members.save': { member: string; form: string };
}
