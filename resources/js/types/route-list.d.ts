export interface RouteList {
    dashboard: undefined;
    login: undefined;
    logout: undefined;
    members: undefined;
    'password.request': undefined;
    'members.personal': { member: string };
    'members.form': { member: string };
    'members.contact': { member: string };
    'members.education': { member: string };
    'members.address': { member: string };
    'members.occupation': { member: string };
}
