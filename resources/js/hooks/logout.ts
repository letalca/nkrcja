import { router } from '@inertiajs/react';
import { toast } from './use-toast';

export const logout = async () => {
    try {
        router.post(route('logout'));
    } catch (e) {
        toast({
            variant: 'destructive',
            title: 'Failed to logout!',
            description: 'Error occurred during the logout request.',
        });
        console.error('Logout POST error:', e, typeof e);
    }
};
