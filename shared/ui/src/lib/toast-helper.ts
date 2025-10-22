import { toast } from "../components/sonner"

interface ToastArgs {
  title: string
  description: string
  id?: string | number
}

interface LogContext {
  timestamp: Date
  level: "error" | "success" | "info" | "warning"
  title: string
  description: string
  userId?: string
  sessionId?: string
  [key: string]: unknown
}

export class ToastHelper {
  private static instance: ToastHelper
  private logCallback?: (context: LogContext) => void

  private constructor() { }

  static getInstance(): ToastHelper {
    if (!ToastHelper.instance) {
      ToastHelper.instance = new ToastHelper()
    }
    return ToastHelper.instance
  }

  /**
   * Set a callback function to handle logging
   * @param callback Function to call when logging toast messages
   */
  setLogCallback(callback: (context: LogContext) => void) {
    this.logCallback = callback
  }

  private log(level: LogContext["level"], args: ToastArgs, additionalContext?: Record<string, unknown>) {
    const context: LogContext = {
      timestamp: new Date(),
      level,
      title: args.title,
      description: args.description,
      ...additionalContext,
    }

    // Use custom callback if set, otherwise default to console.log
    if (this.logCallback) {
      this.logCallback(context)
    }
    else {
      console.log(`[Toast ${level.toUpperCase()}]`, {
        title: context.title,
        description: context.description,
        timestamp: context.timestamp,
        ...additionalContext,
      })
    }
  }

  error(args: ToastArgs, additionalContext?: Record<string, unknown>) {
    toast.error(args.title, {
      description: args.description,
      ...(args.id && { id: args.id }),
    })
    this.log("error", args, additionalContext)
  }

  /**
   * Show a success toast or update an existing toast
   * @param args Success message args (include id to update existing toast)
   * @param additionalContext Additional context for logging
   */
  success(args: ToastArgs, additionalContext?: Record<string, unknown>) {
    toast.success(args.title, {
      description: args.description,
      ...(args.id && { id: args.id }),
    })
    this.log("success", args, additionalContext)
  }

  info(args: ToastArgs, additionalContext?: Record<string, unknown>) {
    toast.info(args.title, {
      description: args.description,
      ...(args.id && { id: args.id }),
    })
    this.log("info", args, additionalContext)
  }

  warning(args: ToastArgs, additionalContext?: Record<string, unknown>) {
    toast.warning(args.title, {
      description: args.description,
      ...(args.id && { id: args.id }),
    })
    this.log("warning", args, additionalContext)
  }

  /**
   * Show a loading toast that can be updated later
   * @param message Loading message
   * @returns Toast ID for updating the toast
   */
  loading(message: string) {
    return toast.loading(message)
  }

  /**
   * Dismiss a specific toast
   * @param toastId Toast ID to dismiss
   */
  dismiss(toastId?: string | number) {
    toast.dismiss(toastId)
  }

  /**
   * Dismiss all toasts
   */
  dismissAll() {
    toast.dismiss()
  }
}

// Export a singleton instance for easy usage
export const toastHelper = ToastHelper.getInstance()
