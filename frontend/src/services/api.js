// src/services/api.js

// Backend URL belirleme: Production'da aynı origin kullan, development'ta localhost
function getBaseUrl() {
    // Environment variable varsa onu kullan (öncelikli)
    if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL.trim().replace(/\/+$/, "");
    }
    
    // Production ortamında (deployed) aynı origin kullan
    const currentOrigin = window.location.origin;
    const isProduction = currentOrigin.includes('sevalla.app') || 
                         currentOrigin.includes('vercel.app') ||
                         (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1');
    
    if (isProduction) {
        // Production'da backend aynı domain'de çalışıyor
        // https://avukado-9ua7p.sevalla.app -> https://avukado-9ua7p.sevalla.app/api/...
        return currentOrigin;
    }
    
    // Development'ta localhost kullan
    return "http://localhost:3000";
}

const BASE_URL = getBaseUrl();

export const endpoints = {
    login: "/api/Auth/login",
    register: "/api/Auth/register",
    profile: "/api/Auth/profile",
    ads: "/api/Ads",
    lawyers: "/api/Lawyers",
    adProposals: (id) => `/api/Ads/${id}/proposals`,
};

// ---- Token yardımcıları
export function getToken() {
    return localStorage.getItem("avukado_token");
}
export function setToken(t) {
    localStorage.setItem("avukado_token", t);
}
export function clearToken() {
    localStorage.removeItem("avukado_token");
}

// ---- URL kurucu (absolute path de destekler)
function buildUrl(path, query) {
    const isAbsolute = /^https?:\/\//i.test(path);
    const u = new URL(isAbsolute ? path : `${BASE_URL}${path}`);
    if (query) {
        Object.entries(query).forEach(([k, v]) => {
            if (v !== undefined && v !== null && v !== "" && v !== "Tümü") {
                u.searchParams.set(k, v);
            }
        });
    }
    return u.toString();
}

// ---- Ortak istek
async function request(method, path, {
    body,
    query,
    headers = {},
    withToken = true,
    credentials,           // cookie kullanıyorsanız "include" verin
    timeoutMs = 20000,     // 20 sn zaman aşımı
} = {}) {
    const url = buildUrl(path, query);

    const h = {
        Accept: "application/json, text/plain;q=0.9,*/*;q=0.8",
        ...(method !== "GET" && method !== "HEAD" ? { "Content-Type": "application/json" } : {}),
        ...(withToken && getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
        ...headers,
    };

    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort("timeout"), timeoutMs);

    try {
        const res = await fetch(url, {
            method,
            headers: h,
            body: body != null && method !== "GET" && method !== "HEAD" ? JSON.stringify(body) : undefined,
            credentials, // çoğu senaryoda undefined bırakabilirsiniz
            signal: ctrl.signal,
        });
        clearTimeout(t);

        if (!res.ok) {
            const text = await res.text().catch(() => "");
            throw new Error(`${res.status} ${res.statusText}${text ? ` – ${text}` : ""}`);
        }

        const ct = res.headers.get("content-type") || "";
        if (/json/i.test(ct)) return res.json();

        const txt = await res.text();
        try { return JSON.parse(txt); } catch { return txt || null; }
    } catch (err) {
        clearTimeout(t);
        if (err?.name === "AbortError" || err === "timeout") {
            throw new Error(`Ağ hatası: İstek zaman aşımına uğradı (${method} ${url})`);
        }
        // Tarayıcı "TypeError: Failed to fetch" vb.
        if (err instanceof TypeError || /Failed to fetch/i.test(String(err?.message))) {
            throw new Error(`Ağ hatası: Sunucuya ulaşılamıyor. Base URL: ${BASE_URL} • İstek: ${url}`);
        }
        throw err;
    }
}

// ---- Dışa açılan yardımcılar (mevcut imzalar korunarak)
export const getJson = (path, opts) => request("GET", path, opts ?? {});
export const postJson = (path, body, opts) => request("POST", path, { ...(opts || {}), body });
export const putJson = (path, body, opts) => request("PUT", path, { ...(opts || {}), body });
export const delJson = (path, opts) => request("DELETE", path, opts ?? {});
