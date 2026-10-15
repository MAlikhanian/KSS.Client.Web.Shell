'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useTranslation } from '@/hooks/useTranslation';
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
import { getSigninSchema, SigninSchemaType } from '../forms/signin-schema';
import { translateAuthError } from '@/lib/auth-error-translator';

export default function Page() {
  const router = useRouter();
  const { t } = useTranslation('auth');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [captchaPayload, setCaptchaPayload] = useState<string | null>(null);

  const form = useForm<SigninSchemaType>({
    resolver: zodResolver(getSigninSchema(t)),
    defaultValues: {
      userName: '',
      password: '',
      rememberMe: false,
    },
  });

  async function onSubmit(values: SigninSchemaType) {
    if (!captchaPayload) {
      setError(t('signin.errors.captchaRequired'));
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const response = await signIn('credentials', {
        redirect: false,
        userName: values.userName,
        password: values.password,
        rememberMe: values.rememberMe,
        captchaPayload,
      });

      if (response?.error) {
        const errorData = JSON.parse(response.error);
        const errorMessage = errorData.message || response.error;
        setError(translateAuthError(errorMessage, t, 'signin'));
      } else {
        router.push('/');
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : t('signin.errors.generic');
      setError(translateAuthError(errorMessage, t, 'signin'));
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="block w-full space-y-5"
      >
        <div className="space-y-1.5 pb-3">
          <h1 className="text-2xl font-semibold tracking-tight text-center">
            {t('signin.title')}
          </h1>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertIcon>
              <AlertCircle />
            </AlertIcon>
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('signin.userName.label')}</FormLabel>
              <FormControl>
                <Input placeholder={t('signin.userName.placeholder')} {...field} />
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
              <div className="flex justify-between items-center gap-2.5">
                <FormLabel>{t('signin.password.label')}</FormLabel>
                <Link
                  href="/reset-password"
                  className="text-sm font-semibold text-foreground hover:text-primary"
                >
                  {t('signin.forgotPassword')}
                </Link>
              </div>
              <div className="relative">
                <Input
                  placeholder={t('signin.password.placeholder')}
                  type={passwordVisible ? 'text' : 'password'} // Toggle input type
                  {...field}
                />
                <Button
                  type="button"
                  variant="ghost"
                  mode="icon"
                  size="sm"
                  onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility
                  className="absolute end-0 top-1/2 -translate-y-1/2 h-7 w-7 me-1.5 bg-transparent!"
                  aria-label={
                    passwordVisible ? 'Hide password' : 'Show password'
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

        <div className="flex items-center space-x-2">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <>
                <Checkbox
                  id="remember-me"
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(!!checked)}
                />
                <label
                  htmlFor="remember-me"
                  className="text-sm leading-none text-muted-foreground"
                >
                  {t('signin.rememberMe')}
                </label>
              </>
            )}
          />
        </div>

        <CaptchaWidget
          onVerified={setCaptchaPayload}
          onExpired={() => setCaptchaPayload(null)}
          validationMessage={t('signin.errors.captchaCheckBox')}
        />

        <div className="flex flex-col gap-2.5">
          <Button type="submit" disabled={isProcessing || !captchaPayload}>
            {isProcessing ? <LoaderCircleIcon className="size-4 animate-spin" /> : null}
            {t('signin.signinButton')}
          </Button>
        </div>

        <p className="text-sm text-muted-foreground text-center">
          {t('signin.noAccount')}{' '}
          <Link
            href="/signup"
            className="text-sm font-semibold text-foreground hover:text-primary"
          >
            {t('signin.signupLink')}
          </Link>
        </p>
      </form>
    </Form>
  );
}
