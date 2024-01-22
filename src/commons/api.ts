import { parseCookies, setCookie } from 'nookies';

type method = 'GET' | 'POST' | 'PUT' | 'DELETE';

class WebClient {
  constructor(private base_url?: string) {}

  public async getToken(ctx?: any): Promise<string | unknown> {
    const { forest_access_token } = parseCookies(ctx);

    return forest_access_token;
  }

  private async fetch<T>(method: method, path: string, body?: any, headers?: any) {
    if (path.substring(0, 1) !== '/' && path.substring(0, 3) !== 'http') {
      throw new Error('Path must start with /');
    }

    const resp = await fetch(`${this.base_url}${path}`, { method: method, headers: headers, body: body });

    const getJson = async () => {
      if (resp.headers.get('content-type')?.includes('application/json')) {
        try {
          return await resp.json();
        } catch (e) {
          return undefined;
        }
      } else {
        const textResponse = await resp.text();
        return textResponse !== 'false' && textResponse || undefined;
      }
    };

    if (resp.ok) {
      return { ...resp, data: await getJson() as T };
    }
    else
      throw { ...resp, data: await getJson() as T };
  }

  private async execute<T>(method: method, path: string, body?: any, ctx?: any, headers?: any) {
    const token = await this.getToken(ctx);
    if (!headers) {
      headers =
        token == null
          ? {
            Accept: 'application/json, text/plain, multipart/form-data, *.*',
            'Content-Type': 'application/json',
          }
          : {
            Authorization: 'Bearer ' + token,
            Accept: 'application/json, text/plain, multipart/form-data, *.*',
            'Content-Type': 'application/json',
          };
    }
    return await this.fetch<T>(method, path, typeof body == 'string' ? body : JSON.stringify(body), headers);
  }

  async get<T>(path: string, body?: any, ctx?: any, headers?: any) {
    return await this.execute<T>('GET', path, body, ctx, headers);
  }

  async post<T>(path: string, body?: T | any, ctx?: any, headers?: any) {
    return await this.execute<T>('POST', path, body, ctx, headers);
  }

  async put<T>(path: string, body?: any, ctx?: any, headers?: any) {
    return await this.execute<T>('PUT', path, body, ctx, headers);
  }

  async delete(path: string, body?: any, ctx?: any, headers?: any) {
    return await this.execute('DELETE', path, body, ctx, headers);
  }

  async formData(path: string, formData: FormData, method: 'POST' | 'PUT' = 'POST', ctx?: any) {
    const token = await this.getToken(ctx);
    const headers = {
      Authorization: 'Bearer ' + token,
    };

    return await this.fetch(method, path, formData, headers);
  }

  async currentLocation(ctx?: any): Promise<Location> {
    const { location } = parseCookies(ctx);

    if (!location) {
      const resp = await fetch(`https://ipinfo.io/json?token=${process.env.TOKEN_IPINFO}`);
      const data = await resp.json();

      setCookie(ctx, 'location', JSON.stringify(data), { maxAge: 60 * 5, path: '/' });

      return data;
    }

    return JSON.parse(location);
  }
}

const api = new WebClient(process.env.REACT_APP_BASE_URL);

export { api };
