"use client";

import { useCallback, useEffect, useRef } from "react";
import { track, type AnalyticsEventName } from "@/lib/analytics";

export function useToolSession(toolId: string) {
  const started = useRef(false);
  const completed = useRef("");

  useEffect(() => {
    track("tool_view", { tool_id: toolId });
  }, [toolId]);

  const send = useCallback((name: AnalyticsEventName, operation?: string, errorCode?: string) => {
    track(name, {
      tool_id: toolId,
      ...(operation ? { operation } : {}),
      ...(errorCode ? { error_code: errorCode } : {}),
    });
  }, [toolId]);

  const markInput = useCallback(() => {
    if (started.current) return;
    started.current = true;
    send("tool_input_started");
  }, [send]);
  const markSuccess = useCallback((operation: string) => {
    if (completed.current === operation) return;
    completed.current = operation;
    send("tool_completed", operation);
  }, [send]);
  const markError = useCallback((errorCode: string) => {
    send("tool_error", undefined, errorCode);
  }, [send]);
  const markCopy = useCallback((operation = "result") => {
    send("copy_result", operation);
  }, [send]);
  const markDownload = useCallback((operation: string) => {
    send("download_result", operation);
  }, [send]);
  const markFileStart = useCallback((operation: string) => {
    send("file_processing_started", operation);
  }, [send]);
  const markFileDone = useCallback((operation: string) => {
    send("file_processing_completed", operation);
  }, [send]);
  const markClear = useCallback(() => {
    started.current = false;
    completed.current = "";
    send("clear_input");
  }, [send]);

  return { markInput, markSuccess, markError, markCopy, markDownload, markFileStart, markFileDone, markClear };
}
