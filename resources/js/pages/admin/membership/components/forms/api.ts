import { toast } from '@/hooks/useToast';
import { handleApiError } from '@/lib/handle-api-error';
import { ClubMember, ResponseWithMessage } from '@/types';
import { router, useForm } from '@inertiajs/react';
import { FormType } from '../../context/form/types';
import { PersonalDataForm, Phones } from './schemas';

type RT = ClubMember | null | undefined;

type Data = Phones | PersonalDataForm;
type PostFunc = ReturnType<
    typeof useForm<{ image: File | null | undefined }>
>['post'];

type ApiProps = {
    memberId: number;
    handleFormErrors?: (errors: Record<string, string>) => boolean;
    onDone?: () => void;
} & (
    | {
          data: Data;
          form: Exclude<FormType, 'image'>;
      }
    | {
          form: 'image';
          post: PostFunc;
      }
);

type ClubMemberResponse = ResponseWithMessage<{ data: ClubMember }>;

const handleSuccessResponse = (
    response: ClubMemberResponse,
): ClubMember | undefined => {
    const { flash } = response;
    toast({
        variant: flash.has_error ? 'destructive' : 'success',
        description: flash.has_error ? flash.error : flash.message,
    });

    if (!flash.has_error) {
        return response.data;
    }
};

export const api = async (props: ApiProps): Promise<RT> => {
    return await new Promise<RT>((res) => {
        const {
            memberId,
            form,
            onDone,
            handleFormErrors = () => {
                return false;
            },
        } = props;
        const url = route('members.save', { memberId, form });
        if (form === 'image') {
            const { post } = props;
            post(url, {
                onSuccess: (response) => {
                    res(
                        handleSuccessResponse(
                            response.props as unknown as ClubMemberResponse,
                        ),
                    );
                },
                onError: (e) => handleApiError(e, 'upload image'),
                onFinish: onDone,
            });
        } else {
            const { data } = props;
            router.post(url, data, {
                onError: (e) => {
                    if (!handleFormErrors(e)) {
                        handleApiError(e, `update ${form} information`);
                    }
                },
                onSuccess: (response) => {
                    res(
                        handleSuccessResponse(
                            response.props as unknown as ClubMemberResponse,
                        ),
                    );
                },
                onFinish: onDone,
            });
        }
    });
};
