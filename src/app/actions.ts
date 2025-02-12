'use server'

import type { ConfiguratorData, ActionResponse } from '../types/configurator'

export async function handleDrawingAction(data: ConfiguratorData): Promise<ActionResponse> {
  try {
    // implementazione
    return { success: true }
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

export async function handleClearAction(): Promise<ActionResponse> {
  return { success: true }
}

export async function handleAddAction(): Promise<ActionResponse> {
  return { success: true }
}