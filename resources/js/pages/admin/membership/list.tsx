import { Button } from '@/components/button';
import { Main } from '@/components/main';
import { MembershipProvider } from '@/context/membership-provider-context';
import Layout from '@/layouts/layout';
import { ClubMember, Filter, PageProps, PaginatedResponse } from '@/types';
import { IconMailPlus, IconUserPlus } from '@tabler/icons-react';
import { columns } from './components/member-column';
import { MembershipTable } from './membership-table';

type ClubMemberPaginatedResponse = PaginatedResponse<ClubMember>;
type MembershipPageProps = {
    paginate: ClubMemberPaginatedResponse;
    filters: Filter[];
};

export default function Membership(props: PageProps<MembershipPageProps>) {
    const { data, ...paginatedProps } = props.paginate;
    const filters = props.filters;

    return (
        <Layout>
            <MembershipProvider
                clubMembers={data}
                filters={filters}
                paginate={paginatedProps}
                columns={columns}
            >
                <Main fixed>
                    <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">
                                Club Members
                            </h2>
                            <p className="text-muted-foreground">
                                Manage all club membership data here.
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" className="space-x-1">
                                <span>Invite User</span>{' '}
                                <IconMailPlus size={18} />
                            </Button>
                            <Button className="space-x-1">
                                <span>Add User</span> <IconUserPlus size={18} />
                            </Button>
                        </div>
                    </div>
                    <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
                        <MembershipTable />
                    </div>
                </Main>
            </MembershipProvider>
        </Layout>
    );
}
