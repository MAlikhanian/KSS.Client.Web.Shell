'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Check, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useTranslation } from '@/hooks/useTranslation';
import { apiFetch } from '@/lib/api';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { CaptchaWidget } from '@/components/common/captcha-widget';
import { getSignupSchema, SignupSchemaType } from '../forms/signup-schema';
import { translateAuthError } from '@/lib/auth-error-translator';

export default function Page() {
  const router = useRouter();
  const { t } = useTranslation('auth');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmationVisible, setPasswordConfirmationVisible] =
    useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(false);
  const [captchaPayload, setCaptchaPayload] = useState<string | null>(null);

  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(getSignupSchema(t)),
    defaultValues: {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      phone: '',
      password: '',
      passwordConfirmation: '',
      accept: false,
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await form.trigger();
    if (!result) return;

    if (!captchaPayload) {
      setError(t('signup.errors.captchaRequired'));
      return;
    }

    try {
      const values = form.getValues();

      setIsProcessing(true);
      setError(null);

      const response = await apiFetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-captcha-payload': captchaPayload,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const { message } = await response.json();
        setError(translateAuthError(message, t, 'signup'));
      } else {
        router.push('/');
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : t('signup.errors.generic');
      setError(translateAuthError(errorMessage, t, 'signup'));
    } finally {
      setIsProcessing(false);
    }
  };

  if (success) {
    return (
      <Alert onClose={() => setSuccess(false)}>
        <AlertIcon>
          <Check />
        </AlertIcon>
        <AlertTitle>
          {t('signup.successMessage')}{' '}
          <Link
            href="/signin/"
            className="text-primary hover:text-primary-darker"
          >
            {t('signup.signinLink')}
          </Link>
          .
        </AlertTitle>
      </Alert>
    );
  }

  return (
    <Suspense>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="block w-full space-y-5">
          <div className="space-y-1.5 pb-3">
            <h1 className="text-2xl font-semibold tracking-tight text-center">
              {t('signup.title')}
            </h1>
          </div>

          {error && (
            <Alert variant="destructive" onClose={() => setError(null)}>
              <AlertIcon>
                <AlertCircle />
              </AlertIcon>
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          )}

          <div className="grid grid-cols-2 gap-3.5">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('signup.firstName.label')}
                    <span className="text-destructive ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={t('signup.firstName.placeholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('signup.lastName.label')}
                    <span className="text-destructive ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={t('signup.lastName.placeholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t('signup.userName.label')}
                  <span className="text-destructive ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('signup.userName.placeholder')}
                    inputMode="numeric"
                    maxLength={10}
                    dir="ltr"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t('signup.email.label')}
                  <span className="text-destructive ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="email" placeholder={t('signup.email.placeholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t('signup.phone.label')}
                  <span className="text-destructive ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder={t('signup.phone.placeholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t('signup.password.label')}
                  <span className="text-destructive ml-1">*</span>
                </FormLabel>
                <div className="relative">
                  <Input
                    placeholder={t('signup.password.placeholder')}
                    type={passwordVisible ? 'text' : 'password'}
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    mode="icon"
                    size="sm"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute end-0 top-1/2 -translate-y-1/2 h-7 w-7 me-1.5 bg-transparent!"
                    aria-label={
                      passwordVisible ? t('signup.password.hidePassword') : t('signup.password.showPassword')
                    }
                  >
                    {passwordVisible ? (
                      <EyeOff className="text-muted-foreground" />
                    ) : (
                      <Eye className="text-muted-foreground" />
                    )}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t('signup.passwordConfirmation.label')}
                  <span className="text-destructive ml-1">*</span>
                </FormLabel>
                <div className="relative">
                  <Input
                    type={passwordConfirmationVisible ? 'text' : 'password'}
                    {...field}
                    placeholder={t('signup.passwordConfirmation.placeholder')}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    mode="icon"
                    size="sm"
                    onClick={() =>
                      setPasswordConfirmationVisible(
                        !passwordConfirmationVisible,
                      )
                    }
                    className="absolute end-0 top-1/2 -translate-y-1/2 h-7 w-7 me-1.5 bg-transparent!"
                    aria-label={
                      passwordConfirmationVisible
                        ? t('signup.passwordConfirmation.hidePassword')
                        : t('signup.passwordConfirmation.showPassword')
                    }
                  >
                    {passwordConfirmationVisible ? (
                      <EyeOff className="text-muted-foreground" />
                    ) : (
                      <Eye className="text-muted-foreground" />
                    )}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center space-x-2">
            <FormField
              control={form.control}
              name="accept"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-2.5">
                      <Checkbox
                        id="accept"
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(!!checked)}
                      />
                      <label
                        htmlFor="accept"
                        className="text-sm leading-none text-muted-foreground"
                      >
                        {t('signup.acceptTerms.text')}{' '}
                      </label>
                      <Link
                        href="/privacy-policy"
                        target="_blank"
                        className="-ms-0.5 text-sm font-semibold text-foreground hover:text-primary"
                      >
                        {t('signup.privacyPolicy')}
                      </Link>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <CaptchaWidget
            onVerified={setCaptchaPayload}
            onExpired={() => setCaptchaPayload(null)}
            validationMessage={t('signup.errors.captchaCheckBox')}
          />

          <div className="flex flex-col gap-2.5">
            <Button type="submit" disabled={isProcessing || !captchaPayload}>
              {isProcessing ? (
                <LoaderCircleIcon className="size-4 animate-spin" />
              ) : null}
              {t('signup.continueButton')}
            </Button>
          </div>

          <div className="text-sm text-muted-foreground text-center">
            {t('signup.alreadyHaveAccount')}{' '}
            <Link
              href="/signin"
              className="text-sm text-sm font-semibold text-foreground hover:text-primary"
            >
              {t('signup.signinLink')}
            </Link>
          </div>
        </form>
      </Form>
    </Suspense>
  );
}
