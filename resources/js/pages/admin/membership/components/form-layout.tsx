import { Main } from '@/components/main';
import { PageHeader } from '@/components/page-header';
import Layout from '@/layouts/layout';
import { ClubMember } from '@/types';
import { PropsWithChildren } from 'react';
import SidebarNav from './side-bar-nav';

type Props = {
    member: ClubMember;
    subtitle: string;
    title?: string;
} & PropsWithChildren;

export default function FormLayout({
    member,
    subtitle,
    title,
    children,
}: Props) {
    return (
        <Layout>
            <Main fixed>
                <PageHeader title={title || member.name} subTitle={subtitle} />
                <div className="flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <aside className="top-0 lg:sticky lg:w-1/5">
                        <SidebarNav member={member} />
                    </aside>
                    <div className="flex w-full overflow-y-hidden p-1 pr-4">
                        {children}
                    </div>
                </div>
            </Main>
        </Layout>
    );
}
