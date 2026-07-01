/** Single roast/feedback item */
export interface RoastItem {
  id: number
  icon: string
  title: string
  description: string
}

/** Score result from AI assessment */
export interface AssessResult {
  score: number
  oneLiner: string
  roasts: RoastItem[]
  atsBreakdown: string[]
}

/** Assessment API request */
export interface AssessRequest {
  cvText: string
  targetRole?: string
  roastLevel: 'friendly' | 'brutal' | 'nuclear'
}

/** Assessment API response */
export interface AssessResponse {
  result: AssessResult
}

/** Geo detection result */
export interface GeoResult {
  country: string
}

export type AppState = 'upload' | 'loading' | 'result'
export type RoastLevel = 'friendly' | 'brutal' | 'nuclear'
