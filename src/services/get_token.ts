type SipayTokenResponse = {
    status_code: number;
    status_description: string;
    data: {
      token: string;
      is_3d: 0 | 1 | 2 | 4;
      expires_at: string; // ISO format
    };
  };
  
  let tokenCache: {
    token: string | null;
    expiresAt: number | null;
  } = {
    token: null,
    expiresAt: null,
  };
  export const getToken = async (): Promise<{ token: string; is3D: number }> => {
    const now = Date.now();
  
    if (tokenCache.token && tokenCache.expiresAt && tokenCache.expiresAt > now) {
      return { token: tokenCache.token, is3D: 1 }; // Önceki is3D'yi hatırlamıyoruz burada, default döndürüyoruz
    }
  
    const app_id = process.env.SIPAY_APP_ID;
    const app_secret = process.env.SIPAY_APP_SECRET;
  
    if (!app_id || !app_secret) {
      throw new Error("Sipay App ID veya Secret eksik!");
    }
  
    const api_url = process.env.SIPAY_API_URL + '/api/token';
    if (!api_url) {
      throw new Error("Sipay API URL eksik!");
    }
  
    const res = await fetch(api_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ app_id, app_secret }),
    });
  
    if (!res.ok) {
      const errorText = await res.text();
      console.error("Sipay token hatası:", errorText);
      throw new Error("Token alınamadı: HTTP hatası");
    }
  
    const responses = await res.json() as SipayTokenResponse[];
    const response = responses[0];
  
    if (response.status_code !== 100) {
      console.error("Sipay token başarısız:", response.status_description);
      throw new Error(`Token alınamadı: ${response.status_description}`);
    }
  
    const tokenData = response.data;
    const expiresAt = new Date(tokenData.expires_at).getTime();
  
    tokenCache = {
      token: tokenData.token,
      expiresAt,
    };
  
    return {
      token: tokenData.token,
      is3D: tokenData.is_3d,
    };
  };
  