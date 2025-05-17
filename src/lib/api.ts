import type { ApiMeta } from '@/types/api'

const apiMetaMap = new Map<string, ApiMeta>()

/**
 * APIのメタデータを設定する
 * @param path APIのパス（例: /api/health）
 */
export function setApiMeta(path: string, meta: ApiMeta) {
  apiMetaMap.set(path, meta)
}

/**
 * APIのメタデータを取得する
 */
export function getApiMeta(path: string): ApiMeta | undefined {
  return apiMetaMap.get(path)
}

/**
 * 公開APIを設定するユーティリティ関数
 */
export function publicApi(path: string) {
  setApiMeta(path, { public: true })
}
