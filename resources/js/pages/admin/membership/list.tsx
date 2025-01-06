import { Main } from '@/components/main';
import { PageHeader } from '@/components/page-header';
import { MembershipProvider } from '@/context/membership';
import Layout from '@/layouts/layout';
import { ClubMember, Filter, PageProps, PaginatedResponse } from '@/types';
import { IconMailPlus, IconUserPlus } from '@tabler/icons-react';
import { columns } from './components/member-column';
import { MembershipTable } from './components/membership-table';

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
                <Main>
                    <PageHeader
                        showSeparator={false}
                        title="Club Members"
                        subTitle="Manage all club membership data here."
                        actions={[
                            {
                                variant: 'outline',
                                label: 'Invite User',
                                icon: IconMailPlus,
                            },
                            {
                                label: 'Add User',
                                icon: IconUserPlus,
                            },
                        ]}
                    />
                    <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
                        <MembershipTable />
                    </div>
                </Main>
            </MembershipProvider>
        </Layout>
    );
}
