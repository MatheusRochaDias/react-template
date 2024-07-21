import { AppContext } from 'next/app';
import { parseCookies, setCookie } from 'nookies';
import { getAPIClient } from '@/services/axios';
import { redirectTo } from './redirectTo';

export async function authPageProps({ Component, ctx, router }: AppContext) {
  let pageProps = {};
  const api = getAPIClient();

  const FREE_ROUTES = ['/login'];

  const { '@food_token': token } = parseCookies(ctx);

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  if (FREE_ROUTES.includes(ctx.pathname)) return { pageProps };

  if (!token && !FREE_ROUTES.includes(ctx.pathname)) {
    redirectTo('/login', { res: ctx.res, status: 301 });
    return {};
  }
  if (token) {
    return { pageProps };
  }
  redirectTo('/login', { res: ctx.res, status: 301 });
  return {};
}
