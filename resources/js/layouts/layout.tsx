import { PropsWithChildren } from 'react';
import BaseLayout from './base-layout';

interface HeaderProps extends PropsWithChildren {}

export default function Layout({ children }: HeaderProps) {
    return (
        <>
            <BaseLayout>{children}</BaseLayout>
        </>
    );
}
