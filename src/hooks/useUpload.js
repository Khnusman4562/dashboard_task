"use client";

import { useState, useCallback } from "react";

function parseCSV(text) {
  const lines = text.trim().split("\n");
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
  return lines.slice(1).map((line) => {
    const values = line.split(",").map((v) => v.trim());
    return headers.reduce((obj, h, i) => {
      obj[h] = values[i] ?? "";
      return obj;
    }, {});
  });
}

function matchRecords(primary, secondary) {
  // Match on 'utr' column — adjust key as per your CSV
  const secondarySet = new Set(secondary.map((r) => r.utr));
  const matched = primary.filter((r) => secondarySet.has(r.utr));
  const unmatched = primary.filter((r) => !secondarySet.has(r.utr));
  return { matched, unmatched };
}

export default function useUpload() {
  const [primaryFile, setPrimaryFile] = useState(null);
  const [secondaryFile, setSecondaryFile] = useState(null);
  const [stats, setStats] = useState({ total: 1240, processed: 1102, pending: 138 });
  const [tableData, setTableData] = useState([
    { utr: "UTR-99281722", date: "12 June 2026", amount: "USER DATA", status: "Success", ifsc: "HDFC0001234" },
    { utr: "UTR-88127361", date: "11 June 2026", amount: "METADATA", status: "Processing", ifsc: "ICIC0000987" },
    { utr: "UTR-77216253", date: "10 June 2026", amount: "IOT STREAM", status: "Failed", ifsc: "SBIN0004561" },
    { utr: "UTR-66152431", date: "09 June 2026", amount: "USER DATA", status: "Success", ifsc: "BARB0VJRNDR" },
    { utr: "UTR-55142342", date: "08 June 2026", amount: "METADATA", status: "Success", ifsc: "KKBK0000123" },
  ]);
  const [loading, setLoading] = useState(false);

  const processFiles = useCallback(async (primary, secondary) => {
    if (!primary || !secondary) return;
    setLoading(true);
    try {
      const readFile = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.onerror = reject;
          reader.readAsText(file);
        });

      const [primaryText, secondaryText] = await Promise.all([
        readFile(primary),
        readFile(secondary),
      ]);

      const primaryData = parseCSV(primaryText);
      const secondaryData = parseCSV(secondaryText);
      const { matched, unmatched } = matchRecords(primaryData, secondaryData);

      setStats({
        total: primaryData.length,
        processed: matched.length,
        pending: unmatched.length,
      });

      // Map unmatched rows to table format
      const rows = unmatched.map((r) => ({
        utr: r.utr || "—",
        date: r.date || "—",
        amount: r.amount || "METADATA",
        status: r.status || "Failed",
        ifsc: r.ifsc || "—",
      }));

      setTableData(rows);
    } catch (err) {
      console.error("File processing error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handlePrimarySelect = useCallback(
    (file) => {
      setPrimaryFile(file);
      processFiles(file, secondaryFile);
    },
    [secondaryFile, processFiles]
  );

  const handleSecondarySelect = useCallback(
    (file) => {
      setSecondaryFile(file);
      processFiles(primaryFile, file);
    },
    [primaryFile, processFiles]
  );

  return {
    primaryFile,
    secondaryFile,
    stats,
    tableData,
    loading,
    handlePrimarySelect,
    handleSecondarySelect,
  };
}
