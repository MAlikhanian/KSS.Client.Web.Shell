'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { RiCheckboxCircleFill, RiErrorWarningFill } from '@remixicon/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FieldErrors, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { apiFetch } from '@/lib/api';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoaderCircleIcon } from 'lucide-react';
import { useSettings } from '../components/settings-context';
import {
  SocialSettingsSchema,
  SocialSettingsSchemaType,
} from '../forms/social-settings-schema';
import { useTranslation } from '@/hooks/useTranslation';

const SocialSettingsPage = () => {
  const { t } = useTranslation('user-management');
  const queryClient = useQueryClient();
  const { settings } = useSettings();

  const form = useForm<SocialSettingsSchemaType>({
    resolver: zodResolver(SocialSettingsSchema),
    defaultValues: {
      socialFacebook: settings.socialFacebook || '',
      socialTwitter: settings.socialTwitter || '',
      socialInstagram: settings.socialInstagram || '',
      socialLinkedIn: settings.socialLinkedIn || '',
      socialPinterest: settings.socialPinterest || '',
      socialYoutube: settings.socialYoutube || '',
    },
    mode: 'onSubmit',
  });

  const mutation = useMutation({
    mutationFn: async (values: SocialSettingsSchemaType) => {
      const response = await apiFetch('/api/user-management/settings/social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }

      return response.json();
    },
    onSuccess: () => {
      toast.custom(
        () => (
          <Alert variant="mono" icon="success">
            <AlertIcon>
              <RiCheckboxCircleFill />
            </AlertIcon>
            <AlertTitle>{t('settings.social.messages.settingsUpdated')}</AlertTitle>
          </Alert>
        ),
        {
          position: 'top-center',
        },
      );

      queryClient.invalidateQueries({ queryKey: ['system-settings'] });
    },
    onError: (error: Error) => {
      toast.custom(
        () => (
          <Alert variant="mono" icon="destructive">
            <AlertIcon>
              <RiErrorWarningFill />
            </AlertIcon>
            <AlertTitle>{error.message}</AlertTitle>
          </Alert>
        ),
        {
          position: 'top-center',
        },
      );
    },
  });

  const isProcessing = mutation.status === 'pending';

  const handleSubmit = (values: SocialSettingsSchemaType) => {
    mutation.mutate(values);
  };

  const handleError = (errors: FieldErrors<SocialSettingsSchemaType>) => {
    // Cast keys as an array of keys of SocialSettingsSchemaType
    const keys = Object.keys(errors) as (keyof SocialSettingsSchemaType)[];
    const firstErrorKey = keys[0];
    const firstErrorMessage = errors[firstErrorKey]?.message;

    if (firstErrorMessage) {
      toast.custom(
        () => (
          <Alert variant="mono" icon="destructive">
            <AlertIcon>
              <RiErrorWarningFill />
            </AlertIcon>
            <AlertTitle>
              {t('settings.social.messages.formHasErrors')}
            </AlertTitle>
          </Alert>
        ),
        {
          position: 'top-center',
        },
      );
    }
  };

  return (
    <Card>
      <CardHeader className="border-b border-border">
        <CardTitle>{t('settings.social.title')}</CardTitle>
      </CardHeader>
      <CardContent className="py-12">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit, handleError)}
            className="space-y-6 lg:max-w-[600px] mx-auto"
          >
            {/* Facebook */}
            <FormField
              control={form.control}
              name="socialFacebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('settings.social.fields.facebook')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('settings.social.fields.facebookPlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Twitter */}
            <FormField
              control={form.control}
              name="socialTwitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('settings.social.fields.twitter')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('settings.social.fields.twitterPlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Instagram */}
            <FormField
              control={form.control}
              name="socialInstagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('settings.social.fields.instagram')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('settings.social.fields.instagramPlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* LinkedIn */}
            <FormField
              control={form.control}
              name="socialLinkedIn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('settings.social.fields.linkedIn')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('settings.social.fields.linkedInPlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Pinterest */}
            <FormField
              control={form.control}
              name="socialPinterest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('settings.social.fields.pinterest')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('settings.social.fields.pinterestPlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* YouTube */}
            <FormField
              control={form.control}
              name="socialYoutube"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('settings.social.fields.youtube')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('settings.social.fields.youtubePlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Action Buttons */}
            <div className="flex space-x-4 justify-end">
              <Button
                type="reset"
                variant="outline"
                onClick={() => form.reset()}
              >
                {t('settings.social.buttons.reset')}
              </Button>
              <Button
                type="submit"
                disabled={!form.formState.isDirty || isProcessing}
              >
                {isProcessing && <LoaderCircleIcon className="animate-spin" />}
                {t('settings.social.buttons.saveSettings')}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SocialSettingsPage;
